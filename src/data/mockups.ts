import type { Project } from "./content";
export type MockupKind =
  "book" | "sign" | "poster" | "laptop" | "phone" | "tablet" | "product";
export const mockupLabels: Record<MockupKind, string> = {
  book: "Book cover mockup",
  sign: "Brand sign mockup",
  poster: "Framed print mockup",
  laptop: "Social creative on laptop",
  phone: "Social creative on phone",
  tablet: "Email design on tablet",
  product: "Apparel concept display",
};
export function mockupKind(project: Project): MockupKind {
  if (project.mockup) return project.mockup.kind;
  if (project.category === "Book Covers") return "book";
  if (project.category === "Email Marketing Designs") return "tablet";
  if (project.category === "Social Media Graphics")
    return project.height / project.width > 1.4 ? "phone" : "laptop";
  if (project.category === "Product Designs") return "product";
  return /logo|Ark Designs|Ahria|Worshipper/i.test(project.title)
    ? "sign"
    : "poster";
}
