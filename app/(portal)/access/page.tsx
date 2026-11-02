import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import Field from "@/components/Field";
import Section from "@/components/Section";
import { getRole, type Role } from "@/lib/roles";

const toRoles = (ids: string[]) =>
  ids.map(getRole).filter((role): role is Role => role !== undefined);

const roles = {
  assigned: toRoles(["user"]),
  pending: toRoles([]),
  available: toRoles(["developer", "admin"]),
};

export default function AccessPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-10">
      <Section title="Your Roles">
        {roles.assigned.length > 0 ? (
          roles.assigned.map((role) => (
            <Field key={role.id} value={role.name} />
          ))
        ) : (
          <EmptyState>You don't have any roles yet.</EmptyState>
        )}
      </Section>
      <Section title="Pending Roles">
        {roles.pending.length > 0 ? (
          roles.pending.map((role) => <Field key={role.id} value={role.name} />)
        ) : (
          <EmptyState>No pending role requests.</EmptyState>
        )}
      </Section>
      <Section title="Available Roles">
        {roles.available.length > 0 ? (
          roles.available.map((role) => (
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
    </div>
  );
}
