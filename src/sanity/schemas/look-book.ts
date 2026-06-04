import { defineField, defineType } from "sanity";

// Categories mirror the three column labels above the About page grid
// (Community / Growth / Impact). Optional — the grid renders as one ordered
// gallery regardless, but tagging keeps the door open for grouping later.
const categories = [
  { title: "Community", value: "community" },
  { title: "Growth", value: "growth" },
  { title: "Impact", value: "impact" },
];

export default defineType({
  name: "lookBookImage",
  title: "Look Book Image",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Short description of the image for accessibility / SEO.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categories },
      description: "Optional — Community, Growth, or Impact.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls position in the look book grid (ascending).",
      validation: (Rule) => Rule.integer(),
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
    select: { media: "image", category: "category", order: "order" },
    prepare({ media, category, order }) {
      return {
        title: `${order ?? "?"} — Look Book`,
        subtitle: category
          ? category[0].toUpperCase() + category.slice(1)
          : "Uncategorized",
        media,
      };
    },
  },
});
