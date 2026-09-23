# Figma → Code Implementation Notes

Lessons learned from the first FlyTaxi Home page build. **Read this before implementing any new Figma screen.**

## Mistakes made (v1)

### 1. Icons — substituted generic libraries instead of Figma assets

**What went wrong**
- Used `lucide-react` icons (Check, MapPin, Luggage, etc.) and emojis (✈️, 🚗, 🔒) instead of the design's icon set.
- Figma uses specific assets: `hugeicons:tick-01`, `emojione:airplane`, `bi:luggage-fill`, `glyphs-poly:car`, `fluent-color:lock-closed-20`, etc.

**Correct approach**
1. Call Figma MCP `download_assets` for the section node.
2. Save SVGs/PNGs to `public/images/icons/`.
3. Reference via `src/assets/figma-icons.ts`.
4. Use `<FigmaIcon />` or `<Image unoptimized />` — never swap for Lucide/emoji unless the design explicitly uses emoji (e.g. 📱 in "Easy Booking").

---

### 2. Footer colors — wrong token mapping

**What went wrong**
- Used `text-background` for copyright (ambiguous).
- Link hover jumped to white too aggressively.
- Column header color was approximate, not exact.

**Figma tokens (Footer node `3239:6245`)**
| Element | Value |
|---------|-------|
| Background | `#0b1f33` (`primary-2`) |
| Column headings | `#cbd5e1`, 13px, uppercase, tracking `1.04px` |
| Links / body | `#94a3b8`, 14.4px, line-height 21.6px |
| Copyright | `#f8fbff`, 20px |
| Divider | `border-white/[0.08]` |

**Correct approach**
- Map tokens in `globals.css` and use semantic names (`text-footer-heading`, `text-subtext`).
- Always pull colors from `get_variable_defs` or `get_design_context`, not guess from screenshots.

---

### 3. Hero layout — structure didn't match Figma

**What went wrong**
- Used a generic CSS grid with `items-start` instead of Figma's `flex items-center gap-[117px]`.
- Missing map background image at 15% opacity.
- Wrong gradient (simple radial instead of the 152° multi-stop linear gradient).
- Badge used a CSS dot instead of the car icon.
- Feature ticks were 20px Lucide checks instead of 36px `hugeicons:tick-01`.
- App store buttons were hidden/shown incorrectly (split between mobile/desktop columns).
- Scroll indicator wasn't uppercase with `tracking-[1.1px]` at 40% opacity.

**Figma layout (Hero node `3239:5679`)**
```
Section (min-h ~1155px, bg #0b1f33)
├── Map image overlay (opacity 15%)
├── Linear gradient overlay (152.39deg, multi-stop)
├── Radial glow overlay (opacity 40%)
└── Content row: flex items-center gap-[117px]
    ├── Left column (max 693px): badge → headline → features → app buttons
    └── Right column (max 544px): BookingWidget
└── Scroll indicator (absolute bottom center, opacity 40%)
```

**Correct approach**
1. Fetch `get_design_context` on the **section node**, not just child frames.
2. Reproduce background layers in order (map → gradient → radial).
3. Match exact flex direction, alignment, gaps, and max-widths from Figma.
4. Keep app store buttons inside the left column always.

---

### 4. Hero ghost text — wrong asset exported as background

**What went wrong**
- Used `download_assets` on the **entire hero section** (`3239:5679`) and set that PNG as the background at 15% opacity.
- That export includes all headline/copy rendered into the image → duplicate “ghost” text visible behind real content.

**Correct approach**
- Export **only** the map layer node (`3239:5680`) for the subtle map texture.
- If the map-only asset is unavailable, use **CSS gradients only** — never a full-frame section screenshot as `background-image`.
- Final CTA section (`3239:6214`) uses a **gradient**, not flat `#0b1f33`:
  `linear-gradient(160.53deg, rgb(11, 31, 51) 0%, rgb(26, 58, 86) 100%)`

---

## Checklist for every new Figma screen

- [ ] Confirm Figma file access (`whoami` + `get_design_context`)
- [ ] Fetch section-level context (not only leaf nodes)
- [ ] Run `get_variable_defs` for color/font tokens
- [ ] Run `download_assets` and commit icons to `public/images/`
- [ ] Compare screenshot from `get_screenshot` before marking done
- [ ] Do **not** substitute Lucide/Heroicons/emojis unless design uses them
- [ ] Match exact hex values, font sizes, letter-spacing, and opacity
- [ ] Test responsive: mobile stack → desktop side-by-side where Figma shows row layout
- [ ] Run `npm run build` after changes

## Asset locations

```
public/images/
  hero/map-bg.png          — hero map background
  icons/*.svg              — exported Figma SVG icons
  logo.png                 — brand logo (header + footer)
src/assets/figma-icons.ts  — single import map for all assets
```

### 5. FAQ & Contact pages — built without Figma access (wrong layout)

**What went wrong**
- Figma MCP **rate-limited** on Starter plan while fetching FAQ (`3231:4212`) and Contact (`3231:3835`). Pages were built from guesses using Home page patterns.
- **Incorrect assumption:** both pages use a dark navy hero + white content. They do **not**.
- FAQ tabs were wrong (`Pricing`, `Changes` instead of `Payment`, `Cancellation`).
- FAQ accordion used individual rounded cards instead of a flat divider list.
- Contact had form on the **left**, bordered info cards, WhatsApp block, Subject dropdown, First/Last name split, and a **Call Us** button — none of which appear in Figma.
- User was **not told clearly** that these pages were unverified against Figma.

**Mandatory rule — always disclose MCP failures**

Before building or fixing any screen from Figma, attempt `get_design_context` (and `get_screenshot` when useful). If the call fails:

1. **Tell the user immediately** — do not silently guess.
2. State the exact failure (rate limit, no access, wrong node, etc.).
3. Say what you **could not verify** (colors, copy, field list, spacing).
4. If building from a user screenshot instead, say so explicitly and list remaining unknowns.
5. Add a note in this doc under **Unverified / failed fetches** (see below).

**Contact page (`3231:3835`) — verified from user screenshot**

| Section | Background | Content |
|---------|------------|---------|
| Hero | `bg-white` | Badge "Get in Touch", title **"Contact FLYTAXI"**, gray subtitle |
| Main content | `bg-background` (`#f8fbff`) | Two columns |

Layout (left → right):
- **Left — Contact Information:** three plain rows (no card borders): Phone (+ "24/6 support"), Email (+ "We reply within hours"), Service Area "All of Israel" (+ "To & From Ben Gurion Airport"). Then **Quick Actions**: "Book a Transfer" (solid blue) + "View FAQ" (outline). **No WhatsApp block.**
- **Right — Send a Message:** heading **outside** the white card. Form fields: Full Name*, Phone*, Email, Message* only. **Single** "Send Message" button with paper-plane icon. **No Subject, no Call Us button.**

**FAQ page (`3231:4212`) — verified from user screenshot**

| Section | Background | Content |
|---------|------------|---------|
| Hero | `bg-background` (`#f8fbff`) | Badge "FAQ", title "Frequently Asked Questions", subtitle |
| Main content | `bg-white` | Category tabs + flat accordion list |
| CTA | `bg-background` | White card: "Still have questions?" + Contact Us + Book a Transfer |

Tabs: **All | Booking | Payment | Airport | Cancellation** (not Pricing / Changes).

Accordion: flat rows with thin dividers (not individual rounded cards). First item expanded by default: "How do I book a transfer?". Twelve questions total (see `FAQ_ITEMS` in `src/constants/index.ts`).

**Correct approach**
- Use `InnerPageHero` with `variant="contact"` (white) or `variant="faq"` (light blue) — **not** dark `PageHero`.
- Contact and FAQ have **different** background splits; do not share one generic layout.
- Re-fetch Figma nodes when MCP quota resets for pixel-perfect spacing and exact copy.

---

## Unverified / failed Figma fetches

| Node | Page | Status | Fallback used |
|------|------|--------|---------------|
| `3231:4212` | FAQ | **Rate-limited** — could not fetch | User screenshot (Sep 2026) |
| `3231:3835` | Contact | **Rate-limited** — could not fetch | User screenshot (Sep 2026) |
| `3231:691` | From Airport booking tab | **Rate-limited** — could not fetch | Home widget pattern + guess |
| `3239:5680` | Hero map layer only | Not re-exported after ghost-text fix | CSS gradients only |
| *(unknown)* | Booking flow steps 1–3 | **Rate-limited** — no node IDs provided | User screenshots (Sep 2026) |
| *(unknown)* | Booking flow steps 4–5 | **Rate-limited** — no node IDs | User screenshots (Sep 2026) |
| *(unknown)* | Track Your Driver (`/my-rides/[id]/track`) | **Rate-limited** — Starter tier tool limit | User screenshots (Sep 2026) |

When quota resets, re-run `get_design_context` + `get_screenshot` on these nodes and diff against implementation.

---

### 6. Booking flow — 5-step stepper (steps 1–3 from screenshots)

**Background pattern:** Large outer light-blue container (`rounded-[32px] sm:rounded-[40px] border border-stroke/70 bg-[#f8fbff]/70 p-4 sm:p-8 lg:p-10`) containing a **standalone white stepper card at top** (`rounded-2xl border border-stroke bg-white shadow-sm mb-6`), followed by a **main white content card** (`rounded-2xl border border-stroke bg-white shadow-sm p-6 sm:p-8`), and centered footer disclaimer below.

**Routes**

| Step | Path | Title |
|------|------|-------|
| 1 | `/book/fare` | Your Fare |
| 2 | `/book/details` | Complete Your Booking |
| 3 | `/book/review` | Review Your Booking |
| 4 | `/book/passenger` | Your Details (guest booking form) |
| 5 | `/book/verify` | Verify Your Number |
| — | `/book/payment` | Select Payment Method (step 5 sub-route) |
| — | `/book/bit` | Pay with Bit (Bit selected only) |
| — | `/book/confirm` | Booking Confirmed (final — no stepper) |

**Stepper rules**
- Standalone white card above the content card inside the outer container.
- 5 numbered circles connected by horizontal lines.
- **Completed:** green circle + white checkmark, green connector to next step
- **Active:** solid blue (`primary`) circle + white number
- **Upcoming:** white circle + gray border + gray number

**Step 1 — Your Fare**
- Standalone top stepper card (Step 1 active)
- Green badge: "✓ Your fare is ready"
- Total fare box: `TOTAL FARE` (bold all-caps), large `₪280`, subtext, direction row with airplane icon
- Trip details table: `TRIP DETAILS` (bold all-caps), Direction, Pickup, Destination, Date, Time, Flight, Passengers, Luggage, Vehicle
- "Included in your fare" blue-tinted box with 4 pill tags
- Buttons: Vertically stacked full-width — **Continue Booking →** (primary blue) on top, **Edit Trip** (bordered) below
- Disclaimer: *No account or payment required at this stage.*

**Step 2 — Complete Your Booking**
- Standalone top stepper card (Step 2 active)
- Fare summary bar: direction + green price
- Cards:
  - `ROUTE` (From/To)
  - `DATE & TIME` (`PICKUP DATE`, `PICKUP TIME` all-caps labels)
  - `PASSENGERS & VEHICLE` (`PASSENGERS`, `TROLLEY / CARRY-ON`, `LARGE SUITCASE` all-caps labels)
  - Dedicated subsection: `VEHICLE TYPE` (Standard, Premium, Van / Minibus)
- Primary **Continue →** button
- Same disclaimer below card

**Step 3 — Review Your Booking**
- Standalone top stepper card (Step 3 active)
- Direction banner (no price)
- Three summary cards with **Edit** links → `/book/details`: `ROUTE`, `DATE & TIME`, `PASSENGERS & VEHICLE`
- Total fare bar: `TOTAL FARE` (bold all-caps), `Fixed price · VAT included`, large blue price `₪280`
- **Continue →** → `/book/passenger`

**Step 4 — Your Details**
- Standalone top stepper card (Step 4 active)
- Subtitle: *Complete your booking as a guest — no account required*
- Badge: **Guest Booking — No password needed**
- Nested box structure:
  - White inner bordered card for form inputs: `FULL NAME *`, `PHONE NUMBER *` (helper: verification code), `EMAIL ADDRESS (OPTIONAL)` (helper: confirmation/receipt)
  - Separate dedicated white bordered card for `Booking total` and price `₪280`
- Full-width blue **Continue →** button below total card with clear gap

**Step 5 — Verify Your Number**
- Standalone top stepper card (Step 5 active)
- Phone icon, 6-digit OTP inputs, resend timer with cursor pointer
- **Verify & Continue** → `/book/payment`
- Distinct gray informational note about SMS verification

**Payment — Select Payment Method** (stepper still on step 5)
- Standalone top stepper card (Step 5 active)
- Booking total card: `BOOKING TOTAL` (bold all-caps) with direction + price `₪280`
- `PAY DIRECTLY TO DRIVER` (bold all-caps): Cash, Bit (default selected with blue checkmark pill), PayBox — "Direct to driver" badge
- `SECURE ONLINE PAYMENT` (bold all-caps): Credit Card — "Online to FLYTAXI" badge
- **Continue to Payment →** → `/book/confirm`

**Pay with Bit** (`/book/bit` — when Bit selected)
- Standalone top stepper card (all 5 steps completed/green checkmarks)
- Bit branding, `AMOUNT TO PAY VIA BIT` (bold all-caps) amount box, ride summary, "How Bit payment works" checklist
- **Confirm Booking with Bit ✓** → `/book/confirm`

**Booking Confirmed** (`/book/confirm` — final, no stepper)
- Green check, **Booking Confirmed!**, reference pill with copy (e.g. FLY-2026-5488)
- Bit payment banner (if Bit), `TRIP DETAILS` card, `CUSTOMER DETAIL` card
- Vertically stacked buttons: **View Booking** (primary) on top, **Back to Home** (outline) below
- *A confirmation has been sent to …*

**My Rides & Ride Details**
- Main area uses the same outer rounded light container (`rounded-[32px] sm:rounded-[40px] border border-stroke/70 bg-[#f8fbff]/70`)
- Top header: inline `← My Rides` bold dark header with back arrow
- Centered `Upcoming` / `History` pill tabs
- Ride cards with booking ID, status badge, details, price `₪280`, and `View Details` button
- **Book Another Transfer** action button: **centered and auto-width** (`w-fit mx-auto px-8`), **NOT** full-width!
- Ride detail page: `YOUR DRIVER` (profile + vehicle 3-column grid), `TRIP DETAILS`, dedicated bordered `Payment Method` box, full-width `Track Driver` button.

---

### 7. Layout, Spacing & Cursor Pointer Rules (Sep 2026 Audit)

**Mandatory Layout Separation:**
1. **Outer Shell vs Stepper Card vs Content Card:**
   - DO NOT place the progress stepper inside the same white card as the form or details.
   - Stepper MUST be in its own standalone white card (`rounded-2xl border border-stroke bg-white shadow-sm mb-6`) at the top of the outer shell.
   - The main content MUST be in its own white card (`rounded-2xl border border-stroke bg-white shadow-sm p-6 sm:p-8`).
   - Disclaimer note MUST be centered below the main content card inside the outer shell.

2. **Section Headings (All-Caps Rule):**
   - All section headers in cards must be: `text-xs font-bold uppercase tracking-[0.72px] text-subtext`
   - Step 1: `TOTAL FARE`, `TRIP DETAILS`
   - Step 2: `ROUTE`, `DATE & TIME` (inputs: `PICKUP DATE`, `PICKUP TIME`), `PASSENGERS & VEHICLE` (dropdowns: `PASSENGERS`, `TROLLEY / CARRY-ON`, `LARGE SUITCASE`), `VEHICLE TYPE`
   - Step 3: `ROUTE`, `DATE & TIME`, `PASSENGERS & VEHICLE`, `TOTAL FARE`
   - Step 4: `FULL NAME *`, `PHONE NUMBER *`, `EMAIL ADDRESS (OPTIONAL)`
   - Step 5 (Payment): `BOOKING TOTAL`, `PAY DIRECTLY TO DRIVER`, `SECURE ONLINE PAYMENT`
   - Step 5 (Bit): `AMOUNT TO PAY VIA BIT`
   - Confirm: `TRIP DETAILS`, `CUSTOMER DETAIL`
   - Ride Detail: `YOUR DRIVER`, `TRIP DETAILS`

3. **Box Nesting in Step 4 (Your Details):**
   - Form inputs must be enclosed inside a dedicated bordered white container (`rounded-xl border border-stroke p-5 space-y-4`).
   - `Booking total` and price must be inside a **separate dedicated white box** below the inputs (`rounded-xl border border-stroke p-4 sm:p-5 flex items-center justify-between`), not simply separated by a line.
   - Primary `Continue →` button below with distinct vertical gap.

4. **Button Stacking & Sizing:**
   - Step 1 buttons: Stacked vertically full-width (`flex flex-col gap-3 w-full`), not side-by-side.
   - My Rides button: Centered and auto-width (`w-fit mx-auto px-8`), not full-width.
   - Confirm buttons: Stacked vertically full-width.

5. **Mandatory `cursor-pointer` Rule:**
   - ALL interactive elements (buttons, links, tab items, back buttons, vehicle cards, payment option cards, copy buttons, dropdowns, accordion triggers) MUST have `cursor-pointer`.
   - Added to `src/app/globals.css`:
     ```css
     button,
     [role="button"],
     input[type="submit"],
     input[type="button"],
     select,
     a {
       cursor: pointer;
     }
     ```
   - Explicit `cursor-pointer` class added to `Button` base styles and custom cards.

---

### 8. Track Your Driver Flow (`/my-rides/[id]/track`) — Verified from Screenshots

**Route:** `/my-rides/[id]/track` (accessed by clicking "Track Driver" on the Ride Details page `/my-rides/[id]`).

**Outer Shell & Card Layout:**
- Standard `PageShell` header and footer.
- Outer container: `rounded-[32px] sm:rounded-[40px] border border-stroke/70 bg-[#f8fbff]/70 p-4 sm:p-8 lg:p-10`.
- Main content card: `rounded-2xl border border-stroke bg-white p-5 sm:p-7 shadow-sm`.

**Header Row:**
- Top-left: Back arrow link (`←`) with `cursor-pointer`, heading **Track Your Driver** (`text-xl sm:text-2xl font-extrabold text-primary-2`), subtext showing Booking ID (e.g. `FLY-2026-8847`).
- Top-right: Status badge pill (`bg-primary/10 text-primary text-xs font-semibold rounded-full px-3 py-1 flex items-center gap-1.5`) with red car icon and label "Driver Assigned".

**Map Display (`TrackDriverMap`):**
- Stylized light blue container (`bg-[#e6f2fd] border border-primary/15 rounded-2xl h-[280px] sm:h-[340px] md:h-[380px] overflow-hidden relative`).
- Subtle curved decorative road vectors.
- Dashed route curve in sky blue (`#70b5f9`, strokeWidth: 4.5, strokeDasharray: "8 8").
- **Pins & Markers:**
  - **Pickup:** Green pill badge "Pickup" (`bg-[#10b981]`) with green circle dot below.
  - **Driver Location:** Circular blue car badge (`bg-primary`, white car icon) with floating white pill "Moshe L." below.
  - **Destination:** Red pill badge "Destination" (`bg-[#ef4444]`) with red circle dot below.
  - **ETA Bubble:** Floating white pill badge (`bg-white/95 backdrop-blur-xs rounded-full shadow-md border border-stroke/70 px-3.5 py-1.5 flex items-center gap-2`) with yellow clock icon and text "~12 min away" (or "Trip Completed" when finished).

**Ride Status Timeline (`RideStatusTimeline`):**
- Heading: `RIDE STATUS` (small, all-caps, bold gray `text-xs font-bold uppercase tracking-[0.72px] text-subtext mb-4 mt-6`).
- Five stages: `Assigned`, `On the Way`, `Arrived`, `In Progress`, `Completed`.
- **Active / Assigned State (Screenshot 1):**
  - "Assigned" node: Active blue circle with outer halo (`bg-primary ring-4 ring-primary/20 h-3.5 w-3.5`), label "Assigned" in bold blue.
  - Remaining 4 nodes: Inactive light gray circles (`bg-[#cbd5e1] h-2.5 w-2.5`) with gray line and gray text.
  - No bottom button.
- **Completed State (Screenshot 2):**
  - All 5 nodes: Solid green circles (`bg-success h-3 w-3`).
  - Connecting line: Solid green (`bg-success h-0.5`).
  - All 5 labels: Bold green text (`text-success`).
  - Action button: Full-width blue **View History** button (`cursor-pointer`) linking to `/my-rides?tab=history`.
- Interactive: Timeline nodes are clickable (`cursor-pointer`) to toggle/preview stages.

**Driver Info Row:**
- Left: Circular avatar with pilot illustration (`figmaIcons.pilot`), driver name "Moshe Levi", vehicle "Toyota Corolla · Silver · 123-45-678".
- Right: Rating "★ 4.92" with gold star, "487 trips" subtext.

**Route Summary:**
- Single line with divider: `Ben Gurion Airport, Terminal 3 → Tel Aviv – Dizengoff St 55, Tel Aviv-Yafo`.

**Interactive Cursor Pointer Rule:**
- Back arrow, timeline nodes, and "View History" button all have `cursor-pointer`.

---

**State:** `BookingProvider` + `sessionStorage` key `flytaxi-booking-state`. Includes `fullName`, `phone`, `email`, `paymentMethod`, `otpVerified`.

When Figma node IDs are available, re-verify spacing/copy for steps 4–5.

---

## Booking widget — To vs From tabs

| Tab | Node reference | Key field differences |
|-----|----------------|----------------------|
| **To Airport** | `3239:6332` / `3231:691` (inverse) | Pickup address, destination fixed at Terminal 3 |
| **From Airport** | `3231:691` | Pickup fixed at Terminal 3, **flight number**, **drop-off address**, arrival date/time |

When Figma MCP is available, re-fetch `3231:691` and diff every label, placeholder, and field order against `booking-widget.tsx`.

---

## Figma file reference

- **File:** `czWkQAG5oo7AjqTd5F7IIK` (canvas copy)
- **Home frame:** `3239:5676`
- **Hero section:** `3239:5679`
- **Hero map layer (export this only):** `3239:5680`
- **Footer:** `3239:6245`
- **Why Choose:** `3239:6151`
- **FAQ page:** `3231:4212`
- **Contact page:** `3231:3835`
- **From Airport booking tab:** `3231:691`

---

## 9. Internationalization & RTL (Hebrew) — Sep 2026

The header's language switcher now toggles the **entire app** between English
(LTR) and Hebrew (RTL) while keeping the existing visual design (same
components, spacing, colors) unchanged.

### Why a custom i18n system instead of `app/[lang]/...`

The Next.js docs for this version (`node_modules/next/dist/docs/01-app/02-guides/internationalization.md`)
recommend routing-based i18n (`app/[lang]/page.tsx` + dictionaries). That was
rejected here because:
- It requires restructuring every existing route (`/book/*`, `/my-rides/*`,
  `/faq`, `/contact`, etc.) under a `[lang]` segment — a large breaking change.
- The user explicitly asked to keep "the whole current design" — a
  route-level rewrite risked regressions across the whole app for a feature
  that is purely presentational (text + direction).

Instead, a lightweight **client-side "translate-by-value" dictionary** was
built:

- **`src/lib/i18n/translations.ts`** — `Locale = "en" | "he"`, a `he: Record<string,string>`
  dictionary mapping exact English UI strings to Hebrew, and
  `translate(text, locale)` which does a lookup (returns the original string
  unchanged if there's no match or locale is `"en"`).
- **`src/lib/i18n/language-context.tsx`** — `LanguageProvider` + `useLanguage()`
  exposing `{ locale, dir, setLocale, toggleLocale, t }`. Persists the choice
  to `localStorage` (`flytaxi-locale`), and syncs `document.documentElement.lang`
  / `dir` reactively via `useEffect`. Defaults to `"en"` for SSR-safe initial
  render (the server always renders `<html lang="en" dir="ltr">`; the client
  restores the saved preference on mount, avoiding a hydration mismatch).
- **`src/lib/i18n/locale-store.ts`** — a plain, non-React mutable
  `localeRef.current` ref, kept in sync by `LanguageProvider`. Lets plain
  utility functions (not React hooks) — specifically the formatters in
  `booking-formatters.ts` — read the active locale synchronously without
  changing their call signatures. **Design constraint:** the component calling
  these formatters must itself call `useLanguage()` (even just to grab `t`)
  so it re-renders (and thus re-invokes the formatter) when the locale flips —
  React context only re-renders subscribers, not arbitrary siblings.

### Usage pattern

Any component with static English copy calls `const { t } = useLanguage();`
and wraps the literal string: `{t("Book Now")}`. If the string isn't in the
Hebrew dictionary, `t()` returns it unchanged (safe no-op for English, and a
safety net for anything not yet catalogued for Hebrew).

Shared/leaf components (`DetailRow`, `DetailCard`, `BookingStepHeader`,
`BookingBackButton`, `BookingDisclaimer`, `TotalFareBar`, `IncludedFarePills`,
`VehicleTypePicker`, `PaymentMethodCard`, `RideStatusBadge`, `RideTabs`,
`RideStatusTimeline`, `TrackDriverMap`) translate their own text props
internally, so callers can keep passing plain English literals as props.

### Pluralization / dynamic strings

Dictionary lookup only works for static, exact strings. Dynamic strings
(passenger counts, OTP resend countdown) use dedicated locale-aware helpers
instead of `t()`:
- `formatPassengers(count)` in `booking-formatters.ts` — reads `localeRef`
  and returns `"2 adults"` / `"2 מבוגרים"`.
- The OTP resend countdown in `verify-step.tsx` builds the string manually
  from `t("Resend code in")` + the number + a locale-specific unit suffix.

### RTL implementation

- `LanguageProvider` sets `document.documentElement.dir = "rtl"` for Hebrew.
- Tailwind's default `flex`/`flex-row` + `justify-between`/`items-center`
  layouts mirror automatically under `dir="rtl"` — this gives most of the
  layout "for free" with no per-component rewrites.
- Directional icons/glyphs that do **not** auto-mirror (SVG arrow icons,
  literal `→`/`←` characters in copy, `ArrowLeft` lucide icons used as "back")
  are flipped explicitly per-instance via `dir === "rtl"` checks — see
  `booking-back-button.tsx`, `popular-routes-section.tsx`, and
  `track-driver-page.tsx`'s route-summary arrow.
- A `.ltr-content` utility class (`globals.css`) forces `direction: ltr` +
  `unicode-bidi: isolate` for content that must never mirror regardless of
  page direction: phone numbers, email addresses, booking references, OTP
  digit boxes (`otp-input.tsx` uses `dir="ltr"` directly on its container).
- Right-facing text arrows in button labels (`"Continue →"`) have a
  **separate Hebrew translation using `←`** instead of `→`, so the arrow
  still points in the reading-forward direction once mirrored.

### Hebrew font

`Rubik` (from `next/font/google`, subsets `latin` + `hebrew`) is loaded
alongside the existing `Plus_Jakarta_Sans` and applied only under
`[dir="rtl"] body` in `globals.css`, since Plus Jakarta Sans has no Hebrew
glyph coverage. English/LTR pages are visually unchanged.

### Scope / deliberately not translated

- Mock ride data in `src/features/manage-booking/lib/rides-data.ts`
  (addresses, driver names like "Moshe Levi", vehicle model "Toyota Corolla")
  is treated like real-world proper nouns and left as-is, the same way a map
  service wouldn't translate a street name.
- Free-text user input (contact form fields, booking passenger name/email)
  is never translated — only static UI copy (labels, headings, buttons).

### Files touched

- New: `src/lib/i18n/translations.ts`, `src/lib/i18n/language-context.tsx`,
  `src/lib/i18n/locale-store.ts`.
- Updated: `src/app/layout.tsx` (added `LanguageProvider` + `Rubik` font),
  `src/app/globals.css` (RTL font scoping + `.ltr-content` utility),
  `src/components/layout/header.tsx` (working language toggle button),
  `src/components/layout/footer.tsx`, `src/features/booking/lib/booking-formatters.ts`
  (locale-aware via `localeRef`), and every component listed in sections
  above that renders static English copy (home sections, FAQ, Contact, all
  booking flow steps and shared booking components, My Rides / Ride Detail /
  Track Driver).
