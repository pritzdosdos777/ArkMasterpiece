import Image from "next/image";
import Link from "next/link";
import {
  PenTool,
  Clapperboard,
  PanelsTopLeft,
  Mail,
  Handshake,
  ArrowRight,
} from "lucide-react";
import { Arrow, Reveal } from "./ui";
import { Brand } from "./brand";
import { services, site, gmailComposeUrl } from "@/data/content";
const serviceIcons = [
  Handshake,
  PenTool,
  PanelsTopLeft,
  Clapperboard,
  PanelsTopLeft,
  Mail,
  Handshake,
];
const serviceIds = [
  "virtual-assistance",
  "graphic-design",
  "digital-marketing",
  "video-content",
  "websites-funnels",
  "email-marketing",
  "business-support",
];
export function Intro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lede">{description}</p>
    </section>
  );
}
export function Services({ compact = false }: { compact?: boolean }) {
  const indices = compact ? [1, 3, 4, 5, 0] : services.map((_, i) => i);
  return (
    <div
      className={compact ? "services-grid compact-services" : "services-grid"}
    >
      {indices.map((i) => {
        const [name, description] = services[i];
        const Icon = serviceIcons[i];
        return (
          <Reveal key={name}>
            <article id={serviceIds[i]} className="service">
              <span className="service-icon">
                <Icon size={25} strokeWidth={1.15} aria-hidden="true" />
              </span>
              <h3>{name}</h3>
              <p>{description}</p>
              {!compact && (
                <span className="status">
                  Proposed scope · confirm availability when enquiring
                </span>
              )}
              <Link
                href={compact ? "/services#" + serviceIds[i] : "/contact"}
                className="service-arrow"
                aria-label={
                  compact ? "Explore " + name : "Enquire about " + name
                }
              >
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
export function CTA() {
  return (
    <section className="cta">
      <Image
        src="/brand/studio-desk.webp"
        alt=""
        fill
        sizes="100vw"
        className="cta-image"
      />
      <div className="cta-content">
        <p className="eyebrow">READY TO GET STARTED?</p>
        <h2>
          Let’s Work <em>Together.</em>
        </h2>
        <p>
          Whether you need creative support, digital marketing, or a reliable
          VA,
          <br className="desktop-break" /> Ark Masterpiece is here to help.
        </p>
        <Link className="button" href="/contact">
          Let’s work together <Arrow />
        </Link>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section className="process section">
      <div className="process-heading">
        <p className="eyebrow">OUR PROCESS</p>
        <h2>Simple. Clear. Effective.</h2>
      </div>
      <ol>
        {[
          ["Discover", "We learn about your goals, needs, and vision."],
          ["Plan", "We create a thoughtful approach and a clear roadmap."],
          [
            "Create",
            "We bring your ideas to life with considered, purposeful work.",
          ],
          ["Grow", "We review, refine, and plan your next steps together."],
        ].map(([title, description], i) => (
          <li key={title}>
            <span className="step-number">0{i + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function Footer() {
  const labels: Record<string, string> = {
    Facebook: "f",
    Instagram: "ig",
    LinkedIn: "in",
  };
  return (
    <footer>
      <div className="footer-main">
        <Brand />
        <nav aria-label="Footer navigation">
          {["Home", "Services", "Portfolio", "About", "Contact"].map((n) => (
            <Link key={n} href={n === "Home" ? "/" : "/" + n.toLowerCase()}>
              {n}
            </Link>
          ))}
        </nav>
        <div className="social-links">
          {site.socials.map((s) => {
            const label = labels[s.label];
            return (
              <a
                key={s.label}
                href={s.url}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-abbrev" aria-hidden="true">
                  {label || s.label}
                </span>
              </a>
            );
          })}
          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email Jean Monica"
          >
            <Mail size={18} strokeWidth={1.5} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <small>
          © {new Date().getFullYear()} Ark Masterpiece. All rights reserved.
        </small>
        <span>Thoughtful creativity. Reliable support.</span>
      </div>
    </footer>
  );
}
