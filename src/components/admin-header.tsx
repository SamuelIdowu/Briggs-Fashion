"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="hidden md:block">
        {/* Placeholder for breadcrumbs or title */}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Exit Admin</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
