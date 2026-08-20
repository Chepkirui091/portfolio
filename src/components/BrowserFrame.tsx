import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  src?: string;
  alt?: string;
  url?: string;
  priority?: boolean;
  className?: string;
};

export function BrowserFrame({
  children,
  src,
  alt = "",
  url = "app.example.com",
  priority,
  className = "",
}: Props) {
  return (
    <div className={`browser-frame ${className}`}>
      <div className="browser-chrome">
        <span className="browser-dot bg-red-400/90" />
        <span className="browser-dot bg-amber-400/90" />
        <span className="browser-dot bg-emerald-400/90" />
        <span className="ml-2 truncate rounded-md border border-border bg-background/60 px-3 py-0.5 font-mono text-[10px] text-muted">
          {url}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full bg-card">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
