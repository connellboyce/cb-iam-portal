"use client";

import { type FormEvent, startTransition, useActionState, useId } from "react";
import Button from "@/components/Button";
import Callout from "@/components/Callout";
import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import { saveResourceServer } from "@/lib/manage-oauth-actions";
import type { ResourceServer } from "@/lib/resource-servers";

interface ResourceServerFormProps {
  server?: ResourceServer;
}

export default function ResourceServerForm({
  server,
}: ResourceServerFormProps) {
  const headingId = useId();
  const editing = server !== undefined;
  const [state, save, pending] = useActionState(
    saveResourceServer.bind(null, server?.id),
    {},
  );

  // Submitting through a transition rather than the form's `action` keeps
  // the user's input when the server rejects it
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => save(formData));
  };

  return (
    <form
      aria-labelledby={headingId}
      onSubmit={handleSubmit}
      className="flex flex-col gap-8"
    >
      <h1 id={headingId} className="text-3xl font-bold">
        {editing ? "Edit Resource Server" : "Create New Resource Server"}
      </h1>
      <div className="flex flex-col gap-3">
        <TextInput
          label="Display Name"
          name="name"
          defaultValue={server?.name}
          autoComplete="off"
          required
        />
        <TextArea
          label="Description"
          name="description"
          defaultValue={server?.description}
          rows={3}
          required
        />
      </div>
      <Callout>
        {editing
          ? "Finish editing this application to manage scopes."
          : "You can create scopes after creating the Resource Server."}
      </Callout>
      {state.error && (
        <Callout variant="warning" role="alert">
          {state.error}
        </Callout>
      )}
      <div className="flex flex-col gap-3 sm:flex-row-reverse sm:justify-start">
        <Button type="submit" className="text-lg" disabled={pending}>
          {editing ? "Save Changes" : "Create Resource Server"}
        </Button>
        <Button
          href={
            editing
              ? `/manage-oauth/resource-servers/${encodeURIComponent(server.id)}`
              : "/manage-oauth/resource-servers"
          }
          variant="text"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
