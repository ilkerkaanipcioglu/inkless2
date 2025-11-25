import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sun, Droplets, Target, Zap, Sparkles, Star, Quote } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function HomeDesign4() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white selection:bg-yellow-500/30">
      <Navbar />

      {/* Hero Section - Inspired by Image 1 */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16 bg-white dark:bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://harmless-tapir-303.convex.cloud/api/storage/064ce72b-b70d-4359-8497-f37c4409994d" 
            alt="Just Undo It" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black dark:via-transparent dark:to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl lg:col-start-2"
          >
            <div className="mb-6 inline-block">
              <img 
                src="https://harmless-tapir-303.convex.cloud/api/storage/b9bbb6cf-b996-4939-b8fd-c60c94a19033" 
                alt="Inkless Is More" 
                className="h-24 w-auto object-contain"
              />
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8 uppercase text-black dark:text-white">
              Just <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">Undo</span> <br />
              It.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-10 max-w-md font-light border-l-4 border-yellow-400 pl-6 leading-relaxed">
              Nairobi's Premier Laser Tattoo Removal. <br />
              <span className="text-yellow-600 dark:text-yellow-300 font-semibold">Safe. Precise. Scar-free.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 rounded-none px-8 h-14 text-lg font-bold tracking-wide">
                <Link to="/book?package=consultation-only">
                  BOOK CONSULTATION
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-none px-8 h-14 text-lg tracking-wide">
                <Link to="/gallery">
                  VIEW RESULTS
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Factors Section - Inspired by Image 2 */}
      <section className="py-24 bg-gray-50 dark:bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">Key Factors That Affect Removal</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Each tattoo is unique. Here are the factors that influence your treatment timeline and results:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-900/50 border border-gray-200 dark:border-neutral-800 p-8 rounded-3xl hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-1 group"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                  <Droplets className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">Lifestyle Choices</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Staying hydrated, avoiding alcohol, and protecting your skin from sun exposure significantly improve healing and results between sessions.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-neutral-900/50 border border-gray-200 dark:border-neutral-800 p-8 rounded-3xl hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-1 group"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                  <Sun className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">Skin Type</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Your melanin levels affect laser settings and treatment approach. We customize each session to your unique skin type for optimal safety.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section - Inspired by Image 4 */}
      <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">The Science of Removal</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Picosecond laser technology removes tattoos safely and effectively through a precise, natural process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Target",
                desc: "The laser energy bypasses the top skin layer and targets large ink particles deep in the dermis without damaging surrounding tissue."
              },
              {
                icon: Zap,
                title: "Shatter",
                desc: "The ink absorbs the laser light and shatters into tiny, dust-like fragments instantly due to the photo-acoustic effect."
              },
              {
                icon: Sparkles,
                title: "Eliminate",
                desc: "Your body's immune system naturally flushes out these tiny ink particles over the coming weeks, fading the tattoo."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-neutral-900 rounded-[2rem] p-8 text-center border border-gray-200 dark:border-neutral-800 relative group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gray-100 dark:bg-neutral-950 border border-yellow-500/20 flex items-center justify-center group-hover:border-yellow-500 transition-colors">
                  <step.icon className="w-10 h-10 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Inspired by Image 3 */}
      <section className="py-24 bg-gray-50 dark:bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-400">Don't just take our word for it.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Faith",
                text: "The pain is nothing compared to getting a new tattoo.",
                initial: "F"
              },
              {
                name: "Stephen",
                text: "It feels good to see my tattoo fading away after each treatment.",
                initial: "S"
              },
              {
                name: "Gabriel",
                text: "The service is great. Trustful, fast and very professional.",
                initial: "G"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div key={star} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: star * 0.1 }}>
                      <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    </motion.div>
                  ))}
                </div>
                <Quote className="w-10 h-10 text-neutral-700 mb-4" />
                <p className="text-xl font-medium mb-8 text-gray-200">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 font-bold text-lg">
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-gray-500">Verified Client</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}