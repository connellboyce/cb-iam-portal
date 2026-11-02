import { resourceServers } from "@/lib/resource-servers";

export interface Scope {
  value: string;
  description: string;
}

export interface ScopeGroup {
  application: string;
  scopes: Scope[];
}

const openIdScopes: ScopeGroup = {
  application: "OpenID",
  scopes: [
    { value: "openid", description: "Sign users in and receive an ID token." },
    { value: "profile", description: "Read the user's name and picture." },
    { value: "email", description: "Read the user's email address." },
    {
      value: "offline_access",
      description: "Receive refresh tokens to keep users signed in.",
    },
  ],
};

export const scopeGroups: ScopeGroup[] = [
  openIdScopes,
  ...resourceServers
    .filter((server) => server.scopes.length > 0)
    .map((server) => ({
      application: server.name,
      scopes: server.scopes.map((scope) => ({
        value: scope.value,
        description: scope.displayMessage,
      })),
    }))
    .sort((a, b) => a.application.localeCompare(b.application)),
];
