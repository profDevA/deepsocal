import type { StructureResolver } from "sanity/structure";

// Custom Studio navigation: case studies are nested UNDER their category.
//
// Sanity documents are flat in the dataset (a Case Study keeps a `category`
// reference), but the Structure Builder lets us PRESENT them as a tree:
//
//   Categories
//     └─ <Category>            ← click drills in
//          ├─ Category Details (edit name / slug / images / colors)
//          └─ Case Studies     ← only this category's studies, ordered
//
// This is the standard Sanity way to get "subdirectory" UX without breaking
// querying, references, or routing.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Categories")
        .child(
          S.documentTypeList("category")
            .title("Categories")
            .defaultOrdering([{ field: "order", direction: "asc" }])
            .child((categoryId) =>
              S.list()
                .title("Category")
                .items([
                  S.listItem()
                    .title("Category Details")
                    .child(
                      S.document()
                        .documentId(categoryId)
                        .schemaType("category")
                    ),
                  S.listItem()
                    .title("Case Studies")
                    .child(
                      S.documentList()
                        .title("Case Studies")
                        .schemaType("caseStudy")
                        .filter(
                          '_type == "caseStudy" && category._ref == $categoryId'
                        )
                        .params({ categoryId })
                        .defaultOrdering([
                          { field: "order", direction: "asc" },
                        ])
                        // New studies created here are pre-assigned to this
                        // category (see template in sanity.config.ts).
                        .initialValueTemplates([
                          S.initialValueTemplateItem(
                            "caseStudy-by-category",
                            { categoryId }
                          ),
                        ])
                    ),
                ])
            )
        ),

      S.documentTypeListItem("lookBookImage").title("Look Book Image"),
    ]);
