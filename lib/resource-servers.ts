import { authhubFind, authhubRequest } from "@/lib/authhub";

// Resource servers are called "applications" by the authhub API

export interface ResourceServer {
  id: string;
  name: string;
  description: string;
}

export interface ResourceServerInput {
  name: string;
  description: string;
}

export interface ResourceServerScope {
  id: string;
  value: string;
}

interface ScopeResponse {
  id: string;
  name: string;
  application_id: string;
}

const path = (id: string) => `applications/${encodeURIComponent(id)}`;

const toScope = (scope: ScopeResponse): ResourceServerScope => ({
  id: scope.id,
  value: scope.name,
});

export async function listResourceServers() {
  const { applications } = await authhubRequest<{
    applications: ResourceServer[];
  }>("applications");
  return applications;
}

export async function getResourceServer(id: string) {
  return authhubFind<ResourceServer>(path(id));
}

export async function createResourceServer(input: ResourceServerInput) {
  return authhubRequest<ResourceServer>("applications", {
    method: "POST",
    body: input,
  });
}

export async function updateResourceServer(
  id: string,
  input: ResourceServerInput,
) {
  return authhubRequest<ResourceServer>(path(id), {
    method: "PUT",
    body: input,
  });
}

/** Fails with a conflict while the resource server still has scopes. */
export async function deleteResourceServer(id: string) {
  await authhubRequest(path(id), { method: "DELETE" });
}

export async function listScopes(serverId: string) {
  const { scopes } = await authhubRequest<{ scopes: ScopeResponse[] }>(
    `${path(serverId)}/scopes`,
  );
  return scopes.map(toScope);
}

export async function getScope(serverId: string, scopeId: string) {
  return (
    (await listScopes(serverId)).find((scope) => scope.id === scopeId) ?? null
  );
}

export async function createScope(serverId: string, value: string) {
  const scope = await authhubRequest<ScopeResponse>(
    `${path(serverId)}/scopes`,
    { method: "POST", body: { name: value } },
  );
  return toScope(scope);
}

/** Fails with a conflict while any client is assigned the scope. */
export async function deleteScope(serverId: string, scopeId: string) {
  await authhubRequest(
    `${path(serverId)}/scopes/${encodeURIComponent(scopeId)}`,
    { method: "DELETE" },
  );
}
