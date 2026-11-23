import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import ClientForm from "@/components/ClientForm";
import { getClient } from "@/lib/clients";
import { getScopeGroups } from "@/lib/scopes";

export default async function EditClientPage({
  params,
}: PageProps<"/manage-oauth/clients/[id]/edit">) {
  const { id } = await params;
  const [client, scopeGroups] = await Promise.all([
    getClient(id),
    getScopeGroups(),
  ]);
  if (!client) notFound();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-2">
      <BackLink
        href={`/manage-oauth/clients/${encodeURIComponent(client.clientId)}`}
        destination={client.name}
      />
      <ClientForm client={client} scopeGroups={scopeGroups} />
    </div>
  );
}
