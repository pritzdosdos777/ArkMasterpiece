import Image from "next/image";
import { portraits } from "@/data/content";
import Link from "next/link";
import { Arrow, Reveal } from "@/components/ui";
import { CTA, Services, Testimonials } from "@/components/sections";
import { Gallery } from "@/components/gallery";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-top">
          <p className="eyebrow">
            <span className="dot" /> CREATIVE THINKING. THOUGHTFUL EXECUTION.
          </p>
          <span className="edition">INDEPENDENT CREATIVE & DIGITAL STUDIO</span>
        </div>
        <Reveal>
          <h1>
            Your vision.
            <br />
            Our creativity.
            <br />
            <em>A digital masterpiece.</em>
          </h1>
          <div className="hero-bottom">
            <p>
              Helping businesses bring their ideas to life through creative
              design, digital marketing, and reliable virtual assistance.
            </p>
            <div className="actions">
              <Link className="button" href="/portfolio">
                Explore my work <Arrow />
              </Link>
              <Link className="text-link" href="/contact">
                Let’s work together <Arrow />
              </Link>
            </div>
          </div>
        </Reveal>
        <div className="hero-note">
          <span>DESIGNED WITH INTENTION. CREATED WITH CARE.</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>
      <div className="ticker">
        CREATIVE DESIGN <span>✦</span> DIGITAL MARKETING <span>✦</span> VIRTUAL
        ASSISTANCE <span>✦</span> YOUR VISION, REALIZED
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / THE PORTFOLIO</p>
            <h2>
              A little creativity.
              <br />
              <em>A lasting impression.</em>
            </h2>
          </div>
          <Link className="text-link" href="/portfolio">
            View all work <Arrow />
          </Link>
        </div>
        <Gallery preview />
      </section>
      <section className="section beige">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / HOW I CAN HELP</p>
            <h2>
              Creative ideas.
              <br />
              <em>Practical solutions.</em>
            </h2>
          </div>
          <p className="narrow">
            From a fresh visual direction to everyday digital support, let’s
            find the right approach for your business.
          </p>
        </div>
        <Services limit={4} />
        <Link className="text-link" href="/services">
          Explore all services <Arrow />
        </Link>
      </section>
      <section className="section about-preview">
        <div className="portrait-frame studio-portrait">
          <Image
            src={portraits.studio}
            alt="Jean Monica wearing a dark blazer"
            width={portraits.studioWidth}
            height={portraits.studioHeight}
            sizes="(max-width: 700px) 88vw, 40vw"
          />
        </div>
        <Reveal>
          <p className="eyebrow">03 / MEET JEAN MONICA</p>
          <h2>
            A creative mind.
            <br />
            <em>A thoughtful partner.</em>
          </h2>
          <p>
            I’m Jean Monica, the person behind Ark Masterpiece. I believe great
            digital work brings together a clear vision, considered design, and
            a collaborative approach.
          </p>
          <Link className="text-link" href="/about">
            A little more about me <Arrow />
          </Link>
        </Reveal>
      </section>
      <Testimonials />
      <CTA />
    </>
  );
}
