import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackLink from "@/components/BackLink";
import Button from "@/components/Button";
import DataTable, { type Column } from "@/components/DataTable";
import EmptyState from "@/components/EmptyState";
import RowActions from "@/components/RowActions";
import { type Client, listClients } from "@/lib/clients";
import { grantTypes } from "@/lib/grant-types";
import { deleteClientAction } from "@/lib/manage-oauth-actions";

const columns: Column<Client>[] = [
  {
    header: "Name",
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
    className: "hidden w-48 md:table-cell",
    cell: (client) => (
      <code className="inline-block max-w-full truncate rounded-lg bg-foreground/5 px-2 py-1 align-middle text-xs text-muted">
        {client.clientId}
      </code>
    ),
  },
  {
    header: "Grants",
    className: "hidden w-2/5 lg:table-cell",
    cell: (client) => {
      const labels = grantTypes
        .filter((grant) => client.grants.includes(grant.value))
        .map((grant) => grant.label)
        .join(", ");
      return (
        <span className="block truncate text-sm text-muted" title={labels}>
          {labels}
        </span>
      );
    },
  },
];

export default async function ClientsPage() {
  const clients = await listClients();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <BackLink href="/manage-oauth" destination="OAuth Portal" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">My Clients</h1>
          <Button href="/manage-oauth/clients/new">
            <FontAwesomeIcon icon={faPlus} />
            Create New Client
          </Button>
        </div>
      </div>
      {clients.length > 0 ? (
        <DataTable
          caption="My Clients"
          rows={clients}
          columns={columns}
          rowKey={(client) => client.clientId}
          actions={(client) => (
            <RowActions
              name={client.name}
              settingsHref={`/manage-oauth/clients/${encodeURIComponent(client.clientId)}`}
              onDelete={deleteClientAction.bind(null, client.clientId)}
            />
          )}
        />
      ) : (
        <EmptyState>You haven't created any clients yet.</EmptyState>
      )}
    </div>
  );
}
