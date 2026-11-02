import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackLink from "@/components/BackLink";
import Button from "@/components/Button";
import DataTable, { type Column } from "@/components/DataTable";
import EmptyState from "@/components/EmptyState";
import RowActions from "@/components/RowActions";
import { type Client, clients } from "@/lib/clients";

const columns: Column<Client>[] = [
  {
    header: "Name",
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
    className: "hidden w-48 md:table-cell",
    cell: (client) => (
      <code className="inline-block max-w-full truncate rounded-lg bg-foreground/5 px-2 py-1 align-middle text-xs text-muted">
        {client.clientId}
      </code>
    ),
  },
  {
    header: "Description",
    className: "hidden w-2/5 lg:table-cell",
    cell: (client) => (
      <span
        className="block truncate text-sm text-muted"
        title={client.description}
      >
        {client.description}
      </span>
    ),
  },
];

export default function ClientsPage() {
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
          rowKey={(client) => client.id}
          actions={(client) => (
            <RowActions
              name={client.name}
              settingsHref={`/manage-oauth/clients/${client.id}`}
            />
          )}
        />
      ) : (
        <EmptyState>You haven't created any clients yet.</EmptyState>
      )}
    </div>
  );
}
