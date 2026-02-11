import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Menu, X, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const exploreLinks = [
    { name: "Data Science", href: "/courses?category=data-science" },
    { name: "Business", href: "/courses?category=business" },
    { name: "Computer Science", href: "/courses?category=cs" },
    { name: "Health", href: "/courses?category=health" },
    { name: "Arts & Humanities", href: "/courses?category=arts" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-nav">
      <nav className="container-coursera h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-coursera-blue">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:block">LearnAI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-coursera-blue transition-colors">
              Explore
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {exploreLinks.map((link) => (
                <DropdownMenuItem key={link.name} asChild>
                  <Link to={link.href}>{link.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="What do you want to learn?"
              className="w-full pl-10 h-10 border-border focus:border-coursera-blue"
            />
          </div>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/pricing" className="text-sm font-medium text-foreground hover:text-coursera-blue transition-colors">
            For Enterprise
          </Link>
          <Link to="/login">
            <Button variant="ghost" className="font-semibold text-coursera-blue hover:bg-coursera-blue-light">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-coursera-blue hover:bg-coursera-blue-hover font-semibold">
              Join for Free
            </Button>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <button
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bg-white border-b border-border transition-all duration-200 z-40",
          mobileMenuOpen ? "opacity-100 visible max-h-screen" : "opacity-0 invisible max-h-0"
        )}
      >
        <div className="container-coursera py-4 space-y-4">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="What do you want to learn?"
              className="w-full pl-10"
            />
          </div>

          {/* Mobile Links */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Explore</p>
            {exploreLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-2 text-sm font-medium text-foreground hover:text-coursera-blue"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <Link to="/pricing" className="block py-2 text-sm font-medium text-foreground">
              For Enterprise
            </Link>
            <Link to="/login" className="block">
              <Button variant="outline" className="w-full font-semibold">
                Log In
              </Button>
            </Link>
            <Link to="/signup" className="block">
              <Button className="w-full bg-coursera-blue hover:bg-coursera-blue-hover font-semibold">
                Join for Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
