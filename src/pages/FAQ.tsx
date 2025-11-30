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
      answer: "Pricing starts from KSh 5,000 per session. We offer discounted multi-session packages: 2 Sessions for KSh 9,000 (Save KSh 1,000), 5 Sessions for KSh 20,000 (Save KSh 5,000), and Unlimited Sessions for KSh 35,000 (Big savings for multiple sessions).",
    },
    {
      question: "Does it hurt?",
      answer: "The sensation is similar to receiving a tattoo - a quick snapping feeling. Sessions are typically short, and numbing cream is available if needed. Most clients find it very tolerable.",
    },
    {
      question: "Will it leave scars?",
      answer: "No. Our advanced Picosecond laser technology targets ink particles without damaging surrounding skin tissue, making it completely scar-free when proper aftercare is followed.",
    },
    {
      question: "How long does complete removal take?",
      answer: "On average, it takes 3-12 sessions to completely remove a tattoo, with 4-week intervals between treatments. You'll see visible lightening after each session. The timeline varies by color, size, and skin type.",
    },
    {
      question: "Is it safe for all skin types?",
      answer: "Yes, our Picosecond laser is safe for all skin types. We adjust the laser settings based on your melanin levels to ensure optimal safety and effectiveness for your unique skin tone.",
    },
    {
      question: "Do eyebrow tattoos remove safely?",
      answer: "Yes, eyebrow tattoos can be safely removed. We use specialized settings and techniques specifically designed for sensitive areas around the eyes to ensure both safety and effectiveness.",
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

        {/* Contact CTA */}
        <section className="py-8 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="bg-[#FDB913] rounded-[2rem] p-6 md:p-12 text-center shadow-lg max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-neutral-950">Still Have Questions?</h2>
              <p className="text-neutral-900/80 mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-base">
                We're here to help! Get in touch with our team.
              </p>

              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-6 md:mb-8 text-neutral-950">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Two Rivers Mall, 1st Floor, Nairobi, Kenya</span>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-6 md:mb-8 text-neutral-950">
                 <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  <a href="tel:+254708901505" className="hover:underline text-sm md:text-base">+254 708 901 505</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  <a href="mailto:info@inklessismore.ke" className="hover:underline text-sm md:text-base">info@inklessismore.ke</a>
                </div>
              </div>

              <Button asChild size="lg" className="bg-[#2A2A2A] text-white hover:bg-black border-none rounded-full px-6 md:px-8 h-10 md:h-12 text-sm md:text-base font-semibold shadow-xl hover:scale-105 transition-transform">
                <Link to="/packages">
                  View Our Packages
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}