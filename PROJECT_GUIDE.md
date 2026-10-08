# SHASI Project Guide

## 1. Project identity

SHASI is an editorial luxury beauty studio website built around the idea:

> Beauty Lives In You.

The experience is intentionally not a conventional salon template. The design language combines:

- Contemporary beauty editorial
- Fashion magazine composition
- Luxury Indian beauty
- Architectural web design
- Organic image masks
- Dark cinematic and light paper-like sections
- Oversized Instrument Serif typography
- Warm terracotta, raw ivory, obsidian, dusty rose, olive, and aged champagne

The supplied reference image is:

`C:\Users\vkreatify\Downloads\Shasi_ Beauty Beyond Boundaries.png`

Use that image as the primary visual reference when making future visual changes.

---

## 2. Current project status

Implemented:

- Full single-page SHASI website
- Responsive desktop, tablet, portrait, mobile, and landscape-phone compositions
- Fixed floating header with scroll-state styling
- Hero section with cinematic portrait, editorial typography, pager, and vertical label
- Signature service portals with organic clip-path masks
- Philosophy section with portrait composition and metrics
- Interactive circular Shasi Experience section
- Salon interior section with thumbnails
- Bridal editorial section with floating imagery
- Signature offerings section with horizontal mobile overflow
- Editorial testimonial carousel
- Appointment modal with form and success state
- Location/map-inspired section
- Newsletter signup success state
- Dark editorial footer
- Custom desktop cursor and magnetic button behavior
- Lenis smooth scrolling
- GSAP + ScrollTrigger reveal and parallax animations
- Framer Motion modal transitions
- Reduced-motion support
- Sites-compatible build output

Known placeholders:

- Address, phone number, email, opening hours, map destination, social links, and testimonials are demo content.
- Replace these only when the real SHASI business information is supplied.

---

## 3. Runtime and architecture

### Root files

- `index.html` — document shell and page title
- `package.json` — scripts and dependencies
- `package-lock.json` — locked dependency versions
- `vite.config.mjs` — Vite configuration
- `AGENTS.md` — Product Design starter runtime rules
- `design-qa.md` — visual QA record
- `scripts/prepare-sites-build.mjs` — Sites packaging helper
- `worker/index.js` — Sites worker runtime
- `tests/sites-worker.test.mjs` — Sites runtime tests

### Source files

- `src/main.jsx` — React entry point
- `src/App.jsx` — page composition, components, interactions, and animation lifecycle
- `src/styles.css` — design tokens, layout, masks, responsive rules, and CSS transitions

### Assets

- `public/assets/shasi-hero.png`
- `public/assets/shasi-interior.png`
- `public/assets/shasi-bridal.png`
- `public/assets/shasi-wellness.png`

Use real image assets for visible editorial content. Do not replace image-led sections with CSS art, placeholder gradients, emoji, or generic stock placeholders.

---

## 4. React component map

All page components currently live in `src/App.jsx`.

### Shared helpers

- `Arrow`
  - Small typographic arrow used in links and CTAs.
- `OrganicImage`
  - Wraps an image with a named mask class.
- `RevealText`
  - Uses IntersectionObserver to reveal hero text using clip-path.
- `MagneticButton`
  - Adds pointer-follow movement on non-touch devices.

### Page components

- `Header`
  - Fixed navigation, mobile menu, scroll-state background, appointment trigger.
- `Hero`
  - First viewport and primary brand message.
- `SignatureServices`
  - Four editorial service portals.
- `Philosophy`
  - Brand story, portrait composition, and stats.
- `Experience`
  - Four interactive circular steps.
- `Salon`
  - Interior image, copy, and thumbnails.
- `Bridal`
  - Terracotta bridal story composition.
- `Offerings`
  - Three oversized offering portals.
- `Testimonials`
  - Stateful testimonial carousel.
- `Appointment`
  - Framer Motion booking modal and success state.
- `Location`
  - Address, map treatment, footer, and newsletter form.

When adding a new section, keep it as a named component and mount it in `App()`. Avoid creating a large anonymous JSX block inside `App()`.

---

## 5. Design tokens and visual rules

Primary tokens are declared at the top of `src/styles.css`:

- `--obsidian: #17120f`
- `--ivory: #f1e5d5`
- `--terra: #a65d43`
- `--rose: #c99082`
- `--olive: #5b604b`
- `--champagne: #c7a477`
- `--ink: #2b211c`

Fonts:

- Display: Instrument Serif
- Interface/body: DM Sans

Design rules:

- Prefer asymmetrical composition over centered SaaS layouts.
- Alternate light editorial sections with dark cinematic sections.
- Use organic image masks intentionally; name the mask class after its purpose.
- Avoid excessive border-radius, generic cards, neon colors, glassmorphism, and decorative gradients.
- Preserve large negative space and strong typographic hierarchy.
- Use animation to reveal hierarchy, not to animate every element continuously.
- Keep text legible over photography with restrained overlays.
- Maintain touch targets of at least 44px on mobile wherever practical.

---

## 6. Image mask system

Mask classes are defined in `src/styles.css`:

- `.organic-image--arch`
- `.organic-image--oval`
- `.organic-image--cut`
- `.organic-image--round`
- `.organic-image--philosophy`
- `.organic-image--bridal`
- `.organic-image--testimonial`
- `.organic-image--location`

To add a new shape:

1. Add a named mask class in `src/styles.css`.
2. Use `clip-path` with a deliberate editorial purpose.
3. Keep the image container responsible for overflow.
4. Keep the image itself `object-fit: cover`.
5. Test the crop at desktop and mobile widths.
6. Do not use random blob shapes without relation to the composition.

---

## 7. Animation system

### Lenis

Lenis is initialized in the main `App()` effect.

Responsibilities:

- Smooth wheel scrolling
- Synchronized touch scrolling
- Shared requestAnimationFrame loop

Do not create a second global Lenis instance in another component.

### GSAP and ScrollTrigger

GSAP is registered once at module scope.

Current ScrollTrigger behaviors:

- Section headings and supporting copy fade/translate into view.
- Service portals, offerings, stats, and testimonial imagery reveal with staggered entrances.
- Hero image receives vertical parallax while the hero leaves the viewport.
- Salon and appointment imagery receive subtle parallax.
- All ScrollTriggers are scoped through `gsap.context()` and reverted during cleanup.

When adding a GSAP animation:

- Prefer transform and opacity.
- Use `once: true` for entrance animations.
- Use `scrub: true` only for slow parallax.
- Do not animate layout properties continuously.
- Always clean up through the existing GSAP context.
- Respect `prefers-reduced-motion`.

### Framer Motion

Framer Motion currently owns:

- Booking modal backdrop fade
- Booking modal scale/translate entrance
- AnimatePresence exit lifecycle

Use Framer Motion for stateful component transitions. Use GSAP for page-scroll choreography. Avoid mixing both libraries on the same property at the same time.

### CSS motion

CSS handles:

- Button hover states
- Arrow movement
- Mask image zoom on hover
- Header color transition
- Mobile navigation open/close
- Reduced-motion override

---

## 8. Responsive strategy

Breakpoints currently include:

- `max-width: 1000px`
  - Tablet adjustments and reduced column density.
- `max-width: 720px`
  - Mobile editorial composition.
- `max-width: 520px`
  - Small-phone typography and spacing.
- `max-width: 390px`
  - Narrow-phone corrections.
- `max-width: 900px and max-height: 560px`
  - Landscape-phone layout.
- `max-aspect-ratio: 4/5 and min-width: 721px`
  - Portrait tablet / narrow desktop adaptation.
- `min-width: 1440px`
  - Large-screen breathing room.

Mobile behavior:

- Header converts to a menu toggle.
- Hero remains image-led but simplifies side metadata.
- Service portals become a two-column editorial grid.
- Offerings become horizontally scrollable.
- Experience orbit is repositioned and reduced.
- Custom cursor is disabled on touch devices.
- Magnetic transforms are disabled on coarse pointers.
- Footer switches to a two-column layout.
- Complex desktop grids become editorial vertical stacks.

Before changing breakpoints, test at:

- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

Also test both portrait and landscape orientation on small devices.

---

## 9. Commands

Install dependencies:

```bash
npm install --prefer-offline --no-audit --no-fund
```

Run development server:

```bash
npm run dev -- --host 0.0.0.0 --port 4173 --strictPort
```

Build production output:

```bash
npm run build
```

Run Sites runtime tests:

```bash
npm run test:sites
```

Expected build artifacts:

- `dist/client/index.html`
- `dist/server/index.js`
- `dist/.openai/hosting.json`

---

## 10. Modification workflow for future agents

### Before editing

1. Read this guide.
2. Read `AGENTS.md`.
3. Inspect the current relevant component and selector before changing it.
4. Confirm whether the change affects desktop, tablet, mobile, touch, or reduced-motion behavior.
5. Preserve existing demo content unless the task explicitly requests content changes.
6. Use existing tokens and mask classes before introducing new values.

### While editing

1. Keep components named and reusable.
2. Keep content structure in `src/App.jsx`.
3. Keep visual/layout rules in `src/styles.css`.
4. Keep motion ownership clear:
   - Lenis for scroll smoothing
   - GSAP for scroll choreography
   - Framer Motion for state transitions
   - CSS for lightweight hover/focus transitions
5. Avoid adding a new animation library unless the current stack cannot handle the requirement.
6. Avoid global event listeners without cleanup.
7. Avoid changing protected Sites runtime files unless the task is specifically about hosting/runtime behavior.

### After editing

1. Run `npm run build`.
2. Run `npm run test:sites`.
3. Start or refresh the local preview.
4. Check the modified section at desktop and mobile widths.
5. Check keyboard focus and touch behavior.
6. Check `prefers-reduced-motion`.
7. Check that no new horizontal overflow was introduced.
8. Update the change log below.

---

## 11. Completed work log

### 2026-10-07

- Initialized the Product Design Vite prototype runtime.
- Added generated editorial beauty assets.
- Built the SHASI single-page composition.
- Added organic image masks and asymmetric section layouts.
- Added functional navigation and appointment flow.
- Added testimonial carousel and newsletter success state.
- Added desktop-only custom cursor and magnetic buttons.
- Added responsive layouts for desktop, tablet, mobile, portrait, and landscape contexts.
- Added Framer Motion, Lenis, GSAP, and ScrollTrigger.
- Added scroll reveal, parallax, smooth-scroll, and modal transitions.
- Updated document title to `SHASI — Beauty Lives In You`.
- Confirmed `npm run build` passes.
- Confirmed `npm run test:sites` passes.
- Confirmed local preview returns HTTP 200.
- Kept demo contact/location details clearly marked in the UI as placeholder business information.

---

## 12. Safe extension patterns

### Add a new editorial section

1. Create a named component in `src/App.jsx`.
2. Add a semantic section id for navigation.
3. Use `.section-light`, `.section-dark`, or `.section-terracotta`.
4. Use an existing mask or add a named mask class.
5. Add a responsive rule if the layout changes at mobile.
6. Add GSAP only if the section needs scroll choreography.
7. Mount the section in `App()`.
8. Update the navigation list if it is a primary destination.

### Add a new image asset

1. Generate or obtain the image in the same warm editorial direction.
2. Save it under `public/assets/` with a descriptive stable filename.
3. Add it to the `A` asset map in `src/App.jsx`.
4. Use `loading="lazy"` for below-the-fold imagery.
5. Check object-position and mask crop at multiple aspect ratios.
6. Never leave a required project asset only in a temporary or generated-images directory.

### Add a new interaction

1. Decide whether the state is local to a component.
2. Use React state for visible selected/open/success states.
3. Use Framer Motion for entry/exit transitions.
4. Use GSAP only for scroll-linked behavior.
5. Provide keyboard focus behavior.
6. Provide touch behavior if the interaction is not desktop-only.
7. Add an accessible label to icon-only controls.

---

## 13. QA notes

The local app and Sites runtime build are validated. Browser screenshot/console verification depends on the Codex desktop browser automation helper being available in the current session.

If visual browser automation is available, compare:

- 1440px initial hero state
- 390px mobile hero state
- Service portal hover/focus state
- Booking modal open state
- Experience circle active state
- Testimonial next/previous state
- Newsletter success state
- Reduced-motion rendering

Any agent that changes layout or animation should update `design-qa.md` with the new evidence and final result.

