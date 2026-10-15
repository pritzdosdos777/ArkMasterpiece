"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Expand } from "lucide-react";
import { projects } from "@/data/content";
export function Gallery({ preview = false }: { preview?: boolean }) {
  const [category, setCategory] = useState("All Projects");
  const [active, setActive] = useState<number | null>(null);
  const close = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const filtered = projects
    .filter((p) =>
      preview
        ? p.featured
        : category === "All Projects" || p.category === category,
    )
    .slice(0, preview ? 3 : undefined);
  const categories = [
    "All Projects",
    ...new Set(projects.map((p) => p.category)),
  ];
  useEffect(() => {
    if (active === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((a) => (a === null ? null : (a + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setActive((a) =>
          a === null ? null : (a - 1 + filtered.length) % filtered.length,
        );
      if (e.key === "Tab") {
        const buttons =
          close.current?.parentElement?.querySelectorAll<HTMLElement>(
            "button, a[href]",
          );
        if (!buttons) return;
        const first = buttons[0],
          last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", key);
      trigger.current?.focus();
    };
  }, [active, filtered.length]);
  return (
    <>
      {!preview && projects.length > 0 && (
        <div className="filters" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      {projects.length === 0 ? (
        <div className="portfolio-pending">
          <div className="placeholder-art" aria-hidden="true">
            <span>ark</span>
            <i>THE WORK, COMING SOON</i>
          </div>
          <div>
            <p className="eyebrow">PORTFOLIO MIGRATION IN PROGRESS</p>
            <h3>
              Original work.
              <br />
              Worth the wait.
            </h3>
            <p>
              Jean Monica’s original portfolio is being prepared for this new
              home. Artwork will appear here once the original files are
              available.
            </p>
            <span className="status">
              Placeholder · no sample work is represented as client work
            </span>
          </div>
        </div>
      ) : (
        <div className={preview ? "gallery preview-gallery" : "gallery"}>
          {filtered.map((p, i) => (
            <button
              className="project"
              key={p.id}
              onClick={(e) => {
                trigger.current = e.currentTarget;
                setActive(i);
              }}
            >
              <div className="project-image">
                <Image
                  src={p.image}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(max-width: 700px) 100vw, 50vw"
                />
                <Expand className="expand" />
              </div>
              <span className="project-caption">
                <strong>{p.title}</strong>
                <span>{p.category}</span>
              </span>
            </button>
          ))}
        </div>
      )}
      {active !== null && filtered[active] && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={filtered[active].title}
        >
          <button
            ref={close}
            className="close"
            aria-label="Close image"
            onClick={() => setActive(null)}
          >
            <X />
          </button>
          <button
            aria-label="Previous image"
            onClick={() =>
              setActive((active - 1 + filtered.length) % filtered.length)
            }
          >
            <ArrowLeft />
          </button>
          <figure>
            <Image
              src={filtered[active].image}
              alt={filtered[active].alt}
              width={filtered[active].width}
              height={filtered[active].height}
              sizes="90vw"
            />
            <figcaption>
              {filtered[active].title} · {active + 1} / {filtered.length}
              {filtered[active].original && (
                <a
                  className="original-link"
                  href={filtered[active].original}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open full-resolution original ↗
                </a>
              )}
              {filtered[active].description && (
                <p>{filtered[active].description}</p>
              )}
            </figcaption>
          </figure>
          <button
            aria-label="Next image"
            onClick={() => setActive((active + 1) % filtered.length)}
          >
            <ArrowRight />
          </button>
        </div>
      )}
    </>
  );
}
