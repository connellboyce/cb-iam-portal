"use client";

import {
  type FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Button from "@/components/Button";
import Callout from "@/components/Callout";
import Checkbox from "@/components/Checkbox";
import CopyField from "@/components/CopyField";
import Fieldset from "@/components/Fieldset";
import ScopePicker from "@/components/ScopePicker";
import SegmentedControl from "@/components/SegmentedControl";
import TextInput from "@/components/TextInput";
import UrlListInput from "@/components/UrlListInput";
import type { Client } from "@/lib/clients";
import { grantTypes } from "@/lib/grant-types";
import { saveClient } from "@/lib/manage-oauth-actions";
import type { ScopeGroup } from "@/lib/scopes";

interface ClientFormProps {
  client?: Client;
  scopeGroups: ScopeGroup[];
}

export default function ClientForm({ client, scopeGroups }: ClientFormProps) {
  const headingId = useId();
  const editing = client !== undefined;
  const firstGrantRef = useRef<HTMLInputElement>(null);
  const [grants, setGrants] = useState<string[]>(client?.grants ?? []);
  const [grantError, setGrantError] = useState<string>();
  const [state, save, pending] = useActionState(
    saveClient.bind(null, client?.clientId),
    {},
  );
  const secretHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state.created) secretHeadingRef.current?.focus();
  }, [state.created]);

  const toggleGrant = (value: string) => {
    setGrantError(undefined);
    setGrants((current) =>
      current.includes(value)
        ? current.filter((g) => g !== value)
        : [...current, value],
    );
  };

  // Submitting through a transition rather than the form's `action` keeps
  // the user's input when the server rejects it
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (grants.length === 0) {
      setGrantError("Select at least one grant.");
      firstGrantRef.current?.focus();
      return;
    }
    const formData = new FormData(e.currentTarget);
    startTransition(() => save(formData));
  };

  if (state.created) {
    return (
      <div className="flex flex-col gap-8">
        <h1
          ref={secretHeadingRef}
          tabIndex={-1}
          className="text-3xl font-bold outline-none"
        >
          Client Created
        </h1>
        <Callout variant="warning">
          Here is your client secret. Copy it now, this will be your only chance
          to do so.
        </Callout>
        <CopyField label="Client ID" value={state.created.clientId} />
        <CopyField label="Client Secret" value={state.created.secret} />
        <Button
          href={`/manage-oauth/clients/${encodeURIComponent(state.created.clientId)}`}
          className="text-lg sm:self-start"
        >
          Continue
        </Button>
      </div>
    );
  }

  return (
    <form
      aria-labelledby={headingId}
      onSubmit={handleSubmit}
      className="flex flex-col gap-10"
    >
      <h1 id={headingId} className="text-3xl font-bold">
        {editing ? "Edit Client" : "Create New Client"}
      </h1>

      <Fieldset legend="Details">
        <TextInput
          label="Display Name"
          name="name"
          defaultValue={client?.name}
          autoComplete="off"
          required
        />
        <TextInput
          label="Client ID"
          name="clientId"
          defaultValue={client?.clientId}
          readOnly={editing}
          hint={
            editing
              ? "Client IDs can't be changed."
              : "A unique identifier your app sends when requesting tokens. Leave blank to generate one."
          }
          pattern="[A-Za-z0-9._~\-]{1,128}"
          autoComplete="off"
          spellCheck={false}
          className={`w-full bg-transparent font-mono text-lg outline-none ${
            editing ? "cursor-default text-muted" : ""
          }`}
        />
      </Fieldset>

      <Fieldset legend="Client Type">
        <SegmentedControl
          name="clientType"
          options={[
            { value: "public", label: "Public" },
            { value: "confidential", label: "Confidential" },
          ]}
          defaultValue="confidential"
          disabled
        />
      </Fieldset>

      <Fieldset legend="Grants" error={grantError}>
        <div className="flex flex-col gap-1">
          {grantTypes.map((grant, index) => (
            <Checkbox
              key={grant.value}
              ref={index === 0 ? firstGrantRef : undefined}
              name="grants"
              value={grant.value}
              label={grant.label}
              checked={grants.includes(grant.value)}
              onChange={() => toggleGrant(grant.value)}
            />
          ))}
        </div>
      </Fieldset>

      {grants.includes("authorization_code") && (
        <Fieldset
          legend="Redirect URIs"
          description="Where users are sent after signing in. Use full URLs, including https://."
        >
          <UrlListInput
            name="redirectUris"
            itemLabel="Redirect URI"
            placeholder="https://example.com/callback"
            defaultValues={client?.redirectUris}
          />
        </Fieldset>
      )}

      <Fieldset
        legend="Scopes"
        description="Choose what this client can request access to."
      >
        <ScopePicker
          name="scopes"
          groups={scopeGroups}
          defaultSelected={client?.scopes}
        />
      </Fieldset>

      {state.error && (
        <Callout variant="warning" role="alert">
          {state.error}
        </Callout>
      )}

      <div className="flex flex-col gap-3 sm:flex-row-reverse sm:justify-start">
        <Button type="submit" className="text-lg" disabled={pending}>
          {editing ? "Save Changes" : "Create Client"}
        </Button>
        <Button href="/manage-oauth/clients" variant="text">
          Cancel
        </Button>
      </div>
    </form>
  );
}
