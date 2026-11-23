import { authhubRequest } from "@/lib/authhub";

export interface Scope {
  value: string;
  description?: string;
}

export interface ScopeGroup {
  application: string;
  scopes: Scope[];
}

interface ScopeCatalog {
  scopes: { name: string; application: { id: string; name: string } }[];
}

/** Every scope a client can be assigned, grouped by owning application. */
export async function getScopeGroups(): Promise<ScopeGroup[]> {
  const { scopes } = await authhubRequest<ScopeCatalog>("scopes");
  const groups = new Map<string, Scope[]>();
  for (const scope of scopes) {
    const group = groups.get(scope.application.name) ?? [];
    group.push({ value: scope.name });
    groups.set(scope.application.name, group);
  }
  return [...groups]
    .map(([application, scopes]) => ({
      application,
      scopes: scopes.sort((a, b) => a.value.localeCompare(b.value)),
    }))
    .sort((a, b) => a.application.localeCompare(b.application));
}
