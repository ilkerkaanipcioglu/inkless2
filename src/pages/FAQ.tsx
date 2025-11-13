import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useQuery } from "convex/react";
import { Link } from "react-router";

export default function FAQ() {
  const faqs = useQuery(api.faqs.list);

  const defaultFAQs = [
    {
      question: "How does laser tattoo removal work?",
      answer: "Our Picosecond laser emits ultra-short bursts of energy that break down ink particles into microscopic fragments. Your body's immune system then naturally eliminates these fragments over time, gradually fading your tattoo.",
    },
    {
      question: "How much does it cost?",
      answer: "Pricing starts from KSh 4,500 per session. We offer discounted multi-session packages ranging from KSh 10,000 to KSh 25,000. The exact cost depends on the size, color, and complexity of your tattoo.",
    },
    {
      question: "Does it hurt?",
      answer: "The sensation is similar to getting a tattoo - a quick snapping feeling. Sessions are typically short, and numbing cream is available if needed. Most clients find it very tolerable.",
    },
    {
      question: "Will it leave scars?",
      answer: "No. Our advanced Picosecond laser technology targets ink particles without damaging surrounding skin tissue, making it completely scar-free when proper aftercare is followed.",
    },
    {
      question: "How long does complete removal take?",
      answer: "Most tattoos require 5-12 sessions for complete removal, spaced 4-6 weeks apart. Factors like tattoo age, ink colors, location, and your immune system affect the timeline.",
    },
    {
      question: "Where are you located?",
      answer: "We're located at Two Rivers Mall, 1st Floor, Nairobi, Kenya. You can reach us at +254 708 901 505 or info@inklessismore.ke",
    },
  ];

  const displayFAQs = faqs && faqs.length > 0 ? faqs : defaultFAQs;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  Frequently Asked Questions
                </h1>
                <p className="text-lg text-muted-foreground">
                  Everything you need to know about laser tattoo removal
                </p>
              </div>

              <Card className="mb-12 border-2 shadow-xl backdrop-blur-sm bg-card/95">
                <CardContent className="pt-8 pb-6 px-6 md:px-8">
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {displayFAQs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`item-${index}`}
                        className="border-b-2 last:border-b-0 hover:bg-primary/5 rounded-lg px-4 transition-colors"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground shadow-2xl border-2 border-primary">
                <CardContent className="pt-8 pb-8 px-6 md:px-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Still Have Questions?</h2>
                  <p className="text-center mb-6 opacity-90 text-base md:text-lg">
                    We're here to help! Get in touch with our team.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-center space-x-3 text-sm md:text-base">
                      <MapPin className="h-5 w-5 flex-shrink-0" />
                      <span>Two Rivers Mall, 1st Floor, Nairobi, Kenya</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-sm md:text-base">
                      <Phone className="h-5 w-5 flex-shrink-0" />
                      <a href="tel:+254708901505" className="hover:underline font-medium">+254 708 901 505</a>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-sm md:text-base">
                      <Mail className="h-5 w-5 flex-shrink-0" />
                      <a href="mailto:info@inklessismore.ke" className="hover:underline font-medium">info@inklessismore.ke</a>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button asChild variant="secondary" size="lg" className="font-semibold shadow-lg hover:shadow-xl transition-all">
                      <Link to="/packages">View Our Packages</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}