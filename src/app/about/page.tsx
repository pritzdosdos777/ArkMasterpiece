import Image from "next/image";
import { portraits } from "@/data/content";
import { Intro, CTA } from "@/components/sections";
export const metadata = {
  title: "About",
  description: "Meet Jean Monica, the creative mind behind Ark Masterpiece.",
};
export default function About() {
  return (
    <>
      <Intro
        eyebrow="THE PERSON BEHIND THE WORK"
        title="Meet the creative mind behind Ark Masterpiece."
        description="Hello, I’m Jean Monica. Let’s bring a little more intention to your digital world."
      />
      <section className="section about-preview">
        <div className="portrait-frame">
          <Image
            src={portraits.about}
            alt="Jean Monica smiling in her professional portrait"
            width={portraits.aboutWidth}
            height={portraits.aboutHeight}
            sizes="(max-width: 700px) 88vw, 40vw"
          />
        </div>
        <div>
          <h2>
            Ideas deserve
            <br />
            <em>thoughtful execution.</em>
          </h2>
          <p>
            Ark Masterpiece brings creative design, digital marketing, and
            virtual assistance together to help businesses communicate clearly
            and manage their digital presence.
          </p>
          <p>
            My approach starts with listening: understanding your ideas, your
            audience, and what you need. From there, we can shape practical,
            considered solutions together.
          </p>
          <p>
            No two businesses are the same. Your project deserves a
            collaborative process and details that feel like you.
          </p>
        </div>
      </section>
      <section className="section beige">
        <p className="eyebrow">THE WAY WE WORK</p>
        <div className="values">
          {[
            [
              "01",
              "Listen first",
              "We begin with your goals, your audience, and the details that matter to you.",
            ],
            [
              "02",
              "Create with intention",
              "Every visual and every task should serve a clear purpose.",
            ],
            [
              "03",
              "Collaborate openly",
              "Clear communication keeps the work aligned with your vision.",
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span className="index">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
