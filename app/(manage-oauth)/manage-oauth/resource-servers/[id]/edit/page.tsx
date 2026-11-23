import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import ResourceServerForm from "@/components/ResourceServerForm";
import { getResourceServer } from "@/lib/resource-servers";

export default async function EditResourceServerPage({
  params,
}: PageProps<"/manage-oauth/resource-servers/[id]/edit">) {
  const { id } = await params;
  const server = await getResourceServer(id);
  if (!server) notFound();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-2">
      <BackLink
        href={`/manage-oauth/resource-servers/${encodeURIComponent(server.id)}`}
        destination={server.name}
      />
      <ResourceServerForm server={server} />
    </div>
  );
}
