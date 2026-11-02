import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import ScopeForm from "@/components/ScopeForm";
import { getResourceServer, resourceServers } from "@/lib/resource-servers";

export function generateStaticParams() {
  return resourceServers.map((server) => ({ id: server.id }));
}

export default async function NewScopePage({
  params,
}: PageProps<"/manage-oauth/resource-servers/[id]/scopes/new">) {
  const { id } = await params;
  const server = getResourceServer(id);
  if (!server) notFound();
  const serverHref = `/manage-oauth/resource-servers/${server.id}`;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-2">
      <BackLink href={serverHref} destination={server.name} />
      <ScopeForm resourceServerHref={serverHref} />
    </div>
  );
}
