"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { GraduationCap, Menu, LayoutDashboard } from "lucide-react";
import { AdminLogoutButton } from "./AdminLogoutButton";

const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/students", label: "Students", icon: GraduationCap },
];

export function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground hover:opacity-90 transition-opacity"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">Kademix</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <AdminLogoutButton />
            </div>
            <div className="flex md:hidden items-center gap-1">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t py-4 flex flex-col gap-2">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 flex-wrap">
              <Button
                variant="outline"
                size="default"
                asChild
                className="flex-1"
              >
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  Go to site
                </Link>
              </Button>
              <div className="flex-1 min-w-[100px]">
                <AdminLogoutButton
                  onTriggerClick={() => setMenuOpen(false)}
                  alwaysShowLabel
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
