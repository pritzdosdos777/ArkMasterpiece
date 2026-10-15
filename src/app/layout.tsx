import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui";
import { Footer } from "@/components/sections";
export const metadata: Metadata = {
  icons: { icon: "/brand/ark-masterpiece-logo.webp" },
  title: {
    default: "Ark Masterpiece | Creative & Digital Services",
    template: "%s | Ark Masterpiece",
  },
  description:
    "Thoughtful design, digital marketing and virtual assistance with Jean Monica at Ark Masterpiece.",
  openGraph: {
    title: "Ark Masterpiece",
    description: "Your vision. Our creativity. A digital masterpiece.",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>{`.scroll-reveal,.featured-card{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
