import { notFound } from "next/navigation";
import RoleRequestForm from "@/components/RoleRequestForm";
import { getRole, isRequestable, roles } from "@/lib/roles";

export function generateStaticParams() {
  return roles.filter(isRequestable).map((role) => ({ id: role.id }));
}

export default async function RequestRolePage({
  params,
}: PageProps<"/access/request/[id]">) {
  const { id } = await params;
  const role = getRole(id);
  if (!role || !isRequestable(role)) notFound();

  return <RoleRequestForm role={role} />;
}
