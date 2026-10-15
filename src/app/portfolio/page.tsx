import { Intro, CTA } from "@/components/sections";
import { Gallery } from "@/components/gallery";
import { VideoPortfolio } from "@/components/video-portfolio";
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
        <a className="video-jump" href="#video-editing">
          Explore video editing ↓
        </a>
        <Gallery />
      </section>
      <VideoPortfolio />
      <CTA />
    </>
  );
}
