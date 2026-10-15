import { Intro, CTA } from "@/components/sections";
import { Gallery } from "@/components/gallery";
export const metadata = {
  title: "Portfolio",
  description: "Explore original creative work from Ark Masterpiece.",
};
export default function Page() {
  return (
    <>
      <Intro
        eyebrow="A COLLECTION OF CREATIVE POSSIBILITIES"
        title="Made with purpose. Designed to connect."
        description="A space for original designs, thoughtful details, and ideas brought to life."
      />
      <section className="section">
        <Gallery />
      </section>
      <CTA />
    </>
  );
}
