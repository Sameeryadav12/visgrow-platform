import Image from "next/image";

/**
 * A row of real photos from Visgrow sessions. Every image is a genuine
 * session; the captions say where it was.
 */
export default function SessionPhotos({
  eyebrow = "In the room",
  heading,
  photos,
}: {
  eyebrow?: string;
  heading: string;
  photos: { src: string; cap: string }[];
}) {
  return (
    <section className="bg-white py-20 reveal" aria-label={heading}>
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="mb-10 max-w-[680px]">
          <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
            {eyebrow}
          </span>
          <h2 className="text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
            {heading}
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((p) => (
            <figure
              key={p.src}
              className="group relative h-[230px] overflow-hidden rounded-[16px] border border-[var(--color-line)]"
            >
              <Image
                src={`/images/photos/${p.src}`}
                alt={p.cap}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(36,26,51,0.92),transparent)] p-4 text-[12.5px] font-bold leading-snug text-white">
                {p.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
