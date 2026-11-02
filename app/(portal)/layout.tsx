import Sidebar from "@/components/Sidebar";

export default function PortalLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex-1 px-8 py-10 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:gap-12">
        <Sidebar />
        <section className="flex-1">{children}</section>
      </div>
    </main>
  );
}
