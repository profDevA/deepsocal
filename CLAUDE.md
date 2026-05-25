# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Development

```bash
npm run dev
```

Visit `http://localhost:3000`. Build for production with `npm run build`.

## Architecture

Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4.

**Stack:**
- Framework: Next.js 16.2.1 (App Router, `src/app/`)
- Styling: Tailwind CSS 4 via `@tailwindcss/postcss` — no `tailwind.config`, tokens defined in `globals.css` `@theme`
- Animations: GSAP 3.15 + `@gsap/react` (`useGSAP`, `ScrollTrigger` for pinning & horizontal scroll)
- UI primitives: Radix UI (accordion, dialog, dropdown)
- Carousel: Embla Carousel
- Icons: `react-icons` (Fa6)
- CMS: Sanity (case studies) — embedded studio at `/studio`
- Payments: Stripe (checkout)
- Email: Resend

**Pages (`src/app/`):**
- `/` — Homepage (Hero, CompaniesMarquee, WhyAreWeDifferent, WorkGrid, Testimonials, BannerCarousel)
- `/about` — About page (hero, mission, team grid, "WE'RE SOCAL-LOCAL" community grid, FAQ accordion)
- `/works/[slug]` — Case study detail (dynamic, `generateStaticParams`)
- `/services/[slug]` — Service detail (4 services, `generateStaticParams`)
- `/shop` — Product listing (hidden from nav per 5/22 meeting — not a launch priority)
- `/shop/[slug]` — Product detail
- `/studio` — Embedded Sanity Studio (content management)

**Key components (`src/components/`):**
- `home/Hero.tsx` — Full-screen hero with video (`/videos/california.mp4`) and staggered text reveal (GSAP)
- `home/WhyAreWeDifferent.tsx` — Pinned section with horizontal carousel (map + pair-snap on scroll)
- `home/WorkGrid.tsx` — Client component; in-place service filtering via dropdown, swaps content without navigation
- `home/CompaniesMarquee.tsx` — Infinite-scroll client logo marquee
- `home/Testimonials.tsx` — Custom state-driven 3-card testimonial carousel with smooth scaling
- `work/CaseStudyCard.tsx` — Dual-variant card (image vs editorial/category); hover shows category color
- `work/WorkFilterDropdown.tsx` — Service filter dropdown; emits `onChange(serviceId | null)` for in-place content swap
- `layout/Header.tsx` / `Footer.tsx` / `PageFrame.tsx` — Shared shell
- `layout/PageFrame.tsx` — Fixed-position decorative rails (15px from each edge) + rotated `CONTACT US` button on the right rail. Used on `/` and `/about`. `pointer-events-none` except for the button.
- `home/BigWordmark.tsx` — Big "DeepSocal" wordmark rendered in root layout (appears on every page). Includes social icon row in bottom-right (Instagram, Dribbble, Threads, X).
- `about/FAQAccordion.tsx` — Radix Accordion with **plus icon** (rotates 45° → "×" when open). Asymmetric padding `pt-[13px] pb-[14px]`, button `36×30.4px` matches Figma sizing. Note: Figma shows a curved arrow but Fas explicitly preferred the plus sign (5/21 review).
- `shop/ShopHeroCard.tsx` — Client component: GSAP-animated vertical product carousel inside a bordered hero card. Handles wheel scroll, touch/swipe, and dot-click navigation.
- `modals/` — Contact, scoping, partner modals (Radix Dialog)
- `animation/RevealOnScroll.tsx` — Generic IntersectionObserver reveal wrapper

**Data layer (`src/data/` + `src/sanity/`):**
- `case-studies.ts` — Static fallback case studies + TypeScript types. Still used when Sanity is not configured.
- `socal-themes.ts` — SoCal editorial themes (id, bgColor, carouselImage, badgeImage). Also exports the `STEEPC` type.
- `services.ts` — 4 service definitions
- `products.ts` — Shop products (explicit objects, no factory function)
- `team.ts` — Discipline groups for the About page (Design team, Marketing, Development, Research, Branding). No `leadership` array — featured-leader cards were removed from the About page in the latest Figma. `TeamMember` type also removed; only `TeamGroup` remains.
- `companies.ts` — Client logos for marquee
- `testimonials.ts` — Testimonial quotes (each entry is independent — no shared placeholder constants)
- `faqs.ts` — FAQ items. `faqValueTags` was removed (was only used by the About page; the "community value" tags array now lives locally in `src/app/about/page.tsx` as `communityValueTags`).

**Sanity CMS (`src/sanity/`):**
- `env.ts` — Reads `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION` from env
- `lib/client.ts` — Sanity client (createClient)
- `lib/image.ts` — Image URL builder
- `lib/queries.ts` — GROQ queries for case studies
- `lib/fetch.ts` — Data-fetching functions (always queries Sanity — no silent fallback)
- `schemas/case-study.ts` — Sanity document schema for case studies
- `schemas/index.ts` — Schema registry
- `sanity.config.ts` (root) — Studio configuration (basePath `/studio`)

## Data Conventions

- **No placeholder factory functions.** Every data object is written out explicitly. If a field has no real value yet, use an empty string `""` or empty array `[]` — never shared placeholder text constants.
- **No fake fallbacks in services/libs.** `lib/resend.ts` requires `RESEND_API_KEY` from env; no fake key fallback.
- Figma is the single source of truth for content. Empty fields mean "data not provided yet."

## CSS Conventions

- Global tokens live in `src/app/globals.css` under `@theme { ... }`
- Fonts: `font-bangers` (headlines/titles), `font-inter` (body), `font-quintessential` (section subtitles), `font-druk`, `font-zilla`
- Base background: `#e3dfdc`, section backgrounds: `#e6e6e6`
- **Prefer fixed pixel values** (matching Figma) over `clamp()` / `vw`. Use Tailwind arbitrary values like `text-[48px]`, `px-[40px]`.
- Use `clamp()` only when truly needed for responsive sizing; otherwise be explicit so the design matches Figma 1:1.
- Color tokens: `--color-dark`, `--color-brand`, `--color-primary-sage`, `--color-primary-orange`
- Editorial card colors: `--color-card-ocean` (#D9DDD1), `--color-card-mental` (#F5B086), `--color-card-commerce` (#F3D4C4), etc.

## Work Grid Structure

Cards are ordered by the `order` field in `case-studies.ts`. The grid follows a pattern:
- **Category card** (editorial variant, no `thumbnailImage`) — colored background, SVG icon, big title
- **Content items** (image variant, has `thumbnailImage`) — photo top, white bottom panel

Each image card's `editorialTheme` links it to a category. On hover, the white bottom panel transitions to that category's `bgColor`.

## GSAP Notes

- `WhyAreWeDifferent` pins the entire section and animates horizontal scroll via `ScrollTrigger`
- Do NOT wrap GSAP-pinned sections in `RevealOnScroll` — `transform` breaks `position: fixed`
- Register plugins in client components: `if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger); }`

### WhyAreWeDifferent — Pair-snap scroll animation

The horizontal carousel uses **event-based snapping**, not `scrub`. Each pair (photo card + theme card) snaps into place with a slider-like animation:

- `STEP_SCROLL = 300` — vertical pixels of scroll required to advance one pair
- `STEP_WIDTH = PAIR_WIDTH + OUTER_GAP` — horizontal distance the track travels per pair
- `ScrollTrigger.create({ ..., onUpdate })` watches scroll progress, computes `Math.round(progress * (pairs - 1))`, and triggers `gsap.to()` only when the active index changes
- Animation runs independently from scroll position — feels like clicking a "next" slider button rather than dragging
- Total pinned scroll length = `(pairCount - 1) * STEP_SCROLL`

**Do NOT use `scrub`** here — it ties the track to scroll position and creates a laggy, stiff feel. The event-based approach is responsive and smooth.

## About Page Layout (Figma node `12:1037`)

The About page (`src/app/about/page.tsx`) is built section-by-section to match Figma 1:1:

1. **Hero** — `SOCAL-LOCAL` headline (96px Bangers), description, coastline image (1358×725, rounded 27px), then a centered `DISCOVER OUR APPROACH` button (201×43, dark bg, Bangers 18px). 80px gap from image to button, 128px gap from button to the "WE ARE DESIGNERS…" mission line. Spacers use inline `<div style={{ height: 80px }}>` for guaranteed predictable spacing (avoids any Tailwind purge edge cases with sibling-margin arbitrary values).
2. **Team** — left column ("team" title + paragraph), right column = 5 discipline groups in a 3-column grid. Group titles use **Inter Semibold 18px uppercase** (not Bangers), members use Inter Regular 16px. Vertical divider between columns.
3. **WE'RE SOCAL-LOCAL** — centered title + description, then "Community / Growth / Impact" row, then a **3×2 image grid** (6 photos at `aspect-square`, 26px radius, 0.5px `#adadad` border, subtle shadow). The middle-top card is the Instagram-themed white card with a small Instagram glyph overlay in the bottom-right. Below the grid: `communityValueTags` (8 tags) with **natural content widths**, 12px horizontal padding, `whitespace-nowrap`. **Do not hardcode per-tag pixel widths** — that's brittle; consistent padding handles it.
4. **FAQ** — left column ("FAQS" title + paragraph), right column = `FAQAccordion`. Vertical divider between. Toggle button is `36×30.4px` with a **plus icon** (`FaPlus` from `react-icons/fa6`) that rotates 45° to "×" when open. Per-Fas preference over the Figma curved arrow.

### Section divider convention (matches home page)

Horizontal section dividers (`border-t border-b border-dark`) must **not cross the vertical rails** rendered by `PageFrame` (which sit 15px from each edge).

Pattern used on both home (`WhyAreWeDifferent`, `CompaniesMarquee`) and about (`Team`, `FAQ`):

```tsx
<section className="w-full">
  <div className="border-t border-b border-dark mx-[25px] py-[60px]">
    {/* section content */}
  </div>
</section>
```

`mx-[25px]` puts the divider endpoints 25px from the viewport edge — leaving a **10px gap** to the vertical rails at 15px. Do not put `border-t` directly on the `<section>` (extends to viewport edge and crosses the rails).

### Social icons (BigWordmark)

`BigWordmark` renders the four social platform icons (Instagram, Dribbble, Threads, X / Twitter) as 36px black circles in the bottom-right corner of the wordmark section. Icons come from `react-icons/fa6` (`FaInstagram`, `FaDribbble`, `FaThreads`, `FaXTwitter`).

**TODO**: replace placeholder `href="#"` values in `socialLinks` with real account URLs when provided.

## Header Navigation Links

`src/components/layout/Header.tsx` — `navItems`:
- **Our Work** → `/#work` (works section on homepage)
- **Our Difference** → `/about` (NOT `/#difference` — Fas directed in 5/21 review that "Our Difference" should route to the About page since that's where the "WE'RE SOCAL-LOCAL why the community chooses us as embedded allies" content lives)
- ~~**The Shop** → `/shop`~~ (hidden per 5/22 — not a launch priority)
- **Book a call** → opens contact modal (no route)

## Services Dropdown (In-Place Content Swap)

The homepage `WorkGrid` integrates with `WorkFilterDropdown` to swap content **in place** without navigation (mimicking the Stanford D.School pattern):

- `WorkFilterDropdown` (client component) emits `onChange(serviceId | null)`
- `WorkGrid` (client component) holds `activeService` state
- When a service is selected, `WorkGrid` renders the service's name + `longDescription` above the grid, and filters case studies via `getCaseStudiesByService(serviceId)`
- "All Works" resets the state to `null` and shows the full ordered grid

Do **not** route to `/services/[slug]` from the homepage filter — the dropdown is purely state-driven. The standalone `/services/[slug]` pages still exist for direct/SEO access.

## Shop Page Layout (Figma node `161:1151`)

The shop page uses a server component (`src/app/shop/page.tsx`) for metadata + title, and a client component (`src/components/shop/ShopHeroCard.tsx`) for the interactive product carousel.

1. **Hero header** (outside the card) — `Shop the Look` (Bangers 96px) + 482px wide intro paragraph, centered. 80px top padding, 60px bottom padding.
2. **Product card container** — `max-w-[1384px]` rounded `30px` card with `border border-[#c4c4c4]` and `overflow-hidden`. Fixed `h-[1162px]` on desktop so only ~2.5 product cards are visible — the rest are clipped by overflow.
   - **Hero background** — `Image fill` covers the entire card behind the products. Uses `shop-main-bg.png` (woman with DeepSoCal bottle). `-z-10` so it sits behind the product column.
   - **Vertical pagination dots** — one dot per product, 5th filled by default. Positioned at `right-[26px]` of the card, `-rotate-90` so they read vertically. White dots with white border. Hidden below `lg` breakpoint. Dots are interactive — clicking scrolls to that product.
   - **Product cards column** — absolutely positioned at `right-[91px] top-[85px] w-[399px]`, floating over the hero image. GSAP-animated vertical slider (`power2.out` ease, 0.55s duration). Supports mouse wheel (500ms cooldown), touch/swipe, and dot-click navigation.

### Product card (`<ProductCard />`)

Each product card is `445px` tall, rounded `30.593px`, `bg-[#dadada]`:
- **Product image** — fills entire card as background (`next/image fill`, `object-cover object-top`). The white panel covers the bottom half, so only the top ~245px of the image is visible.
- **Floating price tag** — positioned at `top-[39px] left-[228px]`, `rgba(0,0,0,0.6)` pill, Bangers 20px white text, format `$ <price>  + Shipping`
- **Bottom panel (~200px)** — white panel with rounded corners (`z-[5]` to sit above the background image), title (Bangers 36px uppercase) + 3-line description (Inter 16px) + `FaArrowRight` icon. The arrow translates right 1px on hover.
- Products without images show a colored placeholder using `product.themeColor`.

### Shop image assets (`public/images/shop/`)

- `shop-main-bg.png` — hero card background (woman with DeepSoCal bottle)
- `the-t-shirt.png` — folded t-shirt product photo
- `the-hoodie.png` — black hoodie with DeepSoCal logo
- `the-bottle.png` — DeepSoCal water bottle

## Case Study Detail Layout (Figma node `12:1263`)

The case study page (`src/app/works/[slug]/page.tsx`) is composed of five distinct sections:

1. **Hero** (`CaseStudyHero`) — `aspect-1384/764` rounded `30px` card with `border border-[#c4c4c4]`. The hero image is rendered with `next/image fill` then overlaid with a warm **orange tint** `rgba(223,136,73,0.2)` per Figma. Tag pills (Bangers 20px on `rgba(0,0,0,0.6)`) anchor to bottom-left of the hero with 37px gap. The three tags repeat the same label intentionally in the OC Navigator mock (`["DESIGN + RESEARCH", "DESIGN + RESEARCH", "DESIGN + RESEARCH"]`) — that's straight from the Figma comp.
2. **Meta block** (`CaseStudyMeta`) — Title + subtitle sit at the **top** of the section (own block, `mb-[52px]`). Below that, a 3-column grid (`grid-cols-[1fr_1fr_1fr]`, `gap-[80px]`) with: left = meta `<dl>` with `( client ) / ( industry ) / ( scope ) / ( team )`, middle and right = two identical "Summary" columns. This layout matches Figma where the summaries are positioned below the title, not beside it. The summary columns render only when populated.
3. **Gallery** (`CaseStudyGallery`) — up to two large `aspect-1380/728` rounded `30px` images stacked vertically with 40px gap. The second image has a slightly stronger overlay (`rgba(0,0,0,0.2)` vs `rgba(0,0,0,0.05)`) per Figma.
4. **Video block** (`CaseStudyVideoBlock`) — split inside a horizontal-bordered band (`border-t border-b border-dark`). Left = `aspect-642/399` poster with a next-slide arrow button anchored to the right edge (`rgba(2,2,2,0.8)` bg, white `FaArrowRight`) plus 7 pagination dots underneath. Right = `Impact Metrics` paragraph + `Services` line, separated from the left by a vertical divider (`md:divide-x md:divide-dark`).
5. **Prev / Next nav** (`CaseStudyNav`) — `Back to Work` (left) + `Next project` (right), Inter Medium 24px uppercase **underlined**, separated by a `border-b-[0.75px] border-dark`.

### Case study data shape

`CaseStudy` (in `src/data/case-studies.ts`) drives the page. Key fields used by the detail page:

- `heroImage` — used for the hero card (orange overlay applied on top)
- `tags` — array of pill labels; render only when non-empty
- `client / industry / scope / teamLabel` — meta list; each row renders only when populated
- `summary / summary2` — two side-by-side paragraphs (omit a column by leaving empty)
- `gallery[0..1]` — up to two large parallax images between meta and video
- `gallery[0]` (or `heroImage` as fallback) — also used as the video poster
- `impactMetrics / servicesLabel` — right side of the video block

The `oc-navigator` case study is the canonical Figma-aligned example. When adding new case studies, populate the same fields for design parity.

### Figma CDN caveat

Some Figma MCP image assets fail to serve through `figma.com/api/mcp/asset/<id>` and return ~2.5KB blank PNGs instead of the real image. When that happens:

1. Re-call `get_design_context` to get a fresh signed URL — sometimes it fixes itself.
2. If it still fails, use an existing asset from `public/images/` as a fallback. Document the swap in the data file with a comment so the real asset can be swapped in later.

Successfully downloaded for this build:
- `public/images/shop/the-t-shirt.png`, `the-bottle.png`, `the-hoodie.png`, `shop-main-bg.png`
- `public/images/case-studies/detail-hero-family.png`, `detail-gallery-2.png`

Pending re-download (CDN returned blanks): case study `detail-gallery-1.png` and `detail-video-poster.png` (uses surf/family fallbacks).

## Sanity CMS Setup

Case studies are managed via Sanity. `NEXT_PUBLIC_SANITY_PROJECT_ID` must be set in `.env.local` for the site to work.

### First-time setup

1. Create a Sanity project at https://www.sanity.io/manage
2. Copy `.env.local.example` → `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Add `http://localhost:3000` as a CORS origin in Sanity project settings (API → CORS origins)
4. Run `npm run dev` and visit `http://localhost:3000/studio` — the embedded Sanity Studio appears
5. Seed existing case studies: `SANITY_PROJECT_ID=xxx SANITY_TOKEN=yyy node scripts/seed-sanity.mjs`

### Adding a new case study

1. Open `/studio` → create a new Case Study document
2. Fill in the fields (title, slug, editorial theme, images, etc.)
3. Publish — the site picks it up automatically on next request

### Architecture

- Server components (`works/[slug]`, home page, services, sitemap) call `src/sanity/lib/fetch.ts`
- `fetch.ts` checks for `NEXT_PUBLIC_SANITY_PROJECT_ID` — if missing, imports static data instead
- The `WorkGrid` client component receives case studies as props from the home page server component
- Images in Sanity are uploaded as assets and served via Sanity's CDN; image URLs are resolved in GROQ queries

## Figma Reference

Design file: `I53058PEBiq17COrTraapK` (DP_June_2026--LATEST-)
- Homepage: `12:308`, All Works: `12:341`, Why Are We Different: `110:413` / `263:588`
- About page: `12:1037` (full frame), FAQ block: `92:1942`, big wordmark + social icons: `92:2051` / `92:2054`
- Case Study Single: `12:1263` (hero `12:1266`, gallery `12:1328` / `12:1391`, video block `12:1378`)
- Shop page: `161:1151` (hero image `161:1189`, product card template `161:1203`)
- Services dropdown: `12:1805`, Brand Strategy: `12:718`
- OC Resource Navigator card: `77:582`
- Use `get_design_context` via Figma MCP for measurements and assets
