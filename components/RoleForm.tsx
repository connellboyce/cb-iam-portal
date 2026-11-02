"use client";

import { type FormEvent, useId } from "react";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Toggle from "@/components/Toggle";
import type { Role } from "@/lib/roles";

interface RoleFormProps {
  role?: Role;
}

export default function RoleForm({ role }: RoleFormProps) {
  const headingId = useId();
  const editing = role !== undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      aria-labelledby={headingId}
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-md flex-col gap-8"
    >
      <h2 id={headingId} className="text-2xl font-bold">
        {editing ? "Edit Role" : "Create Role"}
      </h2>
      <TextInput
        label="Name"
        name="name"
        defaultValue={role?.name}
        autoComplete="off"
        required
      />
      <div className="flex flex-col gap-3">
        <Toggle
          label="Active"
          name="active"
          description="Users with this role receive its access."
          defaultChecked={role?.active ?? true}
        />
        <Toggle
          label="Hidden"
          name="hidden"
          description="Hidden roles can't be requested from Roles & Access."
          defaultChecked={role?.hidden ?? false}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Button type="submit" className="w-full text-lg">
          {editing ? "Save Changes" : "Create Role"}
        </Button>
        <Button href="/admin" variant="text" className="w-full">
          Cancel
        </Button>
      </div>
    </form>
  );
}
