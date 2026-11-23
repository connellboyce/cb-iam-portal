import BackLink from "@/components/BackLink";
import ClientForm from "@/components/ClientForm";
import { getScopeGroups } from "@/lib/scopes";

export default async function NewClientPage() {
  const scopeGroups = await getScopeGroups();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-2">
      <BackLink href="/manage-oauth/clients" destination="My Clients" />
      <ClientForm scopeGroups={scopeGroups} />
    </div>
  );
}
