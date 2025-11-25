import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you for subscribing to our newsletter!");
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img 
                src="https://harmless-tapir-303.convex.cloud/api/storage/3a0cc6c8-2026-4e31-a67c-013dc2ce5644" 
                alt="Inkless Is More" 
                width={64}
                height={64}
                loading="lazy"
                className="h-16 w-16 object-contain dark:hidden transition-all duration-300" 
              />
              <img 
                src="https://harmless-tapir-303.convex.cloud/api/storage/ba49a31b-21d8-4178-9c33-6a76d199fbb6" 
                alt="Inkless Is More" 
                width={64}
                height={64}
                loading="lazy"
                className="h-16 w-16 object-contain hidden dark:block transition-all duration-300" 
              />
              <span className="font-bold text-lg">Inkless Is More</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Kenya's trusted laser tattoo removal specialists, helping people rediscover their skin and confidence.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                <a href="https://www.facebook.com/share/1Fpjgbt6dm/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                <a href="https://www.instagram.com/inklessismore_?igsh=MWl4ZDR4ODZ3bDZjcQ==" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                <a href="https://www.tiktok.com/@inkless_is_more_?_t=ZM-8wtKsaOIx4o&_r=1" target="_blank" rel="noopener noreferrer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/training" className="text-sm text-muted-foreground hover:text-primary transition-colors">Ambassador Program</Link></li>
              <li><Link to="/bookings" className="text-sm text-muted-foreground hover:text-primary transition-colors">My Bookings</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span>Two Rivers Mall, 1st Floor, Nairobi, Kenya</span>
                  <a 
                    href="https://maps.app.goo.gl/bSozKVB9tNeVrYnr6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors underline mt-1"
                  >
                    Get Directions
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+254708901505" className="hover:text-primary transition-colors">+254 708 901 505</a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@inklessismore.ke" className="hover:text-primary transition-colors">info@inklessismore.ke</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for tips, updates, and special offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input type="email" placeholder="Your email" required className="h-10" />
              <Button type="submit" className="w-full" size="sm">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Inkless Is More. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}