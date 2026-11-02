import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import Badge from "@/components/Badge";
import ConfirmButton from "@/components/ConfirmButton";
import EmptyState from "@/components/EmptyState";
import Field from "@/components/Field";
import Section from "@/components/Section";
import { getRole, getRoleMembers, roles } from "@/lib/roles";

export function generateStaticParams() {
  return roles.map((role) => ({ id: role.id }));
}

export default async function RoleMembersPage({
  params,
}: PageProps<"/admin/roles/[id]/users">) {
  const { id } = await params;
  const role = getRole(id);
  if (!role) notFound();
  const members = getRoleMembers(id);

  return (
    <div className="mx-auto flex max-w-md flex-col gap-8">
      <div className="flex flex-col items-start gap-2">
        <BackLink href="/admin" destination="Admin" />
        <h2 className="text-2xl font-bold">Role Members</h2>
      </div>
      <Field label="Role" value={<Badge variant="brand">{role.name}</Badge>} />
      <Section title={`Users (${members.length})`}>
        {members.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {members.map((member) => (
              <li key={member.username}>
                <Field
                  label={`@${member.username}`}
                  value={member.fullName}
                  action={
                    <ConfirmButton
                      label={`Remove ${member.fullName} from ${role.name} role`}
                      icon={faUserMinus}
                      question={`Are you sure you want to remove ${member.fullName} from the ${role.name} role?`}
                    />
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState>No users have this role.</EmptyState>
        )}
      </Section>
    </div>
  );
}
