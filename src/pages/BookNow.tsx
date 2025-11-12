import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, User, Mail, MessageSquare, CalendarIcon } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function BookNow() {
  const packages = useQuery(api.packages.list);
  const submitBooking = useMutation(api.contacts.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [sessions, setSessions] = useState<Array<{ date?: Date; time: string }>>([{ time: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const packageInfo = selectedPackage ? `Package: ${selectedPackage}` : "Package: To be determined during consultation";
    
    const sessionsInfo = sessions
      .filter(s => s.date || s.time)
      .map((s, i) => {
        const dateStr = s.date ? format(s.date, "PPP") : "TBD";
        const timeStr = s.time || "TBD";
        return `Session ${i + 1}: ${dateStr} at ${timeStr}`;
      })
      .join("\n");

    const schedulingNote = sessions.every(s => !s.date && !s.time) 
      ? "\n\nScheduling: Client prefers to schedule during consultation"
      : sessionsInfo ? `\n\nPreferred Schedule:\n${sessionsInfo}` : "";

    const additionalInfo = formData.message;
    const fullMessage = packageInfo + schedulingNote + (additionalInfo ? `\n\nAdditional Information:\n${additionalInfo}` : "");

    const selectedPkg = packages?.find(p => p.title === selectedPackage);
    
    try {
      await submitBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: fullMessage,
        type: "booking",
        packageId: selectedPkg?._id,
        sessions: sessions.map(s => ({
          date: s.date ? format(s.date, "yyyy-MM-dd") : undefined,
          time: s.time || undefined,
        })),
      });
      toast.success("Booking request submitted! We'll contact you shortly to confirm your appointment.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedPackage("");
      setSessions([{ time: "" }]);
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

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-medium flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            Schedule Sessions (Optional)
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Schedule your sessions now or decide during your free consultation
                        </p>

                        {sessions.map((session, index) => (
                          <div key={index} className="p-4 border-2 rounded-lg space-y-3 bg-muted/20">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold">Session {index + 1}</span>
                              {sessions.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSessions(sessions.filter((_, i) => i !== index))}
                                  className="h-8 text-xs"
                                >
                                  Remove
                                </Button>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className={cn(
                                      "w-full h-10 justify-start text-left font-normal text-sm",
                                      !session.date && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {session.date ? format(session.date, "MMM d") : "Date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={session.date}
                                    onSelect={(date) => {
                                      const newSessions = [...sessions];
                                      newSessions[index].date = date;
                                      setSessions(newSessions);
                                    }}
                                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>

                              <Select
                                value={session.time}
                                onValueChange={(time) => {
                                  const newSessions = [...sessions];
                                  newSessions[index].time = time;
                                  setSessions(newSessions);
                                }}
                              >
                                <SelectTrigger className="h-10 text-sm">
                                  <SelectValue placeholder="Time" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px]">
                                  {timeSlots.map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setSessions([...sessions, { time: "" }])}
                          className="w-full"
                        >
                          + Add Another Session
                        </Button>
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

                      <div className="bg-primary/5 p-6 rounded-xl border-2 border-primary/20">
                        <div className="text-center mb-4">
                          <p className="text-lg font-bold mb-2">✓ Free Consultation</p>
                          <p className="text-sm text-muted-foreground">No payment required now</p>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]" 
                        size="lg" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Reserve Your Free Consultation →"}
                      </Button>

                      <div className="bg-muted/50 p-6 rounded-xl border text-center">
                        <h4 className="font-semibold mb-3 flex items-center justify-center text-base">
                          <Phone className="h-5 w-5 mr-2" />
                          Prefer to call?
                        </h4>
                        <a 
                          href="tel:+254708901505" 
                          className="text-primary font-semibold text-lg hover:underline inline-flex items-center gap-2"
                        >
                          +254 708 901 505
                        </a>
                      </div>

                      <p className="text-xs text-center text-muted-foreground">
                        We'll contact you within 24 hours to confirm your appointment
                      </p>
=======
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