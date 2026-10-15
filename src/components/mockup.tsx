import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/data/content";
import { mockupKind, mockupLabels } from "@/data/mockups";
/** Layout scenes put the unchanged artwork on surfaces. No text or pixels are regenerated. */
export function Mockup({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const kind = mockupKind(project);
  if (project.mockup)
    return (
      <Image
        className="mockup-render"
        src={project.mockup.src}
        alt={`${mockupLabels[kind]}: ${project.alt}`}
        width={project.mockup.width}
        height={project.mockup.height}
        sizes={
          large
            ? "90vw"
            : "(max-width: 600px) 88vw, (max-width:1000px) 44vw, 29vw"
        }
      />
    );
  const artwork = (
    <Image
      className="mockup-artwork"
      src={project.image}
      alt={project.alt}
      width={project.width}
      height={project.height}
      sizes="(max-width:600px) 70vw, 30vw"
    />
  );
  const device = kind === "laptop" || kind === "phone" || kind === "tablet";
  return (
    <div
      className={`mockup-scene scene-${kind}`}
      data-kind={kind}
      role="img"
      aria-label={`${mockupLabels[kind]}: ${project.title}`}
      style={
        {
          "--art-ratio": `${project.width} / ${project.height}`,
        } as CSSProperties
      }
    >
      <span className="scene-floor-shadow" aria-hidden="true" />
      {kind === "book" && (
        <div className="book-prop">
          <div className="book-cover">
            {artwork}
            <span className="book-sheen" />
          </div>
        </div>
      )}
      {kind === "sign" && (
        <div className="sign-prop">
          <span className="sign-fixing fixing-left" />
          <span className="sign-fixing fixing-right" />
          {artwork}
        </div>
      )}
      {kind === "poster" && (
        <div className="poster-prop">
          <div className="poster-mat">{artwork}</div>
        </div>
      )}
      {device && (
        <div className={`device-prop ${kind}-prop`}>
          <div className="device-screen">
            <div className="device-toolbar" aria-hidden="true">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>
                {kind === "tablet" ? "Email layout" : "Creative preview"}
              </span>
            </div>
            <div className="device-artwork">{artwork}</div>
            <div className="device-bottom" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
          {kind === "laptop" && <span className="laptop-base" />}
        </div>
      )}
      {kind === "product" && (
        <div className="product-prop">
          <div className="product-display">{artwork}</div>
          <span className="display-stand" />
        </div>
      )}
    </div>
  );
}
