import { Intro, Services, CTA } from "@/components/sections";
export const metadata = {
  title: "Services",
  description:
    "Explore proposed creative, marketing and business support services at Ark Masterpiece.",
};
export default function Page() {
  return (
    <>
      <Intro
        eyebrow="SUPPORT FOR YOUR NEXT CHAPTER"
        title="Your ideas. A thoughtful way forward."
        description="Creative services and practical digital support, shaped around what your business needs."
      />
      <section className="section">
        <p className="draft">
          The following service offerings are proposed and subject to owner
          confirmation. Contact us to discuss availability and scope.
        </p>
        <Services />
      </section>
      <CTA />
    </>
  );
}
