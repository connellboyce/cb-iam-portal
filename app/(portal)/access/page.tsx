import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import Field from "@/components/Field";
import Section from "@/components/Section";
import { getRole, isRequestable, type Role, roles } from "@/lib/roles";
import { getCurrentUser } from "@/lib/user";

const toRoles = (ids: string[]) =>
  ids.map(getRole).filter((role): role is Role => role !== undefined);

async function RoleSections() {
  const user = await getCurrentUser();
  // TODO: pending requests are still mocked
  const pending = toRoles([]);
  const assigned = toRoles(user.roles);
  const available = roles.filter(
    (role) =>
      isRequestable(role) &&
      !user.roles.includes(role.id) &&
      !pending.includes(role),
  );

  return (
    <>
      <Section title="Your Roles">
        {assigned.length > 0 ? (
          assigned.map((role) => <Field key={role.id} value={role.name} />)
        ) : (
          <EmptyState>You don't have any roles yet.</EmptyState>
        )}
      </Section>
      <Section title="Pending Roles">
        {pending.length > 0 ? (
          pending.map((role) => <Field key={role.id} value={role.name} />)
        ) : (
          <EmptyState>No pending role requests.</EmptyState>
        )}
      </Section>
      <Section title="Available Roles">
        {available.length > 0 ? (
          available.map((role) => (
            <Field
              key={role.id}
              value={role.name}
              action={
                <Button
                  href={`/access/request/${role.id}`}
                  aria-label={`Request ${role.name} role`}
                  className="text-sm"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Request
                </Button>
              }
            />
          ))
        ) : (
          <EmptyState>No other roles are available to request.</EmptyState>
        )}
      </Section>
    </>
  );
}

export default function AccessPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-10">
      <Suspense>
        <RoleSections />
      </Suspense>
    </div>
  );
}
