import type { ReactNode } from "react";

import { AppHeader } from "@/components/app-header";
import { Sidebar } from "@/components/sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppHeader />
      <div className="mx-auto flex w-full max-w-[1440px]">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
