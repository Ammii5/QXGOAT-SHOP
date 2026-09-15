import { X, Home, LayoutGrid, ShoppingBag, Tag, User, Heart, Package, HelpCircle, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Backdrop from './Backdrop'

const NAV_LINKS = [
  { key: 'home', label: 'Home', icon: Home, tab: 'home' },
  { key: 'categories', label: 'Categories', icon: LayoutGrid, tab: 'categories' },
  { key: 'shop', label: 'Shop', icon: ShoppingBag, tab: 'shop' },
  { key: 'deals', label: 'Deals', icon: Tag, tab: 'deals' },
  { key: 'account', label: 'Account', icon: User, tab: 'account' },
]

const EXTRA_LINKS = [
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
  { key: 'orders', label: 'Order History', icon: Package },
  { key: 'help', label: 'Help & Support', icon: HelpCircle },
]

export default function MenuDrawer() {
  const { menuOpen, setMenuOpen, goToTab, showToast, cartCount } = useApp()

  return (
    <>
      {menuOpen && <Backdrop onClick={() => setMenuOpen(false)} />}

      <aside
        className={`fixed left-0 top-0 z-40 h-full w-[78%] max-w-[300px] transform bg-white shadow-2xl transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-surface-line px-5 py-5">
          <div className="flex items-center gap-1.5">
            <Zap size={18} className="fill-primary text-primary" strokeWidth={0} />
            <span className="text-[17px] font-extrabold text-ink">@QXGOAT Store</span>
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-transform active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-3 py-3">
          <p className="px-2 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wide text-ink-muted">
            Browse
          </p>
          {NAV_LINKS.map(({ key, label, icon: Icon, tab }) => (
            <button
              key={key}
              onClick={() => goToTab(tab)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[14px] font-semibold text-ink transition-colors hover:bg-surface-soft active:scale-[0.98]"
            >
              <Icon size={19} strokeWidth={2} className="text-primary" />
              {label}
              {key === 'shop' && cartCount > 0 && (
                <span className="ml-auto rounded-full bg-surface-soft px-2 py-0.5 text-[10px] font-bold text-ink-muted">
                  {cartCount} in cart
                </span>
              )}
            </button>
          ))}

          <p className="px-2 pb-2 pt-4 text-[11px] font-bold uppercase tracking-wide text-ink-muted">
            More
          </p>
          {EXTRA_LINKS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setMenuOpen(false)
                showToast(`${label} — coming soon`)
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[14px] font-semibold text-ink transition-colors hover:bg-surface-soft active:scale-[0.98]"
            >
              <Icon size={19} strokeWidth={2} className="text-ink-muted" />
              {label}
            </button>
          ))}
        </div>
      </aside>
    </>
  )
}