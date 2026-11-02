"use client";

import { type FormEvent, useId } from "react";
import Button from "@/components/Button";
import Fieldset from "@/components/Fieldset";
import SegmentedControl from "@/components/SegmentedControl";
import TextInput from "@/components/TextInput";
import type { ResourceServerScope } from "@/lib/resource-servers";

interface ScopeFormProps {
  resourceServerHref: string;
  scope?: ResourceServerScope;
}

export default function ScopeForm({
  resourceServerHref,
  scope,
}: ScopeFormProps) {
  const headingId = useId();
  const editing = scope !== undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      aria-labelledby={headingId}
      onSubmit={handleSubmit}
      className="flex flex-col gap-10"
    >
      <h1 id={headingId} className="text-3xl font-bold">
        {editing ? "Edit Scope" : "Create Scope"}
      </h1>
      <Fieldset legend="Details">
        <TextInput
          label="Scope Name"
          name="scope"
          defaultValue={scope?.value}
          readOnly={editing}
          hint={editing ? "Scope names can't be changed." : undefined}
          placeholder="urn:cb:scope:app:resource#read"
          autoComplete="off"
          spellCheck={false}
          className={`w-full bg-transparent font-mono text-lg outline-none placeholder:text-muted ${
            editing ? "cursor-default text-muted" : ""
          }`}
          required
        />
        <TextInput
          label="Display Message"
          name="displayMessage"
          defaultValue={scope?.displayMessage}
          hint="Shown to users when an app asks for this scope."
          autoComplete="off"
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
      <div className="flex flex-col gap-3 sm:flex-row-reverse sm:justify-start">
        <Button type="submit" className="text-lg">
          {editing ? "Save Changes" : "Create Scope"}
        </Button>
        <Button href={resourceServerHref} variant="text">
          Cancel
        </Button>
      </div>
    </form>
  );
}
