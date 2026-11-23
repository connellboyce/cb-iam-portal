"use client";

import { type FormEvent, startTransition, useActionState, useId } from "react";
import Button from "@/components/Button";
import Callout from "@/components/Callout";
import Fieldset from "@/components/Fieldset";
import SegmentedControl from "@/components/SegmentedControl";
import TextInput from "@/components/TextInput";
import { createScopeAction } from "@/lib/manage-oauth-actions";

interface ScopeFormProps {
  resourceServerId: string;
  resourceServerHref: string;
}

// Scopes can only be created and deleted; the API has no way to edit one
export default function ScopeForm({
  resourceServerId,
  resourceServerHref,
}: ScopeFormProps) {
  const headingId = useId();
  const [state, create, pending] = useActionState(
    createScopeAction.bind(null, resourceServerId),
    {},
  );

  // Submitting through a transition rather than the form's `action` keeps
  // the user's input when the server rejects it
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => create(formData));
  };

  return (
    <form
      aria-labelledby={headingId}
      onSubmit={handleSubmit}
      className="flex flex-col gap-10"
    >
      <h1 id={headingId} className="text-3xl font-bold">
        Create Scope
      </h1>
      <Fieldset legend="Details">
        <TextInput
          label="Scope Name"
          name="scope"
          hint="Scope names can't be changed after they're created."
          placeholder="urn:cb:scope:app:resource#read"
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent font-mono text-lg outline-none placeholder:text-muted"
          required
        />
      </Fieldset>
      <Fieldset legend="Scope Type">
        <SegmentedControl
          name="scopeType"
          options={[
            { value: "public", label: "Public" },
            { value: "confidential", label: "Confidential" },
          ]}
          defaultValue="confidential"
          disabled
        />
      </Fieldset>
      {state.error && (
        <Callout variant="warning" role="alert">
          {state.error}
        </Callout>
      )}
      <div className="flex flex-col gap-3 sm:flex-row-reverse sm:justify-start">
        <Button type="submit" className="text-lg" disabled={pending}>
          Create Scope
        </Button>
        <Button href={resourceServerHref} variant="text">
          Cancel
        </Button>
      </div>
    </form>
  );
}
