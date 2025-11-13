import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Heart, Shield, Sparkles, Target } from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Tattoos Don't Have to Be <span className="text-primary">Forever</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rediscover your skin with Kenya's most advanced Picosecond laser technology. Safe, precise, and completely scar-free. Your new beginning starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link to="/packages">
                  View Our Packages <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link to="#how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How Laser Tattoo Removal Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Picosecond laser technology removes tattoos safely and effectively through a precise, natural process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[
              {
                icon: Target,
                title: "Target",
                description: "The laser energy bypasses the top skin layer and targets large ink particles deep in the dermis without damaging surrounding tissue.",
              },
              {
                icon: Sparkles,
                title: "Shatter",
                description: "The ink absorbs the laser light and breaks into microscopic fragments that are small enough for your body to process.",
              },
              {
                icon: Shield,
                title: "Remove",
                description: "Your immune system naturally flushes out the shattered ink particles over time, progressively lightening your tattoo.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full border-2 hover:border-primary transition-colors">
                  <CardContent className="pt-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="border-2 bg-muted/30">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-xl font-semibold text-center mb-4">What to Expect</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Multiple sessions required:</strong> Usually 5 to 12 depending on tattoo size, color, age, and location</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Progressive results:</strong> Each session lightens the tattoo without damaging surrounding skin</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Safe & non-invasive:</strong> No burning, no cutting, no surgical techniques used</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Works on all tattoos:</strong> Suitable for both professional and amateur tattoos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* NEW SECTION: Understanding Tattoo Ink */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Understanding Tattoo Ink
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The science behind why some tattoos fade faster than others
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-2">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Natural Fading Over Time
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Tattoos naturally fade over decades as your body's immune system slowly removes smaller ink particles. However, the majority of tattoo ink particles are too large for your body to eliminate on its own.
                  </p>
                  <p className="text-muted-foreground">
                    This is where laser treatment becomes essential—it breaks down these large particles into fragments small enough for your body's natural removal process to work effectively.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    How Different Colors Respond
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-black mt-1 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold">Black Ink</p>
                        <p className="text-sm text-muted-foreground">
                          The easiest to remove. Black absorbs all laser wavelengths, making it highly responsive to treatment.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-blue-600 mt-1 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold">Blue & Green Ink</p>
                        <p className="text-sm text-muted-foreground">
                          Require adjusted laser settings and typically need more sessions due to their specific light absorption properties.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 mt-1 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold">Multicolored Tattoos</p>
                        <p className="text-sm text-muted-foreground">
                          Each color responds differently to laser wavelengths, requiring customized treatment plans and additional sessions for complete removal.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2 bg-primary/5">
                <CardContent className="pt-6">
                  <p className="text-center text-sm">
                    <strong>Our Picosecond laser technology</strong> can be precisely adjusted to target different ink colors, ensuring safe and effective removal regardless of your tattoo's complexity.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Affects Your Removal */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Key Factors That Affect Removal
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each tattoo is unique. Here are the factors that influence your treatment timeline and results:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Lifestyle Choices",
                description: "Staying hydrated, avoiding alcohol, and protecting your skin from sun exposure significantly improve healing and results between sessions.",
              },
              {
                title: "Skin Type",
                description: "Your melanin levels affect laser settings and treatment approach. We customize each session to your unique skin type for optimal safety and effectiveness.",
              },
              {
                title: "Tattoo Age",
                description: "Older tattoos fade faster as ink naturally breaks down over time, making them easier to remove with fewer sessions.",
              },
              {
                title: "Tattoo Location",
                description: "Tattoos closer to the heart fade faster due to better blood circulation, which helps your body flush out fragmented ink particles more efficiently.",
              },
              {
                title: "Ink Colors",
                description: "Black and dark colors respond best to treatment. Blue, green, and multicolored tattoos require adjusted laser settings and typically need more sessions.",
              },
              {
                title: "Tattoo Size & Density",
                description: "Larger tattoos and those with dense ink saturation require more sessions, as there's simply more ink for your body to process and eliminate.",
              },
            ].map((factor, index) => (
              <motion.div
                key={factor.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-primary transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2 text-lg">{factor.title}</h3>
                        <p className="text-sm text-muted-foreground">{factor.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Results */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Real People. Real Results.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              See the transformation after just a few sessions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-8"
          >
            <img
              src="https://harmless-tapir-303.convex.cloud/api/storage/08647076-bb2b-45e1-a230-3adf8c90a821"
              alt="Before and After 3 Sessions"
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/gallery">
                View Full Gallery <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from people who've experienced the transformation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah M.",
                image: "/assets/Gabriel_s_Testimonial.jpg",
                rating: 5,
                text: "I was skeptical at first, but after 6 sessions, my tattoo is completely gone! The team was professional, and the process was painless. Highly recommend!",
                location: "Nairobi"
              },
              {
                name: "James K.",
                image: "/assets/1111__1_.jpg",
                rating: 5,
                text: "Best decision I ever made. The Picosecond laser technology really works. No scars, just clear skin. Thank you Inkless Is More!",
                location: "Westlands"
              },
              {
                name: "Grace W.",
                image: "/assets/AA99C17D-3B23-40B0-84E3-901869B56057_480x480.jpg",
                rating: 5,
                text: "Amazing results after just 4 sessions! The staff explained everything clearly and made me feel comfortable throughout the entire process.",
                location: "Karen"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:shadow-xl transition-all duration-300">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto object-cover border-4 border-primary/20 shadow-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23ddd" width="80" height="80" rx="40"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3E' + testimonial.name.charAt(0) + '%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                    <div className="flex justify-center gap-0.5 sm:gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-yellow-400 drop-shadow-md"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground italic mb-4 leading-relaxed px-2">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t pt-4 mt-4">
                      <p className="font-semibold text-base sm:text-lg">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                        <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {testimonial.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Heart className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready for a Clean Slate?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Let's plan your journey to clear, ink-free skin.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/packages">
                Get Your Free Consultation Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}