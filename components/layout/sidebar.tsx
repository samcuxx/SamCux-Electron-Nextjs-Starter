"use client";

import {
  Home,
  Settings,
  FileText,
  Users,
  BarChart3,
  Zap,
  Code,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Projects",
    icon: FileText,
    href: "/projects",
  },
  {
    title: "Components",
    icon: Code,
    href: "/components",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Team",
    icon: Users,
    href: "/team",
  },
  {
    title: "Integrations",
    icon: Zap,
    href: "/integrations",
  },
  {
    title: "Design System",
    icon: Palette,
    href: "/design",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("w-64 h-screen flex flex-col", className)}>
      <div className="flex-1 py-6 px-3">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className="w-full justify-start h-10 text-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              asChild
            >
              <a href={item.href} className="flex items-center space-x-3">
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.title}</span>
              </a>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}
