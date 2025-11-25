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

      {/* Hero Section - Creative Typographic Layout */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[100px] animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center pt-12 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="mb-6 md:mb-8 px-4 md:px-6 py-2 text-sm md:text-base border-primary/30 text-primary bg-primary/5 backdrop-blur-sm">
                #1 Laser Tattoo Removal in Nairobi
              </Badge>
              
              <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-foreground mb-6 md:mb-8 leading-[0.9]">
                Just <br className="md:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient">Undo</span> <br className="md:hidden" />
                It.
              </h1>
              
              <p className="text-lg md:text-3xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-light px-2">
                Advanced Picosecond technology for safe, effective, and scar-free tattoo removal. Transform your skin with precision and care.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-12 md:mb-16 w-full sm:w-auto">
                <Button asChild size="lg" className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 w-full sm:w-auto">
                  <Link to="/book?package=consultation-only">
                    Book Free Consultation
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl rounded-full border-2 hover:bg-muted/50 transition-all hover:scale-105 w-full sm:w-auto">
                  <Link to="/gallery">
                    View Results
                  </Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 md:gap-12 text-sm md:text-base font-medium text-muted-foreground">
                <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-5 py-3 rounded-full border shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>FDA Approved</span>
                </div>
                <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-5 py-3 rounded-full border shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Safe for All Skin Types</span>
                </div>
                <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-5 py-3 rounded-full border shadow-sm">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Minimal Discomfort</span>
                </div>
              </div>
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