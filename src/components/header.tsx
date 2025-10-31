"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Search } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/products", label: "All Products" },
    { href: "/about", label: "About Us" },
    { href: "/size-guide", label: "Size Guide" },
    { href: "/contact", label: "Contact" },
  ];

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      {(navItems || []).map((item) => {
        const isActive = pathname === item.href;
          
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-primary/80 text-sm font-medium",
              isActive
                ? "text-primary font-semibold"
                : "text-foreground/60"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Icons.logo className="h-6 w-auto text-foreground" />
        </Link>
        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavLinks />
        </div>
        <div className="flex md:hidden flex-1 justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <div className="p-4">
                <Link href="/" className="mb-6 flex items-center">
                    <Icons.logo className="h-6 w-auto text-foreground" />
                </Link>
                <NavLinks className="flex-col items-start space-y-4" />
               </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Link href="/products">
            <Button variant="ghost" size="icon" title="Search products">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
