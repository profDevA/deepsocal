import { defineField, defineType } from "sanity";

const steepcOptions = [
  { title: "Social", value: "social" },
  { title: "Tech", value: "tech" },
  { title: "Economic", value: "economic" },
  { title: "Environment", value: "environment" },
  { title: "Political", value: "political" },
  { title: "Cultural", value: "cultural" },
];

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Card Subtitle",
      type: "text",
      rows: 2,
      description: "Long line shown on the category card in the work grid.",
    }),
    defineField({
      name: "description",
      title: "Carousel Description",
      type: "string",
      description:
        "Short line shown next to the theme card in the 'Why Are We Different' carousel.",
    }),
    defineField({
      name: "steepc",
      title: "STEEPC",
      type: "string",
      options: { list: steepcOptions },
    }),
    defineField({
      name: "bgColor",
      title: "Background Color",
      type: "string",
      description: "Hex color for the theme card background (e.g. #D9DDD1).",
    }),
    defineField({
      name: "badge",
      title: "Badge Icon",
      type: "image",
      options: { hotspot: true },
      description: "Circular badge/icon for the category card.",
    }),
    defineField({
      name: "carouselImage",
      title: "Carousel Image",
      type: "image",
      options: { hotspot: true },
      description: "Large photo card shown next to the theme card in the carousel.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls category position in the work grid (ascending).",
      validation: (Rule) => Rule.required().integer().positive(),
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
    select: { title: "name", subtitle: "description", media: "badge", order: "order" },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order ?? "?"} — ${title}`,
        subtitle,
        media,
      };
    },
  },
});
