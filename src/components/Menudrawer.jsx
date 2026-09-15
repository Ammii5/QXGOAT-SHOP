import { ChevronRight, ShoppingCart } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { NAV_ITEMS, resolveActiveTab } from '../lib/nav'
import { categoryIcon, cx, formatPrice } from '../lib/ui'
import { Drawer, OverlayHeading } from './Overlay'
import { Button } from './ui'

export default function MenuDrawer() {
  const {
    menuOpen,
    setMenuOpen,
    goToTab,
    goToCategory,
    cartCount,
    cartTotal,
    categories,
    activeTab,
    setCartOpen,
  } = useApp()

  const current = resolveActiveTab(activeTab)
  const close = () => setMenuOpen(false)

  return (
    <Drawer open={menuOpen} onClose={close} side="left" labelledBy="menu-drawer-title">
      <OverlayHeading title="Menu" caption="@QXGOAT Store" onClose={close} closeLabel="Close menu" />

      <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
        <p className="px-3 pb-2 text-2xs font-bold tracking-tight text-ink-faint">Browse</p>

        <div className="space-y-0.5">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = current === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => goToTab(key)}
                aria-current={isActive ? 'page' : undefined}
                className={cx(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-base font-bold tracking-tight transition-colors',
                  isActive ? 'bg-primary-50 text-primary' : 'text-ink hover:bg-surface-soft',
                )}
              >
                <Icon size={19} strokeWidth={2.1} className={isActive ? 'text-primary' : 'text-ink-muted'} />
                {label}
                <ChevronRight size={16} className="ml-auto text-ink-faint" />
              </button>
            )
          })}
        </div>

        {categories.length > 0 ? (
          <>
            <p className="px-3 pb-2 pt-6 text-2xs font-bold tracking-tight text-ink-faint">
              Categories
            </p>
            <div className="space-y-0.5">
              {categories.map((category) => {
                const Icon = categoryIcon(category)
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => goToCategory(category.id)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ink-soft transition-colors hover:bg-surface-soft hover:text-ink"
                  >
                    <Icon size={17} strokeWidth={2} className="text-ink-faint" />
                    <span className="truncate">{category.name}</span>
                    <span className="tnum ml-auto rounded-full bg-surface-sunk px-2 py-0.5 text-2xs font-bold text-ink-muted">
                      {category.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </>
        ) : null}
      </div>

      {cartCount > 0 ? (
        <div className="border-t border-surface-line bg-surface-soft p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="tnum text-sm font-semibold text-ink-muted">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in cart
            </span>
            <span className="tnum text-md font-extrabold text-ink">{formatPrice(cartTotal)}</span>
          </div>
          <Button
            block
            onClick={() => {
              close()
              setCartOpen(true)
            }}
          >
            <ShoppingCart size={16} strokeWidth={2.4} />
            View cart
          </Button>
        </div>
      ) : null}
      <div className="safe-bottom" />
    </Drawer>
  )
}
