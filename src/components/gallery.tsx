"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Expand } from "lucide-react";
import { projects, portfolioCategories, type Project } from "@/data/content";
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
    ...portfolioCategories
      .filter((c) => projects.some((p) => p.category === c.name))
      .map((c) => c.name),
  ];
  const isOpen = active !== null;
  function projectCard(p: Project) {
    return (
      <button
        className="project"
        key={p.id}
        onClick={(e) => {
          trigger.current = e.currentTarget;
          setActive(filtered.indexOf(p));
        }}
      >
        <div className="project-image">
          <Image
            src={p.image}
            alt={p.alt}
            width={p.width}
            height={p.height}
            sizes="(max-width: 600px) 88vw, (max-width: 1000px) 44vw, 29vw"
          />
          <Expand className="expand" aria-hidden="true" />
        </div>
        <span className="project-caption">
          <strong>{p.title}</strong>
          {preview && <span>{p.category}</span>}
        </span>
      </button>
    );
  }
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, filtered.length]);
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
      ) : preview ? (
        <div className="gallery preview-gallery">
          {filtered.map(projectCard)}
        </div>
      ) : (
        <div className="portfolio-sections">
          {portfolioCategories.map((group, index) => {
            const members = filtered.filter((p) => p.category === group.name);
            if (!members.length) return null;
            return (
              <section
                className="portfolio-group"
                key={group.slug}
                aria-labelledby={group.slug + "-title"}
              >
                <div className="portfolio-group-heading">
                  <div>
                    <p className="eyebrow">
                      {String(index + 1).padStart(2, "0")} / THE COLLECTION
                    </p>
                    <h2 id={group.slug + "-title"}>{group.name}</h2>
                  </div>
                  <span className="collection-count">
                    {members.length} pieces
                  </span>
                </div>
                <div className={"gallery category-grid " + group.slug}>
                  {members.map(projectCard)}
                </div>
              </section>
            );
          })}
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
            <figcaption aria-live="polite">
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
