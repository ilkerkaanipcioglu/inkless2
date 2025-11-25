import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Badge } from "@/components/ui/badge";

export default function HomeDesign3() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <Navbar />

      {/* Hero Section - Split Layout */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <Badge variant="outline" className="mb-6 px-4 py-1 text-sm border-primary/30 text-primary bg-primary/5">
                #1 Laser Tattoo Removal in Nairobi
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-neutral-900 dark:text-white mb-6 leading-[1.1]">
                Rewrite Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-pink-600">
                  Skin's Story.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed font-light">
                Advanced Picosecond technology for safe, effective, and scar-free tattoo removal. Transform your skin with precision and care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                  <Link to="/book?package=consultation-only">
                    Book Free Consultation
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-muted/50">
                  <Link to="/gallery">
                    View Results
                  </Link>
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>FDA Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Safe for All Skin Types</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10" />
                <img 
                  src="https://harmless-tapir-303.convex.cloud/api/storage/064ce72b-b70d-4359-8497-f37c4409994d" 
                  alt="Laser Tattoo Removal" 
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Card */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl z-20"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Visible Fading</p>
                      <p className="text-sm text-muted-foreground">Results often seen after just one session</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section - Clean Cards */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Simple, transparent, and effective. We guide you through every step of the removal process.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "We analyze your tattoo and skin type to create a personalized treatment plan."
              },
              {
                step: "02",
                title: "Treatment",
                desc: "Our Picosecond laser breaks down ink particles into tiny fragments safely."
              },
              {
                step: "03",
                title: "Healing",
                desc: "Your body's immune system naturally flushes out the ink particles over time."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-8 rounded-2xl border hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-6xl font-bold text-muted/20 mb-6 group-hover:text-primary/30 transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to clear the canvas?</h2>
              <p className="text-primary-foreground/80 text-lg mb-10">
                Book your free consultation today and take the first step towards your new look.
              </p>
              <Button asChild size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full font-semibold">
                <Link to="/book?package=consultation-only">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}