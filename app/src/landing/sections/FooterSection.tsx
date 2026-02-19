import Link from "next/link";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Kademix. Computer training institute.
          </p>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/#programs"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Programs
            </Link>
            <Link
              href="/#activities"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Activities
            </Link>
            <Link
              href="/#testimonials"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="/#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
