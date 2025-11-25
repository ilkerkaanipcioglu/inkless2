import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero Section - Reduced Height */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-background dark:bg-black overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {!heroLoaded && (
            <Skeleton className="w-full h-full bg-muted" />
          )}
          <img 
            src="https://harmless-tapir-303.convex.cloud/api/storage/064ce72b-b70d-4359-8497-f37c4409994d" 
            alt="Just Undo It"
            onLoad={() => setHeroLoaded(true)}
            className={cn(
              "w-full h-full object-cover opacity-80 transition-opacity duration-1000",
              heroLoaded ? "opacity-80" : "opacity-0"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/90 dark:from-black/60 dark:via-transparent dark:to-black/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-foreground dark:text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Just Undo It.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground dark:text-gray-200 mb-8 font-light max-w-2xl mx-auto">
              Safe, scar-free laser tattoo removal in Nairobi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-full">
                <Link to="/book?package=consultation-only">
                  Book Free Consultation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 h-12 border-foreground/20 text-foreground hover:bg-foreground/5 dark:border-white dark:text-white dark:hover:bg-white/10 rounded-full bg-transparent">
                <Link to="/packages">
                  View Packages
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simplified Features / About - Reduced Padding */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Inkless Is More</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We believe that your skin is your best accessory. Our advanced Picosecond laser technology safely shatters ink particles, allowing your body to naturally eliminate them.
              </p>
              <ul className="flex flex-wrap justify-center gap-6 mb-8">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">Minimal discomfort & downtime</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">Effective on all ink colors</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">Safe for all skin types</span>
                </li>
              </ul>
              <Button asChild variant="link" className="p-0 text-lg">
                <Link to="/about" className="flex items-center gap-2">
                  Learn more about our process <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      <Footer />
    </div>
  );
}