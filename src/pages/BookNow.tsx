import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

export default function BookNow() {
  const packages = useQuery(api.packages.list);
  const submitBooking = useMutation(api.contacts.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const packageInfo = selectedPackage ? `Package: ${selectedPackage}` : "";
    const additionalInfo = formData.get("message") as string;
    const fullMessage = packageInfo + (additionalInfo ? `\n\nAdditional Information:\n${additionalInfo}` : "");

    try {
      await submitBooking({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        message: fullMessage,
        type: "booking",
      });
      toast.success("Booking request submitted! We'll contact you shortly to confirm your appointment.");
      e.currentTarget.reset();
      setSelectedPackage("");
    } catch (error) {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const availablePackages = packages?.filter((pkg) => pkg.isAvailable) || [];

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
                  Book Your Appointment
                </h1>
                <p className="text-lg text-muted-foreground">
                  Take the first step towards clear, ink-free skin. Fill out the form below and we'll contact you to schedule your consultation.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: Calendar,
                    title: "Flexible Scheduling",
                    description: "Choose a time that works for you",
                  },
                  {
                    icon: Clock,
                    title: "Quick Response",
                    description: "We'll confirm within 24 hours",
                  },
                  {
                    icon: MapPin,
                    title: "Convenient Location",
                    description: "Two Rivers Mall, Nairobi",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="text-center border-2">
                      <CardContent className="pt-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Information</CardTitle>
                  <CardDescription>
                    Please provide your details and we'll get back to you to confirm your appointment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" name="name" required placeholder="John Doe" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" name="phone" type="tel" required placeholder="+254 700 000 000" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                    </div>

                    <div>
                      <Label htmlFor="package">Select Package (Optional)</Label>
                      <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                        <SelectTrigger id="package">
                          <SelectValue placeholder="Choose a package or discuss during consultation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation-only">Free Consultation Only</SelectItem>
                          {availablePackages.map((pkg) => (
                            <SelectItem key={pkg._id} value={pkg.title}>
                              {pkg.title} - KSh {pkg.price.toLocaleString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Additional Information (Optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your tattoo (size, location, colors) or any questions you have..."
                        rows={4}
                      />
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Prefer to call?
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        You can also reach us directly at:
                      </p>
                      <a href="tel:+254708901505" className="text-primary font-semibold hover:underline">
                        +254 708 901 505
                      </a>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By submitting this form, you agree to be contacted by Inkless Is More regarding your appointment.
                    </p>
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
