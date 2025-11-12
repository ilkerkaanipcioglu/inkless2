import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Mail, Phone } from "lucide-react";
import { useQuery } from "convex/react";
import { Link, useParams } from "react-router";
import { Label } from "@/components/ui/label";

export default function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const packageData = useQuery(
    api.packages.getById,
    id ? { id: id as Id<"packages"> } : "skip"
  );

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

      <div className="flex-1">
        <section className="py-12 bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-200 dark:from-blue-950/20 dark:to-background min-h-screen">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto"
            >
              <Button asChild variant="ghost" className="mb-8">
                <Link to="/packages">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Packages
                </Link>
              </Button>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left Side - Package Details */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="border-0 shadow-2xl overflow-hidden">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        {packageData.originalPrice && (
                          <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white mb-4">
                            ✨ POPULAR CHOICE
                          </Badge>
                        )}
                        <h1 className="text-4xl font-bold mb-4 leading-tight">
                          {packageData.title}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-6">
                          {packageData.description}
                        </p>
                      </div>

                      <div className="mb-8">
                        <div className="flex items-baseline gap-2 mb-2">
                          {packageData.originalPrice && (
                            <span className="text-2xl text-muted-foreground line-through">
                              KSh {packageData.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                            KSh {packageData.price.toLocaleString()}
                          </span>
                        </div>
                        {packageData.originalPrice && (
                          <p className="text-sm text-cyan-600 font-semibold">
                            Save KSh {(packageData.originalPrice - packageData.price).toLocaleString()}
                          </p>
                        )}
                        {packageData.sessions && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {packageData.sessions} {packageData.sessions === 1 ? "session" : "sessions"}
                          </p>
                        )}
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <CheckCircle className="h-6 w-6 text-cyan-500 mr-2" />
                            What's Included
                          </h3>
                          <ul className="space-y-3">
                            {packageData.features.map((feature, i) => (
                              <li key={i} className="flex items-start space-x-3">
                                <CheckCircle className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {packageData.sessions && (
                          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Treatment Timeline</h3>
                            <p className="text-sm text-muted-foreground">
                              {packageData.sessions} {packageData.sessions === 1 ? "session" : "sessions"}, spaced 4-6 weeks apart for optimal results.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Right Side - Booking Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="border-0 shadow-2xl sticky top-20">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold mb-2">Book This Package</h2>
                      <p className="text-muted-foreground mb-6">Fill in your details to reserve your spot</p>

                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                          <input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                          <input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                          <input
                            id="phone"
                            type="tel"
                            placeholder="+254 700 000 000"
                            className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="date" className="text-sm font-medium">Preferred Date/Time</Label>
                          <input
                            id="date"
                            type="text"
                            placeholder="e.g., Monday, Jan 15 at 2pm"
                            className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes" className="text-sm font-medium">Additional Notes</Label>
                          <textarea
                            id="notes"
                            placeholder="Any special requests or questions?"
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                          />
                        </div>

                        <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 rounded-full text-lg h-auto">
                          Book Now →
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                          By booking, you agree to our terms and conditions
                        </p>
                      </form>

                      <div className="mt-6 pt-6 border-t space-y-3">
                        <p className="text-sm font-semibold">Questions?</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <a href="tel:+254708901505" className="hover:text-cyan-600">
                              +254 708 901 505
                            </a>
                          </div>
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <a href="mailto:info@inklessismore.ke" className="hover:text-cyan-600">
                              info@inklessismore.ke
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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