import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { AIFloatingButton } from "@/components/ai/AIFloatingButton";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-[260px]">
        <TopBar title={title} subtitle={subtitle} />
        <main className="flex-1">
          {children}
        </main>
      </div>
      <AIFloatingButton />
    </div>
  );
}
