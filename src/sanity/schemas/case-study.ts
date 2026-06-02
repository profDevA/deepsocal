import { defineField, defineType } from "sanity";

const editorialThemes = [
  { title: "Ocean & Environment", value: "ocean-environment" },
  { title: "Mental Health", value: "mental-health" },
  { title: "Local Commerce", value: "local-commerce" },
  { title: "Culture", value: "culture" },
  { title: "Climate Resilience", value: "climate-resilience" },
  { title: "AI & Digital Access", value: "ai-digital-access" },
];

const serviceOptions = [
  { title: "Brand Strategy", value: "brand-strategy" },
  { title: "Identity Systems", value: "identity-systems" },
  { title: "Digital Experiences", value: "digital-experiences" },
  { title: "Next-Gen Innovations", value: "next-gen-innovations" },
];

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Meta & Classification" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "tag",
      title: "Tag (card label)",
      type: "string",
      description: "Primary label shown on the work grid card (e.g. 'Design + Research')",
      group: "meta",
    }),
    defineField({
      name: "tags",
      title: "Hero Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Pill labels on the case study hero",
      group: "meta",
    }),
    defineField({
      name: "editorialTheme",
      title: "Editorial Theme",
      type: "string",
      options: { list: editorialThemes },
      validation: (Rule) => Rule.required(),
      group: "meta",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: serviceOptions,
      },
      group: "meta",
    }),
    defineField({
      name: "servicesLabel",
      title: "Services Label",
      type: "string",
      description: "Display text for services in the detail page (e.g. 'Strategy + Branding +')",
      group: "meta",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "scope",
      title: "Scope",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "teamLabel",
      title: "Team",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "summary",
      title: "Summary (left column)",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "summary2",
      title: "Summary (right column)",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "impactMetrics",
      title: "Impact Metrics",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls card position in the work grid",
      validation: (Rule) => Rule.required().integer().positive(),
      group: "meta",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      group: "media",
    }),
    defineField({
      name: "thumbnailImage",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      description: "Used on the work grid card. Leave empty for category/theme cards.",
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Large parallax images between the meta block and video section (add as many as you like — they stack vertically).",
      group: "media",
    }),
    defineField({
      name: "carouselImages",
      title: "Carousel Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Images for the bottom carousel section (with dots + arrow). Impact Metrics and Services shown alongside.",
      group: "media",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tag",
      media: "thumbnailImage",
      order: "order",
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order ?? "?"} — ${title}`,
        subtitle: subtitle || "Theme card",
        media,
      };
    },
  },
});
