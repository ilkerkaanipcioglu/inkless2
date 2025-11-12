import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useQuery } from "convex/react";
import { Link } from "react-router";

export default function Packages() {
  const packages = useQuery(api.packages.list);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Smart Packages for Clearer Skin
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transparent pricing, no hidden fees. Choose the package that fits your journey.
              </p>
            </motion.div>

            {packages === undefined ? (
              <div className="text-center py-12">Loading packages...</div>
            ) : packages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No packages available at the moment. Please check back soon.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col border-2 hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-xl">{pkg.title}</CardTitle>
                          {!pkg.isAvailable && (
                            <Badge variant="secondary">Coming Soon</Badge>
                          )}
                        </div>
                        <CardDescription>{pkg.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="mb-4">
                          {pkg.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through mr-2">
                              KSh {pkg.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-3xl font-bold">
                            KSh {pkg.price.toLocaleString()}
                          </span>
                        </div>
                        {pkg.sessions && (
                          <p className="text-sm text-muted-foreground mb-4">
                            {pkg.sessions} {pkg.sessions === 1 ? "Session" : "Sessions"}
                          </p>
                        )}
                        <ul className="space-y-2">
                          {pkg.features.map((feature, i) => (
                            <li key={i} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        {pkg.isAvailable ? (
                          <>
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/packages/${pkg._id}`}>Details</Link>
                            </Button>
                            <Button asChild className="flex-1">
                              <Link to="/packages#book">Book Now</Link>
                            </Button>
                          </>
                        ) : (
                          <Button asChild variant="outline" className="w-full">
                            <Link to="/about#contact">Enquire</Link>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
