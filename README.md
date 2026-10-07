# दुर्गोत्सव २०२५ — Amrut Durgotsav

A rebuild of [amrutdurgotsav.com](https://amrutdurgotsav.com/) as a bilingual
Next.js site. Same campaign, same facts, new design and architecture.

Durgotsav is a people's festival organised by **AMRUT** (महाराष्ट्र संशोधन,
उन्नती व प्रशिक्षण प्रबोधिनी), an autonomous body of the Government of
Maharashtra. It invites people across Maharashtra to build replicas of the
twelve forts inscribed by UNESCO in July 2025, photograph them, and upload
them to a shared platform — an attempt that earned a Guinness World Records
title for the *Largest Online Photo Album of Handmade Sculptures*.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /mr
npm run build
npm run start
npm run typecheck
```

Node 20+. No environment variables are required to run; see
[Environment](#environment) for the optional ones.

---

## Where the content came from

The original site is a client-rendered Vite SPA, so its text lives in a
JavaScript bundle rather than in the HTML. Every Marathi string in `src/data`
was extracted from that bundle and is reproduced verbatim — headings, the
mission essay, the dignitaries' statements, the FAQ, the privacy policy and
terms, the dates, and the contact details. English is a full parallel
translation of that same copy; no facts were added in translation.

Two things are **not** from the source site, and both are marked as such in
the code:

- **The list of twelve forts** (`src/data/forts.ts`). The source site refers
  to "आपल्या १२ गडदुर्ग" throughout but never enumerates them. The list, the
  site typology for each, and the district attributions come from the UNESCO
  inscription itself (*Maratha Military Landscapes of India*, 47th session of
  the World Heritage Committee, 11 July 2025). Each description is limited to
  long-established, documented history.
- **The fort photographs** in `public/fort/`, supplied separately.

Where a fact was not available it was left out rather than invented. The
clearest example is the participation counter: the figure comes from the live
platform, and when that cannot be reached the band renders without it instead
of showing a placeholder number. The same principle shapes the
[registration form](#registration): no invented platform URL, and no success
message unless the submission actually went somewhere.

---

## Architecture

```
src/
  app/
    [locale]/            the root layout lives here — every page is locale-prefixed
      page.tsx           homepage
      forts/[slug]/      the twelve forts, statically generated per locale
      mission/ participate/ gallery/ album/ record/ voices/ faq/ contact/
      privacy/ terms/
      error.tsx  not-found.tsx
    global-not-found.tsx  branded 404 for URLs that match no route
    sitemap.ts  robots.ts  manifest.ts
  middleware.ts          prefixes the default locale onto unprefixed paths
  components/
    layout/  hero/  sections/  gallery/  ui/  decor/
  data/                  all content, typed and localised
  lib/
    i18n.ts              Locale, LocalizedText, number formatting
    repositories.ts      the only place that knows about external APIs
    seo.tsx              metadata + JSON-LD builders
    motion.ts  hooks.ts  utils.ts
```

### Content is separated from presentation

Every string is a `LocalizedText` (`{ mr, en }`) in `src/data`. Components
resolve them with `t(value, locale)`. Adding a third language is a data
change, not a component change.

### `src/lib/repositories.ts` is the only seam to the outside

Gallery photos, the record album and the participation count all come through
that one file. Swapping in Sanity, Strapi or a GraphQL gateway is a change
there and nowhere else. Every function fails soft: an unreachable upstream
renders an empty state, never an error page.

### Localisation

Routes are `/mr/...` and `/en/...`, both statically generated, each with its
own canonical URL and `hreflang` alternates. `middleware.ts` sends any
unprefixed path to the default locale with its path intact — so `/forts`
resolves to `/mr/forts`, and old inbound links keep working. Renamed routes
from the previous site (`/photoalbum`, `/testimonials`, …) are handled by
permanent redirects in `next.config.ts`.

### The brand lockup

`components/layout/BrandLockup.tsx` is the single source for the institutional
masthead, used by both the header and the footer:

```
State Emblem of India │ अमृत │ ◉ Durgotsav emblem │ दुर्गोत्सव २०२५
```

The first two marks establish the Government of Maharashtra attribution; the
last two are the festival. Both institutional files are white line art on
transparency, so the lockup only ever sits on a dark ground. Below `md` the
two institutional marks drop away and the festival lockup carries on alone —
at phone widths all four would shrink the emblem past legibility, and the
attribution is repeated in the footer regardless.

### Registration

`/participate#register` carries a real form. Every "नोंदणी करा" CTA on the
site points at that anchor.

It is a plain `<form action={serverAction}>`, so it submits and validates
**with JavaScript disabled**; `useActionState` only adds the pending state and
refills the fields when validation sends the form back. Validation runs on the
server — the browser's `required` and `type` attributes are a courtesy to the
person filling it in, not a check.

The fields are exactly those the campaign's own privacy policy says it
collects (नाव, ईमेल, मोबाईल क्रमांक व शहर), plus an optional fort and a
required consent box that links to the policy.

Submission has three honest outcomes and no fourth:

| | when |
| --- | --- |
| **success** | `REGISTRATION_ENDPOINT` is configured and accepted the entry |
| **handoff** | no endpoint configured — the details are handed to WhatsApp, prefilled and formatted, over the number the campaign already publishes |
| **error** | validation failed, or the endpoint refused |

There is deliberately no path where the form reports success while the data
goes nowhere. Until an endpoint exists, the handoff means the form is useful
today rather than decorative.

A hidden honeypot field absorbs simple bots. Mobile numbers are normalised
(`+91`, spaces and dashes stripped) before validation and before sending.

### Typography across two scripts

Devanagari and Latin need different display faces and different metrics.
`src/components/ui/Typo.tsx` is the single place that decides which, and the
small-label utilities come in two forms — `text-eyebrow` for Latin and
`text-eyebrow-mr` for Devanagari, because wide Latin letter-spacing pulls
matras away from their base glyphs. `eyebrowClass()` picks by inspecting the
string, so a Marathi label inside the English site still gets Devanagari
metrics.

Devanagari line-heights are deliberately looser than their Latin counterparts.
दुर्गोत्सव sets its repha (र्) above the shirorekha, and a tight line box inside
an `overflow-hidden` parent shears it off — the word then reads as "दुगोत्सव".

### Type scale

The whole scale sits in `globals.css` and every step was raised one notch —
small labels most of all, where Devanagari suffered worst. An 11px eyebrow
with `line-height: 1` was both hard to read and clipping its own ascenders;
it is now 13px Latin / 15px Devanagari with room around it.

Devanagari carries more detail per glyph than Latin at the same nominal size,
so `text-eyebrow-mr` runs two steps larger than `text-eyebrow`, and the
Devanagari heading steps are set independently of the Latin ones.

Two layout consequences, both handled:

- The desktop nav moved from `lg` (1024px) to `xl` (1280px). At 1024 the
  four-part lockup plus six Devanagari nav items no longer fit on one line —
  the nav wrapped and overlapped the wordmark. Below 1280 the hamburger takes
  over.
- `NavItem` gained an optional `short` label. Nav items want to be terse while
  page titles and breadcrumbs want the full form; sharing one string forced
  the English bar to carry "The Twelve Forts" and overflow at 1280.

### Motion

Three ideas — *rise*, *unmask*, *stagger* — applied through one `Reveal`
primitive, so the whole site moves with one grammar.

Nearly all of it is **CSS**, not JavaScript:

- The hero entrance and the scroll reveals are CSS animations. The reveals use
  scroll-driven animations (`animation-timeline: view()`), and the contract is
  inverted from the usual approach: **revealed is the default state**, and the
  animation is layered on only where supported. Nothing — a failed bundle, an
  unsupported browser, a blocked script — can leave content invisible.
- The reading-progress bar is `animation-timeline: scroll()`.

Framer Motion is reserved for things that genuinely need state: the mobile
menu, the lightbox, the custom cursor, the fort hover preview, the page
transition, and the registration notice.

`prefers-reduced-motion` removes all of it, and Lenis smooth scrolling is
skipped entirely on touch devices and under reduced motion.

### Accessibility

Lighthouse accessibility **100** on every page checked. Single `<h1>` per
page, no heading-level skips, every image has alt text, every control has an
accessible name, focus is trapped and restored in the menu and lightbox, and
tap targets meet the 24px minimum.

Two colour decisions came out of measurement: button labels are deep ink on
saffron (5.99:1 — white on the same saffron is 3.28:1 and fails AA), and the
paper-zone gold was darkened to clear 4.5:1 on both paper tones.

### SEO

Per-page metadata, canonicals and `hreflang` through `pageMetadata()`;
`Organization`, `WebSite`, `Event`, `BreadcrumbList`, `ItemList`, `FAQPage`
and per-fort place/image JSON-LD; sitemap with language alternates; robots;
manifest. Lighthouse SEO and Best Practices are **100** across the site.

---

## Environment

All optional — defaults point at the live Durgotsav services.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin used for canonicals, OG tags and the sitemap |
| `NEXT_PUBLIC_GALLERY_API` | Gallery photographs endpoint |
| `NEXT_PUBLIC_ALBUM_API` | World-record album endpoint |
| `NEXT_PUBLIC_STATS_API` | Participation count endpoint |
| `REGISTRATION_ENDPOINT` | Server-only. Where registrations are POSTed as JSON. Unset → WhatsApp handoff |
| `REGISTRATION_TOKEN` | Server-only. Sent as `Authorization: Bearer …` with each registration |

Set `NEXT_PUBLIC_SITE_URL` in production — canonical URLs and the sitemap
depend on it.

---

## Known trade-offs

- **Performance is around 75, not 90+.** The remaining cost is the weight of
  the page itself: Devanagari webfont subsets are ~65 KB per weight per script,
  and the homepage is a long bilingual narrative. Getting to 90 means cutting
  content from the homepage or dropping a font weight — a design decision, not
  a code one. Accessibility, Best Practices and SEO are 100.
- **No first-load splash screen.** One was built and removed. Because it could
  only mount after hydration, it appeared *on top of* a page the visitor could
  already see, and then faded — a flash of "Loading…" over finished content.
  The hero's own CSS entrance is the arrival moment instead. The branded
  between-page curtain in `PageTransition` is still there.
- **`experimental.globalNotFound`** is enabled so `app/global-not-found.tsx`
  can serve unmatched URLs. Without it, Next falls back to its own unbranded
  404 outside the layout. It is an experimental flag; if it is ever removed,
  that file becomes dead and unmatched URLs revert to the default page.
- **Only Instagram is wired up in the social row.** The footer, mobile menu and
  contact page all render a social icon row driven by `SOCIAL` in
  `src/data/site.ts`. Instagram carries the real campaign URL. Facebook, X and
  YouTube are listed there with no `href` and so are not rendered — on the
  source site all three are `href="#"` placeholders, and no official accounts
  could be verified. Paste a URL into the matching entry and the icon appears
  everywhere at once, including in the `sameAs` structured data.
- **Lighthouse accessibility reads 96–97 on pages whose content sits in a
  scroll reveal**, flagging contrast on elements it sampled while they were
  still fading in. Measured once settled, those same elements are 5.2:1 and
  5.6:1 against 4.5:1 required. It is a measurement artifact of scroll-driven
  animation, not a barrier — but worth knowing before someone re-runs the audit.
- Gallery and album read live endpoints that were unreachable from the build
  environment, so those two surfaces were verified through their empty states
  rather than with real photographs.
