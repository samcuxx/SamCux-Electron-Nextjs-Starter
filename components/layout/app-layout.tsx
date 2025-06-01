"use client";

import { Titlebar } from "@/components/layout/titlebar";
import { Sidebar } from "@/components/layout/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Titlebar />
        <main className="flex-1 overflow-auto bg-background">
          <div className="h-full p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
