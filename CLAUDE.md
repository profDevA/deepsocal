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
- Payments: Stripe (checkout)
- Email: Resend

**Pages (`src/app/`):**
- `/` — Homepage (Hero, CompaniesMarquee, WhyAreWeDifferent, WorkGrid, Testimonials, BannerCarousel)
- `/about` — About page (team grid, FAQ accordion)
- `/works/[slug]` — Case study detail (dynamic, `generateStaticParams`)
- `/services/[slug]` — Service detail (4 services, `generateStaticParams`)
- `/shop` — Product listing
- `/shop/[slug]` — Product detail

**Key components (`src/components/`):**
- `home/Hero.tsx` — Full-screen hero with video (`/videos/california.mp4`) and staggered text reveal (GSAP)
- `home/WhyAreWeDifferent.tsx` — Pinned section with horizontal carousel (map + pair-snap on scroll)
- `home/WorkGrid.tsx` — Client component; in-place service filtering via dropdown, swaps content without navigation
- `home/CompaniesMarquee.tsx` — Infinite-scroll client logo marquee
- `home/Testimonials.tsx` — Custom state-driven 3-card testimonial carousel with smooth scaling
- `work/CaseStudyCard.tsx` — Dual-variant card (image vs editorial/category); hover shows category color
- `work/WorkFilterDropdown.tsx` — Service filter dropdown; emits `onChange(serviceId | null)` for in-place content swap
- `layout/Header.tsx` / `Footer.tsx` / `PageFrame.tsx` — Shared shell
- `modals/` — Contact, scoping, partner modals (Radix Dialog)
- `animation/RevealOnScroll.tsx` — Generic IntersectionObserver reveal wrapper

**Data layer (`src/data/`):**
- `case-studies.ts` — All case studies with slug, title, thumbnailImage, editorialTheme, order, etc. Explicit objects (no `seed()` factory).
- `socal-themes.ts` — SoCal editorial themes (id, bgColor, carouselImage, badgeImage). Also exports the `STEEPC` type.
- `theme-icons.ts` — SVG path data for each editorial theme icon
- `services.ts` — 4 service definitions
- `products.ts` — Shop products (explicit objects, no factory function)
- `team.ts` — Team members
- `companies.ts` — Client logos for marquee
- `testimonials.ts` — Testimonial quotes (each entry is independent — no shared placeholder constants)
- `faqs.ts` — FAQ items

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

## Services Dropdown (In-Place Content Swap)

The homepage `WorkGrid` integrates with `WorkFilterDropdown` to swap content **in place** without navigation (mimicking the Stanford D.School pattern):

- `WorkFilterDropdown` (client component) emits `onChange(serviceId | null)`
- `WorkGrid` (client component) holds `activeService` state
- When a service is selected, `WorkGrid` renders the service's name + `longDescription` above the grid, and filters case studies via `getCaseStudiesByService(serviceId)`
- "All Works" resets the state to `null` and shows the full ordered grid

Do **not** route to `/services/[slug]` from the homepage filter — the dropdown is purely state-driven. The standalone `/services/[slug]` pages still exist for direct/SEO access.

## Figma Reference

Design file: `I53058PEBiq17COrTraapK` (DP_June_2026--LATEST-)
- Homepage: `12:308`, All Works: `12:341`, Why Are We Different: `110:413` / `263:588`
- Services dropdown: `12:1805`, Brand Strategy: `12:718`
- OC Resource Navigator card: `77:582`
- Use `get_design_context` via Figma MCP for measurements and assets
