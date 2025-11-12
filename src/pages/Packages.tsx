import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Filter, Search } from "lucide-react";
import { useQuery } from "convex/react";
import { Link } from "react-router";
import { useState, useMemo } from "react";

export default function Packages() {
  const packages = useQuery(api.packages.list);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPackages = useMemo(() => {
    if (!packages) return undefined;
    
    return packages.filter((pkg) => {
      const matchesSearch = searchQuery === "" || 
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || pkg.category === categoryFilter;
      const matchesAvailability = 
        availabilityFilter === "all" || 
        (availabilityFilter === "available" && pkg.isAvailable) ||
        (availabilityFilter === "coming-soon" && !pkg.isAvailable);
      
      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [packages, searchQuery, categoryFilter, availabilityFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
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

            {/* Compact Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-4xl mx-auto mb-8"
            >
              <div className="flex flex-wrap items-center gap-3 justify-center">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search packages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 text-sm"
                  />
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-9 w-full sm:w-40 text-sm">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="tattoo-removal">Tattoo Removal</SelectItem>
                    <SelectItem value="specialized">Specialized</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger className="h-9 w-full sm:w-40 text-sm">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Packages</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="coming-soon">Coming Soon</SelectItem>
                  </SelectContent>
                </Select>

                {(searchQuery !== "" || categoryFilter !== "all" || availabilityFilter !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setCategoryFilter("all");
                      setAvailabilityFilter("all");
                    }}
                    className="h-9 text-sm"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </motion.div>

            {packages === undefined ? (
              <div className="text-center py-12">Loading packages...</div>
            ) : filteredPackages && filteredPackages.length === 0 ? (
              <div className="text-center py-12">
                <Card className="max-w-md mx-auto border-2">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4">
                      No packages match your current filters.
                    </p>
                    <Button
                      onClick={() => {
                        setCategoryFilter("all");
                        setAvailabilityFilter("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredPackages?.map((pkg, index) => {
                  const isPopular = pkg.originalPrice && pkg.originalPrice > pkg.price;
                  return (
                    <motion.div
                      key={pkg._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={isPopular ? "md:col-span-1 lg:row-span-2" : ""}
                    >
                      <Card className={`h-full flex flex-col border-2 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                        isPopular 
                          ? "ring-2 ring-primary/50" 
                          : ""
                      }`}>
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <CardTitle className="text-2xl">
                                {pkg.title}
                              </CardTitle>
                            </div>
                            {isPopular && (
                              <Badge className="bg-primary text-primary-foreground font-semibold">✨ POPULAR</Badge>
                            )}
                            {!pkg.isAvailable && (
                              <Badge variant="secondary">Coming Soon</Badge>
                            )}
                          </div>
                          <CardDescription>
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
                            <span className="text-4xl font-bold text-primary">
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
                                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                                <span className="text-sm text-muted-foreground">
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
                                className="flex-1"
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