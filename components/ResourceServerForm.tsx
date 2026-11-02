"use client";

import { type FormEvent, useId } from "react";
import Button from "@/components/Button";
import Callout from "@/components/Callout";
import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import type { ResourceServer } from "@/lib/resource-servers";

interface ResourceServerFormProps {
  server?: ResourceServer;
}

export default function ResourceServerForm({
  server,
}: ResourceServerFormProps) {
  const headingId = useId();
  const editing = server !== undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <div className="flex flex-col gap-3 sm:flex-row-reverse sm:justify-start">
        <Button type="submit" className="text-lg">
          {editing ? "Save Changes" : "Create Resource Server"}
        </Button>
        <Button href="/manage-oauth/resource-servers" variant="text">
          Cancel
        </Button>
      </div>
    </form>
  );
}
