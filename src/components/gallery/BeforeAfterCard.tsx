import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LazyImage } from "@/components/LazyImage";

interface BeforeAfterCardProps {
  title: string;
  description: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  sessions: number;
  category: string;
  index?: number;
}

export function BeforeAfterCard({ 
  title, 
  description, 
  beforeImageUrl, 
  afterImageUrl, 
  sessions, 
  category,
  index = 0 
}: BeforeAfterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden backdrop-blur-xl bg-card/90 h-full flex flex-col">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 gap-0">
            <div className="relative group">
              <LazyImage
                src={beforeImageUrl}
                alt={`Before tattoo removal treatment - ${title}`}
                className="w-full h-64 object-cover"
                containerClassName="w-full h-64"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                <Badge className="bg-white text-black font-bold text-sm px-4 py-2 shadow-sm">
                  BEFORE
                </Badge>
              </div>
            </div>
            <div className="relative group">
              <LazyImage
                src={afterImageUrl}
                alt={`After ${sessions} sessions of tattoo removal - ${title}`}
                className="w-full h-64 object-cover"
                containerClassName="w-full h-64"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                <Badge className="bg-primary text-primary-foreground font-bold text-sm px-4 py-2 shadow-sm">
                  AFTER
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
        <CardHeader className="pb-6 flex-1">
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
          <CardDescription className="text-base leading-relaxed mb-3">
            {description}
          </CardDescription>
          <div className="flex items-center gap-2 mt-auto">
            <Badge variant="secondary" className="font-semibold">
              {sessions} {sessions === 1 ? "Session" : "Sessions"}
            </Badge>
            <Badge variant="outline" className="font-medium">
              {category}
            </Badge>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}