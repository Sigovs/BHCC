# BHCC — Design system (step 1)

Beverly Hills Car Club by Alex Manos — homepage redesign.
**Scope of this step: the design system only.** The homepage is not built, by instruction.

Open `design-system.html` for the living specification.

```
aan_BHCC_redesign/
├── design-system.html          ← the spec page (open this)
├── assets/
│   ├── css/
│   │   ├── tokens.css          ← SOURCE OF TRUTH: colour · type · spacing · motion
│   │   ├── design-system.css   ← styles for the spec page only (not shipped)
│   │   └── main.css            ← compiled Bootstrap + brand layer (generated)
│   ├── scss/
│   │   ├── _variables.scss     ← Bootstrap overrides, BEFORE @import "bootstrap"
│   │   └── main.scss           ← module import list + brand layer
│   ├── js/design-system.js     ← spec page: live token readout + spacing ruler
│   └── images/                 ← optimised derivatives (masters stay in refference/)
└── refference/                 ← client-supplied brief, wireframes, logo, photos
```

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

## Open — needs a client answer

1. **Font licensing / hosting.** Gloock and Newsreader are OFL via Google Fonts;
   Inter Tight is OFL. Recommend **self-hosting** all three in the WP theme (removes the
   Google CDN dependency and its GDPR exposure, and lets us subset Newsreader italic
   to the quote glyphs — well under 23.8 KB). Confirm the team is happy to self-host.
2. **Gloock density on a full page.** The homepage will carry Gloock in the hero, 2
   section headings, 6 inventory cards and 3 blog cards — ~12 blocks of a loud didone
   against a brief that says "less busy". It reads well in a 3-up test; it needs
   judging on the full comp. Lever if it feels heavy: card titles drop to Inter Tight 500
   (which is what Superior Motors actually does — their card titles are sans, not
   serif) or to Newsreader. This changes §04/§08 only.
3. **"Lighter-weight H1"** — see above. Confirm the client accepts size-only
   hierarchy, since Gloock cannot do weight contrast.
4. **Hero video** — footage from the BHCC content team is still outstanding; the
   poster still is currently the Mercedes 300SL placeholder. Overlay values are the
   brief's own (rgba .45 centre → .25 edge) and may need retuning against real
   footage, which is likely brighter/busier than the still.
5. **Press logos (§07)** — Google/Yelp/Hemmings/Hollywood Reporter/Total 911/eBay
   assets not supplied. Need monochrome SVGs. Note some (Google, Yelp) have brand
   guidelines that restrict recolouring to grayscale — may need an exception or their
   approved marks.
6. **Testimonial source** — brief says quotes come from the WordPress backend. Need
   the field structure to know whether attribution is one string or name/location split.
