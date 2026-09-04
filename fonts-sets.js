/* ============================================================================
   BHCC — typeface sets, v2
   ----------------------------------------------------------------------------
   One source of truth, loaded by both pages:
     fonts-specimen2.html  — any two side by side
     index_fonts2.html     — one of them on the real page

   Every face here is NEW. None of the eight from the first round appear as an
   option; Cormorant Garamond is kept only as the control, because a comparison
   needs the thing being compared against.

   Fields:
     k  key (used in the URL)          n  name shown in the picker
     s  the full stack, as a caption   t  a two-word tag
     g  group, for the dropdown        d  display face   b  body face   m  data face
     w  why it is here
   ============================================================================ */

window.FONT_CSS = [
  "https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Cinzel:wght@400..900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Crimson+Pro:ital,wght@0,300..700;1,300..700&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300..900;1,9..40,300..900&family=DM+Serif+Display:ital@0;1&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Epilogue:ital,wght@0,300..800;1,300..800&family=Figtree:ital,wght@0,300..900;1,300..900&family=Fjalla+One&family=Forum&family=Hanken+Grotesk:ital,wght@0,300..900;1,300..900&family=Inter+Tight:wght@300..600&family=Italiana&display=swap",
  "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Karla:ital,wght@0,300..800;1,300..800&family=Literata:ital,opsz,wght@0,7..72,300..700;1,7..72,300..700&family=Lora:ital,wght@0,400..700;1,400..700&family=Manrope:wght@300..800&family=Marcellus&family=Montserrat:ital,wght@0,300..800;1,300..700&family=Oswald:wght@300..700&family=Outfit:wght@300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Prata&family=Public+Sans:ital,wght@0,300..800;1,300..800&family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&family=Sora:wght@300..800&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Syne:wght@400..800&family=Urbanist:ital,wght@0,300..800;1,300..800&display=swap"
];

/* Both pages need these in their <head>; injecting from here keeps the list in one place. */
window.injectFontCss = function () {
  window.FONT_CSS.forEach(href => {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = href;
    document.head.appendChild(l);
  });
};

window.FONT_SETS = [
  { k:'current', n:'Cormorant Garamond', s:'current · + Inter Tight', t:'the site today', g:'On the site today',
    d:"'Cormorant Garamond',serif", b:"'Inter Tight',sans-serif", m:"ui-monospace,Menlo,monospace",
    w:"What the site runs today, kept only as the thing to measure against. A light, high-contrast old-style serif — it reads heritage and does it well at large size. Its weakness is the middle: the strokes thin out as the type gets smaller. Every other option on this page is new; none of them were in the first round." },

  { k:'montserrat', n:'Montserrat', s:'wide geometric · one family', t:'wide geometric', g:'Sans — geometric',
    d:"'Montserrat',sans-serif", b:"'Montserrat',sans-serif", m:"'Montserrat',sans-serif",
    w:"The face the note named by name. A wide geometric drawn from Buenos Aires shopfront lettering — friendly, familiar, and very widely used, which cuts both ways: nothing here will feel unfamiliar, and nothing will feel particular to this dealer. Even figures and strong capitals, which suits a price and a phone number." },
  { k:'poppins', n:'Poppins', s:'pure geometric · one family', t:'pure geometric', g:'Sans — geometric',
    d:"'Poppins',sans-serif", b:"'Poppins',sans-serif", m:"'Poppins',sans-serif",
    w:"The most purely geometric option here — circles for bowls, near-monoline strokes, a tall x-height. It is the closest common face to the Futura the note gestured at, and the most cheerful thing on this page. Watch the long paragraph: monoline geometry is harder to read at length than it looks at headline size." },
  { k:'manrope', n:'Manrope', s:'soft geometric · one family', t:'soft geometric', g:'Sans — geometric',
    d:"'Manrope',sans-serif", b:"'Manrope',sans-serif", m:"'Manrope',sans-serif",
    w:"A geometric with the corners taken off — softer than Poppins, quieter than Montserrat. It is the current house style of expensive-feeling software, which is both its strength and its risk: it reads modern and calm, and it reads like a technology brand rather than like a dealer of pre-war cars." },
  { k:'urbanist', n:'Urbanist', s:'low-contrast geometric · one family', t:'low-contrast geometric', g:'Sans — geometric',
    d:"'Urbanist',sans-serif", b:"'Urbanist',sans-serif", m:"'Urbanist',sans-serif",
    w:"Geometric but drawn thin and wide, with unusually open counters. At large size it is the most elegant sans in this set — it holds a headline without shouting. At small size it gives away less than Poppins does, because the strokes stay even as they shrink." },
  { k:'outfit', n:'Outfit', s:'clean geometric · one family', t:'clean geometric', g:'Sans — geometric',
    d:"'Outfit',sans-serif", b:"'Outfit',sans-serif", m:"'Outfit',sans-serif",
    w:"The plainest geometric of the five — no quirks anywhere, a very even colour on the page. If the objection to the current face is that it is fussy, this is the far end of the answer. The risk is the mirror of Montserrat's: it will never look wrong, and it will never look like anybody in particular." },

  { k:'schibsted', n:'Schibsted Grotesk', s:'editorial grotesque · one family', t:'editorial grotesque', g:'Sans — grotesque, with more voice',
    d:"'Schibsted Grotesk',sans-serif", b:"'Schibsted Grotesk',sans-serif", m:"'Schibsted Grotesk',sans-serif",
    w:"A Norwegian newspaper grotesque. Tighter and more assertive than any geometric above, with headlines that keep their weight at size — it is drawn for a front page, so the display end is where it pays off. Reads editorial rather than corporate, and it is not yet on every site." },
  { k:'hanken', n:'Hanken Grotesk', s:'humanist grotesque · one family', t:'humanist grotesque', g:'Sans — grotesque, with more voice',
    d:"'Hanken Grotesk',sans-serif", b:"'Hanken Grotesk',sans-serif", m:"'Hanken Grotesk',sans-serif",
    w:"A grotesque with a hand in it — the terminals are cut at an angle rather than straight across, which warms the whole page without adding decoration. The best all-rounder here for long text, and the least likely of the grotesques to feel cold under photographs of cars." },
  { k:'epilogue', n:'Epilogue', s:'sharp grotesque · one family', t:'sharp grotesque', g:'Sans — grotesque, with more voice',
    d:"'Epilogue',sans-serif", b:"'Epilogue',sans-serif", m:"'Epilogue',sans-serif",
    w:"The most opinionated sans in the set. Narrow apertures, flat sheared terminals, a slightly condensed fit — it looks like a fashion house rather than a dealership, and that is exactly the question worth asking. Strong at display, demanding at body size." },
  { k:'jakarta', n:'Plus Jakarta Sans', s:'contemporary grotesque · one family', t:'contemporary grotesque', g:'Sans — grotesque, with more voice',
    d:"'Plus Jakarta Sans',sans-serif", b:"'Plus Jakarta Sans',sans-serif", m:"'Plus Jakarta Sans',sans-serif",
    w:"Modern, slightly squared, with a distinctive single-storey g and a confident bold. It carries hierarchy on weight alone better than most one-family options, which matters on a page that has six levels of text and only one typeface to build them from." },
  { k:'figtree', n:'Figtree', s:'friendly grotesque · one family', t:'friendly grotesque', g:'Sans — grotesque, with more voice',
    d:"'Figtree',sans-serif", b:"'Figtree',sans-serif", m:"'Figtree',sans-serif",
    w:"Rounder and more open than the rest of this group — approachable without being soft. Its figures are particularly even, which is worth watching on the price row: a lot of friendly faces fall apart the moment they have to set a dollar amount next to a phone number." },

  { k:'ebgaramond', n:'EB Garamond', s:'old-style serif · + Manrope', t:'old-style serif', g:'Serif — book and text',
    d:"'EB Garamond',serif", b:"'Manrope',sans-serif", m:"'Manrope',sans-serif",
    w:"The most direct answer to the note. The same class as the face on the site today — a Garamond — but cut with more weight in the stem, so it does not thin out through the middle sizes the way Cormorant does. If this fixes the complaint, the objection was to one particular cut and the site keeps its serif." },
  { k:'spectral', n:'Spectral', s:'text serif · one family', t:'text serif', g:'Serif — book and text',
    d:"'Spectral',serif", b:"'Spectral',serif", m:"'Spectral',serif",
    w:"A serif drawn for screens at reading size rather than for a headline. It is the one option here where a single face could carry both the section heads and the paragraphs under them with no second family. Less presence at the hero, more competence everywhere else." },
  { k:'crimson', n:'Crimson Pro', s:'book serif · + Figtree', t:'book serif', g:'Serif — book and text',
    d:"'Crimson Pro',serif", b:"'Figtree',sans-serif", m:"'Figtree',sans-serif",
    w:"An old-style book face in the Garamond tradition but drawn for screens — warmer and rounder than EB Garamond, with a larger x-height that survives the small sizes. This is the quiet, literary end of the serif answer: heritage without ceremony." },
  { k:'lora', n:'Lora', s:'contemporary serif · + Hanken Grotesk', t:'contemporary serif', g:'Serif — book and text',
    d:"'Lora',serif", b:"'Hanken Grotesk',sans-serif", m:"'Hanken Grotesk',sans-serif",
    w:"Brushed, moderately contrasted, contemporary rather than historical — it reads as a magazine rather than as a museum. The most robust serif in this group at small sizes, and the one that fights least with photography sitting next to it." },

  { k:'playfair', n:'Playfair Display', s:'display serif · + Manrope', t:'display serif', g:'Serif — display and didone',
    d:"'Playfair Display',serif", b:"'Manrope',sans-serif", m:"'Manrope',sans-serif",
    w:"The face most people mean when they say luxury on the web. High contrast, transitional heading toward didone, and used on a very large share of fashion and property sites — it will look right immediately, and it will look like everybody else. Worth seeing so that familiar can be chosen on purpose rather than by default." },
  { k:'bodoni', n:'Bodoni Moda', s:'didone · + Manrope', t:'didone', g:'Serif — display and didone',
    d:"'Bodoni Moda',serif", b:"'Manrope',sans-serif", m:"'Manrope',sans-serif",
    w:"A true didone: hairline serifs, extreme thick-to-thin. It carries more authority at large size than anything else here, and it is the most fragile as it shrinks. It ships an optical-size axis to fight exactly that, and the ramp at the bottom of the comparison page is where you find out whether the axis wins." },
  { k:'prata', n:'Prata', s:'soft didone · + Manrope', t:'soft didone', g:'Serif — display and didone',
    d:"'Prata',serif", b:"'Manrope',sans-serif", m:"'Manrope',sans-serif",
    w:"A didone with the contrast dialled back — much of Bodoni's elegance at a fraction of its fragility. One weight only, so every level of hierarchy has to come from size and from the sans underneath it. On a page with this many levels that is a real constraint, and it shows up immediately." },
  { k:'dmserif', n:'DM Serif Display', s:'modern serif · + DM Sans', t:'modern serif', g:'Serif — display and didone',
    d:"'DM Serif Display',serif", b:"'DM Sans',sans-serif", m:"'DM Sans',sans-serif",
    w:"Flat, heavy serifs and a matched sans from the same foundry — the pair is drawn to go together rather than assembled from two places. Cleaner and more contemporary than a Garamond without going all the way to a didone. Display cut only, so there is no bold to lean on." },
  { k:'italiana', n:'Italiana', s:'engraved display · + Manrope', t:'engraved display', g:'Serif — display and didone',
    d:"'Italiana',serif", b:"'Manrope',sans-serif", m:"'Manrope',sans-serif",
    w:"The most extreme option on this page: very high contrast, very light, drawn for couture and hotel identities. It is magnificent at hero size and it disappears at anything else, so it can only ever be the display voice. Drag the size slider down and it fails on purpose — that failure is the point of showing it." },

  { k:'marcellus', n:'Marcellus', s:'roman capitals · + Manrope', t:'roman capitals', g:'Roman capitals — the marque register',
    d:"'Marcellus',serif", b:"'Manrope',sans-serif", m:"'Manrope',sans-serif",
    w:"Roman inscriptional capitals — the lettering of a plaque or a monument rather than of a book. It gives a formality no book serif can reach, and it has one weight and a weak lowercase, so it can only ever be the display voice with something else doing the work underneath it." },
  { k:'cinzel', n:'Cinzel', s:'roman capitals · + Manrope', t:'roman capitals', g:'Roman capitals — the marque register',
    d:"'Cinzel',serif", b:"'Manrope',sans-serif", m:"'Manrope',sans-serif",
    w:"The Trajan lineage — the lettering on a thousand luxury logos and film posters. The most explicitly prestigious option here and the most worn out; included so the cliché can be looked at directly instead of argued about in the abstract. All caps by nature: there is no real lowercase to fall back on." },
  { k:'forum', n:'Forum', s:'roman capitals · + Manrope', t:'roman capitals', g:'Roman capitals — the marque register',
    d:"'Forum',serif", b:"'Manrope',sans-serif", m:"'Manrope',sans-serif",
    w:"The same inscriptional register as the two above, but lighter and less ceremonial — the capitals are narrower and the whole thing sits more quietly. If Cinzel is a film poster and Marcellus is a plaque, this is an engraved invitation. It has a real lowercase, which the other two effectively do not." },

  { k:'oswald', n:'Oswald', s:'condensed · + Hanken Grotesk + JetBrains Mono', t:'condensed', g:'Condensed — plate and poster',
    d:"'Oswald',sans-serif", b:"'Hanken Grotesk',sans-serif", m:"'JetBrains Mono',monospace",
    w:"Condensed, vertical, poster-like — the register of an auction catalogue cover or a race number. It fits far more headline into the same measure than anything else here, which matters on a hero carrying a long line. Its figures are narrow, so the price row is where it is decided." },
  { k:'barlowcond', n:'Barlow Condensed', s:'condensed · + Figtree + JetBrains Mono', t:'condensed', g:'Condensed — plate and poster',
    d:"'Barlow Condensed',sans-serif", b:"'Figtree',sans-serif", m:"'JetBrains Mono',monospace",
    w:"The most automotive face in the set — Barlow was drawn from Californian road signage and licence plates, and the condensed cut is the one that reads as a plate rather than as a poster. Lighter and less shouty than Oswald, and it keeps working further down the size ramp." },
  { k:'fjalla', n:'Fjalla One', s:'condensed display · + Manrope + JetBrains Mono', t:'condensed display', g:'Condensed — plate and poster',
    d:"'Fjalla One',sans-serif", b:"'Manrope',sans-serif", m:"'JetBrains Mono',monospace",
    w:"Heavier and flatter than either above — a display-only condensed with real weight in the stems. It gives a headline the density of a printed catalogue cover. One weight only, and no lowercase worth reading at small size, so everything below the headline has to come from the sans." },

  { k:'tri-editorial', n:'Literata', s:'+ Public Sans + JetBrains Mono', t:'three voices · editorial', g:'Three voices — display, text, data',
    d:"'Literata',serif", b:"'Public Sans',sans-serif", m:"'JetBrains Mono',monospace",
    w:"Three voices, each with one job. Literata is a book serif with an optical-size axis, so it is redrawn as it shrinks rather than merely scaled — the failure mode that kills most display serifs on this page. Public Sans carries the reading, and the monospace carries facts only: prices, the phone number, the ratings count." },
  { k:'tri-technical', n:'Sora', s:'+ Karla + Space Mono', t:'three voices · technical', g:'Three voices — display, text, data',
    d:"'Sora',sans-serif", b:"'Karla',sans-serif", m:"'Space Mono',monospace",
    w:"The same three-part structure with a squared, engineered display face at the top. Karla underneath is warm and slightly quirky, which stops the pairing going cold, and Space Mono gives the data a typewriter accent rather than a software one. The most modern-feeling option on the page." },
  { k:'tri-art', n:'Syne', s:'+ Manrope + DM Mono', t:'three voices · art-directed', g:'Three voices — display, text, data',
    d:"'Syne',sans-serif", b:"'Manrope',sans-serif", m:"'DM Mono',monospace",
    w:"The most art-directed thing here. Syne was drawn for a contemporary art centre — the wide, slightly strange capitals are a deliberate signature rather than a neutral choice. Manrope keeps the body quiet so the display face can be loud, and DM Mono keeps the numbers precise. Either it is the identity, or it is far too much." },
];

window.fontByKey = k => window.FONT_SETS.find(o => o.k === k) || window.FONT_SETS[0];
