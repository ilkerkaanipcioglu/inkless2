import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export function LazyImage({ className, containerClassName, alt, src, ...props }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted/10", containerClassName)}>
      {isLoading && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full z-10" />
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            <ImageIcon className="w-8 h-8 opacity-50" />
        </div>
      ) : (
        <img
            src={src}
            alt={alt}
            className={cn(
            "transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100",
            className
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
                setIsLoading(false);
                setHasError(true);
            }}
            loading="lazy"
            decoding="async"
            {...props}
        />
      )}
    </div>
  );
}