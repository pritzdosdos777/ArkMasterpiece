export const site = {
  name: "Ark Masterpiece",
  owner: "Jean Monica",
  email: "",
  socials: [] as { label: string; url: string }[],
};
export const services = [
  [
    "Virtual Assistance",
    "Make room for the work only you can do. Thoughtful support for your everyday digital tasks.",
  ],
  [
    "Social Media Management",
    "Bring consistency to your online presence with content planning and community support.",
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
};
// Add only owner-approved original artwork. See README for the complete guide.
export const projects: Project[] = [];
export const testimonials: { quote: string; name: string; role?: string }[] =
  [];
