import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Heart, MapPin, Mail, Phone, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-center">
                About Inkless Is More
              </h1>
              <p className="text-lg text-muted-foreground text-center mb-12">
                Kenya's trusted laser tattoo removal specialists, helping people rediscover their skin and confidence.
              </p>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
                <p className="text-muted-foreground mb-6">
                  At Inkless Is More, we believe that everyone deserves a fresh start. Whether you're looking to remove an old tattoo, fade ink for a cover-up, or simply reclaim your natural skin, we're here to help you every step of the way.
                </p>
                <p className="text-muted-foreground mb-8">
                  Using Kenya's most advanced Picosecond laser technology, we provide safe, precise, and completely scar-free tattoo removal services. Our team of certified specialists is dedicated to delivering exceptional results with care and professionalism.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: Award,
                    title: "Quality",
                    description: "Advanced Picosecond laser systems with top safety standards.",
                  },
                  {
                    icon: Shield,
                    title: "Integrity",
                    description: "Transparent pricing and realistic expectations.",
                  },
                  {
                    icon: Heart,
                    title: "Care",
                    description: "Calm, supportive experience from consultation to final session.",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full text-center border-2">
                      <CardContent className="pt-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                          <value.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="bg-primary text-primary-foreground mb-12">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Our Promise</h2>
                  <p className="text-lg opacity-90">
                    Tattoo removal is personal. We guide you with expertise, empathy, and precision. Your journey to clear skin starts with a conversation, and we're here to listen.
                  </p>
                </CardContent>
              </Card>

              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">Location</p>
                          <p className="text-muted-foreground">Two Rivers Mall, 1st Floor, Nairobi, Kenya</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">Phone</p>
                          <a href="tel:+254708901505" className="text-muted-foreground hover:text-primary">
                            +254 708 901 505
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">Email</p>
                          <a href="mailto:info@inklessismore.ke" className="text-muted-foreground hover:text-primary">
                            info@inklessismore.ke
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
