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
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <Button asChild variant="ghost" className="mb-6">
                <Link to="/packages">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Packages
                </Link>
              </Button>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-3xl">{packageData.title}</CardTitle>
                        {!packageData.isAvailable && (
                          <Badge variant="secondary">Coming Soon</Badge>
                        )}
                      </div>
                      <p className="text-lg text-muted-foreground">
                        {packageData.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-3">What's Included</h3>
                          <ul className="space-y-3">
                            {packageData.features.map((feature, i) => (
                              <li key={i} className="flex items-start space-x-3">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {packageData.sessions && (
                          <div>
                            <h3 className="text-xl font-semibold mb-2">Sessions</h3>
                            <p className="text-muted-foreground">
                              This package includes {packageData.sessions}{" "}
                              {packageData.sessions === 1 ? "session" : "sessions"}, spaced 4-6
                              weeks apart for optimal results.
                            </p>
                          </div>
                        )}

                        <div>
                          <h3 className="text-xl font-semibold mb-2">Category</h3>
                          <Badge variant="outline" className="capitalize">
                            {packageData.category.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="sticky top-20">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Price</p>
                          {packageData.originalPrice && (
                            <p className="text-lg text-muted-foreground line-through">
                              KSh {packageData.originalPrice.toLocaleString()}
                            </p>
                          )}
                          <p className="text-3xl font-bold">
                            KSh {packageData.price.toLocaleString()}
                          </p>
                          {packageData.originalPrice && (
                            <p className="text-sm text-primary mt-1">
                              Save KSh{" "}
                              {(packageData.originalPrice - packageData.price).toLocaleString()}
                            </p>
                          )}
                        </div>

                        {packageData.isAvailable ? (
                          <Button asChild className="w-full" size="lg">
                            <Link to="/packages#book">Book Now</Link>
                          </Button>
                        ) : (
                          <Button asChild variant="outline" className="w-full" size="lg">
                            <Link to="/about#contact">Enquire</Link>
                          </Button>
                        )}

                        <div className="pt-4 border-t space-y-3">
                          <p className="text-sm font-semibold">Questions?</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <Phone className="h-4 w-4" />
                              <a href="tel:+254708901505" className="hover:text-primary">
                                +254 708 901 505
                              </a>
                            </div>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <Mail className="h-4 w-4" />
                              <a href="mailto:info@inklessismore.ke" className="hover:text-primary">
                                info@inklessismore.ke
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
