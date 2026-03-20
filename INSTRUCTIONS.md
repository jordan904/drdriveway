Read @brief.md and @CLAUDE.md then build this website. The CLAUDE.md contains the full quality standards — follow every rule in it.

PHOTOS:
- Use photos from assets/photos/ folder if available
- Hero section: use the best quality photo as background or feature image
- Gallery section: use remaining photos
- If no photos available use placeholder divs with the business brand color

CONTENT:
- All text comes from brief.md
- Use the exact business name, phone, address from the brief
- If Google Maps rating exists add it prominently: '★ [X]/5 — Rated by [N] customers'
- Use review highlights as testimonials

DESIGN INTELLIGENCE:
A ui-ux-pro-max design system may be installed in this project. If present, use it to search for the best color palettes, font pairings, and UI styles:

python3 .claude/skills/ui-ux-pro-max/scripts/search.py "contractor trades professional" --design-system

Run this search first before building to get the recommended design system for this project.
If 21st.dev Magic MCP is active, use /ui commands for UI components. Otherwise build clean hand-coded components.

QUALITY BAR:
- Every section must look professional
- No placeholder text anywhere
- All links must work
- Contact form must have name, phone, email, message fields with honeypot spam protection
- Separated files: index.html + styles.css + script.js (never inline CSS/JS)
- Full SEO: title, meta description, Open Graph tags, LocalBusiness JSON-LD schema
- Full accessibility: skip link, ARIA attributes, focus indicators, color contrast
- Do not stop until the site looks complete
- Iterate and improve until done

Do not ask questions. Build from the brief. Follow every standard in CLAUDE.md. Iterate until the site is complete and professional.