import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useQuery } from "convex/react";
import { Link } from "react-router";

export default function Blog() {
  const posts = useQuery(api.blog.list);
  const publishedPosts = posts?.filter((post) => post.published);

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
                The Inkless Journal
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert insights, stories, and aftercare guides for your tattoo removal journey
              </p>
            </motion.div>

            {publishedPosts === undefined ? (
              <div className="text-center py-12">Loading articles...</div>
            ) : publishedPosts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="mb-4">No articles published yet. Check back soon for expert insights!</p>
                <p className="text-sm">Coming soon:</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• 5 Myths About Laser Tattoo Removal — Busted</li>
                  <li>• Aftercare Essentials: The Do's and Don'ts</li>
                  <li>• Your First Consultation: What to Expect</li>
                </ul>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {publishedPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <Card className="h-full border-2 hover:border-primary transition-colors cursor-pointer">
                        {post.imageUrl && (
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        )}
                        <CardHeader>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post._creationTime).toLocaleDateString()}</span>
                          </div>
                          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                          <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Badge>Read More</Badge>
                        </CardContent>
                      </Card>
                    </Link>
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
