export interface ResourceServerScope {
  id: string;
  value: string;
  displayMessage: string;
}

export interface ResourceServer {
  id: string;
  name: string;
  description: string;
  scopes: ResourceServerScope[];
}

export const resourceServers: ResourceServer[] = [
  {
    id: "billing-api",
    name: "Billing API",
    description: "Invoices, payments, and subscription data.",
    scopes: [
      {
        id: "invoices-read",
        value: "urn:cb:scope:billing:invoices#read",
        displayMessage: "View invoices and payment history.",
      },
      {
        id: "invoices-write",
        value: "urn:cb:scope:billing:invoices#write",
        displayMessage: "Create and update invoices.",
      },
    ],
  },
  {
    id: "minecraft-server",
    name: "Minecraft Server",
    description: "Controls for the community Minecraft server.",
    scopes: [
      {
        id: "server-state-read",
        value: "urn:cb:scope:minecraft:server:state#read",
        displayMessage: "View whether the server is running.",
      },
      {
        id: "server-state-write",
        value: "urn:cb:scope:minecraft:server:state#write",
        displayMessage: "Start, stop, and restart the server.",
      },
      {
        id: "players-read",
        value: "urn:cb:scope:minecraft:server:players#read",
        displayMessage: "View who is online.",
      },
    ],
  },
  {
    id: "reporting-api",
    name: "Reporting API",
    description: "Scheduled and on-demand usage reports.",
    scopes: [],
  },
  {
    id: "user-directory",
    name: "User Directory",
    description: "Profiles and group membership for signed-in users.",
    scopes: [
      {
        id: "users-read",
        value: "urn:cb:scope:directory:users#read",
        displayMessage: "Look up user profiles.",
      },
      {
        id: "groups-read",
        value: "urn:cb:scope:directory:groups#read",
        displayMessage: "View group membership.",
      },
    ],
  },
];

export function getResourceServer(id: string) {
  return resourceServers.find((server) => server.id === id);
}

export function getScope(serverId: string, scopeId: string) {
  return getResourceServer(serverId)?.scopes.find(
    (scope) => scope.id === scopeId,
  );
}

export function scopeParams() {
  return resourceServers.flatMap((server) =>
    server.scopes.map((scope) => ({ id: server.id, scopeId: scope.id })),
  );
}
