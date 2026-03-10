# DesignwidSurya Portfolio

## Current State
A glass morphism portfolio site with a hero flip card (360×520px fixed size, border-radius 1.25rem), Featured Projects horizontal auto-scroll (fixed w-[340px] cards), and a Design Case Studies section with problem/solution/result cards in a `grid grid-cols-1 md:grid-cols-3` layout. No mobile-specific CSS breakpoints — all responsive via Tailwind classes. The fixed card sizes and lack of mobile scaling cause overflow and overlapping issues.

## Requested Changes (Diff)

### Add
- Manual horizontal scroll container for the problem/solution/result cards on mobile in the Case Studies section
- Mobile-specific card sizing for Featured Projects cards (smaller width on small screens)

### Modify
- Flip card border-radius: increase from `1.25rem` (20px) to `2.5rem` (40px) for a more refined, smooth curve
- Flip card fixed size (`width: 360px, height: 520px`): make responsive — `max-w-[280px]` on mobile, `max-w-[360px]` on desktop, with proportional height
- Hero section: ensure no overflow/overlap on mobile — the flip card column should scale down gracefully
- Featured Projects cards: reduce from `w-[340px]` to `w-[260px]` on mobile, keep `w-[340px]` on md+, maintain existing RAF auto-scroll
- Case Studies problem/solution/result grid: on mobile, change from stacked `grid-cols-1` to a horizontal snap-scroll row (overflow-x-auto, flex row, snap-x mandatory) with each card at fixed `min-w-[75vw]` so multiple cards are partially visible
- Overall site: audit all major sections (navbar, hero, featured projects, case studies, skills, about, reels, testimonials, contact, footer) for mobile overlapping issues and apply appropriate Tailwind responsive fixes

### Remove
- Nothing removed

## Implementation Plan
1. In `index.css`, update `.flip-card-front, .flip-card-back` border-radius from `1.25rem` to `2.5rem`
2. In `HeroFlipCard`, replace the fixed `style={{ width: '360px', height: '520px' }}` with responsive Tailwind classes: `w-[280px] h-[400px] md:w-[360px] md:h-[520px]`
3. In `HeroFlipCard`, also update the glow halo div to scale similarly
4. In `ProjectCard`, add `w-[260px] md:w-[340px]` responsive sizing instead of fixed `w-[340px]`
5. In `CaseStudySection`, wrap the problem/solution/result cards in a horizontal scroll container on mobile: add an outer `block md:hidden` wrapper with `overflow-x-auto flex snap-x snap-mandatory gap-4 pb-4` and individual cards with `min-w-[75vw] snap-start`, keep the existing `hidden md:block` grid for desktop
6. Audit the hero section, navbar, and other sections for mobile padding/overflow issues and fix with responsive Tailwind
