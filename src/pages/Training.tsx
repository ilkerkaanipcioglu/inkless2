import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { DollarSign, Share2, Users, TrendingUp, QrCode, BarChart3, Gift, Zap } from "lucide-react";
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
      toast.success("Thank you for your interest! We'll approve your application within 24 hours.");
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
                  Promote our services, help others discover clear skin, and earn commission on every referral.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    icon: Share2,
                    title: "Share & Earn",
                    description: "Promote our tattoo removal services through your unique referral link and earn commission on every booking.",
                  },
                  {
                    icon: DollarSign,
                    title: "Unlimited Earnings",
                    description: "Earn commission on every first session, with higher rates for packages. Monthly bonuses for top performers with no earning limits.",
                  },
                  {
                    icon: Users,
                    title: "Perfect for Everyone",
                    description: "Content creators, influencers, barbers, salon owners, tattoo artists, and anyone with a network or audience.",
                  },
                  {
                    icon: Zap,
                    title: "Fast Activation",
                    description: "Get approved within 24 hours and start earning immediately. Completely free to join with no hidden costs.",
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

              <Card className="mb-12 border-2 bg-gradient-to-br from-primary/10 to-accent/10">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6 text-center">Tools You'll Receive</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Share2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Personal Affiliate Link</p>
                        <p className="text-sm text-muted-foreground">Your unique tracking link for all referrals</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <QrCode className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">QR Code</p>
                        <p className="text-sm text-muted-foreground">For posters, shops, and online sharing</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <BarChart3 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Analytics Dashboard</p>
                        <p className="text-sm text-muted-foreground">Real-time tracking of your referrals and earnings</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Gift className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Custom Discount Code</p>
                        <p className="text-sm text-muted-foreground">Exclusive code for your audience</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-12">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6">Program Benefits</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">✓</span>
                      <span><strong>Completely free to join</strong> — No signup fees or hidden costs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">✓</span>
                      <span><strong>Fast onboarding</strong> — Get approved and activated within 24 hours</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">✓</span>
                      <span><strong>High customer satisfaction</strong> — Easy referrals with proven results</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">✓</span>
                      <span><strong>Branded content templates</strong> — Access videos, posters, and captions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">✓</span>
                      <span><strong>Commission on first sessions</strong> — Earn from every new client</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">✓</span>
                      <span><strong>Higher commission for packages</strong> — More earnings on 3, 5, and Unlimited packages</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">✓</span>
                      <span><strong>Monthly bonuses</strong> — Top performers receive additional rewards</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">✓</span>
                      <span><strong>No earning limits</strong> — The more you refer, the more you earn</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-12">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">How to Apply</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-primary font-bold text-xl">1.</span>
                      <div>
                        <p className="font-semibold">Submit Application Form</p>
                        <p className="text-sm text-muted-foreground">Fill out the form below with your name, phone, email, and social profiles</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-primary font-bold text-xl">2.</span>
                      <div>
                        <p className="font-semibold">Get Approved</p>
                        <p className="text-sm text-muted-foreground">We'll review and approve your application within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-primary font-bold text-xl">3.</span>
                      <div>
                        <p className="font-semibold">Receive Your Link & Start Earning</p>
                        <p className="text-sm text-muted-foreground">Get your affiliate link, QR code, and dashboard access to start earning immediately</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6">Join Our Ambassador Program</h2>
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
                      <Label htmlFor="message">Tell us about yourself</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Share your social media profiles, network size, audience type, or why you'd be a great ambassador..."
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Apply to Become an Ambassador"}
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