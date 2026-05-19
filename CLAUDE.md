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
- `home/Hero.tsx` — Full-screen hero with video/poster and staggered text reveal (GSAP)
- `home/WhyAreWeDifferent.tsx` — GSAP pinned section with horizontal carousel (map + cards)
- `home/WorkGrid.tsx` — 3-column grid of case study cards sorted by `order`
- `home/CompaniesMarquee.tsx` — Infinite-scroll client logo marquee
- `home/Testimonials.tsx` — Client testimonials section
- `work/CaseStudyCard.tsx` — Dual-variant card (image vs editorial/category); hover shows category color
- `work/WorkFilterDropdown.tsx` — "All Works" dropdown filter
- `layout/Header.tsx` / `Footer.tsx` / `PageFrame.tsx` — Shared shell
- `modals/` — Contact, scoping, partner modals (Radix Dialog)
- `animation/RevealOnScroll.tsx` — Generic IntersectionObserver reveal wrapper

**Data layer (`src/data/`):**
- `case-studies.ts` — All case studies with slug, title, thumbnailImage, editorialTheme, order, etc.
- `socal-themes.ts` — SoCal editorial themes (id, bgColor, carouselImage)
- `theme-icons.ts` — SVG path data for each editorial theme icon
- `services.ts` — 4 service definitions
- `products.ts` — Shop products
- `team.ts` — Team members
- `companies.ts` — Client logos for marquee
- `testimonials.ts` — Testimonial quotes
- `faqs.ts` — FAQ items

## CSS Conventions

- Global tokens live in `src/app/globals.css` under `@theme { ... }`
- Fonts: `font-bangers` (headlines/titles), `font-inter` (body), `font-quintessential` (section subtitles), `font-druk`, `font-zilla`
- Base background: `#e3dfdc`, section backgrounds: `#e6e6e6`
- Sizing uses `clamp()` and `vw` units for fluid responsiveness
- Tailwind arbitrary values are preferred over custom CSS (e.g., `text-[clamp(32px,4vw,48px)]`)
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

## Figma Reference

Design file: `I53058PEBiq17COrTraapK` (DP_June_2026--LATEST-)
- Homepage sections: node `12:341` (All Works), `110:413` / `263:588` (Why Are We Different)
- Use `get_design_context` via Figma MCP for measurements and assets
