"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { AuthhubError } from "@/lib/authhub";
import {
  type ClientInput,
  createClient,
  deleteClient,
  updateClient,
} from "@/lib/clients";
import {
  createResourceServer,
  createScope,
  deleteResourceServer,
  deleteScope,
  updateResourceServer,
} from "@/lib/resource-servers";

export interface ActionState {
  error?: string;
}

export interface ClientActionState extends ActionState {
  /** Set once a new client is registered; shown to the user exactly once */
  created?: { clientId: string; secret: string };
}

// Turns API errors into a message for the form; anything else (including the
// redirect thrown for an invalid token) propagates
async function attempt(run: () => Promise<unknown>): Promise<ActionState> {
  try {
    await run();
    return {};
  } catch (e) {
    if (e instanceof AuthhubError) return { error: e.message };
    throw e;
  }
}

const text = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

const list = (formData: FormData, key: string) =>
  formData
    .getAll(key)
    .map((value) => String(value).trim())
    .filter(Boolean);

function clientInput(formData: FormData): ClientInput {
  const grants = list(formData, "grants");
  return {
    clientId: text(formData, "clientId") || undefined,
    name: text(formData, "name"),
    grants,
    // The redirect URI inputs are only rendered for the authorization code grant
    redirectUris: grants.includes("authorization_code")
      ? list(formData, "redirectUris")
      : [],
    scopes: list(formData, "scopes"),
  };
}

export async function saveClient(
  clientId: string | undefined,
  _state: ClientActionState,
  formData: FormData,
): Promise<ClientActionState> {
  const input = clientInput(formData);

  if (!clientId) {
    let created: ClientActionState["created"];
    const result = await attempt(async () => {
      const { client, secret } = await createClient(input);
      created = { clientId: client.clientId, secret };
    });
    return created ? { created } : result;
  }

  const result = await attempt(() => updateClient(clientId, input));
  if (result.error) return result;
  redirect(`/manage-oauth/clients/${encodeURIComponent(clientId)}`);
}

export async function deleteClientAction(clientId: string) {
  const result = await attempt(() => deleteClient(clientId));
  if (!result.error) refresh();
  return result;
}

export async function saveResourceServer(
  id: string | undefined,
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const input = {
    name: text(formData, "name"),
    description: text(formData, "description"),
  };

  let savedId = id;
  const result = await attempt(async () => {
    savedId = id
      ? (await updateResourceServer(id, input)).id
      : (await createResourceServer(input)).id;
  });
  if (result.error || !savedId) return result;
  redirect(`/manage-oauth/resource-servers/${encodeURIComponent(savedId)}`);
}

export async function deleteResourceServerAction(id: string) {
  const result = await attempt(() => deleteResourceServer(id));
  if (!result.error) refresh();
  return result;
}

export async function createScopeAction(
  serverId: string,
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const result = await attempt(() =>
    createScope(serverId, text(formData, "scope")),
  );
  if (result.error) return result;
  redirect(`/manage-oauth/resource-servers/${encodeURIComponent(serverId)}`);
}

export async function deleteScopeAction(serverId: string, scopeId: string) {
  const result = await attempt(() => deleteScope(serverId, scopeId));
  if (!result.error) refresh();
  return result;
}
