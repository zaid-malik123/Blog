import Link from "next/link";
import { Button } from "../../ui/button";
import SearchInput from "./SearchInput";
import ToggleMode from "./ToggleMode";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex h-16 items-center justify-between">
          
          {/* LEFT - Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Byte
              </span>
              <span className="text-foreground">Code</span>
            </span>
          </Link>

          {/* CENTER - Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/articles" className="nav-link">Articles</Link>
            <Link href="/tutorials" className="nav-link">Tutorials</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
          </div>

          {/* RIGHT - Actions */}
          <div className="flex items-center gap-4">
            <SearchInput />
            <ToggleMode />

            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Sign Up</Button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;