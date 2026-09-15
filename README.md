# @QXGOAT Store

Mobile-first React + Tailwind storefront for digital trading products
(courses, broker code, bots, wallets), plus a standalone admin dashboard.
Built with Vite.

## Running it

```bash
npm install
npm run dev       # dev server with hot reload
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

Storefront is `/`, admin dashboard is `/admin` (`admin.html`).

Copy `.env.example` to `.env.local` and set the FileStore values before
running. Restart Vite after changing environment values.

## Project structure

```
src/
  lib/
    ui.js              cx(), price/rating formatting, category-to-icon mapping
    nav.js             single source of truth for the tab set
  components/
    ui/index.jsx       Button, IconButton, Badge, Card, SearchField,
                       SectionHeading, Price, Rating, Skeleton, EmptyState
    Overlay.jsx        Backdrop, Drawer, Sheet, OverlayHeading
                       (Escape, scroll lock, focus move, inert when closed)
    PageKit.jsx        Page container, CandleChart, DarkPanel, loading/error states
    Header.jsx         mobile bar / desktop nav with inline search
    BottomNav.jsx      mobile + tablet tab bar
    Footer.jsx
    ProductCard.jsx
    Menudrawer.jsx  Cartdrawer.jsx  Filtersheet.jsx  NotificationDrawer.jsx
    Toast.jsx
    Appcontent.jsx     AppProvider / useApp (all state and derived data)
  context/AppContext.jsx   re-export shim
  pages/StorePages.jsx     Home, Categories, Shop, Deals, ProductDetail,
                           Payment, Account
  App.jsx                  responsive shell + routing switch
  index.css                base layer, tokens, utilities
admin.html                 standalone admin dashboard (no build step needed)
tailwind.config.js         design tokens + badge-colour safelist
```

## Design system

Tokens live in `tailwind.config.js` and are mirrored as CSS custom properties
at the top of `admin.html`, so both surfaces share one palette.

- **Colour** — `primary` (brand blue, `DEFAULT` unchanged at `#1464D2`),
  `night` dark surfaces, `ink` text ramp, `surface` light ramp, and
  `mint` / `amber` / `danger` semantics.
- **Type** — Plus Jakarta Sans throughout. Prices, ratings and counts use
  tabular figures (`.tnum`) so numeric columns align.
- **Elevation** — `hair` for rows, `soft` / `card` for panels, `raised` for
  hover, `overlay` for drawers and sheets. Elevation encodes hierarchy
  rather than being applied uniformly.
- **Motion** — interaction only (press, drawer, toast). One entrance
  animation on the home hero. `prefers-reduced-motion` is respected.

### Badge colours

`badgeColor` is stored in the catalogue as a raw Tailwind class string, which
JIT cannot discover by scanning source. The accepted values are pinned in the
`safelist` array in `tailwind.config.js`, and the admin exposes them as a
dropdown. **Adding a new badge colour means adding it to both places.**

## Responsive behaviour

| | Mobile (<640) | Tablet (640–1023) | Desktop (>=1024) |
|---|---|---|---|
| Navigation | bottom tab bar + hamburger | bottom tab bar + hamburger | inline header nav |
| Search | per-page field | per-page field | in the header |
| Shop filters | bottom sheet | bottom sheet | sticky sidebar rail |
| Product grid | 2 columns | 3 columns | 4 columns |
| Product detail | stacked | stacked | 2 columns, sticky media |
| Bottom sheets | sheet | sheet | centred dialog |

The mobile experience is unchanged in structure; the former
`max-w-[428px]` cap was removed so larger screens use the full width.

## Fixed in this pass

Four things were wired up in the UI but did not work. All four are verified
by the browser harness now.

1. **"Try again" could never succeed.** `syncProductsFromApi` cached its
   promise in a module-level variable and never cleared it on rejection, so
   the retry button re-awaited the same rejected promise forever. It now
   clears the cache on failure, keeping the de-duplication of concurrent
   callers but letting a retry issue a fresh request.
2. **The empty-catalogue state was unreachable.** The data layer threw on a
   zero-length result, so a store with no products showed "The catalogue
   didn't load — check your connection". An empty catalogue now resolves
   normally and renders the empty state that was already written for it. The
   empty result is deliberately not cached, so a refresh picks up new
   products. The shop's empty state also gained a **Refresh catalogue**
   action, since "clear your filters" is useless when no filters are set.
3. **Admin: Category ID was `required` but its own hint said "Leave blank to
   generate from the category".** Native validation blocked the save, so the
   submit handler's slug-derivation fallback was dead code and anyone
   following the hint simply could not save. The attribute is gone; the
   fallback works.
4. **The skip link did not move focus.** `<main>` had no `tabIndex={-1}`, so
   activating it scrolled the page but left focus on `<body>` and the next
   Tab went straight back into the header.

Also hardened: `ProductDetailPage` is keyed by product id so quantity and the
image-failed flag reset per product rather than persisting across views.

## Notes for maintainers

- `AppProvider` is the only place state lives. Pages are presentational and
  receive props from `App.jsx`.
- Memo dependency arrays in `Appcontent.jsx` must include `allProducts`. The
  catalogue arrives asynchronously, so omitting it causes lists to render
  empty permanently.
- `admin.html` has no build step and no imports; it is copied as a second
  Vite entry point. Every element ID is referenced by the inline script.

## Security

`src/data/storeDb.js` and `admin.html` both contain a hardcoded FileStore API
key as a fallback. This ships to the browser in `dist/` and is readable by
anyone who views source, which means the admin write endpoints are publicly
callable. The key should be rotated and writes proxied through a server-side
endpoint that holds the secret.
