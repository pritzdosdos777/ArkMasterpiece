import type { MockupKind } from "./mockups";
import importedProjects from "./projects.json";
export const site = {
  name: "Ark Masterpiece",
  owner: "Jean Monica",
  email: "jeanmonicarche@gmail.com",
  socials: [
    { label: "Facebook", url: "https://www.facebook.com/jnmncpnl" },
    { label: "Instagram", url: "https://www.instagram.com/jnmncpnl/" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/jean-monica-panelo-3b6547317/",
    },
  ] as { label: string; url: string }[],
};
export const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=" +
  encodeURIComponent(site.email);

export const services = [
  [
    "Virtual Assistance",
    "Make room for the work only you can do. Thoughtful support for your everyday digital tasks.",
  ],
  [
    "Graphic Design & Branding",
    "Turn your ideas into considered visuals, from brand essentials to campaign graphics.",
  ],
  [
    "Digital Marketing",
    "Connect your message with your audience through purposeful digital campaigns.",
  ],
  [
    "Content Creation & Video Editing",
    "Shape your stories into engaging visual content for your digital channels.",
  ],
  [
    "Website Design & Funnel Support",
    "Create a clear path from first impression to meaningful action.",
  ],
  [
    "Email Marketing",
    "Keep your audience connected with thoughtfully designed email communications.",
  ],
  [
    "Administrative & Business Support",
    "Bring structure to the details, so your business can move forward.",
  ],
];
export type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  description?: string;
  original?: string;
  featured?: boolean;
  mockup?: {
    src: string;
    width: number;
    height: number;
    kind: MockupKind;
    method?: "scene-render" | "photographic";
  };
};
// Add only owner-approved original artwork. See README for the complete guide.
export const projects: Project[] = importedProjects as Project[];
export const testimonials: { quote: string; name: string; role?: string }[] =
  [];

export const portraits = {
  studio: "/brand/founder.webp",
  studioWidth: 1254,
  studioHeight: 1254,
  about: "/brand/about.webp",
  aboutWidth: 1132,
  aboutHeight: 1390,
};

export const portfolioCategories = [
  { name: "Book Covers", slug: "book-covers" },
  { name: "Designs & Logos", slug: "designs-logos" },
  { name: "Social Media Graphics", slug: "social-media-graphics" },
  { name: "Email Marketing Designs", slug: "email-marketing-designs" },
  { name: "Product Designs", slug: "product-designs" },
] as const;
