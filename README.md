# BHCC — Homepage redesign

Beverly Hills Car Club by Alex Manos — homepage redesign.
**`index.html` is the full page: all nine sections at 1440 and 390.**
Open `design-system.html` for the living specification of the underlying system.

```
aan_BHCC_redesign/
├── index.html                  ← THE PAGE — §01–§09
├── design-system.html          ← the spec page
├── assets/
│   ├── css/
│   │   ├── tokens.css          ← SOURCE OF TRUTH: colour · type · spacing · motion
│   │   ├── sections.css        ← the section layer (§01, §02, §03–§09)
│   │   ├── design-system.css   ← styles for the spec page only (not shipped)
│   │   └── main.css            ← compiled Bootstrap + brand layer (generated)
│   ├── scss/
│   │   ├── _variables.scss     ← Bootstrap overrides, BEFORE @import "bootstrap"
│   │   └── main.scss           ← module import list + brand layer
│   ├── js/
│   │   ├── site.js             ← header · carousel · accordions · form validation
│   │   └── bootstrap.bundle.min.js
│   ├── video/                  ← hero-loop.mp4/.webm (home.mp4 master is gitignored)
│   └── images/                 ← optimised derivatives (masters stay in refference/)
├── _shots/                     ← full-page + hero-matrix screenshots
└── refference/                 ← client-supplied brief, wireframes, logo, photos
```

Load order on every page: `tokens.css` → `main.css` → `sections.css`.
Each section in `index.html` is fenced by a `<!-- ==== NN NAME ==== -->` comment
so a WordPress dev can lift it straight into a template part.

---

## Superseded — read this before trusting an older note

**The hero was rebuilt (2026-07).** `hero-c-monumental.html` and its 124px centred
lockup are **history, not the spec** — they were designed for the OLD poster (car
centred, `Hero placeholder.jpg`). The client supplied a new frame and a new layout;
`index.html` is authoritative. `hero-a/b/c-*.html` are kept only as a record.

**Two token values were corrected against measurement, not taste:**

| token | was | now | why |
|---|---|---|---|
| `--fs-h4` | 19→**22** | 19→**20** | the 22 was justified by a 33-char test string, which turned out to be the *median* of the real inventory. See below. |
| §05 headline | `--fs-h1` (56) | `--fs-editorial` (30→**50**) | at 56 the real headline took 4 lines; the brief says 2–3 max. |

### Card titles — the real inventory, not a sample string

The old note read *"367.5px in a 427px column ✓"* for `1965 Mercedes-Benz 300SL
Roadster` (33 chars). That string is the **median**. Pulled all **665 live car
titles** from the site's own `sitemap.xml`:

| | chars |
|---|---|
| median | 32 |
| p90 | 55 |
| max | **75** — `1986 Porsche Carrera Super Sport Cabriolet Turbo Look M491 Right-Hand-Drive` |

**17.9% (119/665) cannot fit one line** in the 426.67px column. Two lines is the
designed state, not an exception — and the 71-char `1960 Bentley S2 Continental
Sport Saloon Left-Hand-Drive by James Young` is the **$195,000** car, i.e. the
flagship of the section, not an edge case.

Measured in-browser at the real column width:

| | 75-char worst case |
|---|---|
| Gloock 22px | **3 lines** (85.8px) ✗ |
| Gloock 20px | **2 lines** (52.0px) ✓ |
| Inter Tight 500 18px | 2 lines (48.6px) |

→ `--fs-h4` tops out at **20**, the title box reserves **2 lines** so prices align
across a row, and `-webkit-line-clamp: 2` guards any future longer title. Verified
live: all 6 cards render 2 lines, **none truncated**.

### Hero — the height contract

Client requirement (supersedes the brief's "85–100vh"): **on desktop the hero fits
the screen — H1, sub and both CTAs visible with no scroll.** Mobile keeps the
brief's own rule (70vh minimum, fold allowed).

`--fs-hero` is `clamp(1.875rem, min(6.6vw, 12vh), 6rem)`. **`min(vw, vh)`, not vw
alone**: a pure vw ramp only asks how *wide* the screen is, and on a 1280×720
laptop the binding constraint is height. `vmin` was rejected — it is min(vw,vh)
with one shared coefficient, so it cannot be tuned per axis and would under-size
the H1 at 2560×1440.

Verified by measurement at 2560×1440 · 1920×1080 · 1680×1050 · 1440×900 ·
1366×768 · 1280×720 · 390×844 · 360×640 — **all pass**: last CTA above the fold,
no horizontal scroll, car 100% in frame, driver's face never crossed, CTAs ≥44px,
white-text contrast ≥ **8.43:1** worst case. Sheets in `_shots/hero-matrix-*.png`.

The tightest case is **360×640** and it is a genuine squeeze: in portrait the image
is height-bound, so the car is locked to y 39–62% and only 38% of road sits below
it. Documented inline in `sections.css`.

Build:
```bash
npm install
npx sass assets/scss/main.scss assets/css/main.css --load-path=node_modules --style=compressed
```

---

## Locked decisions

### Typefaces — three families, strictly by role

**Client decision: Gloock is the display face.** Closed; not up for re-litigation.
Gloock ships **one style — 400, no italic, no axes, static.** That single fact
drives the whole architecture:

| Family | Role | Why |
|---|---|---|
| **Gloock 400** | hero H1, section headings, card titles | cap-height 75/100 (largest of the three), **lining figures** (ratio 1.03) — years and prices set correctly with no OpenType hacks |
| **Newsreader italic 400** | §07 testimonial quotes **only** | Gloock has no italic; a synthesised oblique on a didone is unacceptable |
| **Inter Tight 400–600** | body + all UI | **no `opsz` axis at all** → the 24 KB that Inter's `opsz` cut carried never appears; also sits further from Superior Motors' Neue Haas Grotesk than Inter (Inter is Neue Haas's free analogue) |

**Payload (measured, latin woff2):** Gloock 17.2 + Newsreader italic 23.8 + **Inter Tight 43.9** = **84.9 KB**.
Newsreader is requested as `family=Newsreader:ital@1` — a **static** italic at 23.8 KB.

**The Inter → Inter Tight swap, measured:**

| cut | latin woff2 |
|---|---|
| `Inter:opsz,wght@14..32,400..600` (what 112.3 KB was built on) | 71.3 KB |
| `Inter:wght@400..600` (same weights, no `opsz`) | 47.3 KB |
| `Inter+Tight:wght@400..600` | **43.9 KB** |

The `opsz` axis alone cost **24.0 KB**. Inter Tight removes it structurally — there is no
axis to forget to drop — and saves a further 3.4 KB. **System: 112.3 → 84.9 KB (−27.4).**

**Inter Tight's one real cost — measured, and compensated.** Its forms are narrower than
Inter's, and on `--dark`/`--dark-deep` the thin strokes lose ink at small sizes:

| test (real token sizes) | vs the Inter baseline it replaces |
|---|---|
| `--fs-body-sm` 14 on dark, weight 400 | **−5.9%** solid ink, +2.2pp smear |
| `--fs-body-sm` 15 on dark, weight 400 | **−5.5%** solid ink, +2.3pp smear |
| `--fs-eyebrow` 12 on light | −2.4% / −0.1pp — imperceptible |
| `--fs-eyebrow` 11 on light (mobile) | −1.4% / +1.9pp — imperceptible |
| `--fs-eyebrow` 12 **on dark** | **+11.4% / −8.6pp — better than Inter** |

Fix: **`--fw-body-dark: 450`** for small text on dark. Measured at parity (+2.4% / +0.6pp at
14, +4.4% / +0.7pp at 15). Weight 500 over-corrects (+13.7% / +17.0%). Adding tracking does
**not** work (−7.6% ink, still +2.4pp smear) — it was tested and rejected. Inter Tight is a
variable font, so 450 costs no extra file.

**Why `opsz` was never helping the small sizes anyway.** Inter's `opsz` range is **14–32** —
its floor is 14. At the 12px eyebrow and 13px footer, `font-optical-sizing: auto` requests
12/13, clamps to 14, and renders **pixel-identical to `opsz` pinned at 14** (verified: 370
solid / 55.8% both; 924 / 52.9% both). The axis did nothing at the sizes it was assumed to
protect. Dropping it costs nothing below 14px.

**Card titles go to Gloock** — tested, not assumed. At 22px Gloock lays down *more*
solid ink than Newsreader 500 and a *lower* anti-alias smear ratio; at 4× zoom its
hairlines are thin but continuous, and it holds to 18px. It is also more "prominent",
which is what brief §04 asks for.

> **Re-measured 2026-07 — the earlier figures are superseded.** Current run:
> **Gloock 400 = 1653 solid / 46.6% smear**; **Newsreader 500 = 1293 / 49.5%**.
> The previously recorded 1778 / 47.6% and 1315 / 49.3% no longer reproduce.
> Newsreader lands within **−1.7% / +0.2pp** of the old figure, which validates the
> method; Gloock comes in **~7% low**, so the Gloock file itself appears to have
> changed on Google Fonts. **The ordering and the conclusion are unchanged** — Gloock
> still lays down more ink with less smear than Newsreader at 22px.
> Method (reproducible): DOM text at 22px, ink `#1A1A18` on `#FAF9F6`, DPR 1,
> **no `-webkit-font-smoothing`** (`antialiased` thins stems and shifts every count),
> green-channel coverage, solid ≥ 0.85, smear = partial / (solid + partial).
> Rig: `_font-lab3-measure.html`.

### Known consequence of the Gloock decision — read before touching weights

The brief asks that H1 feel *"significantly larger **and lighter-weight** than H2"*.
**Gloock has one weight, so literal weight contrast is not available.** Hierarchy is
carried by size instead: hero 88px vs H2 40px = **2.2×**, plus tracking.

Do **not** "fix" this by bolding H2 — a synthesised bold on a didone thickens the
hairlines. `font-synthesis: none` is set globally to prevent it. If literal weight
contrast is ever required, the display face has to change; nothing else delivers it.

### Hero H1 is a two-line lockup by construction

Measured (re-run 2026-07): at 88px the full string "Beverly Hills Car Club by Alex Manos"
is **1408.9px** against **1344px** of content at 1440 — it *cannot* sit on one line.
Break after "Car Club". At 390 the display step caps at **34px** — widest line **324.7px**
inside **350px** of content (390 − 2 × 20px `--container-pad`), 25.3px of headroom.

> **Supersedes 1477.9px / 335px.** Both re-measure ~4–5% narrower, consistent with the
> ~7% drop in Gloock's solid-pixel count above — the Gloock file has changed on Google
> Fonts. **The conclusion is unaffected: 1408.9 still exceeds 1344, so the two-line
> lockup stands.** Gloock's real ceiling at 1440 is ~140px (line 1 = 1337px); the
> hero-C variant uses 124px (line 1 = 1157px, 187px of headroom).

### Palette

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--bg` | `#FAF9F6` | page base (warm off-white, never #FFF) | ink 16.55 ✓AAA |
| `--bg-tint` | `#F2F0EB` | alternating section band | 1.08 vs base — visible, no ruled line |
| `--bg-deep` | `#E8E4DB` | input fill, press row, hover | ink 13.74 |
| `--dark` | `#221F1A` | §06 sell band (warm charcoal) | cream 13.91 ✓AAA |
| `--dark-deep` | `#14120E` | §09 footer | cream 15.85 ✓AAA |
| `--cream` | `#EFECE4` | text on dark | — |
| `--ink` | `#1A1A18` | primary text (warm dark, not flat black) | 16.55 ✓AAA |
| `--ink-soft` | `#46443E` | secondary | 9.25 ✓AAA |
| `--ink-muted` | `#6E6B62` | meta, placeholders — lightest ink allowed | 5.06 ✓AA |
| `--gold` | `#C2A15C` | hairlines, gold **on dark**, hover | **2.33 ✗ on light** · 6.68 ✓ on dark |
| `--gold-ink` | `#8C6D33` | the **only** gold allowed as text/focus on light | 4.58 ✓AA |
| `--danger` | `#9E2B20` | form errors only | 7.07 ✓AAA |
| `--success` | `#3F6B4A` | form success only | 5.84 ✓AA |
| `--logo-red` | `#D31720` | **reference only — never a UI token** | — |

**One gold, two levels** (hue 41° vs 39° — same family). A single gold cannot serve
both roles: `--gold` is unusable as text on off-white. **Gold fills take ink text
(7.09 ✓) — white on gold is 2.46 ✗ and is never allowed.**

**How red and gold coexist.** The logo shield is `#D31720` and the hero car is red,
but the brief bans red as an accent. They are separated **by role, not by removal**:
red is *content* (logo artwork + photography), gold is *chrome* (hairlines, hover,
focus). They never carry the same job and never appear at the same visual weight —
red arrives as a large photographic mass, gold only as a 1px line or small mark.
Both are warm (red 357°, gold 41°, base 45°), so they read as one family.
Practical rule: **no gold in the header**, where the logo lives; gold enters below
the fold. `--danger` is deliberately darker and desaturated (5°/66%/37%) so a form
error never reads as brand red.

### Type scale (fluid, 390 → 1440) — verified live in browser

| Token | 390 | 1440 | Family | lh |
|---|---|---|---|---|
| `--fs-display` | 34 | **88** | Gloock 400 | 1.02 |
| `--fs-h1` | 30 | 56 | Gloock 400 | 1.08 |
| `--fs-h2` | 28 | 40 | Gloock 400 | 1.16 |
| `--fs-h3` | 22 | 28 | Gloock 400 | 1.25 |
| `--fs-h4` (card) | 19 | 22 | Gloock 400 | 1.3 |
| `--fs-quote` | 20 | 30 | Newsreader *italic* | 1.5 |
| `--fs-body-lg` | 17 | 20 | Inter Tight 400 | 1.6 |
| `--fs-body` | 16 | 17 | Inter Tight 400 | **1.75** ✓ brief 1.7+ |
| `--fs-body-sm` | 14 | 15 | Inter Tight 400 · **450 on dark** | 1.7 |
| `--fs-eyebrow` | 11 | 12 | Inter Tight 600 | .16em caps |

Eyebrows are the **only** all-caps in the system. All headlines and CTAs are
sentence case, per brief.

### Spacing & rhythm

8px base. `--sp-1..9` = 8/16/24/32/48/64/96/128/160.
Steps 1–5 deliberately match Bootstrap's stock spacers (`mb-3` still means 1rem for
the dev team); **6–9 are added, not remapped.**

- `--section-py` 72 → 128px · `--section-py-lg` 80 → 160px (§05 editorial) · `--section-py-sm` 40 → 56px
- `--grid-gap` 32px — the figure measured on Superior Motors
- `--container-max` 1440, `--container-pad` 20 → 48px → content **1344** at the comp
- `--header-h` 72/60 · `--searchbar-h` 80 · `--radius` **0**

### Radius is 0 — evidence, not taste

Measured on the two style anchors: Superior Motors renders **672 elements at 0px**
(vs 13 at 5px); Gallery Aaldering is 0px throughout. Bootstrap's `.375rem` default is
killed at the variable level with `$enable-rounded: false`.

---

## Bootstrap 5.3.8 mapping

Bootstrap is a requirement, not a choice, and the markup ships into a WordPress
theme — so the system lands on Bootstrap's own variables instead of fighting them
afterwards. Every conflict is closed in `_variables.scss` **before**
`@import "bootstrap"`, so the offending CSS is never emitted.

| Bootstrap default | Conflicts with | Our value |
|---|---|---|
| `$font-family-base` → system stack | brief bans system fonts | Inter Tight + metric-adjacent fallbacks |
| `$h1-font-size` 2.5rem | hero must dominate | fluid 30→56; hero 34→88 |
| `$headings-font-weight` 500 | Gloock has one weight → synthetic bold | 400 + `font-synthesis: none` |
| `$body-bg` #FFF / `$body-color` #212529 | both cool, both wrong | #FAF9F6 / #1A1A18 |
| `$border-radius` .375rem | reads as a template | `$enable-rounded: false` + 0 |
| `.container` xxl 1320px | comp is 1440 | xxl 1440 + fluid padding |
| `.card` border + bg + shadow | §04 bans both | module not imported; vars zeroed |
| `$primary` #0d6efd (blue) | brief bans blue | remapped to `--dark`; secondary = gold |
| `$line-height-base` 1.5 | brief demands 1.7+ | 1.75 |
| `$spacers` 0–5 only | no editorial steps | 6–9 added; 0–5 left stock |

**Modules imported:** functions · variables · maps · mixins · utilities · root ·
reboot · type · images · containers · grid · helpers · transitions · buttons · forms ·
nav · navbar · dropdown · accordion (§09 mobile) · carousel (§07) · offcanvas
(§01 mobile) · close · utilities/api

**Excluded:** card · modal · alert · badge · breadcrumb · list-group · pagination ·
popover · progress · spinners · tables · toasts · tooltip · placeholders · button-group

### Three bugs the compile-check caught (fixed)

Found by grepping the *compiled* output, not by reading the source:

1. `--bs-dropdown-inner-border-radius: calc(0 - 1px)` — **invalid CSS** (unitless 0
   minus a length); the browser drops the declaration. Bootstrap derives it via
   `subtract($radius, $width)`. Fixed by setting `$dropdown-inner-border-radius: 0`.
2. `:root` leaked Bootstrap's whole crayon box — `--bs-blue: #0d6efd`,
   `--bs-red: #dc3545`, `--bs-green: #198754` … Nothing consumed them, but they sat
   there inviting a dev to reach for exactly the three hues the brief bans. Fixed
   with `$colors: ()`.
3. `--bs-box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)` survived `$enable-shadows: false`
   (it is emitted by `_root.scss` regardless), and the `.shadow` utility class was
   still generated. Both removed — the only sanctioned shadows are component-level
   (dropdown, offcanvas, header-on-scroll).

### Bundle size — measured, not estimated

| | compressed | gzipped |
|---|---|---|
| our build | **184.2 KB** | **26.1 KB** |
| full bootstrap.min.css | 226.7 KB | 30.4 KB |

19% / 14% saving — **smaller than dropping 15 components suggests**, because the
utilities API dominates the output (77 margin + 72 padding + 47 text rules). If the
bundle must shrink further, trim the `$utilities` map, not the component list.

Dart Sass warns that `@import` is deprecated (removal in 3.0). Bootstrap 5.3's own
docs still use `@import`, so we follow it. Revisit when the theme moves to a
`@use`-native Bootstrap. v6 does not exist; 5.3.8 (Aug 2025) is current.

---

## What Prestige contributes — and what it must not

`sigovs.github.io/prestige-website` is Alex's own work and appears in the brief as a
**quality bar, not a style to port.** Prestige is Plus Jakarta Sans + Inter, modern
sans, no serif — a different visual world from BHCC's editorial serif for 50s–70s
classics.

- **Taken:** token discipline, naming conventions (`--bg` / `--ink` / `--sp-N` /
  `--section-py` / `--ease`), rhythm discipline, depth of state coverage.
- **Not taken:** type pair, palette, character.

The real style anchors are **gallery-aaldering.com** and **superiormotors.us**.

### Reference intel (verified in-browser, not from memory)

- **Superior Motors** genuinely uses **Gloock** — `document.fonts` reports
  `gloock | normal | 400 | loaded`, and their `style.css` has
  `.primary-font { font-family: gloock, serif; }`. It is served via **Adobe Fonts**
  (`use.typekit.net`), not Google Fonts — which is why a source grep for "Gloock"
  finds nothing and the stylesheet is CORS-blocked from `cssRules`. Their H1 is
  Gloock 100px/100px; H2 30px.
  Their Playfair Display / Poppins / Roboto faces all report `unloaded` — enqueued by
  plugins, rendering nothing.
- **Gallery Aaldering** is dark, Montserrat/Poppins/DIN, radius 0 throughout. Its
  contribution is rhythm and photography, **not** typography.

---

## The hero video — done, but deliberately not wired in

`assets/video/home.mp4` (49 MB · 295 s · 1280×720 · **with audio**) is a five-minute
brand film, not a loop. It is **gitignored**; the compressed loop ships beside it.

Delivered — `assets/video/hero-loop.mp4` (2.20 MB) + `.webm` (1.38 MB), 7.97 s,
1280×608, silent, `+faststart`, poster `assets/images/hero-loop-poster.jpg` taken
from the loop's own frame 0:

- **The film is letterboxed.** ffmpeg's `cropdetect` and a pixel measurement agree:
  `crop=1280:608:0:56` — a 2.105:1 master inside a 16:9 container with 56px bars.
  Full-bleed would have shown black bars; the loop is cropped.
- **No continuous driving take reaches 8–15 s.** Longest is 6.67 s (14.6–21.3);
  the bridge take is 5.33 s. The loop is therefore two driving takes joined by a
  0.6 s **dissolve** (a dissolve, not the hard cut the brief rules out).
- **No hard-cut loop is seamless.** Best possible seam Δ 23.44/255 vs a normal
  consecutive-frame step of 5.61 — 4.2× worse, i.e. visibly jumping. With the
  tail crossfaded onto the head the shipped seam measures **5.42/255 — below a
  normal frame step**, i.e. indistinguishable.

**It is not autoplayed, and that is the point.** The footage shows a **dark** 300SL
on the 6th Street Bridge in hazy LA light. The client's chosen poster is a **red**
300SL on a canyon road. Different car, location and light — and the video's car sits
centre-frame, exactly where the left-aligned H1 lives. Measured, text zone (left 46%):
video luma 83.7 / p90 118.0 vs poster 69.8 / p90 82.0. Swapping the loop in would
jump the picture and drop type onto the car. The `<source>` tags are in place,
commented, with the reason. **Uncomment once footage matching this frame exists.**

## Logo — no white master was supplied

The brief asks for a white logo in the dark footer; only the colour PNG exists.
Measured: the master is a **vertical** lockup with a clean transparent gap at rows
781–802 splitting the shield from the "by Alex Manos" signature, and the signature
is **100% pure black** (27,105 opaque px, mean RGB 0,0,0) — invisible on `--dark-deep`.

Temporary, honest solution — no letterform is redrawn:
- `logo-shield.png` — the shield, used as-is. It is a badge drawn on black, so it
  reads on both `--bg` and `--dark-deep`.
- `logo-signature-ink.png` / `logo-signature-cream.png` — the signature, with only
  its **ink** flipped to `--cream` for the footer; the alpha is untouched.
- The two are re-set **side by side**. The vertical master cannot be used whole in a
  72px header: it would put the signature at ~11px tall, illegible. This is a
  re-arrangement of supplied art, and it needs client sign-off.

## Open — needs a client answer

1. **Font licensing / hosting.** Gloock and Newsreader are OFL via Google Fonts;
   Inter Tight is OFL. Recommend **self-hosting** all three in the WP theme (removes the
   Google CDN dependency and its GDPR exposure, and lets us subset Newsreader italic
   to the quote glyphs — well under 23.8 KB). Confirm the team is happy to self-host.
2. **Gloock density — answered on the full comp: it is NOT overloaded. Keep Gloock.**
   Measured on the built page: 15 Gloock blocks, **38.3% of rendered text area**.
   It holds because there are only *two* loud moments (hero 95px, §05 at 50px),
   separated by a whole section, and because §07 (Newsreader) and §09 (all Inter
   Tight) are long Gloock-free stretches. At 20px the card titles read as text, not
   display. The lever was built and compared side by side (`_shots/`): Inter Tight
   500 does buy a cleaner family-contrast against the Gloock section heading, but it
   costs the classic-catalogue character that is the whole point of the brand. If the
   client still wants it quieter, that swap is a 5-line change to §04/§08.
3. **"Lighter-weight H1"** — Gloock has one weight, so hierarchy is size-only.
   Confirm the client accepts this.
4. **Inventory photography carries a burned-in watermark.** Every `_main_f.jpg` the
   site serves has `Stock#XXXXX CALL NOW (310) 975-0272` baked into the image in a
   generic sans — verified on all 6 featured cars. The brief's core instruction is
   "photography is the primary visual element" and it bans fonts that "read as
   generic or corporate". We cannot remove it from the derivative. **Need
   unwatermarked masters.** Also: 600×400 is the largest size the site serves, so
   cards render at ~1.4× DPR, not 2×.
5. **Press logos (§07)** — not supplied. Currently **typographic stand-ins**, not
   imitations of the real marks. Need monochrome SVGs; note Google and Yelp restrict
   recolouring, so their approved assets (or an exception) are required.
6. **Testimonial source** — the quotes in §07 are the ones currently running on
   beverlyhillscarclub.com. Final copy comes from the WordPress backend; need the
   field structure (is attribution one string, or name/location split?).
7. **§05 photo** — the supplied 1280×553 panorama is cropped to fill the column
   full-height, which keeps **50.2%** of the frame width. Measured and checked
   visually: Alex, the 300SL, the Porsches and the depth of the hall all survive, so
   the brief's treatment stands. A 4:5 master would need no crop at all — the brief
   already says this photo will likely change.
8. **§05 body copy and the §08 excerpts are placeholder**, written in Alex's
   first-person voice rather than lorem so the tone can be judged. Not approved copy.
9. **§08 blog images fight the type.** The real featured images have headlines baked
   into them ("DSCENE", "406: From Barn Finds to Global"). That clashes with any card
   title, serif or sans. Recommend clean featured images.
