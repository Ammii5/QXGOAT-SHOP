# TECHHUB — Mobile E-commerce Homepage

A mobile-first React + Tailwind CSS recreation of the TECHHUB homepage design,
built with Vite.

## What's inside

- **React 18** with functional components + hooks (cart count, add-to-cart
  toast, active nav tab, and an auto-advancing hero carousel are all live
  state, not static markup).
- **Tailwind CSS** for styling, with the brand palette (`primary`, `night`,
  `ink`, `surface`) defined as custom tokens in `tailwind.config.js`.
- **lucide-react** for all icons (header, categories, ratings, nav, product
  art) instead of hand-drawn SVGs.
- **Vite** as the build tool / dev server.

## Mobile optimizations

- `viewport-fit=cover` + `env(safe-area-inset-*)` padding so the header and
  bottom nav respect the notch / home-indicator area on iPhones.
- Horizontal scrollers (categories, trending products) use
  `scroll-snap-type: x mandatory` with hidden scrollbars and
  `-webkit-overflow-scrolling: touch` for native-feeling swiping.
- All tap targets (icon buttons, nav items, add-to-cart) are ≥40px with
  `active:scale-*` press feedback and `touch-action: manipulation` to remove
  the 300ms tap delay.
- Layout is capped at a 428px phone width and centered on larger screens, so
  it looks correct both on an actual phone and when previewed on desktop.
- Fully responsive with no fixed pixel widths outside the phone frame itself.

## Running it

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

For FileStore syncing, copy `.env.example` to `.env.local` and replace both
values with the published Base44 functions URL and the current API Secret Key
from the FileStore dashboard. Restart Vite after changing environment values.

## Already built

A production build is included in `dist/`. Because `vite.config.js` sets
`base: './'`, you can open `dist/index.html` directly in a browser (no server
required) and it will load correctly.

## Project structure

```
src/
  components/
    Header.jsx        top bar: menu, logo, notifications, cart
    SearchBar.jsx      search input + filter button
    Hero.jsx           dark hero banner with auto-rotating dots
    Categories.jsx     horizontal category scroller
    ProductCard.jsx    single trending-product card
    TrendingSection.jsx  "Trending Electronics" row + heading
    PromoBanner.jsx    "Upgrade Your Setup" promo banner
    BottomNav.jsx      fixed bottom tab bar with raised Shop button
  data/
    categories.js
    products.js
  App.jsx              top-level layout + state
  index.css            Tailwind directives + mobile utility classes
```
