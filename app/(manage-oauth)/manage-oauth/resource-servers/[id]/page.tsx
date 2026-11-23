import { faPen, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import Button from "@/components/Button";
import DataTable, { type Column } from "@/components/DataTable";
import DetailList from "@/components/DetailList";
import EmptyState from "@/components/EmptyState";
import RowActions from "@/components/RowActions";
import { deleteScopeAction } from "@/lib/manage-oauth-actions";
import {
  getResourceServer,
  listScopes,
  type ResourceServerScope,
} from "@/lib/resource-servers";

const scopeColumns: Column<ResourceServerScope>[] = [
  {
    header: "Scope",
    cell: (scope) => (
      <code
        title={scope.value}
        className="inline-block max-w-full truncate rounded-lg bg-foreground/5 px-2 py-1 align-middle text-xs"
      >
        {scope.value}
      </code>
    ),
  },
];

export default async function ResourceServerPage({
  params,
}: PageProps<"/manage-oauth/resource-servers/[id]">) {
  const { id } = await params;
  const server = await getResourceServer(id);
  if (!server) notFound();
  const scopes = await listScopes(server.id);
  const basePath = `/manage-oauth/resource-servers/${encodeURIComponent(server.id)}`;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <BackLink
            href="/manage-oauth/resource-servers"
            destination="My Resource Servers"
          />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold break-words">{server.name}</h1>
            <Button href={`${basePath}/edit`}>
              <FontAwesomeIcon icon={faPen} className="text-sm" />
              Edit Resource Server
            </Button>
          </div>
        </div>
        <DetailList
          items={[
            { label: "Display Name", value: server.name },
            { label: "Description", value: server.description },
          ]}
        />
      </div>

      <section aria-labelledby="scopes-heading" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="scopes-heading" className="px-1 text-2xl font-bold">
            Scopes
          </h2>
          <Button href={`${basePath}/scopes/new`}>
            <FontAwesomeIcon icon={faPlus} />
            Create Scope
          </Button>
        </div>
        {scopes.length > 0 ? (
          <DataTable
            caption={`${server.name} scopes`}
            rows={scopes}
            columns={scopeColumns}
            rowKey={(scope) => scope.id}
            actions={(scope) => (
              <RowActions
                name={scope.value}
                extraActions={[
                  {
                    label: "View consumers of",
                    icon: faUsers,
                    href: `${basePath}/scopes/${encodeURIComponent(scope.id)}/consumers`,
                  },
                ]}
                onDelete={deleteScopeAction.bind(null, server.id, scope.id)}
              />
            )}
          />
        ) : (
          <EmptyState>
            This resource server doesn't have any scopes yet.
          </EmptyState>
        )}
      </section>
    </div>
  );
}
