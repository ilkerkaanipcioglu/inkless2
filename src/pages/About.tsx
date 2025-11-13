import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Heart, MapPin, Mail, Phone, Shield, Sparkles, Users, Target } from "lucide-react";

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
                Kenya's premier laser tattoo removal specialists, helping people rediscover their skin and confidence.
              </p>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
                <p className="text-muted-foreground mb-6">
                  At Inkless Is More, we are Kenya's premier tattoo removal clinic specializing in advanced Picosecond laser technology. We're focused on safety, comfort, and delivering complete tattoo removal in a non-judgmental, friendly environment for all clients.
                </p>
                <p className="text-muted-foreground mb-8">
                  Whether you're looking to remove an old tattoo, fade ink for a cover-up, or simply reclaim your natural skin, we're here to help you every step of the way with personalized care and professionalism.
                </p>
              </div>

              <div className="mb-12">
                <Card className="border-2 bg-gradient-to-br from-primary/10 to-accent/10">
                  <CardContent className="pt-6 space-y-4">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-primary" />
                      Our Story
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Inkless Is More was founded to provide safe, affordable tattoo removal in Kenya. Our clinic was developed from expertise in skin health and laser technology, designed to offer second chances and new beginnings to everyone who walks through our doors.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We believe that everyone deserves a fresh start, and we're committed to making that possible through cutting-edge technology and compassionate care.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Our Vision & Values</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Award,
                      title: "Quality",
                      description: "Highest-grade Picosecond laser systems delivering the best results with top safety standards.",
                    },
                    {
                      icon: Shield,
                      title: "Integrity",
                      description: "Transparent pricing with no hidden fees. Realistic expectations and honest guidance.",
                    },
                    {
                      icon: Heart,
                      title: "Care",
                      description: "Personalized treatment plans for each client. Calm, supportive experience from consultation to final session.",
                    },
                  ].map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full text-center border-2 hover:border-primary transition-colors">
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
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">What Makes Us Different</h2>
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start space-x-3">
                        <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Specialized Laser Technicians</h3>
                          <p className="text-sm text-muted-foreground">
                            Our team of certified specialists brings expertise and precision to every treatment.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Target className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Tailored Treatment Plans</h3>
                          <p className="text-sm text-muted-foreground">
                            Each tattoo's color, depth, and age is carefully assessed for customized treatment.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Industry-Leading Technology</h3>
                          <p className="text-sm text-muted-foreground">
                            Advanced Picosecond laser technology with the highest safety standards.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Compassionate Approach</h3>
                          <p className="text-sm text-muted-foreground">
                            We support you throughout the entire removal journey with empathy and understanding.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary text-primary-foreground mb-12 border-2">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Our Promise</h2>
                  <p className="text-lg opacity-90 mb-4">
                    We promise to deliver a comfortable, judgment-free, and effective experience. Tattoo removal is personal, and we guide you with expertise, empathy, and precision.
                  </p>
                  <p className="text-lg opacity-90">
                    Your journey to clear skin starts with a conversation, and we're here to listen. We'll guide you step-by-step with detailed aftercare and support every session of the way.
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