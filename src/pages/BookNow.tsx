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
import { Calendar, Clock, MapPin, Phone, User, Mail, MessageSquare } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

export default function BookNow() {
  const packages = useQuery(api.packages.list);
  const submitBooking = useMutation(api.contacts.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const packageInfo = selectedPackage ? `Package: ${selectedPackage}` : "";
    const additionalInfo = formData.message;
    const fullMessage = packageInfo + (additionalInfo ? `\n\nAdditional Information:\n${additionalInfo}` : "");

    try {
      await submitBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: fullMessage,
        type: "booking",
      });
      toast.success("Booking request submitted! We'll contact you shortly to confirm your appointment.");
      setFormData({ name: "", email: "", phone: "", message: "" });
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
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-16">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
                >
                  Book Your <span className="text-primary">Transformation</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-muted-foreground max-w-3xl mx-auto"
                >
                  Take the first step towards clear, ink-free skin. Your journey to confidence starts here.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    icon: Calendar,
                    title: "Flexible Scheduling",
                    description: "Choose a time that works perfectly for your lifestyle",
                  },
                  {
                    icon: Clock,
                    title: "Quick Response",
                    description: "We'll confirm your appointment within 24 hours",
                  },
                  {
                    icon: MapPin,
                    title: "Premium Location",
                    description: "Two Rivers Mall, Nairobi - Easy to find and access",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full text-center border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                      <CardContent className="pt-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                          <item.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-2 shadow-xl">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-3xl mb-2">Reserve Your Spot</CardTitle>
                    <CardDescription className="text-lg">
                      Fill in your details and we'll get back to you to confirm your consultation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-base font-medium flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Full Name *
                          </Label>
                          <Input 
                            id="name" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required 
                            placeholder="John Doe" 
                            className="h-12 text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-base font-medium flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number *
                          </Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            required 
                            placeholder="+254 700 000 000" 
                            className="h-12 text-base"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address *
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required 
                          placeholder="john@example.com" 
                          className="h-12 text-base"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="package" className="text-base font-medium">
                          Select Package (Optional)
                        </Label>
                        <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                          <SelectTrigger id="package" className="h-12 text-base">
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

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-base font-medium flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Tell us about your tattoo (Optional)
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Size, location, colors, age of tattoo, or any questions you have..."
                          rows={4}
                          className="text-base resize-none"
                        />
                      </div>

                      <div className="bg-muted/50 p-6 rounded-xl border">
                        <h4 className="font-semibold mb-3 flex items-center text-lg">
                          <Phone className="h-5 w-5 mr-2" />
                          Prefer to call us directly?
                        </h4>
                        <p className="text-muted-foreground mb-3">
                          Our friendly team is ready to answer your questions:
                        </p>
                        <a 
                          href="tel:+254708901505" 
                          className="text-primary font-semibold text-lg hover:underline inline-flex items-center gap-2"
                        >
                          <Phone className="h-5 w-5" />
                          +254 708 901 505
                        </a>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-14 text-lg font-semibold" 
                        size="lg" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        By submitting this form, you agree to be contacted by Inkless Is More regarding your appointment.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}