import Image from "next/image";
import { projectVisuals, isMobileShot } from "@/lib/images";

type Props = {
  projectId: string;
  title: string;
  coverSrc: string;
  coverAlt: string;
  size?: "featured" | "card";
};

function BrowserShot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-border bg-background/80 px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/90" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/90" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
        <span className="ml-2 truncate font-mono text-[9px] text-muted">
          admin
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full bg-card">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-center"
          sizes="(max-width: 1024px) 80vw, 40vw"
        />
      </div>
    </div>
  );
}

export function ProjectVisual({
  projectId,
  title,
  coverSrc,
  coverAlt,
  size = "featured",
}: Props) {
  const { desktop, mobile } = projectVisuals(projectId);
  const featured = size === "featured";

  if (desktop && mobile) {
    return (
      <div
        className={`flex items-center justify-center bg-surface ${
          featured
            ? "min-h-[360px] px-6 py-8 sm:min-h-[400px] lg:min-h-[440px]"
            : "min-h-[240px] px-5 py-6"
        }`}
      >
        <div
          className={`relative mx-auto w-full max-w-[460px] ${
            featured ? "h-[300px] sm:h-[340px]" : "h-[210px]"
          }`}
        >
          <div className="absolute left-0 top-[16%] w-[78%]">
            <BrowserShot src={desktop} alt={`${title} admin dashboard`} />
          </div>
          <div className="absolute bottom-0 right-0 z-10 h-[92%] w-[36%]">
            <Image
              src={mobile}
              alt={`${title} mobile app`}
              fill
              className="object-contain object-bottom"
              sizes="160px"
            />
          </div>
        </div>
      </div>
    );
  }

  const src = mobile ?? desktop ?? coverSrc;
  const mobileOnly = Boolean(mobile) || isMobileShot(src);

  return (
    <div
      className={`flex items-center justify-center bg-surface ${
        featured
          ? "min-h-[300px] px-6 py-8 lg:min-h-[380px]"
          : "min-h-[210px] px-5 py-6"
      }`}
    >
      {mobileOnly ? (
        <div
          className={`relative ${
            featured
              ? "h-[300px] w-[150px] sm:h-[340px] sm:w-[170px]"
              : "h-[220px] w-[110px]"
          }`}
        >
          <Image
            src={src}
            alt={coverAlt}
            fill
            className="object-contain object-center"
            sizes={featured ? "170px" : "110px"}
          />
        </div>
      ) : (
        <div className="w-full max-w-[480px]">
          <BrowserShot src={src} alt={coverAlt} />
        </div>
      )}
    </div>
  );
}
