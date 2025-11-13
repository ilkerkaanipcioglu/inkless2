import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";

export default function Gallery() {
  const gallery = useQuery(api.gallery.list);

  const beforeAfterPhotos = [
    {
      title: "Full Back Tattoo Removal",
      before: "/assets/Brown_Minimalist_Skincare_Before_After_Collage_Instagram_Post.jpg",
      sessions: "6 Sessions",
      description: "Complete removal of large back tattoo with excellent results"
    },
    {
      title: "Arm Tattoo Transformation",
      before: "/assets/Green_Gentle_Before_and_After_Instagram_Post.jpg",
      sessions: "4 Sessions",
      description: "Significant fading after just 4 treatment sessions"
    },
    {
      title: "Small Tattoo Removal",
      before: "/assets/Before_and_After_3b82c4e4-de7b-46a0-a795-ed19791107a3_480x480.jpg",
      sessions: "3 Sessions",
      description: "Quick and effective removal of small tattoo"
    },
    {
      title: "Detailed Work Progress",
      before: "/assets/9578BE17-D6D1-48F4-8525-F0AE08A82211_1_105_c_480x480.jpg",
      sessions: "5 Sessions",
      description: "Progressive fading of detailed tattoo work"
    },
    {
      title: "Color Tattoo Removal",
      before: "/assets/B0A79D7D-80DC-43C6-AC34-23ACC6E164A7_1_105_c_480x480.jpg",
      sessions: "7 Sessions",
      description: "Multi-color tattoo removal showing excellent progress"
    },
    {
      title: "Wrist Tattoo Removal",
      before: "/assets/AA99C17D-3B23-40B0-84E3-901869B56057_480x480.jpg",
      sessions: "3 Sessions",
      description: "Clean removal of wrist tattoo with minimal sessions"
    }
  ];

  const processPhotos = [
    {
      title: "Single Session Treatment",
      image: "/assets/1-single-laser-tattoo-removal-session-994.webp",
      description: "Our advanced Picosecond laser in action during a single treatment session"
    },
    {
      title: "Multi-Session Package",
      image: "/assets/5-laser-tattoo-removal-sessions-medium-size-tattoo-treatment-753.webp",
      description: "Medium-sized tattoo undergoing comprehensive treatment plan"
    },
    {
      title: "Treatment Process",
      image: "/assets/IMG_8655_480x480.jpg",
      description: "Professional application of laser technology for optimal results"
    },
    {
      title: "Specialized Scar Treatment",
      image: "/assets/Laser_Scar_Removal.jpg",
      description: "Our laser technology also works effectively on scar tissue"
    }
  ];

  const testimonials = [
    {
      image: "/assets/Gabriel_s_Testimonial.jpg",
      name: "Gabriel's Journey",
      description: "Real client testimonial and transformation story"
    },
    {
      image: "/assets/1111__1_.jpg",
      name: "Client Success",
      description: "Another satisfied client's complete removal journey"
    }
  ];

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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {beforeAfterPhotos.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden backdrop-blur-xl bg-card/90">
                        <CardContent className="p-0">
                          <div className="relative">
                            <img
                              src={item.before}
                              alt={`${item.title} - Before and after tattoo removal showing ${item.sessions} of treatment`}
                              loading="lazy"
                              className="w-full h-80 object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = '<div class="w-full h-80 bg-muted flex items-center justify-center text-muted-foreground">Image not available</div>';
                                }
                              }}
                            />
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-primary text-primary-foreground font-bold text-sm px-4 py-2">
                                {item.sessions}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                        <CardHeader className="pb-6">
                          <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {gallery && gallery.length > 0 && (
                  <>
                    <div className="text-center my-12">
                      <h2 className="text-3xl font-bold mb-4">More Client Results</h2>
                      <p className="text-muted-foreground">Additional transformations from our database</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
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
                                    alt={`Before tattoo removal treatment - ${item.title}`}
                                    loading="lazy"
                                    className="w-full h-64 object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                                    }}
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
                                    alt={`After ${item.sessions} sessions of tattoo removal - ${item.title}`}
                                    loading="lazy"
                                    className="w-full h-64 object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                                    }}
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
                  </>
                )}
              </TabsContent>

              <TabsContent value="process" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {processPhotos.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden backdrop-blur-xl bg-card/90">
                        <CardContent className="p-0">
                          <img
                            src={item.image}
                            alt={`${item.title} - ${item.description}`}
                            loading="lazy"
                            className="w-full h-80 object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="w-full h-80 bg-muted flex items-center justify-center text-muted-foreground">Image not available</div>';
                              }
                            }}
                          />
                        </CardContent>
                        <CardHeader className="pb-6">
                          <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
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
                          Your body naturally eliminates the fragmented ink over 4-6 weeks.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <span className="text-2xl">4️⃣</span> Progressive Results
                        </h3>
                        <p className="text-muted-foreground">
                          Each session builds on the last for gradual, safe tattoo fading.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {testimonials.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden backdrop-blur-xl bg-card/90">
                        <CardContent className="p-0">
                          <img
                            src={item.image}
                            alt={`Client testimonial - ${item.name}: ${item.description}`}
                            loading="lazy"
                            className="w-full h-96 object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="w-full h-96 bg-muted flex items-center justify-center text-muted-foreground">Image not available</div>';
                              }
                            }}
                          />
                        </CardContent>
                        <CardHeader className="pb-6">
                          <CardTitle className="text-xl mb-2">{item.name}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
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