import BackLink from "@/components/BackLink";
import ResourceServerForm from "@/components/ResourceServerForm";

export default function NewResourceServerPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-2">
      <BackLink
        href="/manage-oauth/resource-servers"
        destination="My Resource Servers"
      />
      <ResourceServerForm />
    </div>
  );
}
