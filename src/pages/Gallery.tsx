import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { GalleryCard } from "@/components/gallery/GalleryCard";
import { BeforeAfterCard } from "@/components/gallery/BeforeAfterCard";
import { processPhotos, testimonials } from "@/data/galleryData";

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

            <Tabs defaultValue="transformations" className="max-w-7xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-12 h-auto">
                <TabsTrigger value="transformations" className="text-sm md:text-base py-3">
                  Transformations
                </TabsTrigger>
                <TabsTrigger value="process" className="text-sm md:text-base py-3">
                  Our Process
                </TabsTrigger>
                <TabsTrigger value="testimonials" className="text-sm md:text-base py-3">
                  Testimonials
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transformations" className="space-y-8">
                {gallery === undefined ? (
                  <div className="text-center py-12">Loading gallery...</div>
                ) : gallery.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">No gallery items found.</div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gallery.map((item, index) => {
                      // If before and after images are the same, it's likely a collage or single image
                      // So we use the GalleryCard instead of BeforeAfterCard
                      const isSingleImage = item.beforeImageUrl === item.afterImageUrl;
                      
                      if (isSingleImage) {
                        return (
                          <GalleryCard
                            key={item._id}
                            title={item.title}
                            description={item.description}
                            image={item.beforeImageUrl}
                            badge={`${item.sessions} ${item.sessions === 1 ? "Session" : "Sessions"}`}
                            index={index}
                            altText={`${item.title} - ${item.description}`}
                          />
                        );
                      }
                      
                      return (
                        <BeforeAfterCard
                          key={item._id}
                          title={item.title}
                          description={item.description}
                          beforeImageUrl={item.beforeImageUrl}
                          afterImageUrl={item.afterImageUrl}
                          sessions={item.sessions}
                          category={item.category}
                          index={index}
                        />
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="process" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {processPhotos.map((item, index) => (
                    <GalleryCard
                      key={index}
                      title={item.title}
                      description={item.description}
                      image={item.image}
                      index={index}
                      altText={`${item.title} - ${item.description}`}
                    />
                  ))}
                </div>

                <Card className="border-2 shadow-xl backdrop-blur-xl bg-card/90 mt-12">
                  <CardHeader>
                    <CardTitle className="text-2xl">Our Treatment Process</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <span className="text-2xl">1️⃣</span> Free Consultation
                        </h3>
                        <p className="text-muted-foreground">
                          We assess your tattoo, discuss your goals, and create a personalized treatment plan.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <span className="text-2xl">2️⃣</span> Picosecond Laser Treatment
                        </h3>
                        <p className="text-muted-foreground">
                          Our advanced laser breaks down ink particles safely and effectively.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <span className="text-2xl">3️⃣</span> Natural Healing
                        </h3>
                        <p className="text-muted-foreground">
                          Your body naturally eliminates the fragmented ink over 4 weeks. Proper aftercare during this period significantly enhances results.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <span className="text-2xl">4️⃣</span> Progressive Results
                        </h3>
                        <p className="text-muted-foreground">
                          Visible lightening after each session. Full removal typically achieved in 5-12 sessions with 4-week intervals, resulting in completely scar-free skin.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {testimonials.map((item, index) => (
                    <GalleryCard
                      key={index}
                      title={item.name}
                      description={item.description}
                      image={item.image}
                      index={index}
                      altText={`Client testimonial - ${item.name}: ${item.description}`}
                    />
                  ))}
                </div>

                <Card className="border-2 shadow-xl backdrop-blur-xl bg-primary/5 max-w-3xl mx-auto mt-12">
                  <CardContent className="pt-8 pb-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
                    <p className="text-muted-foreground mb-6">
                      Join hundreds of satisfied clients who have successfully removed their tattoos with us.
                    </p>
                    <a href="/packages">
                      <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
                        Book Your Free Consultation
                      </button>
                    </a>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}