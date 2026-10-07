import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * An image revealed by a travelling clip edge while the picture itself settles
 * back from a slight over-scale. The two run on the wrapper and the image
 * separately, which is what makes it read as a camera move rather than a fade.
 *
 * Both are CSS scroll-driven animations (see `.image-reveal` in globals.css),
 * so this is a server component and the image is painted whether or not any
 * JavaScript runs.
 */
export function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  sizes,
  priority = false,
  fill = true,
  width,
  height,
  quality,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  quality?: number;
}) {
  return (
    <div className={cn("image-reveal relative overflow-hidden", className)}>
      <div className="h-full w-full">
        <Image
          src={src}
          alt={alt}
          {...(fill ? { fill: true } : { width: width ?? 1600, height: height ?? 1000 })}
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </div>
    </div>
  );
}
