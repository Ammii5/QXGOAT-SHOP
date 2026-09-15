import { Bell, Menu, ShoppingCart } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { NAV_ITEMS, resolveActiveTab } from '../lib/nav'
import { cx } from '../lib/ui'
import { IconButton, SearchField } from './ui'

function Wordmark({ onClick, compact }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="@QXGOAT Store — go to home"
      className="group flex shrink-0 items-center gap-2.5 rounded-xl text-left"
    >
      {/* Candlestick mark: the product is trading tooling, so the logo says so. */}
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink shadow-soft transition-transform duration-200 ease-spring group-hover:scale-105 lg:h-10 lg:w-10">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <g strokeLinecap="round">
            <line x1="6" y1="4" x2="6" y2="20" stroke="#2F7BF6" strokeWidth="1.5" />
            <rect x="3.5" y="8" width="5" height="8" rx="1.2" fill="#2F7BF6" />
            <line x1="13" y1="3" x2="13" y2="19" stroke="#00B383" strokeWidth="1.5" />
            <rect x="10.5" y="6" width="5" height="9" rx="1.2" fill="#00B383" />
            <line x1="19" y1="7" x2="19" y2="21" stroke="#93A7C4" strokeWidth="1.5" />
            <rect x="16.5" y="11" width="5" height="6" rx="1.2" fill="#93A7C4" />
          </g>
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate text-[15px] font-extrabold tracking-tight text-ink lg:text-base">
          @QXGOAT Store
        </span>
        <span
          className={cx(
            'mt-1 truncate text-[10px] font-semibold tracking-tight text-ink-muted',
            // The tagline is the first thing to go when space is tight.
            compact && 'hidden sm:block',
          )}
        >
          Digital edge market
        </span>
      </span>
    </button>
  )
}

export default function Header({ cartCount, notifCount }) {
  const {
    setMenuOpen,
    setCartOpen,
    setNotifOpen,
    goToTab,
    activeTab,
    searchQuery,
    setSearchQuery,
  } = useApp()

  const current = resolveActiveTab(activeTab)

  return (
    <header className="sticky top-0 z-30 border-b border-surface-line/80 glass">
      <div className="safe-top" />
      <div className="mx-auto flex h-16 w-full max-w-shell items-center gap-3 px-4 sm:px-6 lg:h-[72px] lg:gap-6 lg:px-8">
        {/* Mobile: hamburger. Desktop: the nav is inline, so it's not needed. */}
        <IconButton label="Open menu" onClick={() => setMenuOpen(true)} className="lg:hidden">
          <Menu size={21} strokeWidth={2.3} />
        </IconButton>

        <Wordmark onClick={() => goToTab('home')} compact />

        {/* Desktop primary navigation */}
        <nav aria-label="Primary" className="ml-2 hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map(({ key, label }) => {
            const isActive = current === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => goToTab(key)}
                aria-current={isActive ? 'page' : undefined}
                className={cx(
                  'relative rounded-full px-3.5 py-2 text-sm font-bold tracking-tight transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-ink-soft hover:bg-surface-soft hover:text-ink',
                )}
              >
                {label}
                {isActive ? (
                  <span className="absolute inset-x-3.5 -bottom-[9px] h-0.5 rounded-full bg-primary" />
                ) : null}
              </button>
            )
          })}
        </nav>

        {/* Desktop inline search — on mobile each page carries its own field. */}
        <div className="ml-auto hidden max-w-sm flex-1 lg:flex">
          <SearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search courses, bots, tools…"
            aria-label="Search products"
          />
        </div>

        <div className="ml-auto flex items-center gap-0.5 lg:ml-0">
          <IconButton label="Notifications" badge={notifCount} onClick={() => setNotifOpen(true)}>
            <Bell size={20} strokeWidth={2.1} />
          </IconButton>
          <IconButton label="Cart" badge={cartCount} onClick={() => setCartOpen(true)}>
            <ShoppingCart size={20} strokeWidth={2.1} />
          </IconButton>
        </div>
      </div>
    </header>
  )
}
