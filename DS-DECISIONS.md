# BHCC — design-system decisions ledger

Running record of decisions that the future design system must encode. Source of truth for
values is `index14.html` (the November client-edit round); this file says **what is a rule**.
`design-system.html` / `design-system4.html` are July-era and out of date — do not build from them.

Format: rule · value · where it is used · why / date.

---

## Typography

### Display quote / editorial statement — line-height 1.04
- **Value:** `line-height: 1.04` for Cormorant display text set as a statement or quote
  (2+ lines). Size `clamp(1.875rem, 1.2rem + 1.2vw, 2.5rem)` → 30 / 35 / 36 / 40 px at 390 / 1280 / 1440 / 1920.
- **Used:** founder quote ("I've been buying and selling the world's finest classic cars since 2009.").
- **Why:** Alex, 2026-11-19 — 1.16 read loose; Cormorant's short x-height takes 1.04 without
  lines touching.
- **Scope (Alex: "if it repeats, apply"):** EVERY Cormorant display heading/statement is 1.04 —
  hero title, Featured Classics, proof band headings, founder quote, We buy classic cars!,
  Real sellers…, News & Events. Single-line headings too, so the box height (and the spacing it
  produces) is the same rule everywhere. Exceptions only for decorative glyphs (quote marks).

### Credit / eyebrow line over a dark section — 18px tracked caps
- **Value:** `font-size: 1.125rem` (18px), `letter-spacing: .14em`, `line-height: 1.2`,
  uppercase, **4px** to the heading below it.
- **Used:** "ALEX MANOS, FOUNDER" (founder), "SELL YOUR CLASSIC CAR" (sell band).
- **Why:** client Nov19 s4.1 / s5.1 asked both enlarged; one role, one style. The old 11–12px
  `--fs-eyebrow` read as a footnote.

### Functional text floor — 14px
- Stock numbers, chat copy, card meta: never below `.875rem`.

## Spacing (desktop ≥761, Nov19 density)

Client wants a dense page. Rule kept: **inside a group < between groups**.

| Relationship | Value |
|---|---|
| eyebrow/credit → heading | 4px |
| heading → body text (sections) | 12px |
| card: photo → title | 16px |
| card: title → description | 8px |
| card: description → View Details/price | 12px (+ baseline) |
| card: View Details → Stock # | 6px |
| body text → action row | 24px |
| action row → trust/meta line | 16px |
| cards → CTA pair | 28px |
| CTA pair → next section | 36px |
| search card → section heading | 32px |
| founder section padding | 16 / 20px |
| hero CTAs → "Find your dream car" → search card | equal, `--sb-gap: clamp(40px, 3.2vw, 56px)` |

## Components

### Red secondary button on dark (the "Sell Your Car" button)
- `background: rgba(211,23,32,.20)`, `border: 1.5px solid var(--accent-red)`, white 700 text,
  radius 8px, min-width 220px; hover → solid `--accent-red`.
- **Used:** hero pair, Featured CTA pair, proof band middle column. One look everywhere
  (client: "same style / consistent").

### Search card
- Solid `--accent-red` card, radius 16; field `--bg` off-white with `--ink` text; ink search
  button with white icon, hover red; focus ring 2px `--ink`; "View All Inventory" white on red (5.36:1).

### Featured car card
- Name on one line (ellipsis, full name in `title`), price on the View Details line at every
  width (mobile included — Alex Nov19), `Stock #` under View Details from the listing ID.
- Description desktop only (client's Sep wording; Alex Nov19: keep hidden on mobile).

### Language picker
- Nav item after Contact: globe 16px + code + caret; same dark submenu as the other nav menus;
  names in their own language, no flags. Globe only at 1025–1199.

### Chat pop-up (mock of the live Tawk.to card)
- Lower left, light card 304px, appears after 4s once per session, × minimises to the live
  site's round icon. Mock window — nothing is sent.

## Colour
- Dark sections share `--dark` graphite (Featured, proof band, founder, sell).
- Credit lines on dark: cream; body on dark: `--ink-soft-on-dark`.

---

## PENDING — closing note to the client on density (Alex, 2026-11-19)

At the end of the November round, send a short, polite note (English): all edits are in, the page
is X% shorter, and further tightening now costs readability and the premium feel — recommend
freezing the current spacing as part of the design system and stopping spacing edits.

Core argument (Alex, 2026-11-19): **every round has asked for "reduce spacing"** (p5, Sep 1 index8
item 1, Sep 2 "More up" ×9 gaps, Nov ×4 slides+). Spacing on this site is not a per-gap choice — it
comes from the design system (a spacing scale and rules such as "inside a group < between groups")
and from how the page is built (sections, grid, image bands with fixed proportions). Shaving gaps
one by one each round breaks that system; if a section should feel denser, the system value changes
once and applies everywhere, by agreement — not gap by gap in every review.

Evidence to collect while working (fill in as the round goes):
- **Nov edit list: 19 of 38 items (50%) ask to reduce/remove spacing**; the words spacing/space/padding
  appear 23 times; every one of the 9 slides has it; 8 items are a bare "Reduce/Remove/Delete all extra
  spacing" with no location (slide 6 items 3 and 4 are the same sentence twice).
- Page height at 1440 after the full round: index13 **5440px** → index14 **~4450px** (−~1000px, ~18%).
  Mobile (390): 7695 → 7453 after bridging.
- Page height at 1440: index13 **5440px** → index14 **5111px** after slides 1–4 (−329px).
- Gaps already at or near the floor: credit → heading 4px; founder section 16/20px;
  heading → body 12px; card title → description 8px.
- Before/after shots of the same places, index13 vs index14.
- Any spot where the density starts to hurt (text against photo, sections merging) — note it here.

### Plan: hand the client a design system with Do / Don't (Alex, 2026-11-19)
Instead of (or with) the note: a client-facing design-system page built from index14's final values,
with a **Spacing Do / Don't** section — Don't = real screenshots from their index14 where elements
nearly touch and reading suffers (red markers with measured px), Do = the same spot with system
spacing. One line under each pair on why. Tone: "this is where the current density hits its limit",
not blame. Ends with the rule: spacing is set by the system; denser = one agreed change, applied
everywhere.

Don't-candidates spotted so far (screenshot at the end, 1440 + 390):
- Founder: section padding 16/20, credit → quote 4px (index14 slide 4).
- Satisfied Customers: section 24/32, credit → heading 4px, heading → photos 20px (slide 6). Page
  height now trending down section by section — re-measure index13 vs index14 at the end.

## QUESTIONS for the client (send with the closing note)

1. **Which screen do you review on — laptop or iPad (portrait / landscape)?** Device, screen size, and browser zoom / Windows display
   scaling (125% / 150% is the default on most laptops — a 1920 screen then shows the site at ~1536px,
   a 1366 screen at ~1093px). We design and check at 1280 / 1440 / 1920 and 390; several "extra
   spacing" notes only make sense at an in-between width (e.g. the Featured cards: a long name
   wraps on a laptop and leaves a gap under the other cards — fixed in Nov round).
2. **Please send the numbered screenshots** the edit list refers to ("Slide 6: 3 - Reduce all extra
   spacing, 4 - Reduce all extra spacing") — the text alone does not say *between what and what*.
   Example: slide 6 items 3 and 4 are the same sentence twice with no location.
3. When something feels loose, **mark it on a screenshot** rather than describing it — we will
   answer with the measured value and what the design system says it should be.

## TODO after the client's slides — tablet range 761–1024 (found 2026-11-19 sweep)

Laptops at 125/150% (1536 / 1280 / 1093) hold up; iPad landscape (1180) fine. **iPad portrait (820)**
is the weak width — desktop layout squeezed, never designed on its own:
- hero grows to ~850px and the pulled-up search card (s1.2) covers most of the film's lower half;
- proof band: three small columns over a busy photo, headings run into the cars;
- founder / sell stack with large empty dark fields around the copy.
If the client reviews on an iPad, this is likely where many "extra spacing" notes come from.
Shots: .playwright-mcp/sweep-*.png
4. **Porsche World logo** — please send the original colour logo file (we could not find an official
   one; the page shows a typeset stand-in). Also confirm "Porsche World" = the UK magazine.
