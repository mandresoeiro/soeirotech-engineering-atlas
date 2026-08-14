import type { ReactNode } from "react";

import { AppHeader } from "@/components/app-header";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
