import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";

export default function Gallery() {
  const gallery = useQuery(api.gallery.list);

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
                Before & After Gallery
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real results from our clients. See the transformative power of our advanced Picosecond laser technology.
              </p>
            </motion.div>

            {gallery === undefined ? (
              <div className="text-center py-12">Loading gallery...</div>
            ) : gallery.length === 0 ? (
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="border-2 shadow-xl overflow-hidden">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl">Featured Transformation</CardTitle>
                      <CardDescription>After 3 Sessions</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <img
                        src="https://harmless-tapir-303.convex.cloud/api/storage/08647076-bb2b-45e1-a230-3adf8c90a821"
                        alt="Before and After Example"
                        className="w-full"
                      />
                    </CardContent>
                    <CardContent className="pt-6 text-center">
                      <p className="text-muted-foreground">
                        More transformations coming soon. Check back to see our latest results!
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {gallery.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden backdrop-blur-xl bg-card/90">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-2 gap-0">
                          <div className="relative group">
                            <img
                              src={item.beforeImageUrl}
                              alt="Before treatment"
                              className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Badge className="bg-white text-black font-bold text-sm px-4 py-2">
                                BEFORE
                              </Badge>
                            </div>
                          </div>
                          <div className="relative group">
                            <img
                              src={item.afterImageUrl}
                              alt="After treatment"
                              className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Badge className="bg-primary text-primary-foreground font-bold text-sm px-4 py-2">
                                AFTER
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardHeader className="pb-6">
                        <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed mb-3">
                          {item.description}
                        </CardDescription>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="font-semibold">
                            {item.sessions} {item.sessions === 1 ? "Session" : "Sessions"}
                          </Badge>
                          <Badge variant="outline" className="font-medium">
                            {item.category}
                          </Badge>
                        </div>
                      </CardHeader>
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