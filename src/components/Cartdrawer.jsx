import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { cx, formatPrice, productIcon } from '../lib/ui'
import { Drawer, OverlayHeading } from './Overlay'
import { Button, EmptyState } from './ui'

function QtyStepper({ qty, onChange, name }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-surface-line bg-surface-soft p-1">
      <button
        type="button"
        aria-label={`Decrease quantity of ${name}`}
        onClick={() => onChange(qty - 1)}
        className="grid h-7 w-7 place-items-center rounded-full bg-surface text-ink shadow-hair transition-colors hover:bg-ink hover:text-white active:scale-90"
      >
        <Minus size={13} strokeWidth={2.8} />
      </button>
      <span className="tnum w-6 text-center text-sm font-bold text-ink">{qty}</span>
      <button
        type="button"
        aria-label={`Increase quantity of ${name}`}
        onClick={() => onChange(qty + 1)}
        className="grid h-7 w-7 place-items-center rounded-full bg-surface text-ink shadow-hair transition-colors hover:bg-ink hover:text-white active:scale-90"
      >
        <Plus size={13} strokeWidth={2.8} />
      </button>
    </div>
  )
}

export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cartDetailed,
    updateCartQty,
    removeFromCart,
    cartTotal,
    cartCount,
    checkout,
    goToTab,
  } = useApp()

  const close = () => setCartOpen(false)
  const isEmpty = cartDetailed.length === 0

  return (
    <Drawer open={cartOpen} onClose={close} side="right" labelledBy="cart-drawer-title" className="max-w-md">
      <OverlayHeading
        icon={ShoppingBag}
        title="Your cart"
        caption={isEmpty ? 'Nothing added yet' : `${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
        onClose={close}
        closeLabel="Close cart"
      />

      {isEmpty ? (
        <div className="flex flex-1 items-center px-5">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Browse the catalogue and add a course, bot or tool to get started."
            className="w-full border-none bg-transparent py-8"
            action={
              <Button
                onClick={() => {
                  close()
                  goToTab('shop')
                }}
              >
                Browse the shop
              </Button>
            }
          />
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-surface-hair overflow-y-auto overscroll-contain px-5">
            {cartDetailed.map(({ productId, qty, product, unitPrice, lineTotal }) => {
              const Icon = productIcon(product)
              return (
                <li key={productId} className="flex gap-3 py-4">
                  <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-surface-line bg-gradient-to-br from-surface-soft to-surface-sunk text-primary/40">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      <Icon size={24} strokeWidth={1.4} />
                    )}
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-2 text-sm font-bold leading-snug text-ink">
                        {product.name}
                      </p>
                      <button
                        type="button"
                        aria-label={`Remove ${product.name} from cart`}
                        onClick={() => removeFromCart(productId)}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-faint transition-colors hover:bg-danger-light hover:text-danger active:scale-90"
                      >
                        <Trash2 size={14} strokeWidth={2.2} />
                      </button>
                    </div>

                    <p className="tnum text-xs text-ink-muted">
                      {formatPrice(unitPrice)} each
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                      <QtyStepper
                        qty={qty}
                        name={product.name}
                        onChange={(next) => updateCartQty(productId, next)}
                      />
                      <span className="tnum text-md font-extrabold text-ink">
                        {formatPrice(lineTotal)}
                      </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="border-t border-surface-line bg-surface-soft px-5 py-4">
            <dl className="mb-3 space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <dt className="text-ink-muted">Subtotal</dt>
                <dd className="tnum font-semibold text-ink">{formatPrice(cartTotal)}</dd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <dt className="text-ink-muted">Delivery</dt>
                <dd className="font-semibold text-mint-dark">Instant · digital</dd>
              </div>
              <div className="flex items-center justify-between border-t border-surface-line pt-2.5">
                <dt className="text-md font-bold text-ink">Total</dt>
                <dd className={cx('tnum text-xl font-extrabold tracking-tight text-ink')}>
                  {formatPrice(cartTotal)}
                </dd>
              </div>
            </dl>

            <Button block size="lg" onClick={checkout}>
              Checkout
              <ArrowRight size={16} strokeWidth={2.6} />
            </Button>
            <p className="mt-2.5 text-center text-xs text-ink-muted">
              Payment details come next — nothing is charged yet.
            </p>
          </div>
        </>
      )}
      <div className="safe-bottom" />
    </Drawer>
  )
}
