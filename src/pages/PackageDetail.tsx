import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Mail, Phone } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { Link, useParams } from "react-router";
import { useState } from "react";
import { toast } from "sonner";

export default function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const packageData = useQuery(
    api.packages.getById,
    id ? { id: id as Id<"packages"> } : "skip"
  );
  const submitBooking = useMutation(api.contacts.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        type: "booking",
      });
      toast.success("Booking request submitted! We'll contact you shortly.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (packageData === undefined) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">Loading package details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (packageData === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Package not found</p>
            <Button asChild>
              <Link to="/packages">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Packages
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-cyan-50/30 to-white dark:from-blue-950/20 dark:via-cyan-950/10 dark:to-background">
        <section className="py-16 min-h-screen">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto"
            >
              <Button asChild variant="ghost" className="mb-8 hover:bg-primary/10">
                <Link to="/packages">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Packages
                </Link>
              </Button>

              <div className="grid lg:grid-cols-5 gap-8 items-start">
                {/* Left Side - Package Details (3 columns) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-3"
                >
                  <Card className="border-2 shadow-2xl overflow-hidden backdrop-blur-xl bg-card/80">
                    <CardContent className="p-10">
                      <div className="mb-8">
                        {packageData.originalPrice && (
                          <Badge className="bg-primary text-primary-foreground mb-4 px-4 py-1.5 text-sm font-semibold">
                            ✨ POPULAR CHOICE
                          </Badge>
                        )}
                        <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
                          {packageData.title}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                          {packageData.description}
                        </p>
                      </div>

                      <div className="mb-10 p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border-2 border-primary/20">
                        <div className="flex items-baseline gap-3 mb-3">
                          {packageData.originalPrice && (
                            <span className="text-3xl text-muted-foreground line-through font-medium">
                              KSh {packageData.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-6xl font-bold text-primary">
                            KSh {packageData.price.toLocaleString()}
                          </span>
                        </div>
                        {packageData.originalPrice && (
                          <div className="inline-block bg-primary/20 px-4 py-2 rounded-lg">
                            <p className="text-base text-primary font-bold">
                              💰 Save KSh {(packageData.originalPrice - packageData.price).toLocaleString()}
                            </p>
                          </div>
                        )}
                        {packageData.sessions && (
                          <p className="text-base text-muted-foreground mt-4 font-medium">
                            📅 {packageData.sessions} {packageData.sessions === 1 ? "session" : "sessions"} included
                          </p>
                        )}
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-bold mb-6 flex items-center">
                            <CheckCircle className="h-7 w-7 text-primary mr-3" />
                            What's Included
                          </h3>
                          <ul className="space-y-4">
                            {packageData.features.map((feature, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.05 }}
                                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-colors"
                              >
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-base text-foreground font-medium">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {packageData.sessions && (
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-2xl border-2 border-primary/30">
                            <h3 className="font-bold text-lg mb-3 flex items-center">
                              <span className="text-2xl mr-2">⏱️</span>
                              Treatment Timeline
                            </h3>
                            <p className="text-base text-muted-foreground leading-relaxed">
                              {packageData.sessions} {packageData.sessions === 1 ? "session" : "sessions"}, spaced 4-6 weeks apart for optimal results. Each session builds on the last, gradually fading your tattoo safely and effectively.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Right Side - Booking Form (2 columns) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <div className="lg:sticky lg:top-24">
                    <Card className="border-2 shadow-2xl backdrop-blur-xl bg-card/90">
                      <CardHeader className="pb-6">
                        <CardTitle className="text-3xl font-bold">Book This Package</CardTitle>
                        <p className="text-muted-foreground text-base mt-2">Fill in your details to reserve your spot</p>
                      </CardHeader>
                      <CardContent className="px-8 pb-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-base font-semibold">Full Name *</Label>
                            <Input
                              id="name"
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                              placeholder="John Doe"
                              className="h-12 text-base border-2 focus:border-primary transition-all"
                              autoComplete="name"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-base font-semibold">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              placeholder="john@example.com"
                              className="h-12 text-base border-2 focus:border-primary transition-all"
                              autoComplete="email"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-base font-semibold">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              required
                              placeholder="+254 700 000 000"
                              className="h-12 text-base border-2 focus:border-primary transition-all"
                              autoComplete="tel"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="notes" className="text-base font-semibold">Additional Notes (Optional)</Label>
                            <Textarea
                              id="notes"
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Tell us about your tattoo: size, location, colors..."
                              rows={3}
                              className="resize-none text-base border-2 focus:border-primary transition-all"
                            />
                          </div>

                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <p className="text-sm text-center font-medium">
                              ✓ Free consultation included<br/>
                              ✓ No payment required now
                            </p>
                          </div>

                          <Button 
                            type="submit"
                            className="w-full font-bold py-6 text-lg h-auto shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Reserve Your Spot →"}
                          </Button>

                          <p className="text-xs text-center text-muted-foreground leading-relaxed">
                            We'll contact you within 24 hours to confirm your appointment
                          </p>
                        </form>

                        <div className="mt-8 pt-8 border-t-2 space-y-4">
                          <p className="text-base font-bold">Questions?</p>
                          <div className="space-y-3 text-base">
                            <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
                              <Phone className="h-5 w-5 flex-shrink-0" />
                              <a href="tel:+254708901505" className="font-medium">
                                +254 708 901 505
                              </a>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
                              <Mail className="h-5 w-5 flex-shrink-0" />
                              <a href="mailto:info@inklessismore.ke" className="font-medium">
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
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}