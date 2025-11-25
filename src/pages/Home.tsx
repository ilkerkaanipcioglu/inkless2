import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section - Full Height */}
      <section className="relative h-[90vh] w-full bg-black overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://harmless-tapir-303.convex.cloud/api/storage/0c8b2cc6-828d-4c76-a0b0-df3484525a74" 
            alt="Just Undo It"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase">
              Just Undo It.
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-2xl mx-auto">
              Safe, scar-free laser tattoo removal in Nairobi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-10 h-14 bg-white text-black hover:bg-gray-200 rounded-full">
                <Link to="/book?package=consultation-only">
                  Book Free Consultation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-10 h-14 border-white text-white hover:bg-white/10 rounded-full bg-transparent">
                <Link to="/packages">
                  View Packages
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simplified Features / About */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <img 
                src="https://harmless-tapir-303.convex.cloud/api/storage/0671de72-a8a6-4ecf-ad85-ab15da925141" 
                alt="Laser Treatment" 
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]"
              />
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Inkless Is More</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that your skin is your best accessory. Our advanced Picosecond laser technology safely shatters ink particles, allowing your body to naturally eliminate them.
              </p>
              <ul className="space-y-4 mb-8">
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