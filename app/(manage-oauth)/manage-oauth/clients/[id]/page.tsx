import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import DetailList from "@/components/DetailList";
import { clients, getClient, grantTypes } from "@/lib/clients";
import { scopeGroups } from "@/lib/scopes";

export function generateStaticParams() {
  return clients.map((client) => ({ id: client.id }));
}

function None() {
  return <span className="text-sm text-muted">None</span>;
}

export default async function ClientPage({
  params,
}: PageProps<"/manage-oauth/clients/[id]">) {
  const { id } = await params;
  const client = getClient(id);
  if (!client) notFound();

  const grantLabels = grantTypes
    .filter((grant) => client.grants.includes(grant.value))
    .map((grant) => grant.label);
  const scopesByApplication = scopeGroups
    .map((group) => ({
      application: group.application,
      scopes: group.scopes
        .map((scope) => scope.value)
        .filter((value) => client.scopes.includes(value)),
    }))
    .filter((group) => group.scopes.length > 0);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <BackLink href="/manage-oauth/clients" destination="My Clients" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-3xl font-bold break-words">{client.name}</h1>
            <span className="flex items-center gap-1.5 text-sm text-muted">
              <span
                aria-hidden="true"
                className={`size-2 rounded-full ${
                  client.active ? "bg-brand" : "bg-muted"
                }`}
              />
              {client.active ? "Active" : "Inactive"}
            </span>
          </div>
          <Button href={`/manage-oauth/clients/${client.id}/edit`}>
            <FontAwesomeIcon icon={faPen} className="text-sm" />
            Edit Client
          </Button>
        </div>
      </div>

      <DetailList
        items={[
          {
            label: "Client ID",
            value: (
              <code className="inline-block max-w-full rounded-lg bg-foreground/5 px-2 py-1 text-sm break-all">
                {client.clientId}
              </code>
            ),
          },
          { label: "Description", value: client.description },
          { label: "Client Type", value: "Confidential" },
          {
            label: "Grants",
            value:
              grantLabels.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {grantLabels.map((label) => (
                    <li key={label}>
                      <Badge>{label}</Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <None />
              ),
          },
          {
            label: "Redirect URIs",
            value:
              client.redirectUris.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {client.redirectUris.map((uri) => (
                    <li key={uri} className="font-mono text-sm break-all">
                      {uri}
                    </li>
                  ))}
                </ul>
              ) : (
                <None />
              ),
          },
          {
            label: "Scopes",
            value:
              scopesByApplication.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {scopesByApplication.map((group) => (
                    <div
                      key={group.application}
                      className="flex flex-col gap-2"
                    >
                      <h2 className="text-sm text-muted">
                        {group.application}
                      </h2>
                      <ul className="flex flex-wrap gap-2">
                        {group.scopes.map((scope) => (
                          <li
                            key={scope}
                            className="max-w-full rounded-full bg-foreground/10 px-3 py-1"
                          >
                            <code className="text-xs break-all">{scope}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <None />
              ),
          },
        ]}
      />
    </div>
  );
}
