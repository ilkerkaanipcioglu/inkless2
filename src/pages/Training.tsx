import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Award, BookOpen, Briefcase, Users } from "lucide-react";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

export default function Training() {
  const submitContact = useMutation(api.contacts.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    try {
      await submitContact({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
        type: "training",
      });
      toast.success("Thank you for your interest! We'll be in touch soon.");
      e.currentTarget.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  Become an Inkless Is More Ambassador
                </h1>
                <p className="text-lg text-muted-foreground">
                  Join the movement. Master the craft. Build your future.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    icon: BookOpen,
                    title: "Laser Science & Safety",
                    description: "Learn the fundamentals of Picosecond laser technology and safety protocols.",
                  },
                  {
                    icon: Users,
                    title: "Consultation & Aftercare",
                    description: "Master client communication and post-treatment care guidance.",
                  },
                  {
                    icon: Award,
                    title: "Tattoo Assessment",
                    description: "Understand ink types, colors, age, and how they affect removal.",
                  },
                  {
                    icon: Briefcase,
                    title: "Building Your Brand",
                    description: "Learn marketing strategies to grow your tattoo removal business.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full border-2">
                      <CardContent className="pt-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="mb-12">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Training Options</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Online Modules:</strong> Self-paced learning with video tutorials and assessments</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>In-Person Workshops:</strong> Hands-on training at our Nairobi facility</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Certification Program:</strong> Complete training with official certification</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    *Affiliate and referral features coming in Phase 2
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6">Express Your Interest</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" required />
                    </div>
                    <div>
                      <Label htmlFor="message">Tell us about your interest</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="What interests you about becoming an ambassador?"
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Interest"}
                    </Button>
                  </form>
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
