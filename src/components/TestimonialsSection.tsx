import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonialsLeft = [
  {
    name: "Faith",
    text: "The pain is nothing compared to getting a new tattoo.",
    rating: 5,
  },
  {
    name: "Stephen",
    text: "It feels good to see my tattoo fading away after each treatment.",
    rating: 5,
  },
];

const testimonialsRight = [
  {
    name: "Gabriel",
    text: "The service is great. Trustful, fast and very professional.",
    rating: 5,
  },
  {
    name: "Isabelle",
    text: "Only a few sessions and my tattoo is nearly gone. I couldn't be happier with the results.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[800px] bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-3xl pointer-events-none rounded-full opacity-60" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
          
          {/* Left Column */}
          <div className="space-y-16 flex flex-col items-center lg:items-end text-center lg:text-right order-2 lg:order-1">
            {testimonialsLeft.map((t, i) => (
              <motion.div 
                key={t.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="max-w-xs"
              >
                <div className="flex items-center justify-center lg:justify-end gap-2 mb-2 text-yellow-500">
                  <span className="text-xl font-semibold text-white">{t.name}</span>
                  <div className="flex">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 font-light leading-relaxed">
                  "{t.text}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Column - Title */}
          <div className="text-center py-12 lg:py-0 order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent drop-shadow-2xl">
                Let<br />
                Your Skin<br />
                Shine<br />
                Again
              </h2>
            </motion.div>
            
            {/* Chair Silhouette / Bottom Center Visual */}
            <div className="mt-12 mx-auto w-32 h-32 bg-gradient-to-t from-zinc-800 to-zinc-900 rounded-t-3xl opacity-50 blur-sm lg:block hidden" />
          </div>

          {/* Right Column */}
          <div className="space-y-16 flex flex-col items-center lg:items-start text-center lg:text-left order-3">
            {testimonialsRight.map((t, i) => (
              <motion.div 
                key={t.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="max-w-xs"
              >
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 text-yellow-500">
                  <span className="text-xl font-semibold text-white">{t.name}</span>
                  <div className="flex">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 font-light leading-relaxed">
                  "{t.text}"
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
