import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import ResourceServerForm from "@/components/ResourceServerForm";
import { getResourceServer, resourceServers } from "@/lib/resource-servers";

export function generateStaticParams() {
  return resourceServers.map((server) => ({ id: server.id }));
}

export default async function EditResourceServerPage({
  params,
}: PageProps<"/manage-oauth/resource-servers/[id]/edit">) {
  const { id } = await params;
  const server = getResourceServer(id);
  if (!server) notFound();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-2">
      <BackLink
        href="/manage-oauth/resource-servers"
        destination="My Resource Servers"
      />
      <ResourceServerForm server={server} />
    </div>
  );
}
