import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Faith",
    text: "The pain is nothing compared to getting a new tattoo.",
    rating: 5,
    initials: "F"
  },
  {
    name: "Stephen",
    text: "It feels good to see my tattoo fading away after each treatment.",
    rating: 5,
    initials: "S"
  },
  {
    name: "Gabriel",
    text: "The service is great. Trustful, fast and very professional.",
    rating: 5,
    initials: "G"
  },
  {
    name: "Isabelle",
    text: "Only a few sessions and my tattoo is nearly gone. I couldn't be happier with the results.",
    rating: 5,
    initials: "I"
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Read about the experiences of people who have chosen Inkless Is More.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-none shadow-md bg-background/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6 flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-3 text-yellow-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  
                  <div className="mb-4 flex-grow">
                    <Quote className="h-6 w-6 text-primary/20 mb-2" />
                    <p className="text-sm text-muted-foreground italic relative z-10">
                      "{t.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t">
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Verified Client</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}