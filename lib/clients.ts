import { authhubFind, authhubRequest } from "@/lib/authhub";

export interface Client {
  clientId: string;
  name: string;
  grants: string[];
  redirectUris: string[];
  scopes: string[];
}

export interface ClientInput {
  /** Omit on create to have the server generate one */
  clientId?: string;
  name: string;
  grants: string[];
  redirectUris: string[];
  scopes: string[];
}

// RFC 7591 client metadata, as returned by `/api/v1/clients`
interface ClientInformation {
  client_id: string;
  client_secret?: string;
  client_name?: string;
  redirect_uris: string[];
  grant_types: string[];
  scope?: string;
}

function toClient(info: ClientInformation): Client {
  return {
    clientId: info.client_id,
    name: info.client_name ?? info.client_id,
    grants: info.grant_types,
    redirectUris: info.redirect_uris,
    scopes: info.scope?.split(" ") ?? [],
  };
}

function toMetadata(input: ClientInput) {
  return {
    client_id: input.clientId,
    client_name: input.name,
    grant_types: input.grants,
    response_types: input.grants.includes("authorization_code") ? ["code"] : [],
    redirect_uris: input.redirectUris,
    scope: input.scopes.join(" "),
  };
}

const path = (clientId: string) => `clients/${encodeURIComponent(clientId)}`;

export async function listClients() {
  const { clients } = await authhubRequest<{ clients: ClientInformation[] }>(
    "clients",
  );
  return clients.map(toClient);
}

export async function getClient(clientId: string) {
  const info = await authhubFind<ClientInformation>(path(clientId));
  return info && toClient(info);
}

/** The client secret is only ever returned here, at registration. */
export async function createClient(input: ClientInput) {
  const info = await authhubRequest<ClientInformation>("clients", {
    method: "POST",
    body: toMetadata(input),
  });
  return { client: toClient(info), secret: info.client_secret ?? "" };
}

export async function updateClient(clientId: string, input: ClientInput) {
  const info = await authhubRequest<ClientInformation>(path(clientId), {
    method: "PUT",
    body: toMetadata({ ...input, clientId }),
  });
  return toClient(info);
}

export async function deleteClient(clientId: string) {
  await authhubRequest(path(clientId), { method: "DELETE" });
}

// The API only lists the signed-in user's clients, so consumers owned by
// anyone else aren't visible here
export async function getScopeConsumers(scope: string) {
  return (await listClients()).filter((client) =>
    client.scopes.includes(scope),
  );
}
