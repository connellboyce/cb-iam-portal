import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import ClientForm from "@/components/ClientForm";
import { clients, getClient } from "@/lib/clients";

export function generateStaticParams() {
  return clients.map((client) => ({ id: client.id }));
}

export default async function EditClientPage({
  params,
}: PageProps<"/manage-oauth/clients/[id]/edit">) {
  const { id } = await params;
  const client = getClient(id);
  if (!client) notFound();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-2">
      <BackLink href="/manage-oauth/clients" destination="My Clients" />
      <ClientForm client={client} />
    </div>
  );
}
