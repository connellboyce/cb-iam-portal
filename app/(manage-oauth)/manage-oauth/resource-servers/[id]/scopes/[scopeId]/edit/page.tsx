import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import ScopeForm from "@/components/ScopeForm";
import {
  getResourceServer,
  getScope,
  scopeParams,
} from "@/lib/resource-servers";

export function generateStaticParams() {
  return scopeParams();
}

export default async function EditScopePage({
  params,
}: PageProps<"/manage-oauth/resource-servers/[id]/scopes/[scopeId]/edit">) {
  const { id, scopeId } = await params;
  const server = getResourceServer(id);
  const scope = getScope(id, scopeId);
  if (!server || !scope) notFound();
  const serverHref = `/manage-oauth/resource-servers/${server.id}`;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-2">
      <BackLink href={serverHref} destination={server.name} />
      <ScopeForm resourceServerHref={serverHref} scope={scope} />
    </div>
  );
}
