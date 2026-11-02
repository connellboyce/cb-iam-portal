import BackLink from "@/components/BackLink";

export default function GettingStartedPage() {
  return (
    <div className="flex flex-col gap-2">
      <BackLink href="/manage-oauth" destination="OAuth Portal" />
      <h2 className="text-2xl font-bold">Getting Started</h2>
    </div>
  );
}
