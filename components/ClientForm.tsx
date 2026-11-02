"use client";

import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import Button from "@/components/Button";
import Callout from "@/components/Callout";
import Checkbox from "@/components/Checkbox";
import CopyField from "@/components/CopyField";
import Fieldset from "@/components/Fieldset";
import ScopePicker from "@/components/ScopePicker";
import SegmentedControl from "@/components/SegmentedControl";
import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import UrlListInput from "@/components/UrlListInput";
import { type Client, grantTypes } from "@/lib/clients";
import { scopeGroups } from "@/lib/scopes";

function generateSecret() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

interface ClientFormProps {
  client?: Client;
}

export default function ClientForm({ client }: ClientFormProps) {
  const headingId = useId();
  const editing = client !== undefined;
  const firstGrantRef = useRef<HTMLInputElement>(null);
  const [grants, setGrants] = useState<string[]>(client?.grants ?? []);
  const [grantError, setGrantError] = useState<string>();
  const [secret, setSecret] = useState<string>();
  const secretHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (secret) secretHeadingRef.current?.focus();
  }, [secret]);

  const toggleGrant = (value: string) => {
    setGrantError(undefined);
    setGrants((current) =>
      current.includes(value)
        ? current.filter((g) => g !== value)
        : [...current, value],
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (grants.length === 0) {
      setGrantError("Select at least one grant.");
      firstGrantRef.current?.focus();
      return;
    }
    if (!editing) setSecret(generateSecret());
  };

  if (secret) {
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
        <CopyField label="Client Secret" value={secret} />
        <Button href="/manage-oauth/clients" className="text-lg sm:self-start">
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
          hint="A unique identifier your app sends when requesting tokens."
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent font-mono text-lg outline-none"
          required
        />
        <TextArea
          label="Client Description"
          name="description"
          defaultValue={client?.description}
          rows={3}
          required
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

      <div className="flex flex-col gap-3 sm:flex-row-reverse sm:justify-start">
        <Button type="submit" className="text-lg">
          {editing ? "Save Changes" : "Create Client"}
        </Button>
        <Button href="/manage-oauth/clients" variant="text">
          Cancel
        </Button>
      </div>
    </form>
  );
}
