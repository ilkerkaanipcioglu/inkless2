import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { Link } from "react-router";

export default function Packages() {
  const packages = useQuery(api.packages.list);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <section className="py-20 bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-200 dark:from-blue-950/20 dark:to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                Our Packages
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose a plan that works for you. All packages are tailored to your specific needs during your free consultation.
              </p>
            </motion.div>

            {packages === undefined ? (
              <div className="text-center py-12">Loading packages...</div>
            ) : packages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No packages available at the moment. Please check back soon.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {packages.map((pkg, index) => {
                  const isPopular = pkg.originalPrice && pkg.originalPrice > pkg.price;
                  return (
                    <motion.div
                      key={pkg._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={isPopular ? "md:col-span-1 lg:row-span-2" : ""}
                    >
                      <Card className={`h-full flex flex-col border-0 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                        isPopular 
                          ? "bg-gradient-to-br from-white to-cyan-50 dark:from-slate-900 dark:to-cyan-950/20 ring-2 ring-cyan-400/50" 
                          : "bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm"
                      }`}>
                        <CardHeader className={`pb-4 ${isPopular ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white" : ""}`}>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <CardTitle className={`text-2xl ${isPopular ? "text-white" : ""}`}>
                                {pkg.title}
                              </CardTitle>
                            </div>
                            {isPopular && (
                              <Badge className="bg-white text-cyan-600 font-semibold">✨ POPULAR</Badge>
                            )}
                            {!pkg.isAvailable && (
                              <Badge variant="secondary">Coming Soon</Badge>
                            )}
                          </div>
                          <CardDescription className={isPopular ? "text-white/90" : ""}>
                            {pkg.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1 pt-6">
                          <div className="mb-6">
                            {pkg.originalPrice && (
                              <span className="text-lg text-muted-foreground line-through mr-3">
                                KSh {pkg.originalPrice.toLocaleString()}
                              </span>
                            )}
                            <span className={`text-4xl font-bold ${isPopular ? "text-cyan-600" : ""}`}>
                              KSh {pkg.price.toLocaleString()}
                            </span>
                          </div>

                          {pkg.sessions && (
                            <p className="text-sm text-muted-foreground mb-6 font-medium">
                              {pkg.sessions} {pkg.sessions === 1 ? "Session" : "Sessions"}
                            </p>
                          )}

                          <div className="space-y-3">
                            {pkg.features.map((feature, i) => (
                              <div key={i} className="flex items-start space-x-3">
                                <CheckCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${isPopular ? "text-cyan-600" : "text-cyan-500"}`} />
                                <span className={`text-sm ${isPopular ? "text-foreground" : "text-muted-foreground"}`}>
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>

                        <CardFooter className="flex gap-3 pt-6">
                          {pkg.isAvailable ? (
                            <>
                              <Button 
                                asChild 
                                variant={isPopular ? "secondary" : "outline"} 
                                className="flex-1"
                              >
                                <Link to={`/packages/${pkg._id}`} className="flex items-center justify-center gap-2">
                                  Details <ArrowRight className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button 
                                asChild 
                                className={`flex-1 ${isPopular ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700" : ""}`}
                              >
                                <Link to={`/packages/${pkg._id}`}>Book Now</Link>
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
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}