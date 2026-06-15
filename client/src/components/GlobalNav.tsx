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
    { label: "Artist", path: "/artist" },
    { label: "BATHSHEBA", path: "/bathsheba" },
    { label: "Mixtape", path: "/mixtape" },
    { label: "New Genesis", path: "/new-genesis" },
    { label: "ABCs", path: "/abcs" },
    { label: "CLARITY", path: "/clarity" },
    { label: "Store", path: "/store" },
    { label: "Connect", path: "/connect" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-40 hidden md:block bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bebas tracking-widest text-zinc-100 hover:text-green-500 transition-colors"
          >
            MOSES SOG
          </Link>

          {/* Desktop Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-green-500"
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
      <nav className="sticky top-0 z-40 md:hidden bg-zinc-950 border-b border-zinc-800">
        <div className="px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bebas tracking-widest text-zinc-100"
          >
            MOSES
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-zinc-800 bg-zinc-900">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 text-base font-medium transition-colors min-h-12 flex items-center rounded ${
                    isActive(link.path)
                      ? "text-green-500 bg-zinc-800"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
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
