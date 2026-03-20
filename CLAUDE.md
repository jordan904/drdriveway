# DrDriveway — Website Project

## Brief
See brief.md for full build instructions. Match the tone and services described in brief.md.
Ask no questions — build from the brief and iterate until done.
- Use photos from assets/photos/ on the site (18 photos in subfolders: facebook/, maps/, site/)

## Raw Data
Check raw/ folder for scraped business data.

## Tech Stack
- **Plain HTML, CSS, JavaScript** — no frameworks, no build tools, no npm
- Google Fonts for typography — pick 1-2 complementary fonts per site
- Fully static — files open directly in a browser or deploy to any host

## File Structure
- index.html — Main page
- styles.css — Separated CSS (required)
- script.js — Separated JS (required)
- images/ — Local image assets

## Section Order
Hero → Services → About → Why Choose Us → Testimonials → CTA Banner → Contact → Footer

## Design Conventions
- Dark or bold color palettes — navy, charcoal, deep brand colors with warm accents (gold, copper, orange)
- CSS custom properties (`:root`) for ALL colors, fonts, spacing, shadows, and radii
- Fully responsive with mobile-first media queries at 480px, 768px, 1024px
- **Mobile nav menus must use solid opaque backgrounds** — never semi-transparent

## Performance
- Add `loading="lazy"` and `decoding="async"` on all `<img>` below the fold — **never on the hero/LCP image**
- Add `fetchpriority="high"` on the hero image
- Set explicit `width` and `height` on every `<img>` to prevent CLS
- Use `<picture>` with WebP `<source>` and JPEG/PNG fallback when images are available
- Add `<link rel="preconnect">` for Google Fonts (include `crossorigin` on gstatic)
- Place `<script>` at end of `<body>` or use `defer` — never bare `<script>` in `<head>`
- Wrap all animations in `@media (prefers-reduced-motion: no-preference) { }`
- Use `passive: true` on scroll/touch event listeners
- Use `content-visibility: auto` on heavy below-fold sections

## SEO
- Unique `<title>` (50-60 chars) with primary keyword + location near the front
- `<meta name="description">` (140-160 chars) as a compelling call-to-action
- Exactly one `<h1>` per page — include business name, city, and service for local SEO
- Sequential heading hierarchy — never skip from `<h1>` to `<h3>`
- Add `<script type="application/ld+json">` with LocalBusiness schema (name, address, phone, hours, geo)
- Include Open Graph tags: `og:title`, `og:description`, `og:image` (1200x630), `og:url`, `og:type`
- Add `<meta name="theme-color">` matching the brand
- Use `<a href="tel:+1...">` for phone numbers, `<a href="mailto:...">` for emails

## Accessibility
- Add a visually-hidden "Skip to main content" link as the first focusable element
- Every `<img>` must have `alt` — descriptive for content, empty `alt=""` for decorative
- Never start alt text with "Image of" or "Photo of"
- All interactive elements must have visible focus indicators — never `outline: none` without replacement
- Minimum 44x44px touch targets on all buttons and links
- Color contrast: 4.5:1 for normal text, 3:1 for large text (WCAG AA)
- Never convey information by color alone — pair with text, icons, or patterns
- Use `aria-expanded` on mobile menu toggle buttons
- Use `aria-label` on icon-only buttons (hamburger, social links)
- Associate form error messages with fields via `aria-describedby` and `aria-invalid="true"`

## Forms
- Every input must have a `<label>` with matching `for`/`id` — never rely on placeholder alone
- Use HTML5 validation first (`required`, `type="email"`, `pattern`) before JS
- Add `autocomplete` attributes (`name`, `email`, `tel`, `street-address`)
- Add a honeypot field: hidden via CSS (`position: absolute; left: -9999px`), `tabindex="-1"`, `aria-hidden="true"` — reject if filled
- Use `inputmode="tel"` for phone fields, `inputmode="email"` for email fields
- Show inline errors next to the field, not just at the top

## Code Patterns
- Fixed navbar with scroll-triggered `.scrolled` class (background + shadow)
- Mobile hamburger toggling `.open` on nav links container
- `scroll-behavior: smooth` + `scroll-padding-top` for fixed nav offset
- IntersectionObserver for scroll-triggered fade-in animations (not scroll events)
- Debounce scroll/resize handlers (100-250ms)
- Contact forms: client-side only, show success message on submit
- `rel="noopener noreferrer"` on all `target="_blank"` links

## HTML Head Essentials
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<html lang="en">
<meta name="theme-color" content="#...">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

## SVG Icons
Inline SVGs for all icons — no icon libraries. 24x24 viewBox. Common: phone, email, location, clock, checkmark, star, social logos.

## DO / DON'T
- **DO** use semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`)
- **DO** use `clamp()` for fluid heading typography
- **DO** use `overflow-wrap: break-word` on text containers
- **DO** use `box-sizing: border-box` globally
- **DO** set `img { max-width: 100%; height: auto; }`
- **DON'T** use frameworks, bundlers, or package managers
- **DON'T** add dependencies beyond Google Fonts
- **DON'T** use `!important` unless overriding a mobile nav specificity edge case
- **DON'T** hardcode pixel widths on containers
- **DON'T** use semi-transparent backgrounds on mobile nav menus
- **DON'T** put API keys or secrets in client-side code


## 21st.dev Magic
Use /ui commands to generate all UI components.
Magic MCP must be active in Cursor.
If Magic is not available fall back to clean hand-coded HTML/CSS components.
