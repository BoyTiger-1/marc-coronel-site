# Marc Coronel — personal site

A single-page, hand-built site. No framework, no build step, no dependencies, no
platform branding. Open `index.html` and it runs.

```
index.html              all markup and copy
assets/css/main.css     all styling
assets/js/main.js       all behaviour
assets/img/photos/*.jpg real photography of Marc (11 photos)
assets/img/*.svg        abstract motifs for the 2 chapters with no matching photo
assets/img/reveal-*.jpg duotone art for the cursor-hold reveal layer (derived from the real photos)
```

To preview locally with correct font loading:

```bash
npx serve .          # or: python -m http.server 8000
```

Deploy by uploading the four items above to any static host (Netlify, Vercel,
Cloudflare Pages, S3, plain nginx). There is nothing to compile.

---

## Before launch

| What | Where | Notes |
|---|---|---|
| **Booking email** | `index.html` — `.contact__direct`, `mailto:marc@marccoronel.com` | Appears twice in effect: the link itself, and the form's mailto fallback reads it from that link. Change it in the one place. Confirm this inbox is live. |
| **Form endpoint** | `index.html` — `<form id="bookForm" action="#">` | While `action` is `#`, the form validates and then opens the visitor's mail client pre-filled. Set `action` to a Formspree/Basin/CRM URL and it posts normally instead. |
| **Testimonials** | `index.html` — `.voices__list` | Currently "In the press" — real, attributed press mentions (FOX 11, American Kidney Fund, TEDx), not invented quotes from named people. If Marc has approved testimonials from event organizers or clients, they can replace or sit alongside this block — see the original template's `is-slot` pattern in git history if you want the dashed empty-state back. |
| **Social links** | `index.html` — `.contact__direct` and the JSON-LD block in `<head>` | LinkedIn is the profile given in the brief. YouTube/TikTok were dropped for lack of a confirmed channel URL — add back once you have the real link. |

### Photography

Eleven real photos of Marc are in `assets/img/photos/` — sourced from the
`marccolnel.lovable.app` draft the brief listed as inspiration, which is Marc's
own earlier project. They cover the boxer/trainer era, dialysis, the
transplant and hospital recovery, the Sacramento capitol meeting, TEDx Logan
Circle (two angles), Rare Kidneys on the Hill Day at the US Capitol, and the
Transplant Games of America gold medal. Two chapters (**The Diagnosis**,
**The Fall**) and one (**The Search**) still use the original abstract motif
art, because no photo exists for that specific moment — an invented stock
"diagnosis" photo would read as filler, so it stays abstract by design.

If better or additional real photography becomes available (more event shots,
a more recent portrait, LinkedIn banner images once you have a logged-in
export), drop them into `assets/img/photos/` at roughly 1600px on the long
edge and swap the `src` — everything is `object-fit: cover`, so exact pixel
sizes are not critical.

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
| City of LA and State of California FSGS awareness recognition | [Voyage LA](https://voyagela.com/interview/marc-coronel-of-los-angeles-on-life-lessons-legacy-highlight/); LA City Council resolution and California HR 113 per Marc's own site draft (see below) |
| TEDx talk, TEDx Logan Circle, on the living-donor search reaching a match through public storytelling | TEDxLogan Circle; Marc's own site draft |
| "I didn't find my purpose in a moment of peace, it found me in the middle of a crisis." | [Bold Journey](https://boldjourney.com/meet-marc-coronel/) |
| "A healthy person has a thousand wishes and a sick person has just one—to get better." | UCLA Health |
| "Advocacy often starts from a place of survival and grows into purpose." | Voyage LA |
| 20+ years in health and wellness | Bold Journey; HuffPost contributor bio |
| Primary FSGS incidence ≈ 1.7 per 100,000 person-years; most frequent primary glomerular disease progressing to kidney failure | [PMC11835197](https://pmc.ncbi.nlm.nih.gov/articles/PMC11835197/); [Rare Disease Advisor](https://www.rarediseaseadvisor.com/disease-info-pages/focal-segmental-glomerulosclerosis-epidemiology/) |

The facts below were not in the original source list. They come from
`marccolnel.lovable.app` and `kidneyfighter-method.lovable.app` — two draft
sites the brief listed as direct inspiration, which read as Marc's own
earlier attempts at this same site and are more specific/citation-conscious
than anything findable by public search (they name individual staffers and
bill numbers). Treat them as a strong lead, not a verified press citation —
**worth a two-minute confirmation with Marc before this goes live**:

| Claim in copy | Source |
|---|---|
| NephCure, California Team Leader | Marc's own site draft |
| Co-author, peer-reviewed FSGS patient-experience research, published in CJASN | Marc's own site draft |
| Gold medalist, Transplant Games of America, Denver 2026, Team SoCal | Marc's own site draft; matches the photo in `assets/img/photos/transplant-games.jpg` |
| Los Angeles FSGS Awareness Day resolution, Office of Councilmember Eunisses Hernandez (District 1) | Marc's own site draft |
| California HR 113, authored by Assemblymember Jeff Gonzalez | Marc's own site draft |
| Rare Kidneys on the Hill Day — NephCure federal briefings with the office of Sen. Alex Padilla, New Era of Preventing End-Stage Kidney Disease Act | Marc's own site draft; matches `assets/img/photos/hill-day.jpg` |
| American Kidney Fund federal advocacy for the Living Organ Donor Protection Act | Marc's own site draft |
| A half-brother flew in from the Philippines as a potential donor and was ruled out | Marc's own site draft |
| "I lost every version of myself I recognized." | Marc's own site draft (interlude quote) |
| "The Hardest Punch I Ever Took" — AKF Kidney Collective episode title | Marc's own site draft |

**Removed from the previous draft:** a claim that the California State Senate
passed a specific resolution (SCR 87) by a 34–0 vote. No citation for that
vote count could be verified, and it conflicts with the Assembly HR 113
framing above, so it has been replaced throughout with the defensible,
source-backed version (LA City Council + California HR 113, no vote tally
stated). If Marc has the real bill number and vote record, add it back with
a link.

### Confirm with Marc before publishing

1. **Losing coverage under his father's military insurance.** In the brief; not
   in any article found. Chapter 03 ("The Fall") is written around it.
2. **Lifestyle Athletics programs in prisons, schools and corporations.** In the
   brief and consistent with his role as founder/CEO, but no article describes
   the programs. Chapter 07 and the accolades list.
3. **Years dialysis ran.** UCLA Health says end-stage renal disease in 2017;
   FOX 11 describes kidney failure by summer 2019; AKF says roughly two and a
   half years of dialysis before the December 2019 transplant; Marc's own site
   draft says "2017–19." The copy now uses "2017–2019" in Chapter 04 to match
   the draft and the UCLA Health start date — confirm this is the range Marc
   wants stated.
4. **HuffPost contributor.** Confirmed directly — see `huffpost.com/author/lifestyleathletics-572`.
5. **The metrics band.** "32 donors screened," the 2-jurisdiction count, and
   "3 legislative campaigns" are defensible from the sources above, but if
   Marc tracks real numbers — talks delivered, people reached, patients
   matched with donors — those are stronger. Swap them into `.metrics` and
   update the `data-count` attribute to match the new figure.
6. Everything in the "not in the original source list" table above — see that
   section for what to double-check first.

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

**The hero background** is a real photo (`photos/01-hero-fighter.jpg`), full-bleed,
with a slow 22s alternating Ken Burns scale and a two-layer gradient scrim for
text contrast — the same photo (duotone-treated) opens the title card behind
his name. The opening title card fades to reveal it, so the page reads
fighter-dark-photo → his name → his actual face in the portrait beside the
headline, in one continuous first screen, rather than a separate sequence.

**Ambient light** (`.ambient`) is three blurred, `screen`-blended radial
gradients drifting on a 34–41s loop, transform/opacity only. It's what keeps
the page from reading flat-black between photographs; `prefers-reduced-motion`
freezes them in place rather than removing them.

**The photo wipe** (`.wipe`) is a `clip-path` curtain reveal with a one-shot
ember sheen, triggered by `IntersectionObserver` the first time an image
scrolls into view: the hero portrait and every gallery tile use it. See
"Known trade-offs" for why the horizontal chapter track does not.

**The reveal** (`.reveal`) is three stacked background layers under one shared
radial-gradient mask, positioned from the pointer. Press and hold grows the
radius and keeps it until release. Each layer is a real photo of Marc, darkened
and duotoned to a single accent color (`reveal-ring.jpg` fighter-era/ember,
`reveal-ward.jpg` dialysis-era/steel, `reveal-stage.jpg` TEDx-era/amber — all
derived from photos also used elsewhere on the page, via a duotone + vignette
treatment, not stock art). The active
layer changes with the section and the active chapter, so the hidden image
always matches the part of the story on screen. Since the hero now carries its
own real, always-visible photo, the hold-to-reveal mask is only active from the
identity section onward — it has nothing to add over Marc's own opening photo.
It is CSS masking on a single composited layer — no canvas, no WebGL.
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
- **Two chapters and one abstract motif remain SVG art**, deliberately — see
  "Photography" above.
- **The chapter-track photos don't use the curtain-wipe reveal** that the hero
  portrait and gallery use. They're inside a horizontally `translate3d`'d rail,
  and on a fast/instant scroll (a scrollbar drag, an anchor jump, "End") an
  `IntersectionObserver`-driven reveal can end up permanently clipped if the
  element never lingers in the viewport long enough to be sampled. The chapter
  track already has its own scroll-computed active/near opacity and scale
  state (driven directly by the rAF loop, not by `IntersectionObserver`), so it
  doesn't need the wipe on top — adding it there was tried and reverted for
  that reason.
- **Google Fonts is the only external request.** Self-host the three families if
  you want the page fully offline-capable or need to avoid the third-party
  request.
