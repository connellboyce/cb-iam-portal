import { notFound } from "next/navigation";
import RoleForm from "@/components/RoleForm";
import { getRole, roles } from "@/lib/roles";

export function generateStaticParams() {
  return roles.map((role) => ({ id: role.id }));
}

export default async function EditRolePage({
  params,
}: PageProps<"/admin/roles/[id]/edit">) {
  const { id } = await params;
  const role = getRole(id);
  if (!role) notFound();

  return <RoleForm role={role} />;
}
