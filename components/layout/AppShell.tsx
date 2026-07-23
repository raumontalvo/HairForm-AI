import type { ReactNode } from "react";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import MobileNav from "./MobileNav";

type AppShellProps = {
  children: ReactNode;
  title?: string;
};

export default function AppShell({
  children,
  title,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <AppHeader title={title} />

      <div className="flex">
        <AppSidebar />

        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-6 py-8 pb-24 lg:px-8 lg:pb-10">
            {children}
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}