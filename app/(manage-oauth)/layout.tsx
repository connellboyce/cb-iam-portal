import { type ReactNode, Suspense } from "react";
import Button from "@/components/Button";
import Callout from "@/components/Callout";
import { getCurrentUser } from "@/lib/user";

// The authhub management API only serves users with the Developer role
async function DeveloperGate({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (user.roles.includes("developer")) return children;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-3xl font-bold">
        <span className="text-brand">OAuth</span> Portal
      </h1>
      <Callout>
        You need the Developer role to manage OAuth clients and resource
        servers.
      </Callout>
      <Button href="/access/request/developer" className="sm:self-start">
        Request Developer Role
      </Button>
    </div>
  );
}

export default function ManageOAuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex-1 px-8 py-10 md:px-16 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <Suspense>
          <DeveloperGate>{children}</DeveloperGate>
        </Suspense>
      </div>
    </main>
  );
}
