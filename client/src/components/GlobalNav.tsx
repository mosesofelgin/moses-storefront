import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function GlobalNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Archive", path: "/projects" },
    { label: "CLARITY", path: "/clarity-sales" },
    { label: "Artist / EPK", path: "/artist" },
    { label: "Store", path: "/store" },
    { label: "Connect", path: "/connect" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-40 hidden border-b border-amber-200/10 bg-zinc-950/90 backdrop-blur-xl md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-bebas text-xl tracking-[0.14em] text-zinc-100 transition-colors hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            MOSES SOG
          </Link>

          {/* Desktop Links */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs font-medium uppercase tracking-[0.12em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                  isActive(link.path)
                    ? "text-amber-300"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="sticky top-0 z-40 border-b border-amber-200/10 bg-zinc-950/95 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex min-h-11 items-center font-bebas text-lg tracking-[0.16em] text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            MOSES
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-12 w-12 items-center justify-center text-zinc-400 transition-colors hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-amber-200/10 bg-zinc-950">
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex min-h-12 items-center rounded px-4 py-3 font-bebas text-lg tracking-[0.12em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                    isActive(link.path)
                      ? "bg-amber-400 text-zinc-950"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-amber-200"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
