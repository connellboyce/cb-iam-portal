import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import DataTable, { type Column } from "@/components/DataTable";
import EmptyState from "@/components/EmptyState";
import { type Client, getScopeConsumers } from "@/lib/clients";
import {
  getResourceServer,
  getScope,
  scopeParams,
} from "@/lib/resource-servers";

export function generateStaticParams() {
  return scopeParams();
}

const columns: Column<Client>[] = [
  {
    header: "Client",
    cell: (client) => (
      <div className="flex min-w-0 flex-col gap-1">
        <span className="truncate font-medium">{client.name}</span>
        <span className="truncate font-mono text-xs text-muted md:hidden">
          {client.clientId}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <span
            aria-hidden="true"
            className={`size-1.5 shrink-0 rounded-full ${
              client.active ? "bg-brand" : "bg-muted"
            }`}
          />
          {client.active ? "Active" : "Inactive"}
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
  const server = getResourceServer(id);
  const scope = getScope(id, scopeId);
  if (!server || !scope) notFound();
  const consumers = getScopeConsumers(scope.value);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <BackLink
          href={`/manage-oauth/resource-servers/${server.id}`}
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
          Clients ({consumers.length})
        </h2>
        {consumers.length > 0 ? (
          <DataTable
            caption="Clients with this scope"
            rows={consumers}
            columns={columns}
            rowKey={(client) => client.id}
          />
        ) : (
          <EmptyState>No clients have this scope yet.</EmptyState>
        )}
      </section>
    </div>
  );
}
