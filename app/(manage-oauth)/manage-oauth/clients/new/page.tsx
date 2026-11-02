import BackLink from "@/components/BackLink";
import ClientForm from "@/components/ClientForm";

export default function NewClientPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-2">
      <BackLink href="/manage-oauth/clients" destination="My Clients" />
      <ClientForm />
    </div>
  );
}
