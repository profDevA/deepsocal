# DeepSoCal

A regional strategic design agency building transformative experiences for Southern California's brands by blending deep research, AI & technology, strategy, design, and engineering.

## Live Site

[deepsocal.com](https://deepsocal.com)

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/postcss`, tokens defined in `globals.css` `@theme`)
- **Animation:** GSAP 3 + `@gsap/react` (`useGSAP`, `ScrollTrigger`)
- **UI primitives:** Radix UI (Accordion, Dialog, Dropdown)
- **Carousel:** Embla Carousel
- **Icons:** `react-icons` (Font Awesome 6 set)
- **Email:** Resend
- **Payments:** Stripe (checkout)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx                # /
│   ├── about/page.tsx          # /about
│   ├── works/[slug]/page.tsx   # case studies
│   ├── services/[slug]/page.tsx
│   ├── shop/                   # /shop + /shop/[slug]
│   ├── api/                    # contact + scoping endpoints
│   ├── layout.tsx
│   └── globals.css             # Tailwind v4 @theme tokens
├── components/
│   ├── home/               # Hero, WhyAreWeDifferent, WorkGrid, Testimonials, BigWordmark, …
│   ├── about/              # FAQAccordion
│   ├── work/               # CaseStudyCard, WorkFilterDropdown
│   ├── layout/             # Header, Footer, PageFrame, Drawer
│   ├── modals/             # Contact, scoping, partner (Radix Dialog)
│   ├── animation/          # RevealOnScroll
│   └── services/
├── data/                   # case-studies, services, products, team, socal-themes, faqs, …
├── lib/                    # resend, stripe, steepc, email-templates
└── types/
public/
├── images/                 # case studies, themes, badges, about, …
├── videos/                 # california.mp4 hero video
└── fonts/                  # Bangers, Inter, Druk, Zilla Slab
```

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. If 3000 is busy, Next.js will pick the next available port (e.g. 3001).

## Production Build

```bash
npm run build
npm run start
```

## Environment Variables

Create `.env.local` for local development:

```
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
STRIPE_SECRET_KEY=...
```

No fake/fallback values are baked in — missing env vars will surface as runtime errors. See `src/lib/resend.ts` and `src/lib/stripe.ts`.

## Documentation

- `CLAUDE.md` — architecture overview, conventions, and section-by-section implementation notes (data conventions, GSAP patterns, About page layout, divider conventions, etc.). Read this before making structural changes.
