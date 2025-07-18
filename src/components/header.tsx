"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const navItems = [
    { href: "/products", label: "All Products" },
    { href: "/products?category=traditional", label: "Traditional" },
    { href: "/products?category=casual", label: "Casual" },
    { href: "/about", label: "About Us" },
    { href: "/size-guide", label: "Size Guide" },
    { href: "/contact", label: "Contact" },
  ];

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-primary/80 text-sm font-medium",
            pathname === item.href || (item.href.includes('?') && pathname === item.href.split('?')[0] && typeof window !== 'undefined' && window.location.search === '?' + item.href.split('?')[1])
              ? "text-primary font-semibold"
              : "text-foreground/60"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
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
      </div>
    </header>
  );
}
