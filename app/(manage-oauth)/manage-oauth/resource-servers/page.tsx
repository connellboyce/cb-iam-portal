import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackLink from "@/components/BackLink";
import Button from "@/components/Button";
import DataTable, { type Column } from "@/components/DataTable";
import EmptyState from "@/components/EmptyState";
import RowActions from "@/components/RowActions";
import { type ResourceServer, resourceServers } from "@/lib/resource-servers";

const columns: Column<ResourceServer>[] = [
  {
    header: "Name",
    className: "md:w-1/3",
    cell: (server) => (
      <div className="flex min-w-0 flex-col gap-1">
        <span className="truncate font-medium">{server.name}</span>
        <span className="truncate text-xs text-muted md:hidden">
          {server.description}
        </span>
      </div>
    ),
  },
  {
    header: "Description",
    className: "hidden md:table-cell",
    cell: (server) => (
      <span
        className="block truncate text-sm text-muted"
        title={server.description}
      >
        {server.description}
      </span>
    ),
  },
];

export default function ResourceServersPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <BackLink href="/manage-oauth" destination="OAuth Portal" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">My Resource Servers</h1>
          <Button href="/manage-oauth/resource-servers/new">
            <FontAwesomeIcon icon={faPlus} />
            Create New Resource Server
          </Button>
        </div>
      </div>
      {resourceServers.length > 0 ? (
        <DataTable
          caption="My Resource Servers"
          rows={resourceServers}
          columns={columns}
          rowKey={(server) => server.id}
          actions={(server) => (
            <RowActions
              name={server.name}
              settingsHref={`/manage-oauth/resource-servers/${server.id}`}
            />
          )}
        />
      ) : (
        <EmptyState>You haven't created any resource servers yet.</EmptyState>
      )}
    </div>
  );
}
