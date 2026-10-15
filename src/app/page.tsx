import Image from "next/image";
import Link from "next/link";
import { Lightbulb, BadgeCheck, Sprout } from "lucide-react";
import { portraits } from "@/data/content";
import { Arrow, Reveal } from "@/components/ui";
import { CTA, Services, Process } from "@/components/sections";
import { Gallery } from "@/components/gallery";
export default function Home() {
  return (
    <>
      <section className="hero">
        <Image
          className="hero-image"
          src="/brand/studio-desk.webp"
          alt=""
          fill
          sizes="100vw"
          preload
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <Reveal>
            <p className="eyebrow">VIRTUAL ASSISTANCE & DIGITAL MARKETING</p>
            <h1>
              Your <em>Creative Partner</em>
              <br />
              in Digital Marketing
              <br />& Virtual Assistance
            </h1>
            <p className="hero-description">
              Helping businesses, entrepreneurs, and organizations bring their
              vision to life through creative support, thoughtful digital
              marketing, and reliable virtual assistance.
            </p>
            <div className="actions">
              <Link className="button" href="/contact">
                Book a consultation <Arrow />
              </Link>
              <Link className="button button-outline" href="/portfolio">
                View our work
              </Link>
            </div>
            <ul className="hero-values">
              {[
                [Lightbulb, "Thoughtful creative", "solutions"],
                [BadgeCheck, "Reliable and", "detail-oriented"],
                [Sprout, "A collaborative", "approach"],
              ].map(([Icon, first, second]) => {
                const Symbol = Icon as typeof Lightbulb;
                return (
                  <li key={String(first)}>
                    <span>
                      <Symbol size={22} strokeWidth={1.2} />
                    </span>
                    <p>
                      {String(first)}
                      <br />
                      {String(second)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>
      <section className="section home-services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR SERVICES</p>
            <h2>How We Can Help Your Business</h2>
          </div>
          <p className="narrow">
            A combination of creativity, strategy, and reliable support to help
            you save time, elevate your brand, and move your ideas forward.
          </p>
        </div>
        <Services compact />
      </section>
      <section className="section featured-work">
        <div className="featured-intro">
          <p className="eyebrow">FEATURED WORK</p>
          <h2>
            A Showcase
            <br />
            of <em>Possibilities</em>
          </h2>
          <p>
            A glimpse of original work, from book covers and brand designs to
            social media, email creatives, and product presentations. Every
            piece starts with an idea.
          </p>
          <Link className="button" href="/portfolio">
            View full portfolio <Arrow />
          </Link>
        </div>
        <Gallery preview />
      </section>
      <section className="founder">
        <div className="portrait-frame studio-portrait">
          <Image
            src={portraits.studio}
            alt="Jean Monica wearing a dark blazer"
            width={portraits.studioWidth}
            height={portraits.studioHeight}
            sizes="(max-width: 700px) 100vw, 45vw"
          />
        </div>
        <div className="founder-copy">
          <Reveal>
            <p className="eyebrow">MEET THE FOUNDER</p>
            <h2>
              Hi, I’m <em>Jean Monica</em>
            </h2>
            <p>
              I’m the creative behind Ark Masterpiece. I help businesses bring
              their vision to life through thoughtful design, digital content,
              and reliable support.
            </p>
            <p>
              I believe the best work starts with listening. Together, we can
              create something that feels like your brand and serves your goals.
            </p>
            <Link className="button" href="/about">
              Get to know me <Arrow />
            </Link>
          </Reveal>
        </div>
        <p className="founder-note" aria-hidden="true">
          Let’s create
          <br />
          something
          <br />
          great together.
        </p>
      </section>
      <Process />
      <CTA />
    </>
  );
}
