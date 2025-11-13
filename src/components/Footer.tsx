import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
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
                src="https://harmless-tapir-303.convex.cloud/api/storage/2645f8db-e50b-48c1-b891-e120118b0715" 
                alt="Inkless Is More" 
                className="h-16 w-16 object-contain brightness-100 dark:brightness-[1.4] contrast-125 dark:contrast-[1.8] dark:saturate-[1.2] transition-all duration-300" 
              />
              <span className="font-bold text-lg">Inkless Is More</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Kenya's trusted laser tattoo removal specialists, helping people rediscover their skin and confidence.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                <a href="https://www.facebook.com/inklessismore" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                <a href="https://www.instagram.com/inklessismore" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                <a href="https://www.tiktok.com/@inklessismore" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
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
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Two Rivers Mall, 1st Floor, Nairobi, Kenya</span>
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