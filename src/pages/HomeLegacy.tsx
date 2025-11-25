import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomeLegacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-black overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://harmless-tapir-303.convex.cloud/api/storage/0c8b2cc6-828d-4c76-a0b0-df3484525a74" 
            alt="Just Undo It - Inkless Is More"
            className="w-full h-full object-cover object-center opacity-90"
          />
          {/* Gradient Overlay for text readability if needed, though the image is dark */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-24 md:pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 hidden">
              JUST UNDO IT.
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light max-w-lg">
              Nairobi's Premier Laser Tattoo Removal. <br/>
              Safe. Precise. Scar-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 h-14 bg-white text-black hover:bg-gray-200 border-none rounded-full">
                <Link to="/book?package=consultation-only">
                  Book Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 h-14 border-white text-white hover:bg-white/10 rounded-full bg-transparent">
                <Link to="/packages">
                  View Packages
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition - Simplified */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Advanced Technology</h3>
              <p className="text-muted-foreground">
                We use state-of-the-art Picosecond lasers that shatter ink particles without damaging your skin.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Safe & Scar-Free</h3>
              <p className="text-muted-foreground">
                Our protocols ensure complete removal while preserving your skin's natural texture and health.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Visible Results</h3>
              <p className="text-muted-foreground">
                See fading after your very first session. We customize every treatment plan for your specific tattoo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Real Results</h2>
              <p className="text-muted-foreground">See the transformation for yourself.</p>
            </div>
            <Button asChild variant="ghost" className="group">
              <Link to="/gallery">
                View Full Gallery <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img src="/assets/Brown_Minimalist_Skincare_Before_After_Collage_Instagram_Post.jpg" alt="Tattoo removal result" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img src="/assets/Eyebrow_Tattoo_Removal_Inkless.jpeg" alt="Eyebrow tattoo removal" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img src="/assets/gallery_neck.jpg" alt="Neck tattoo removal" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img src="/assets/gallery_hand.png" alt="Hand tattoo removal" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <section className="py-24 bg-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Undo It?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Start your journey to clear skin today. Consultations are free and informative.
          </p>
          <Button asChild size="lg" className="text-lg px-10 h-16 bg-white text-black hover:bg-gray-200 rounded-full">
            <Link to="/book?package=consultation-only">
              Get Your Free Consultation
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}