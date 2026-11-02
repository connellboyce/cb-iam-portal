export const grantTypes = [
  { value: "authorization_code", label: "Authorization Code" },
  { value: "client_credentials", label: "Client Credentials" },
  { value: "refresh_token", label: "Refresh Token" },
];

export interface Client {
  id: string;
  name: string;
  clientId: string;
  description: string;
  active: boolean;
  grants: string[];
  redirectUris: string[];
  scopes: string[];
}

export const clients: Client[] = [
  {
    id: "billing-dashboard",
    name: "Billing Dashboard",
    clientId: "cb_9f2a7c1e4b8d",
    description: "Internal dashboard for reviewing invoices and payments.",
    active: true,
    grants: ["authorization_code", "refresh_token"],
    redirectUris: ["https://billing.connellboyce.com/callback"],
    scopes: ["openid", "profile", "urn:cb:scope:billing:invoices#read"],
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    clientId: "cb_3d6e0a9b2f71",
    description: "Sign-in for the iOS and Android apps.",
    active: true,
    grants: ["authorization_code", "refresh_token"],
    redirectUris: ["https://app.connellboyce.com/auth/callback"],
    scopes: ["openid", "profile", "email", "offline_access"],
  },
  {
    id: "legacy-reporting",
    name: "Legacy Reporting",
    clientId: "cb_71c4e8d05a3f",
    description: "Nightly report generator, scheduled for retirement.",
    active: false,
    grants: ["client_credentials"],
    redirectUris: [],
    scopes: ["urn:cb:scope:billing:invoices#read"],
  },
];

export function getClient(id: string) {
  return clients.find((client) => client.id === id);
}

export function getScopeConsumers(scope: string) {
  return clients.filter((client) => client.scopes.includes(scope));
}
