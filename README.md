# Marc Coronel — personal site

A single-page, hand-built site. No framework, no build step, no dependencies, no
platform branding. Open `index.html` and it runs.

```
index.html              all markup and copy
assets/css/main.css     all styling
assets/js/main.js       all behaviour
assets/img/*.svg        placeholder art (see "Replace before launch")
```

To preview locally with correct font loading:

```bash
npx serve .          # or: python -m http.server 8000
```

Deploy by uploading the four items above to any static host (Netlify, Vercel,
Cloudflare Pages, S3, plain nginx). There is nothing to compile.

---

## Replace before launch

Everything below is marked in the source with `REPLACE` comments. Search the
repo for `REPLACE` to find them all.

| What | Where | Notes |
|---|---|---|
| **Booking email** | `index.html` — `.contact__direct`, `mailto:hello@marccoronel.com` | Appears twice in effect: the link itself, and the form's mailto fallback reads it from that link. Change it in the one place. |
| **Form endpoint** | `index.html` — `<form id="bookForm" action="#">` | While `action` is `#`, the form validates and then opens the visitor's mail client pre-filled. Set `action` to a Formspree/Basin/CRM URL and it posts normally instead. |
| **Testimonials** | `index.html` — `.voices__list`, three `<li class="voice is-slot">` | Deliberately empty. Paste the real quote and attribution, then delete `is-slot` and the `<i>awaiting approval</i>` tag. Do not ship invented quotes. |
| **Photography** | `index.html` — `.gallery__grid`, and every `.chap__media img` | Swap the `src` for a real image. On gallery tiles also remove `is-slot` from the `<figure class="plate is-slot">` to drop the crop marks and "Photo slot" label. |
| **Hero portrait** | `index.html` — `assets/img/portrait-hero.svg` | The current file is a low-light figure study standing in for a real portrait. This is the single highest-value swap on the page. |
| **Social links** | `index.html` — `.contact__direct` and the JSON-LD block in `<head>` | LinkedIn URL is the one listed on his Voyage LA interview; confirm it is current. |

### Image specs for the swap

| Slot | Aspect | Suggested export |
|---|---|---|
| Hero portrait | 3:4 portrait | 1200×1600, dark/low-key |
| Chapter plates (8) | 4:5 portrait | 1200×1500 |
| Gallery — large tile | roughly 4:3 | 1400×1050 |
| Gallery — standard tiles | 10:7 | 1000×700 |
| Gallery — bottom band | 32:9 | 1920×540 |

Everything is `object-fit: cover`, so exact pixel sizes are not critical —
aspect ratio and a dark, low-key grade are. The page is near-black; bright,
evenly-lit photos will fight it.

---

## Fact sourcing

The copy is built from published sources, not invention. Quotes are verbatim and
attributed in-page to where they were said.

| Claim in copy | Source |
|---|---|
| Amateur boxer, three-hour daily training, followed Pacquiao and Mayweather | [UCLA Health](https://www.uclahealth.org/news/article/ucla-kidney-transplant-patient-now-fights-for-a-new-cause) |
| FSGS diagnosis at 26, during a physical for individual insurance | UCLA Health; [American Kidney Fund](https://www.kidneyfund.org/article/marc-coronel-shares-his-journey-living-rare-kidney-disease-first-fsgs-awareness-day) |
| No identifiable genetic origin | American Kidney Fund |
| 10–15 medications a day | UCLA Health |
| 18 months of in-center dialysis, began after collapsing at home | American Kidney Fund |
| "I read about 67 books on mental strength and adversity [while on] dialysis." | American Kidney Fund |
| Waitlisted in California, Arizona, Maryland (Baltimore), New York | American Kidney Fund |
| "When 32 people step forward, you have so much hope and one by one it was denied." | [FOX 11 Los Angeles](https://www.foxla.com/news/former-boxer-knocks-out-kidney-disease) |
| Donor Shawna Robinson; anemia, then iron infusions; transplant Dec 10 2019 at UCLA; walking within 12 hours; discharged in 3 days | FOX 11; UCLA Health; American Kidney Fund |
| Lead Ambassador, UCLA CORE Kidney Program; Circle of CORE | UCLA Health |
| AKF Ambassador and Kidney Health Coach; Kidney Action Summit on Capitol Hill re: living-donor protections and Medicaid | American Kidney Fund |
| City of LA and State of California FSGS awareness recognition | [Voyage LA](https://voyagela.com/interview/marc-coronel-of-los-angeles-on-life-lessons-legacy-highlight/) |
| California Senate SCR 87, FSGS Awareness Day, adopted 34–0 | California State Senate, SCR 87 (June 10, 2025) |
| TEDx talk "The Courage to Ask: How a Simple Story Can Save a Life" | [TEDxLogan Circle](https://tedxlogancircle.com/marc-coronel/) |
| "I didn't find my purpose in a moment of peace, it found me in the middle of a crisis." | [Bold Journey](https://boldjourney.com/meet-marc-coronel/) |
| "A healthy person has a thousand wishes and a sick person has just one—to get better." | UCLA Health |
| "Advocacy often starts from a place of survival and grows into purpose." | Voyage LA |
| 20+ years in health and wellness | Bold Journey |
| Primary FSGS incidence ≈ 1.7 per 100,000 person-years; most frequent primary glomerular disease progressing to kidney failure | [PMC11835197](https://pmc.ncbi.nlm.nih.gov/articles/PMC11835197/); [Rare Disease Advisor](https://www.rarediseaseadvisor.com/disease-info-pages/focal-segmental-glomerulosclerosis-epidemiology/) |

### Confirm with Marc before publishing

These came from the project brief rather than a published source, or the
published sources disagree. They are in the copy and should be checked:

1. **Losing coverage under his father's military insurance.** In the brief; not
   in any article found. Chapter 03 ("The Fall") is written around it.
2. **Youth co-chair, Panorama City neighborhood council.** In the brief; not
   independently confirmed. Chapter 07.
3. **Lifestyle Athletics programs in prisons, schools and corporations.** In the
   brief and consistent with his role as founder/CEO, but no article describes
   the programs. Chapter 07 and the accolades list.
4. **Year dialysis began.** UCLA Health says end-stage renal disease in 2017;
   FOX 11 describes kidney failure by summer 2019; AKF says 18 months of
   dialysis before the December 2019 transplant. The copy deliberately says
   "18 months in the chair" and avoids naming a year. If Marc confirms a date,
   add it to the Chapter 04 `.chap__meta` line.
5. **HuffPost contributor.** Listed in "In print" from the author page in the
   brief. Worth a link once confirmed.
6. **The metrics band.** "10+ yrs" coaching patients and the two-jurisdiction
   count are defensible from the sources above, but if Marc tracks real numbers
   — talks delivered, people reached, patients matched with donors — those are
   stronger. Swap them into `.metrics` and update the `data-count` attribute to
   match the new figure.

---

## How it works

**Motion policy.** Only opacity, transform and CSS masks animate. Nothing
renders continuously — no WebGL, no canvas loop, no particles. One
`requestAnimationFrame` loop drives everything and early-exits when nothing has
changed; scroll work is coalesced into that loop through a dirty flag.

**The horizontal chapter track** (`.story`) is native scrolling, not
scroll-jacking. The section's height is set in JS to viewport height plus the
track's overflow width, its inner wrapper is `position: sticky`, and the rail is
translated by the section's scroll progress. Trackpads, wheels, keyboards and
scrollbars all behave normally. Arrow keys step between chapters while the
section is in view, and the index row jumps directly.

**Below 900px** the pin is switched off entirely and the chapters stack
vertically — plain scrolling, all detail visible, no transforms.

**The reveal** (`.reveal`) is three stacked background layers under one shared
radial-gradient mask, positioned from the pointer. Press and hold grows the
radius and keeps it until release. The active layer changes with the section and
the active chapter, so the hidden image always matches the part of the story on
screen. It is CSS masking on a single composited layer — no canvas, no WebGL.
It stays closed until the visitor actually moves the pointer, is disabled on
coarse pointers and under `prefers-reduced-motion`, and only repaints when the
mask has actually moved.

**The cursor** uses `mix-blend-mode: difference`, so one cursor stays legible on
every background without needing per-section variants. It is only enabled for
`hover: hover` + `pointer: fine`; touch and keyboard users get the native
cursor.

**Button hierarchy** is deliberate: exactly one filled ember pill exists on the
page, the header's "Book Marc". Every other action is a ghost or plain button.
If you add a filled button anywhere, that hierarchy breaks.

**Accessibility.** Skip link to services, visible focus rings, a real `<form>`
with labels, landmark structure, `prefers-reduced-motion` honoured throughout
(the title card and reveal are removed outright), and the title card is
dismissable with Escape or a click rather than trapping anyone for its 2.1s.

**Audio.** There is none, by design. If ambient audio is ever added, it must be
off by default and behind an explicit control.

---

## Known trade-offs

- **"The active chapter expands"** is done with scale and opacity plus revealing
  the body copy, not by animating width. Animating width would relayout the
  whole track every frame. This gets the same read at 60fps.
- **The placeholder art is intentionally abstract.** Each chapter has its own
  motif (ring ropes, cell clusters, a broken trace, dialysis tubing, plotted
  waitlist cities, a horizon arc, a community lattice, a stage cone) so the page
  looks art-directed before photography arrives. The gallery instead shows
  honest photo slots with crop marks, because six pieces of invented "event
  photography" would read as filler.
- **Google Fonts is the only external request.** Self-host the three families if
  you want the page fully offline-capable or need to avoid the third-party
  request.
