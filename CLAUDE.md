# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Brand direction (5/27 PM pivot) — typography + corner refactor

Fas pivoted the visual direction on **May 27, 2026** (evening Figma walkthrough with brand specialist — see `.cursor/meeting-notes/transcript_2026-05-27.md` + the 230-frame capture in `frames-2026-05-27/`). The pivot replaces the typographic and rounded-corner system. Layout / sections / colour palette / images / animations / GSAP choreography all **stay** — this is a typographic + corner + logo refactor, not a redesign.

Reference brand Fas is modeling: **[Buck Mason](https://www.buckmason.com/)** — quiet, refined, minimal-rounded. He explicitly doesn't want a "streetwear" feel; he's positioning for government and large-corporate contracts.

### What's shipped (5/27 PM session)

| Area | Status | Notes |
|---|---|---|
| Headline / title / wordmark font | ✅ Acumin Pro Condensed token live | Sourced from **Barlow Condensed** (Google Fonts) as stand-in until Israel ships licensed Acumin WOFFs. See `src/app/fonts.ts` for swap procedure — the Tailwind utility `font-acumin-condensed` and CSS variable `--nf-acumin-condensed` are intentionally **brand-named** so the font source can swap in one line without touching any component. |
| Body font | ✅ `font-acumin` aliased to Inter | Inter is the closest free match for Acumin Pro Regular. Same swap procedure when real Acumin lands. |
| `font-bangers` → `font-acumin-condensed` | ✅ Done across 22 files, 53 occurrences | Mechanical one-pass swap. `bangers` is still loaded as a fallback but **deprecated** — don't add new references. Remove after Fas signs off on the new font. |
| Default headline weight | `font-acumin-condensed { font-weight: 500 }` via base layer | Barlow Condensed at Regular 400 reads dramatically lighter than Bangers (single-weight display face); Medium 500 lands closest to Bangers' visual mass. Components needing extra heft (Hero / BigWordmark) can override with `font-semibold` / `font-bold`. |
| Rounded corners → square | ✅ Done | All `rounded-[Xpx]` removed from cards, hero containers, badges, side drawers (`rounded-l-[62px]`), case-study hero (`rounded-t-[30px]`), shop hero (`rounded-[30.593px]`), about hero (`rounded-[27px]`), etc. **Kept rounded**: `rounded-full` circles (close buttons, social icons, dots, badge circles), small `rounded-sm` tactile arrow buttons, and dropdown menus (`WorkFilterDropdown` at `rounded-[23px]`, `WorksFilter` at `rounded-[10px]`, `ServicePageLayout` selector at `rounded-[15px]` / `rounded-lg`) — dropdowns are UI primitives, not cards. |
| Testimonials placement | ✅ Already correct | Per transcript: "move testimonial down… centered here… then the footer." Code already has `Testimonials` at the bottom of the home-page sections (above the globally-rendered `BigWordmark` + `Footer`). No change needed. |
| Testimonials redesign | ✅ Done | Per Fas (5/28, Figma node `545:3909`): replaces the 3-card white-card carousel with a dark editorial 2-column layout (`bg-[#1e1e1e]`, white top/bottom borders). Left column = title (`Trusted by SoCal Brands`, Acumin Pro Condensed Bold 42px / leading 50px / tracking 1.26px / uppercase, white) + ghost nav buttons (`35×38px`, `bg-[#1e1e1e]` so same as section, distinguished only by the `drop-shadow-[0_0_8.15px_rgba(0,0,0,0.25)]` halo; `hover:bg-[#2a2a2a]` for affordance). Right column = inline quote glyph + italic quote text (Acumin/Inter italic 26px) + 62px circular avatar + author name italic. No card backgrounds, no rounded corners (avatar circles excepted), no dots indicator. Single-quote-at-a-time pattern with 180ms opacity fade on `prev` / `next`. The earlier 533:1277 Figma node is an OrthoFX reference screenshot — intentionally **not** the implementation target. |
| CompaniesMarquee → bottom | ✅ Done | Per transcript (para 32): "*this is very noisy. Let's make this simple… we also move this down*" — and para 46: "*[Testimonials] moving it down and then **this** goes next*". The client-logo strip moves from after `Hero` to be the **last** home section (after `Testimonials`, before the globally-rendered `BigWordmark`). Order is now: `Hero` → `WhyAreWeDifferent` → `WorkGrid` → `Testimonials` → `CompaniesMarquee`. |
| WorkGrid card colors → simplified | ✅ Done | Per Fas (5/28, Figma node `566:1642`): "*our works, we don't use many colors, just simple color, clean*" — then clarified: editorial cards use `#EDECE1` bg + `1px solid #B0B0B0` border; image-card bottom panels stay **white**. Replaces the previous 6-color STEEPC palette (ocean/mental/commerce/culture/climate/ai). Editorial card title also drops from `text-[60px]` / `leading-[60px]` → `text-[40px] / leading-[42px]` to match Figma. **`socal-themes.ts` `bgColor` field is preserved** — still consumed by `WhyAreWeDifferent`'s horizontal carousel theme cards. Only the work-grid stopped reading it. The `.group:hover .card-bottom-panel { --hover-bg }` rule was removed from `globals.css` — replaced with an explanatory comment so the absence is intentional, not a regression. |
| WorkGrid section subtitle font | ✅ Done | `How We work with SoCal Builders` swapped from `font-quintessential` (decorative serif/cursive) → `font-acumin` (Inter stand-in for Acumin Pro Regular). Tracking relaxed from `-1.4px` → `-0.7px` — tight kerning suited the serif display face but reads as squashed on Inter. |

### What's still open

- **Logo swap — done.** Three wordmark variants now sit in `public/images/`:
  - `deepsocal-wordmark.svg` — Header use. viewBox 182×41, fill `#333333`, **includes the trailing `(*)` mark**. Optimized path geometry for small-size rendering.
  - `deepsocal-wordmark-large.svg` — BigWordmark use. viewBox 1379×393, fill `#1E1E1E`, **no `(*)` mark** (would look misplaced at this scale). Higher-resolution source geometry for sharp rendering at full-viewport width.
  - `DeepSoCal-banner.svg` — Footer use. White-fill variant of the older artwork for the dark footer background. Will eventually need a white-fill version of the new artwork if footer is meant to match exactly.

  All three are font-independent vectors — the wordmark surfaces don't care which font ships in the Acumin/Barlow stand-in.
- **Real Acumin Pro WOFFs** — Israel said he has them; Fas to forward. When they arrive, drop them in `src/fonts/` and flip the `acuminCondensed` export in `fonts.ts` from `Barlow_Condensed({...})` to `localFont({ src: [...] })`. The CSS variable and Tailwind class don't change.
- **Per-element weight tuning** — `font-weight: 500` is a safe default. After Fas reviews, some elements may want `600`/`700` (Hero, BigWordmark) or `400` (small editorial labels).
- **Mobile pass** — Israel is producing mobile mocks in Figma. Hold the desktop implementation until those frames land.

### Type-system reference (Figma inspector spec)

Source of truth for headline rendering:

```css
font-family: 'Acumin Pro Condensed';
font-size: 42px;
font-weight: 700;
line-height: 50px;
letter-spacing: 1.26px;
text-transform: uppercase;
color: #333;
```

Full verbatim transcript quotes, brand-specialist context, and the complete component-by-component swap list are logged in the May 27 PM entry in `meeting_notes.md`.

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
- Smooth scroll: Lenis — inertia-based page scrolling (reference: [OrthoFX](https://www.orthofx.com/)). Integrated with GSAP via `gsap.ticker`. Component: `SmoothScroll.tsx` in root layout.
- UI primitives: Radix UI (accordion, dialog, dropdown)
- Carousel: Embla Carousel
- Icons: `react-icons` (Fa6)
- CMS: Sanity (case studies) — embedded studio at `/studio`
- Payments: Stripe (checkout)
- Email: Resend

**Pages (`src/app/`):**
- `/` — Homepage (`Hero` → `WhyAreWeDifferent` → `WorkGrid` → `Testimonials` → `CompaniesMarquee`, then the globally-rendered `BigWordmark` + `Footer`). `BannerCarousel.tsx` exists on disk but is not currently imported — kept as dead code in case it returns to the layout later.
- `/about` — About page (hero, mission, team grid, "WE'RE SOCAL-LOCAL" community grid, FAQ accordion)
- `/works/[slug]` — Case study detail (dynamic, `generateStaticParams`)
- `/services/[slug]` — Service detail (4 services, `generateStaticParams`)
- `/shop` — Product listing (re-enabled in nav 5/26 — client needs to see the shop page)
- `/shop/[slug]` — Product detail
- `/studio` — Embedded Sanity Studio (content management)

**Key components (`src/components/`):**
- `home/Hero.tsx` — Full-screen hero with video (`/videos/california.mp4`) and staggered text reveal (GSAP)
- `home/WhyAreWeDifferent.tsx` — Pinned section with horizontal carousel. Uses `scrub: true + snap` so the track position is bound 1:1 to scroll progress — direction is mathematically guaranteed to follow scroll direction. See "WhyAreWeDifferent — Pair-snap scroll animation" below.
- `home/WorkGrid.tsx` — Client component; in-place service filtering via dropdown + `view all` / `view less` expand toggle (default shows 12 cards, click to reveal the rest with GSAP fade-up animation, staggered)
- `home/CompaniesMarquee.tsx` — Infinite-scroll client logo marquee
- `home/Testimonials.tsx` — Dark editorial 2-column section (Figma node `545:3909`). Title + ghost nav buttons on the left, single italic quote + 62px avatar + author on the right. `prev` / `next` swap testimonials in place with a 180ms opacity fade. Replaces the older 3-card white-card carousel.
- `work/CaseStudyCard.tsx` — Dual-variant card (image vs editorial/category); hover shows category color
- `work/WorkFilterDropdown.tsx` — Service filter dropdown; emits `onChange(serviceId | null)` for in-place content swap
- `layout/Header.tsx` / `Footer.tsx` / `PageFrame.tsx` — Shared shell
- `layout/PageFrame.tsx` — Fixed-position decorative rails (15px from each edge) + rotated `CONTACT US` button on the right rail. Used on `/` and `/about`. `pointer-events-none` except for the button.
- `home/BigWordmark.tsx` — Big "DeepSocal" wordmark rendered in root layout (appears on every page). Includes social icon row in bottom-right (Instagram, Dribbble, Threads, X).
- `about/FAQAccordion.tsx` — Radix Accordion with a **right-arrow toggle** — the exact Figma vector (`arrow-right-down.svg` / "Vector 1145", inlined with `stroke="white"`) in a `#1e1e1e` `35×38px` square, matching Figma node `632:5829`. Arrow rotates 90° (points down) when open. Asymmetric padding `pt-[13px] pb-[14px]`. Per Fas 6/1 review: use the Figma arrow icon (supersedes the earlier plus/minus request).
- `shop/ShopHeroCard.tsx` — Client component: hero card with a vertical product track that streams upward via **GSAP ScrollTrigger pin + scrub** as the page scrolls past the section (OrthoFX "3 easy steps" pattern). Pin starts at the header's bottom edge (not behind it). No wheel/touch interception, no pagination dots — page scrolling drives the animation directly, snap gives card-by-card progress feedback.
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
- Fonts (post 5/27 brand pivot — in-flight refactor):
  - **Active going forward:** `font-acumin-condensed` (headlines/titles/wordmark), `font-acumin` (body)
  - **Deprecated, do not add new references:** `font-bangers` (was: headlines/titles — being replaced)
  - **Still in use:** `font-inter` (body fallback), `font-quintessential` (section subtitles), `font-druk`, `font-zilla`
  - See the "Brand direction (5/27 PM)" notice at the top of this file for the full pivot context.
- **Rounded corners removed** (5/27 pivot) on cards / modals / hero containers / badges / side drawers. New components default to square corners — do not add `rounded-[Xpx]` unless the Figma frame explicitly draws rounding. **Exceptions kept rounded**: `rounded-full` circles (avatars / close buttons / dots / social icons), dropdown menu panels (`WorkFilterDropdown`, `WorksFilter`, `ServicePageLayout` selectors), and explicit Figma-rounded buttons.
- Base background: `#e6e6e6` (matches section backgrounds — earlier value `#e3dfdc` caused a visible seam when GSAP pinned a section shorter than the viewport)
- **Prefer fixed pixel values** (matching Figma) over `clamp()` / `vw`. Use Tailwind arbitrary values like `text-[48px]`, `px-[40px]`.
- Use `clamp()` only when truly needed for responsive sizing; otherwise be explicit so the design matches Figma 1:1.
- Color tokens: `--color-dark`, `--color-brand`, `--color-primary-sage`, `--color-primary-orange`
- Editorial card colors: `--color-card-ocean` (#D9DDD1), `--color-card-mental` (#F5B086), `--color-card-commerce` (#F3D4C4), etc.

## Work Grid Structure

Cards are ordered by the `order` field in `case-studies.ts`. The grid follows a pattern:
- **Category card** (editorial variant, no `thumbnailImage`) — `#EDECE1` cream background, `1px solid #B0B0B0` border, SVG badge icon, title (Acumin Condensed 40px / 42px)
- **Content items** (image variant, has `thumbnailImage`) — photo top, **white** bottom panel (no border-top — sits flush against the image)

**Card backgrounds simplified (5/27 brand pivot, 5/28 Figma node `566:1642` confirmation).** Editorial cards use the same cream `#EDECE1` (no per-category colors); image-card bottom panels stay white. No hover color change — the only hover affordance is a 1px vertical lift on the card link. Per Fas: "*we don't use many colors, just simple color, clean*". The per-theme `bgColor` field in `socal-themes.ts` is preserved but no longer consumed by the work grid — it still drives the colored theme cards in `WhyAreWeDifferent`'s horizontal carousel.

## GSAP Notes

- `WhyAreWeDifferent` pins the entire section and animates horizontal scroll via `ScrollTrigger`
- Do NOT wrap GSAP-pinned sections in `RevealOnScroll` — `transform` breaks `position: fixed`
- Register plugins in client components: `if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger); }`

### WhyAreWeDifferent — Smooth-scrub + pair-snap horizontal carousel

The horizontal carousel combines GSAP's `scrub: 1` (spring-smoothed scroll→transform mapping) with `snap` (advance one pair at a time, per Israel's "it goes in twos" design spec).

```ts
const tween = gsap.to(trackEl, {
  x: -(pairCount - 1) * STEP_WIDTH,
  ease: "none",
  scrollTrigger: {
    trigger: section,
    start: "top top",
    end: `+=${(pairCount - 1) * STEP_SCROLL}`,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    scrub: 1,
    snap: {
      snapTo: 1 / (pairCount - 1),
      duration: { min: 0.25, max: 0.5 },
      ease: "power2.inOut",
      delay: 0.15,
      directional: true,
      inertia: false,
    },
  },
});
```

- `STEP_SCROLL = 320` — vertical pixels of scroll per pair
- `STEP_WIDTH = PAIR_WIDTH + OUTER_GAP` — horizontal distance the track travels per pair
- Total pinned scroll length = `(pairCount - 1) * STEP_SCROLL`

**`scrub: 1` (not `scrub: true`):** `scrub: true` is a hard 1:1 mapping with zero smoothing — feels mechanical and exposes Lenis's deceleration as track jitter. `scrub: 1` adds a 1-second easing catch-up, which is the GSAP equivalent of Framer Motion's spring-smoothed `useTransform` (what the OrthoFX precedent site uses). Same underlying technique, same smoothness ceiling — no need to swap libraries.

**`snap` config:**
- `directional: true` (GSAP 3.10+ default, made explicit) — only snaps in the direction the user was scrolling. So pausing mid-pair while scrolling down snaps to the next pair forward; pausing while scrolling up snaps to the next pair backward. **Never** pulls the wrong direction.
- `delay: 0.15` — gives the `scrub: 1` smoothing window time to settle before snap engages, so the two animations don't fight each other.
- `inertia: false` — we don't have the (paid) GSAP InertiaPlugin loaded, and Lenis already provides the momentum feel.

**Earlier (deprecated) approach:** a custom `onUpdate + Math.round(progress * (pairs-1))` commit handler — that's what was producing the "items move opposite direction on scroll up" bug, because Lenis's smooth-scroll easing could briefly push progress across a `Math.round` threshold the "wrong" way during deceleration. The `scrub: 1 + snap` config above does not have this problem because the track's x is a pure linear function of scroll position; direction follows physics.

**Pin layout (min-h-screen + justify-center, REQUIRED):** the section uses `md:min-h-screen md:flex md:flex-col` so it fills the viewport during the pin, and the inner content wrapper uses `md:flex-1 md:flex md:flex-col md:justify-center` to vertically center the heading + cards block. The vertical centering is what produces the visible **top inset** during pin — a comfortable gap between the sticky header and the "WHY ARE WE DIFFERENT?" heading. Israel/Fas specifically asked for this: "the section should be pinned much apart from the top." Do NOT remove `min-h-screen` (the section collapses to content-height and the heading sits flush against the header) and do NOT switch to `justify-start` (all empty space dumps to the bottom). Both have been tried and rejected.

**Body bg alignment (defensive):** `globals.css` sets `body { background: #e6e6e6 }` (was `#e3dfdc`) so that even if a pinned section is ever shorter than the viewport, GSAP's transparent pin-spacer area does not reveal a color seam. Every page already wraps its content in `bg-[#e6e6e6]`, so this has no visible effect outside the pin edge-case.

**Z-index hygiene:** `relative z-30 isolate` on the section + `isolate` on each `CaseStudyCard` `<Link>` keep WorkGrid's `z-10` bottom-panel from leaking up through the pin. `pinSpacing: true` keeps WorkGrid below the pin-spacer (it does not scroll up during the pin).

**Bottom border placement:** the `<div className="border-b border-dark mx-[25px]" />` divider sits **outside** the centered flex column, anchored at the section's true bottom edge. Earlier versions placed it inside the centered flex column, which caused the line to float to the middle of the section once `min-h-screen` made the container taller than its content — leaving empty `#e6e6e6` between the divider and WorkGrid. Keeping it outside means unpinning lands WorkGrid flush against the line.

### WorkGrid — "view all" / "view less" expansion

`WorkGrid` shows the first 12 case studies by default. If there are more, a `view all` button appears beneath the grid. Clicking it animates the rest of the cards in; clicking `view less` animates them out and unmounts them.

Implemented as a **GSAP-driven, three-phase state machine** (`collapsed` → `expanded` → `closing` → `collapsed`):

- Extras render only when `phase !== "collapsed"`. The CSS base class `.work-card-anim` (in `globals.css`) puts each extra at `opacity: 0; transform: translateY(24px)` so there's no flash before GSAP runs.
- `useGSAP({ dependencies: [phase] })` runs `gsap.to(extras, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.06 })` on `expanded`, and the reverse with `stagger: { each: 0.06, from: "end" }` on `closing`.
- The `closing` phase keeps the extras mounted for `EXIT_DURATION + stagger * (extras-1)` ms so the exit animation can play before unmount.
- `prefers-reduced-motion: reduce` skips the animation (CSS override sets `opacity: 1; transform: none`).

**Why GSAP, not CSS transitions:** with image-heavy children mounting on the same paint, the browser was deferring CSS transitions ~400 ms (animation stayed `pending` until images settled). GSAP sets inline styles each tick and starts on the next `requestAnimationFrame` — no paint-timing dependency.

## About Page Layout (Figma desktop `632:5645`, mobile `656:9361`)

The About page (`src/app/about/page.tsx`) is built section-by-section to match Figma 1:1. It is **mobile-first responsive**: base classes = mobile (402px frame `656:9361`), `lg:` overrides = desktop (1440px frame `632:5645`). Section side margins are `mx-[20px]`/`px-[20px]` on mobile, `mx-[25px]`/`px-[40px]` on desktop.

1. **Hero** — `SOCAL-LOCAL` headline (Acumin Condensed; 38px mobile / 96px desktop), description (14px/16px), coastline image (`aspect-357/290` mobile / `aspect-1358/725` desktop), then a centered `DISCOVER OUR APPROACH` button (201×43, dark bg, Acumin 18px), then the "WE ARE DESIGNERS…" mission line (32px mobile / 42px desktop). Vertical spacing uses **responsive `mt-` utilities** on the button (`mt-[46px] lg:mt-[80px]`) and mission heading (`mt-[64px] lg:mt-[128px]`) — the old fixed inline-height spacer divs were removed so mobile isn't over-spaced.
2. **Team** — desktop = left column ("team" title + paragraph) | right column = 5 discipline groups in a 3-col grid with a vertical divider. Mobile = single column: title + paragraph, then groups in a **2-col grid** (no divider). Group titles use Inter Semibold 18px uppercase, members Inter Regular 16px.
3. **Founder quote** (`632:5792` / `656:10456`) — dark testimonial card (`approach-quote-bg.jpg` + `rgba(0,0,0,0.7)` overlay) with an italic Acumin quote (20px mobile / 26px desktop), a 62px circular `approach-avatar.png` + "Fas Lebbie", then a `DISCOVER OUR APPROACH` button. Card uses **padding-based height** (`py-[46px] lg:py-[88px]`) with `Image fill` behind, so it grows with the quote on mobile. Quote copy is a real founder quote (placeholder in Figma) — swap if Fas provides final text.
4. **WE'RE SOCAL-LOCAL** — centered title (32px mobile / 42px desktop) + description, then "Community / Growth / Impact" row (18px mobile / 36px desktop), then a **3×2 image grid** (`aspect-square`, `rounded-[10px]` mobile / `rounded-[26px]` desktop, 0.5px `#adadad` border, subtle shadow). Middle-top card is the Instagram-themed white card with an IG glyph (10px mobile / 24px desktop). The description paragraph and `communityValueTags` (8 tags) are **hidden on mobile** (`hidden lg:block` / `hidden lg:flex`) — the mobile Figma omits them.
5. **FAQ** — **dark section** (`bg-[#1e1e1e]`, white text, `border-white` dividers) per Figma (`632:5816` / `656:10668`). Desktop = left column ("FAQS" title + paragraph) | right column = `FAQAccordion` with a vertical divider; mobile = stacked (title/desc on top, list below, no divider). Questions are 14px mobile / 16px white. Toggle button is a `35×38px` `#1e1e1e` square (blends into the dark section) with the **Figma arrow vector** (`arrow-right-down.svg` / "Vector 1145", inlined white stroke) that rotates 90° when open (`632:5829`). Per Fas 6/1: use the Figma arrow (supersedes the earlier plus/minus preference).

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
- **The Shop** → `/shop` (re-enabled 5/26 — client wants to see the shop page; was hidden 5/22 → 5/26)
- **Book a call** → opens `https://cal.com/deepsocal/discovery` in a new tab via `window.open` (5/25 fix — both desktop nav and mobile drawer route there; the contact modal stays bound to "Contact Us" / open-contact-form buttons, not Book a call)

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
2. **Product card container** — `max-w-[1384px]` rounded `30px` card with `border border-[#c4c4c4]` and `overflow-hidden`. Desktop height is `lg:h-[calc(100vh-64px)]` (viewport minus the sticky header), so the card always fills the screen — per Fas 5/27: "scroll box should fill the whole page, bottom should match screen bottom." The 64px MUST match `HEADER_OFFSET` in `ShopHeroCard.tsx` so the pin start, the section top, and the section bottom all align with the viewport.

   **Where the bottom gap comes from:** Fixed-height approaches (e.g. capping at `685px`) made the section card stop short of the viewport bottom on tall screens — Fas rejected that. Instead, GSAP computes `totalTranslate` against the live section height at runtime:

   ```
   totalTranslate = trackContentBottom - sectionHeight + BOTTOM_GAP
   ```

   Where `trackContentBottom = TOP_GAP + N*CARD_HEIGHT + (N-1)*CARD_GAP` (last card's bottom edge in track-local coordinates) and `BOTTOM_GAP = 120`. So at progress=1, the last card's bottom always sits exactly 120px above the section's bottom edge — symmetric with the top gap (`pt-[120px]` on the track) on every viewport. Both `y` and `end` in the ScrollTrigger config are passed as functions so `invalidateOnRefresh: true` re-evaluates them on resize.
   - **Hero background** — `Image fill` covers the entire card behind the products. Uses `shop-main-bg.png` (woman with DeepSoCal bottle). `-z-10` so it sits behind the product column.
   - **Product cards column** — absolutely positioned at `right-[91px] top-0 bottom-0 w-[399px]`, floating over the hero image. The column has **no background**, so anything behind it (the hero `Image fill`, z=-10) shows through wherever the column's contents don't paint. The TRACK inside the column has `pt-[120px]` — that's the visible gap. At rest, the track's top 120px is just empty padding (no children there to paint), and the hero shows through it cleanly.

     **Behaviour during scroll (matches OrthoFX):** GSAP scrub translates the track upward. The padding moves with the track; once it scrolls past the column's top edge, `overflow-hidden` on the column clips it and the first card naturally takes its place — fulfilling Fas 5/27: "the gap should be shown at first, if I scroll, scrolling items take the place, [the gap] should not be shown." No mask needed; the gap is a real layout space (track padding) that simply gets scrolled away.

     **Why `pt-[120px]` on the TRACK rather than `top-[XXpx]` on the COLUMN, or a CSS mask?** Earlier iterations tried `top-[85px]`/`top-[180px]` to push the entire column down inside the section, and a CSS `mask-image` linear-gradient that hid the top of the column. Fas rejected both:
     - `top-[185px]` push-down: column no longer spans the full section, hero band ABOVE the column doesn't behave like the OrthoFX "cards scroll up and past the top edge" mental model. Quoted: "we have to remove top 185px, top should be 0, it's not solution for this."
     - CSS mask: the mask is fixed on the column — it permanently hides whatever is in that zone. That made the gap behave as a static "hole" rather than a real space that cards visibly travel into and through. The user wanted the cards to actually take the gap's place during scroll, not to be hidden by a mask.
     - Track `pt-[120px]`: real layout space that the GSAP track translation actually consumes. Both the static "gap visible at rest" and dynamic "cards fill the gap on scroll" requirements are satisfied with one simple Tailwind class.
   - **No pagination dots.** An earlier implementation had vertical dots on the right; they've been removed per Fas's 5/27 review since the snap behavior already gives clear card-by-card progress feedback and the dots cluttered the right margin.

### Pin + scroll-driven track (OrthoFX precedent)

The scroll behavior mirrors OrthoFX's "3 easy steps to a confident smile" section, which uses a sticky/pinned hero with cards that translate vertically as the page scrolls past the section. Their HTML:

```html
<section style="height: calc(100svh + 125.984svh)">  <!-- scroll runway -->
  <div class="fullscreenWrapper" style="position:absolute; top:0">
    <!-- pinned background + cards animating up -->
  </div>
</section>
```

Our GSAP equivalent in `ShopHeroCard.tsx`:

- `HEADER_OFFSET = 64` — pin starts at `top ${HEADER_OFFSET}px` (not `top top`), matching the header's `min-h-[64px]`. The card's top edge lands flush against the bottom edge of the sticky header instead of pinning behind it. Per Fas: "the bottom line of the header and top line of the section should be matched."
- `TOP_GAP = 120` / `BOTTOM_GAP = 120` — visible breathing room above the topmost-visible card / below the last card at end-of-scroll. `TOP_GAP` is applied as Tailwind `pt-[120px]` on the track div (real layout space). `BOTTOM_GAP` is achieved by translating the track at end-of-scroll so the last card's bottom sits exactly `BOTTOM_GAP` above the section bottom — see math below.
- Total translate = `trackContentBottom - sectionHeight + BOTTOM_GAP`, where `trackContentBottom = TOP_GAP + N*CARD_HEIGHT + (N-1)*CARD_GAP`. Computed at runtime against the live section height so the bottom gap is constant (120px) regardless of viewport.
- Snap intervals = `1 / (N - 1)`, so one snap per card transition. On most desktop viewports each snap moves the track by ~CARD_STEP px; on very tall viewports each snap moves slightly less because there's less total translate to distribute — the cards still animate smoothly through the column, just with a tighter per-snap delta.
- Earlier iterations used a static `END_VISIBLE` constant + `steps * CARD_STEP` translate. That worked when the section card was capped at a fixed height (`685px`), but left a 400px+ "dead zone" below the last card on tall viewports — Fas's "too big space, decrease height" feedback. Switching to a runtime calc against `sectionHeight` lets the section keep filling the viewport while still locking the bottom gap to 120px.
- `STEP_SCROLL = 500` — px of page scroll per card transition. Total pin distance = `(cards - END_VISIBLE) * STEP_SCROLL`.
- `CARD_STEP = CARD_HEIGHT (445) + CARD_GAP (37) = 482`px — vertical distance the track moves per card.
- `pin: true` on the hero card (`root.current`), `pinSpacing: true` so the rest of the page stays below the pin-spacer.
- `scrub: 1` — 1s easing catch-up for the spring-smoothed feel (same as `WhyAreWeDifferent`).
- `snap` with `snapTo: 1 / (cards - END_VISIBLE)`, `directional: true`, `delay: 0.15`, `inertia: false` — same config as the home carousel. Snaps one card-step at a time, only in the user's scroll direction.

**Earlier (deprecated) approach:** the previous implementation intercepted `wheel` events with a `WHEEL_COOLDOWN = 500ms` cooldown and called `gsap.to()` per-tick. This blocked normal page scroll (couldn't scroll past the section using a single trackpad swipe) and didn't match the OrthoFX inertia feel. The pin+scrub approach above lets the page scroll naturally — the track moves because the page scrolled, not because we hijacked the wheel.

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
