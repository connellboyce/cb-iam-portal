export default function ManageOAuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex-1 px-8 py-10 md:px-16 lg:px-24">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}
