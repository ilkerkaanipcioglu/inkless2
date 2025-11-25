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
  const [featureLoaded, setFeatureLoaded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section - Reduced Height */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-black overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {!heroLoaded && (
            <Skeleton className="w-full h-full bg-neutral-900" />
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="sr-only">
              Just Undo It.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light max-w-2xl mx-auto mt-[40vh] md:mt-0">
              Safe, scar-free laser tattoo removal in Nairobi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 h-12 bg-white text-black hover:bg-gray-200 rounded-full">
                <Link to="/book?package=consultation-only">
                  Book Free Consultation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 h-12 border-white text-white hover:bg-white/10 rounded-full bg-transparent">
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl max-h-[500px]"
            >
              {!featureLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full" />
              )}
              <img 
                src="https://harmless-tapir-303.convex.cloud/api/storage/0671de72-a8a6-4ecf-ad85-ab15da925141" 
                alt="Laser Treatment" 
                onLoad={() => setFeatureLoaded(true)}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-700",
                  featureLoaded ? "opacity-100" : "opacity-0"
                )}
              />
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Inkless Is More</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that your skin is your best accessory. Our advanced Picosecond laser technology safely shatters ink particles, allowing your body to naturally eliminate them.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">Minimal discomfort & downtime</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">Effective on all ink colors</span>
                </li>
                <li className="flex items-center gap-3">
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