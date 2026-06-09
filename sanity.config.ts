import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemas";
import { structure } from "@/sanity/structure";
import { projectId, dataset } from "@/sanity/env";

export default defineConfig({
  name: "deepsocal-studio",
  title: "DeepSoCal Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // Lets the "+" inside a category's Case Studies pane pre-fill the
    // category reference for newly-created studies.
    templates: (prev) => [
      ...prev,
      {
        id: "caseStudy-by-category",
        title: "Case Study (in category)",
        schemaType: "caseStudy",
        parameters: [{ name: "categoryId", type: "string" }],
        value: (params: { categoryId: string }) => ({
          category: { _type: "reference", _ref: params.categoryId },
        }),
      },
    ],
  },
});
