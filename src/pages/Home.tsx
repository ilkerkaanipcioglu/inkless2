import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, Sun, Target, Zap, Sparkles, Star, Quote, CheckCircle2, Tag } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [testimonialActiveIndex, setTestimonialActiveIndex] = useState(0);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);

  const processSteps = [
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
  ];

  const packages = [
    {
      title: "Single Session",
      price: "KSh 5,000",
      original: null,
      desc: "Perfect for trying out the service or final touch-ups.",
      image: "https://www.inklessismore.ke/cdn/shop/files/Single_Session.jpg?v=1763724288&width=533"
    },
    {
      title: "2 Sessions (Small)",
      price: "KSh 9,000",
      original: "KSh 15,000",
      desc: "Ideal for small tattoos. Save KSh 6,000.",
      image: "https://www.inklessismore.ke/cdn/shop/files/2_Sessions_3948d9a6-f510-4678-b0fe-21d017bcd5dd.jpg?v=1763727082&width=533"
    },
    {
      title: "5 Sessions (Medium)",
      price: "KSh 20,000",
      original: "KSh 25,000",
      desc: "Comprehensive package for medium tattoos.",
      image: "https://www.inklessismore.ke/cdn/shop/files/5_Sessions.jpg?v=1763724687&width=533"
    },
    {
      title: "Laser Scar Removal",
      price: "KSh 15,000",
      original: "KSh 50,000",
      desc: "Advanced scar reduction therapy.",
      image: "https://www.inklessismore.ke/cdn/shop/files/Laser_Scar_Removal_Package.jpg?v=1753974281&width=533"
    }
  ];

  const testimonials = [
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
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPosition = container.scrollLeft;
      const itemWidth = container.clientWidth; // Approximate for full width items or calculate based on child
      // For more precision with multiple items visible, we can find the center element
      const center = scrollPosition + container.clientWidth / 2;
      
      let closestIndex = 0;
      let minDistance = Number.MAX_VALUE;

      Array.from(container.children).forEach((child, index) => {
        const childCenter = (child as HTMLElement).offsetLeft + (child as HTMLElement).offsetWidth / 2;
        const distance = Math.abs(center - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    }
  };

  const handleTestimonialScroll = () => {
    if (testimonialScrollRef.current) {
      const container = testimonialScrollRef.current;
      const scrollPosition = container.scrollLeft;
      const center = scrollPosition + container.clientWidth / 2;
      
      let closestIndex = 0;
      let minDistance = Number.MAX_VALUE;

      Array.from(container.children).forEach((child, index) => {
        const childCenter = (child as HTMLElement).offsetLeft + (child as HTMLElement).offsetWidth / 2;
        const distance = Math.abs(center - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setTestimonialActiveIndex(closestIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const child = container.children[index] as HTMLElement;
      if (child) {
        // Center the item
        const scrollLeft = child.offsetLeft - (container.clientWidth - child.offsetWidth) / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToTestimonial = (index: number) => {
    if (testimonialScrollRef.current) {
      const container = testimonialScrollRef.current;
      const child = container.children[index] as HTMLElement;
      if (child) {
        const scrollLeft = child.offsetLeft - (container.clientWidth - child.offsetWidth) / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      {/* Hero Section - Redesigned: Clean, Typographic, No Banner Image */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16 bg-background">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,var(--primary)/10,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-10 w-24 h-24 border border-primary/20 rounded-full opacity-20 animate-bounce duration-[3000ms]" />
          <div className="absolute bottom-1/3 right-10 w-32 h-32 border border-foreground/10 rounded-full opacity-20 animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8 flex justify-center">
              <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/30 bg-primary/5 text-primary rounded-full">
                <Sparkles className="w-3 h-3 mr-2" />
                Kenya's Laser Tattoo Removal Experts
              </Badge>
            </div>

            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8 uppercase text-foreground">
              Just <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
                Undo
              </span> <br />
              It.
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Uncover flawless skin. We combine advanced Picosecond technology with negative cold therapy to fade or remove unwanted tattoos safely and comfortably.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 h-14 text-lg font-bold tracking-wide w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1">
                <Link to="/book?package=consultation-only">
                  Book Free Consultation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-foreground/10 text-foreground hover:bg-foreground/5 rounded-full px-10 h-14 text-lg tracking-wide w-full sm:w-auto hover:-translate-y-1 transition-transform">
                <Link to="/gallery">
                  View Results <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Safe", sub: "For All Skin Types" },
                { label: "Fast", sub: "Fewer Sessions" },
                { label: "Precise", sub: "Picosecond Tech" },
                { label: "Scar-Free", sub: "Skin Integrity" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <CheckCircle2 className="w-6 h-6 text-primary mb-2" />
                  <span className="font-bold text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Factors Section - Refined */}
      <section className="py-24 bg-muted/30 dark:bg-neutral-950/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Key Factors That Affect Removal</h2>
            <p className="text-muted-foreground text-lg">
              Each tattoo is unique. Here are the factors that influence your treatment timeline and results:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background border border-border p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Droplets className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">Lifestyle Choices</h3>
                  <p className="text-muted-foreground leading-relaxed">
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
              className="bg-background border border-border p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Sun className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">Skin Type</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Your melanin levels affect laser settings and treatment approach. We customize each session to your unique skin type for optimal safety.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section - Refined */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">The Science of Removal</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We use advanced Picosecond laser technology combined with negative cold therapy to remove tattoos safely, effectively, and with minimal discomfort.
            </p>
          </div>

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="min-w-[85vw] md:min-w-[350px] flex-1 snap-center bg-muted/20 rounded-[2rem] p-8 text-center border border-border relative group hover:-translate-y-2 transition-transform duration-300 hover:bg-muted/40"
              >
                <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-background border border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors shadow-sm">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-4">
            {processSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex 
                    ? "bg-primary w-8" 
                    : "bg-primary/20 w-2 hover:bg-primary/40"
                }`}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Packages Section */}
      <section className="py-24 bg-muted/30 dark:bg-neutral-950/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Exclusive Offers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start your journey with our special packages designed for every need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col"
              >
                <div className="aspect-square relative overflow-hidden bg-muted">
                  {pkg.image && (
                    <img 
                      src={pkg.image} 
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{pkg.desc}</p>
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-primary">{pkg.price}</span>
                      {pkg.original && (
                        <span className="text-sm text-muted-foreground line-through">{pkg.original}</span>
                      )}
                    </div>
                    <Button asChild className="w-full rounded-full" variant={pkg.original ? "default" : "outline"}>
                      <Link to="/book">Book Now</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <Button asChild variant="link" className="text-primary text-lg">
                <Link to="/packages">View All Packages <ArrowRight className="ml-2 w-4 h-4" /></Link>
             </Button>
          </div>
        </div>
      </section>

      {/* Testimonials - Refined */}
      <section className="py-24 bg-muted/30 dark:bg-neutral-950/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground">Don't just take our word for it.</p>
          </div>

          <div 
            ref={testimonialScrollRef}
            onScroll={handleTestimonialScroll}
            className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[85vw] md:min-w-[350px] flex-1 snap-center bg-background p-8 rounded-3xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div key={star} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: star * 0.1 }}>
                      <Star className="w-5 h-5 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </div>
                <Quote className="w-10 h-10 text-muted-foreground/20 mb-4" />
                <p className="text-xl font-medium mb-8 text-foreground">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">Verified Client</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center gap-3 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === testimonialActiveIndex 
                    ? "bg-primary w-8" 
                    : "bg-primary/20 w-2 hover:bg-primary/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - "Ready to clear the canvas?" */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[3rem] bg-[#FDB913] overflow-hidden px-6 py-16 md:py-24 text-center shadow-2xl">
            {/* Background Pattern/Curve */}
            <div className="absolute inset-0 pointer-events-none">
               <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[140%] h-[80%] bg-white/10 rounded-[100%] blur-sm" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-neutral-950 mb-3 md:mb-5 tracking-tight">
                Ready to Break Up with Your Ink?
              </h2>
              <p className="text-base md:text-lg text-neutral-900/80 mb-6 md:mb-8 font-medium max-w-xl mx-auto">
                Get a <span className="font-black text-neutral-950">50% OFF VOUCHER</span> to help you start your journey now. Book your free consultation today.
              </p>
              <Button asChild size="lg" className="bg-[#2A2A2A] text-white hover:bg-black border-none rounded-full px-8 md:px-10 h-12 md:h-14 text-base md:text-base font-semibold shadow-xl hover:scale-105 transition-transform w-full sm:w-auto">
                <Link to="/book?package=consultation-only">
                  Get Started Now <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}