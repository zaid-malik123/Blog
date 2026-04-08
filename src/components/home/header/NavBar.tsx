"use client";
import Link from "next/link";
import { Button } from "../../ui/button";
import SearchInput from "./SearchInput";
import ToggleMode from "./ToggleMode";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Byte
              </span>
              <span className="text-foreground">Code</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/articles" className="nav-link">
              Articles
            </Link>
            <Link href="/tutorials" className="nav-link">
              Tutorials
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <SearchInput />
            <ToggleMode />

            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Sign Up</Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 space-y-4 border-t">
          {/* Search Bar (Mobile) */}
          <div className="px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 w-full focus-visible:ring-1"
              />
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-2 px-4">
            <Link
              href="/articles"
              className="block px-3 py-2 text-base font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              href="/tutorials"
              className="block px-3 py-2 text-base font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tutorials
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-base font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Auth Buttons */}

          <div className="px-4 flex flex-col gap-2">
            <Button variant="outline" className="w-full">
              Login
            </Button>

            <Button className="w-full">Sign up</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
