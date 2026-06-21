import Image from "next/image";

/**
 * MediaFrame
 * ----------
 * The single "photo slot" for the site. Hybrid strategy: until real
 * photography is dropped into `public/images/`, it renders an intentional
 * typographic navy plate (NOT a faux illustration, NOT a broken image). When a
 * `src` is supplied it renders an optimized next/image with a navy duotone wash
 * so stock / on-site photos sit inside the AFT palette instead of looking like
 * generic stock.
 *
 * Swap-in later is one line:
 *   <MediaFrame src="/images/network.jpg" ... />
 */

type MediaFrameProps = {
  /** Leave undefined to show the branded placeholder. */
  src?: string;
  alt: string;
  /** Placeholder index, e.g. "01" */
  index?: string;
  /** Small kicker, e.g. "Network · System · Security" */
  label?: string;
  /** Large caption on the placeholder, e.g. "ITソリューション" */
  caption?: string;
  priority?: boolean;
  sizes?: string;
  /** How heavy the brand wash over a real photo should be. */
  overlay?: "default" | "soft";
} & Omit<React.ComponentPropsWithoutRef<"figure">, "children">;

export default function MediaFrame({
  src,
  alt,
  index,
  label,
  caption,
  priority,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  overlay = "default",
  className = "",
  ...rest
}: MediaFrameProps) {
  return (
    <figure className={`relative isolate overflow-hidden bg-darknavy ${className}`} {...rest}>
      {src ? (
        <>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
          {/* flat brand tint — keeps photography on-palette (no gradient) */}
          <span
            aria-hidden
            className={`absolute inset-0 mix-blend-multiply ${
              overlay === "soft" ? "bg-navy/25" : "bg-navy/40"
            }`}
          />
        </>
      ) : (
        <>
          {/* intentional plate while photography is pending (flat navy, no gradient) */}
          <span aria-hidden className="absolute inset-0 bg-navy" />
          <figcaption className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
            <div className="flex items-center gap-4">
              {index && <span className="serif-num text-2xl font-semibold text-white/35">{index}</span>}
              <span className="h-px flex-1 bg-white/15" />
              <span className="label text-white/40">AFT</span>
            </div>
            <div>
              {caption && <p className="display text-2xl text-white/85 sm:text-3xl">{caption}</p>}
              {label && <p className="label mt-2 text-cyan/80">{label}</p>}
            </div>
          </figcaption>
        </>
      )}
    </figure>
  );
}
