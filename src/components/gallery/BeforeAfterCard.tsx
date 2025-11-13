import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
      <Card className="border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden backdrop-blur-xl bg-card/90">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 gap-0">
            <div className="relative group">
              <img
                src={beforeImageUrl}
                alt={`Before tattoo removal treatment - ${title}`}
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
                src={afterImageUrl}
                alt={`After ${sessions} sessions of tattoo removal - ${title}`}
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
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
          <CardDescription className="text-base leading-relaxed mb-3">
            {description}
          </CardDescription>
          <div className="flex items-center gap-2">
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
