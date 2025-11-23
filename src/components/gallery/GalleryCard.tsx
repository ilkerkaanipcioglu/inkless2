import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LazyImage } from "@/components/LazyImage";

interface GalleryCardProps {
  title: string;
  description: string;
  image: string;
  badge?: string;
  index?: number;
  altText: string;
}

export function GalleryCard({ title, description, image, badge, index = 0, altText }: GalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden backdrop-blur-xl bg-card/90 h-full flex flex-col">
        <CardContent className="p-0 relative">
            <LazyImage
              src={image}
              alt={altText}
              className="w-full h-80 object-cover"
              containerClassName="w-full h-80"
            />
            {badge && (
              <div className="absolute top-4 right-4 z-20">
                <Badge className="bg-primary text-primary-foreground font-bold text-sm px-4 py-2 shadow-md">
                  {badge}
                </Badge>
              </div>
            )}
        </CardContent>
        <CardHeader className="pb-6 flex-1">
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}