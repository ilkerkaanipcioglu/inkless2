import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Mail, Phone, CalendarIcon, Clock, User, MessageSquare } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { Link, useParams } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { LazyImage } from "@/components/LazyImage";

export default function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const packageData = useQuery(
    api.packages.getById,
    id ? { id: id as Id<"packages"> } : "skip"
  );
  const submitBooking = useMutation(api.contacts.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessions, setSessions] = useState<Array<{ date?: Date; time: string }>>([{ time: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const sessionsInfo = sessions
      .filter(s => s.date || s.time)
      .map((s, i) => {
        const sessionNum = packageData?.sessions && packageData.sessions > 1 ? ` ${i + 1}` : "";
        const dateStr = s.date ? format(s.date, "PPP") : "TBD";
        const timeStr = s.time || "TBD";
        return `Session${sessionNum}: ${dateStr} at ${timeStr}`;
      })
      .join("\n");

    const schedulingNote = sessions.every(s => !s.date && !s.time) 
      ? "\n\nScheduling: Client prefers to schedule during consultation"
      : sessionsInfo ? `\n\nPreferred Schedule:\n${sessionsInfo}` : "";

    const fullMessage = `Package: ${packageData?.title}${schedulingNote}${formData.message ? `\n\nAdditional Notes:\n${formData.message}` : ""}`;

    try {
      await submitBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: fullMessage,
        type: "booking",
        packageId: packageData?._id,
        sessions: sessions.map(s => ({
          date: s.date ? format(s.date, "yyyy-MM-dd") : undefined,
          time: s.time || undefined,
        })),
      });
      toast.success("Booking request submitted! We'll contact you shortly.");
      // Only clear form after successful submission
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSessions([{ time: "" }]);
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
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50/30 to-white dark:from-blue-950/20 dark:via-cyan-950/10 dark:to-background">
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-primary/20 rounded-lg mx-auto mb-4"></div>
              <div className="h-4 w-32 bg-muted rounded mx-auto"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (packageData === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50/30 to-white dark:from-blue-950/20 dark:via-cyan-950/10 dark:to-background">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-4">
                <span className="text-4xl">❌</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3">Package Not Found</h2>
            <p className="text-muted-foreground mb-6">The package you're looking for doesn't exist or has been removed.</p>
            <Button asChild size="lg" className="shadow-lg">
              <Link to="/packages">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse All Packages
              </Link>
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-cyan-50/30 to-white dark:from-blue-950/20 dark:via-cyan-950/10 dark:to-background">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto"
            >
              <Button asChild variant="ghost" className="mb-6 hover:bg-primary/10 hover:translate-x-[-4px] transition-all">
                <Link to="/packages">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Packages
                </Link>
              </Button>

              <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
                {/* Left Side - Package Details (3 columns) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-3"
                >
                  <Card className="border-2 shadow-2xl overflow-hidden backdrop-blur-xl bg-card/80 hover:shadow-3xl transition-shadow duration-500">
                    {packageData.imageUrl && (
                      <div className="relative w-full h-72 md:h-96 overflow-hidden group">
                        <LazyImage 
                          src={packageData.imageUrl} 
                          alt={packageData.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    )}
                    <CardContent className="p-6 md:p-10 space-y-8">
                      <div>
                        {packageData.originalPrice && (
                          <Badge className="bg-primary text-primary-foreground mb-4 px-4 py-1.5 text-sm font-semibold shadow-lg animate-pulse">
                            ✨ POPULAR CHOICE
                          </Badge>
                        )}
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                          {packageData.title}
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                          {packageData.description}
                        </p>
                      </div>

                      <div className="p-6 md:p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-2xl border-2 border-primary/30 shadow-inner">
                        <div className="flex flex-wrap items-baseline gap-3 mb-3">
                          {packageData.originalPrice && (
                            <span className="text-2xl md:text-3xl text-muted-foreground line-through font-medium">
                              KSh {packageData.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-5xl md:text-6xl font-bold text-primary drop-shadow-sm">
                            KSh {packageData.price.toLocaleString()}
                          </span>
                        </div>
                        {packageData.originalPrice && (
                          <div className="inline-block bg-primary/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                            <p className="text-sm md:text-base text-primary font-bold">
                              💰 Save KSh {(packageData.originalPrice - packageData.price).toLocaleString()}
                            </p>
                          </div>
                        )}
                        {packageData.sessions && (
                          <p className="text-sm md:text-base text-muted-foreground mt-4 font-medium flex items-center gap-2">
                            <span className="text-xl">📅</span>
                            {packageData.sessions} {packageData.sessions === 1 ? "session" : "sessions"} included
                          </p>
                        )}
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-3">
                            <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                            What's Included
                          </h3>
                          <ul className="space-y-3">
                            {packageData.features.map((feature, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.05 }}
                                className="flex items-start space-x-3 p-3 md:p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 hover:translate-x-1"
                              >
                                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm md:text-base text-foreground font-medium">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {packageData.sessions && (
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-5 md:p-6 rounded-2xl border-2 border-primary/30 shadow-lg">
                            <h3 className="font-bold text-base md:text-lg mb-3 flex items-center gap-2">
                              <span className="text-2xl">⏱️</span>
                              Treatment Timeline
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
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
                    <Card className="border-2 shadow-2xl backdrop-blur-xl bg-card/90 hover:shadow-3xl transition-shadow duration-500">
                      <CardHeader className="pb-5 border-b">
                        <CardTitle className="text-2xl md:text-3xl font-bold">Book This Package</CardTitle>
                        <p className="text-muted-foreground text-sm md:text-base mt-2">Fill in your details to reserve your spot</p>
                      </CardHeader>
                      <CardContent className="px-6 md:px-8 pb-8 pt-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-xl border-2 border-primary/30 mb-6 shadow-inner">
                            <p className="text-sm font-semibold text-center flex items-center justify-center gap-2">
                              <span className="text-lg">💡</span>
                              Ready to purchase this package?
                            </p>
                            <p className="text-xs text-muted-foreground text-center mt-2">
                              Fill out the form below. No payment needed now - we'll confirm details and arrange payment during your consultation.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm md:text-base font-semibold flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Full Name *
                            </Label>
                            <Input
                              id="name"
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              onFocus={(e) => e.target.select()}
                              required
                              placeholder="John Doe"
                              className="h-11 md:h-12 text-sm md:text-base border-2 focus:border-primary transition-all focus:scale-[1.01]"
                              autoComplete="name"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm md:text-base font-semibold flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              onFocus={(e) => e.target.select()}
                              required
                              placeholder="john@example.com"
                              className="h-11 md:h-12 text-sm md:text-base border-2 focus:border-primary transition-all focus:scale-[1.01]"
                              autoComplete="email"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm md:text-base font-semibold flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Phone Number *
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              onFocus={(e) => e.target.select()}
                              required
                              placeholder="+254 700 000 000"
                              className="h-11 md:h-12 text-sm md:text-base border-2 focus:border-primary transition-all focus:scale-[1.01]"
                              autoComplete="tel"
                            />
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm md:text-base font-semibold flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" />
                                Schedule Sessions (Optional)
                              </Label>
                              {packageData?.sessions && packageData.sessions > 1 && (
                                <span className="text-xs text-muted-foreground">
                                  {packageData.sessions} sessions needed
                                </span>
                              )}
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              You can schedule now or decide during your consultation
                            </p>

                            {sessions.map((session, index) => (
                              <div key={index} className="p-3 md:p-4 border-2 rounded-xl space-y-3 bg-muted/20 hover:bg-muted/30 transition-colors">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs md:text-sm font-semibold">
                                    {packageData?.sessions && packageData.sessions > 1 ? `Session ${index + 1}` : "Session"}
                                  </span>
                                  {sessions.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setSessions(sessions.filter((_, i) => i !== index))}
                                      className="h-7 text-xs hover:text-destructive"
                                    >
                                      Remove
                                    </Button>
                                  )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        className={cn(
                                          "w-full h-10 justify-start text-left font-normal text-xs md:text-sm",
                                          !session.date && "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {session.date ? format(session.date, "MMM d") : "Date"}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="center" side="bottom">
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
                                    <SelectTrigger className="h-10 text-xs md:text-sm">
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

                            {packageData?.sessions && sessions.length < packageData.sessions && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setSessions([...sessions, { time: "" }])}
                                className="w-full hover:bg-primary/10 hover:border-primary transition-all"
                              >
                                + Add Another Session
                              </Button>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="notes" className="text-sm md:text-base font-semibold flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Additional Notes (Optional)
                            </Label>
                            <Textarea
                              id="notes"
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              onFocus={(e) => e.target.select()}
                              placeholder="Tell us about your tattoo: size, location, colors..."
                              rows={3}
                              className="resize-none text-sm md:text-base border-2 focus:border-primary transition-all focus:scale-[1.01]"
                            />
                          </div>

                          <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 shadow-inner">
                            <p className="text-xs md:text-sm text-center font-medium space-y-1">
                              <span className="block">✓ Free consultation included</span>
                              <span className="block">✓ No payment required now</span>
                              <span className="block">✓ We'll discuss payment options during your visit</span>
                            </p>
                          </div>

                          <Button 
                            type="submit"
                            className="w-full font-bold py-5 md:py-6 text-base md:text-lg h-auto shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <span className="animate-spin">⏳</span>
                                Submitting...
                              </span>
                            ) : (
                              "Reserve Your Spot →"
                            )}
                          </Button>

                          <p className="text-xs text-center text-muted-foreground leading-relaxed">
                            We'll contact you within 24 hours to confirm your appointment
                          </p>
                        </form>

                        <div className="mt-8 pt-8 border-t-2 space-y-4">
                          <p className="text-sm md:text-base font-bold">Questions?</p>
                          <div className="space-y-3 text-sm md:text-base">
                            <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group">
                              <Phone className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                              <a href="tel:+254708901505" className="font-medium">
                                +254 708 901 505
                              </a>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group">
                              <Mail className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
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