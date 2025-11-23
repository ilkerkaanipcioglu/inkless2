import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Link, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPost() {
  const { slug } = useParams();
  const post = useQuery(api.blog.getBySlug, { slug: slug || "" });

  if (post === undefined) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full rounded-xl mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you are looking for does not exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <Button asChild variant="ghost" className="mb-8 pl-0 hover:pl-0 hover:bg-transparent hover:text-primary">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
          </Button>

          <div className="space-y-6 mb-10">
            <Badge variant="secondary" className="mb-4">
              Tattoo Removal
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground text-sm border-b pb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post._creationTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Inkless Is More Team</span>
              </div>
            </div>
          </div>

          {post.imageUrl && (
            <div className="mb-10 rounded-xl overflow-hidden shadow-lg bg-secondary/10">
              <img
                src={post.imageUrl}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[800px] object-contain mx-auto"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:font-bold prose-a:text-primary">
            <ReactMarkdown
              components={{
                img: ({node, ...props}: any) => (
                  <div className="my-8">
                    <img 
                      {...props} 
                      loading="lazy"
                      decoding="async"
                      className="rounded-xl shadow-md w-full" 
                    />
                  </div>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
        
        <section className="bg-muted/30 py-16 mt-12">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
            <p className="text-muted-foreground mb-8">
              Book your consultation today and discover the freedom of clear skin.
            </p>
            <Button asChild size="lg">
              <Link to="/packages">View Packages & Book Now</Link>
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}