import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Real Results: Before & After
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See the transformative power of our advanced Picosecond laser technology
              </p>
            </motion.div>

            {gallery === undefined ? (
              <div className="text-center py-12">Loading gallery...</div>
            ) : gallery.length === 0 ? (
              <div className="text-center py-12">
                <Card className="max-w-2xl mx-auto">
                  <CardContent className="pt-6">
                    <img
                      src="https://harmless-tapir-303.convex.cloud/api/storage/08647076-bb2b-45e1-a230-3adf8c90a821"
                      alt="Before and After Example"
                      className="w-full rounded-lg mb-4"
                    />
                    <p className="text-muted-foreground">
                      More transformations coming soon. Check back to see our latest results!
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {gallery.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-2 hover:border-primary transition-colors">
                      <div className="grid grid-cols-2">
                        <div className="relative">
                          <img
                            src={item.beforeImageUrl}
                            alt="Before"
                            className="w-full h-48 object-cover"
                          />
                          <Badge className="absolute top-2 left-2">Before</Badge>
                        </div>
                        <div className="relative">
                          <img
                            src={item.afterImageUrl}
                            alt="After"
                            className="w-full h-48 object-cover"
                          />
                          <Badge className="absolute top-2 right-2" variant="secondary">After</Badge>
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.sessions} {item.sessions === 1 ? "Session" : "Sessions"}
                        </p>
                      </CardContent>
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
