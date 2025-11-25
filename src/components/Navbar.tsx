import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const navLinks = [
    { href: "/home-legacy", label: "Home 1" },
    { href: "/", label: "Home 2" },
    { href: "/home-design-3", label: "Home 3" },
    { href: "/home-design-4", label: "Home 4" },
    { href: "/packages", label: "Packages" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://harmless-tapir-303.convex.cloud/api/storage/8d973c32-f642-43f0-a24f-5d16720922c9" 
              alt="Inkless Is More" 
              width={80}
              height={80}
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain dark:hidden transition-all duration-300" 
            />
            <img 
              src="https://harmless-tapir-303.convex.cloud/api/storage/b9bbb6cf-b996-4939-b8fd-c60c94a19033" 
              alt="Inkless Is More" 
              width={80}
              height={80}
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain hidden dark:block transition-all duration-300" 
            />
            <span className="font-bold text-lg hidden sm:inline-block">Inkless Is More</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated && user?.role === "admin" && (
              <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
                <Link to="/admin">Admin</Link>
              </Button>
            )}
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link to="/packages">Book Now</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive(link.href) ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {isAuthenticated && user?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium text-muted-foreground hover:text-primary"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Button asChild className="w-full">
                    <Link to="/packages" onClick={() => setIsOpen(false)}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}