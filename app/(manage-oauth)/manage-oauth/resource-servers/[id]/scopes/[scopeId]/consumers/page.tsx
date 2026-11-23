import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import DataTable, { type Column } from "@/components/DataTable";
import EmptyState from "@/components/EmptyState";
import { type Client, getScopeConsumers } from "@/lib/clients";
import { getResourceServer, getScope } from "@/lib/resource-servers";

const columns: Column<Client>[] = [
  {
    header: "Client",
    cell: (client) => (
      <div className="flex min-w-0 flex-col gap-1">
        <span className="truncate font-medium">{client.name}</span>
        <span className="truncate font-mono text-xs text-muted md:hidden">
          {client.clientId}
        </span>
      </div>
    ),
  },
  {
    header: "Client ID",
    className: "hidden w-2/5 md:table-cell",
    cell: (client) => (
      <code className="inline-block max-w-full truncate rounded-lg bg-foreground/5 px-2 py-1 align-middle text-xs text-muted">
        {client.clientId}
      </code>
    ),
  },
];

export default async function ScopeConsumersPage({
  params,
}: PageProps<"/manage-oauth/resource-servers/[id]/scopes/[scopeId]/consumers">) {
  const { id, scopeId } = await params;
  const server = await getResourceServer(id);
  if (!server) notFound();
  const scope = await getScope(server.id, scopeId);
  if (!scope) notFound();
  const consumers = await getScopeConsumers(scope.value);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <BackLink
          href={`/manage-oauth/resource-servers/${encodeURIComponent(server.id)}`}
          destination={server.name}
        />
        <h1 className="text-3xl font-bold">Scope Consumers</h1>
        <code className="self-start rounded-lg bg-foreground/5 px-2 py-1 text-sm break-all">
          {scope.value}
        </code>
      </div>
      <section
        aria-labelledby="consumers-heading"
        className="flex flex-col gap-4"
      >
        <h2 id="consumers-heading" className="px-1 text-2xl font-bold">
          Your Clients ({consumers.length})
        </h2>
        <p className="px-1 text-sm text-muted">
          Only clients you own are listed. Clients owned by other developers may
          also use this scope.
        </p>
        {consumers.length > 0 ? (
          <DataTable
            caption="Clients with this scope"
            rows={consumers}
            columns={columns}
            rowKey={(client) => client.clientId}
          />
        ) : (
          <EmptyState>None of your clients have this scope yet.</EmptyState>
        )}
      </section>
    </div>
  );
}
