import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { DollarSign, Share2, Users, TrendingUp } from "lucide-react";
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
                  Share our services, help others discover clear skin, and earn commission on every referral.
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
                    title: "Competitive Commission",
                    description: "Earn attractive commissions for every successful referral that books our services.",
                  },
                  {
                    icon: Users,
                    title: "Build Your Network",
                    description: "Connect with people seeking tattoo removal and help them start their transformation journey.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Track Your Success",
                    description: "Access your personalized dashboard to monitor referrals, bookings, and earnings in real-time.",
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
                  <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">1.</span>
                      <span><strong>Sign Up:</strong> Join our ambassador program and receive your unique referral link</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">2.</span>
                      <span><strong>Share:</strong> Promote Inkless Is More through social media, word of mouth, or your network</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">3.</span>
                      <span><strong>Earn:</strong> Get paid commission when your referrals book and complete their sessions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary font-bold">4.</span>
                      <span><strong>Grow:</strong> Build your income as you help more people discover our services</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    *Ambassador program features and commission tracking dashboard coming soon
                  </p>
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
                      <Label htmlFor="message">Tell us why you'd be a great ambassador</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Share your network size, social media presence, or why you're passionate about helping others..."
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