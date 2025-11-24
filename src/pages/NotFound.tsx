import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/packages">View Packages</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}