import { Intro } from "@/components/sections";
import { ContactForm } from "@/components/contact-form";
import { site, gmailComposeUrl } from "@/data/content";
export const metadata = {
  title: "Contact",
  description:
    "Start a conversation about your next creative or digital project with Ark Masterpiece.",
};
export default function Page() {
  return (
    <>
      <Intro
        eyebrow="A GOOD CONVERSATION IS A GREAT START"
        title="Let’s make something meaningful."
        description="Have an idea in mind? Tell me a little about your business and what you’d like to create."
      />
      <section className="section contact-grid">
        <aside>
          <h2>
            Your vision,
            <br />
            <em>starts here.</em>
          </h2>
          <p>
            Share your goals, ask a question, or explore how we might work
            together.
          </p>
          <p className="eyebrow">EMAIL</p>
          {site.email ? (
            <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer">
              {site.email}
            </a>
          ) : (
            <p>Business email to be provided.</p>
          )}
          <p className="eyebrow">SOCIAL</p>
          {site.socials.length ? (
            site.socials.map((s) => (
              <a key={s.label} href={s.url}>
                {s.label}
              </a>
            ))
          ) : (
            <p>Social links coming soon.</p>
          )}
        </aside>
        <ContactForm />
      </section>
    </>
  );
}
