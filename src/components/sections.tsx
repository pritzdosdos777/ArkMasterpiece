import Link from "next/link";
import { Arrow, Reveal } from "./ui";
import { services, site, testimonials } from "@/data/content";
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
export function Services({ limit = 8 }: { limit?: number }) {
  return (
    <div className="services-grid">
      {services.slice(0, limit).map(([name, desc], i) => (
        <Reveal key={name}>
          <article className="service">
            <span className="index">0{i + 1}</span>
            <h3>{name}</h3>
            <p>{desc}</p>
            <span className="status">
              Proposed service · owner confirmation pending
            </span>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
export function CTA() {
  return (
    <section className="cta">
      <p className="eyebrow">LET’S CREATE SOMETHING MEANINGFUL</p>
      <h2>
        Your next chapter,
        <br />
        <em>beautifully made.</em>
      </h2>
      <Link className="button light" href="/contact">
        Let’s discuss your project <Arrow />
      </Link>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div>
        <Link className="wordmark" href="/">
          ark<span>MASTERPIECE</span>
        </Link>
        <p>
          Thoughtful creativity. Reliable support.
          <br />
          Digital possibilities, brought to life.
        </p>
      </div>
      <div>
        <p className="eyebrow">EXPLORE</p>
        {["About", "Services", "Portfolio", "Contact"].map((n) => (
          <Link key={n} href={"/" + n.toLowerCase()}>
            {n}
          </Link>
        ))}
      </div>
      <div>
        <p className="eyebrow">LET’S CONNECT</p>
        {site.email ? (
          <a href={"mailto:" + site.email}>{site.email}</a>
        ) : (
          <p>Contact email coming soon.</p>
        )}
        {site.socials.map((s) => (
          <a key={s.label} href={s.url} rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
        <Link href="/contact">Start a conversation ↗</Link>
      </div>
      <small>
        © {new Date().getFullYear()} Ark Masterpiece. All rights reserved.
      </small>
    </footer>
  );
}
export function Testimonials() {
  return (
    <section className="section">
      <p className="eyebrow">WORDS FROM COLLABORATORS</p>
      <h2>
        Good work starts with
        <br />
        <em>good relationships.</em>
      </h2>
      {testimonials.length ? (
        testimonials.map((t) => (
          <blockquote key={t.name}>
            <p>“{t.quote}”</p>
            <cite>
              {t.name} {t.role}
            </cite>
          </blockquote>
        ))
      ) : (
        <p className="draft">
          Testimonials · Draft section. Verified client feedback will appear
          here when available.
        </p>
      )}
    </section>
  );
}
