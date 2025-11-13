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
    { href: "/packages", label: "Packages" },
    { href: "/gallery", label: "Gallery" },
    { href: "/faq", label: "FAQ" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://harmless-tapir-303.convex.cloud/api/storage/2645f8db-e50b-48c1-b891-e120118b0715" 
              alt="Inkless Is More" 
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain brightness-100 dark:brightness-110 contrast-125 dark:contrast-150" 
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