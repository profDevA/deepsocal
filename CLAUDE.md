# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Development

No build step required. Serve the files with a local HTTP server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`. Opening HTML files directly from the filesystem (`file://`) may cause issues with relative asset paths.

## Architecture

This is a static HTML/CSS/JS website with no framework, bundler, or package manager. All dependencies are vendored locally in `css/` and `js/`.

**Pages:**
- `index.html` — Homepage (uses `style-main.css`)
- `about-us.html` — About page (uses `style-about.css`)
- `works.html` — Portfolio listing (uses `style-works.css`)
- `works/forever-a-surfer.html` — Case study detail (uses `style-works-detail.css`)
- `services/strategy-inetgration.html` — Service landing page (uses `style-services.css`)
- `home-2.html` — Alternate homepage layout

Each page links its own page-specific stylesheet. Shared styles live in `style-main.css`.

**CSS conventions:**
- Body font is `ES Allianz` (custom, loaded from `fonts/`). Headlines use `Druk` (custom) or `Zilla Slab` (Google Fonts).
- Base background color: `#e3dfdc`. Text: `#000`.
- Responsive font sizing uses `clamp()` and `vw` units rather than breakpoint overrides.
- Custom utility classes like `.font-druk`, `.zilla-slab`, `.text-default-color`, `.min-height-100` are defined in `style-main.css`.

**JavaScript (`js/custom.js`):**
- Dynamically sets `#page-wrapper` top padding equal to the fixed `#header` height (recalculates on resize).
- Animates Bootstrap dropdowns with jQuery `slideDown`/`slideUp` and adds a `.dropdown-overlay` backdrop for header dropdowns.
- Filters `.work-item-inner` cards on `works.html` by matching a `data-ids` attribute to dropdown item `data-id` values.

**Third-party libraries (all vendored locally):**
- Bootstrap 5 (`bootstrap.min.css`, `bootstrap.bundle.min.js`)
- jQuery (`jquery.js`)
- Owl Carousel (`owl.carousel.min.css`, `owl.carousel.min.js`)
- Font Awesome 6 (loaded via CDN in each HTML `<head>`)
