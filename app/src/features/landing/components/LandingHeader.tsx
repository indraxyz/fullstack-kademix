"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { GraduationCap, Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/app/src/features/cart/useCart";

const navLinks = [
  { href: "/#programs", label: "Programs" },
  { href: "/#activities", label: "Activities" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
  { href: "/learn", label: "Learn" },
];

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items } = useCart();
  const cartCount = items.length;

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
            {navLinks.map((link) => (
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
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/cart" aria-label="Cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
              </Button>

              <Button size="sm" asChild>
                <Link href="/students-register">Register</Link>
              </Button>
              <ThemeToggle />
            </div>
            <div className="flex md:hidden items-center gap-1">
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/cart" aria-label="Cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 flex-wrap">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="gap-1"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Cart {cartCount > 0 ? `(${cartCount})` : ""}
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link href="/admin-login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button size="sm" asChild className="flex-1">
                <Link
                  href="/students-register"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
