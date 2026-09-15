import { X, Minus, Plus, Trash2, ShoppingBag, Package } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Backdrop from './Backdrop'

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartDetailed, updateCartQty, removeFromCart, cartTotal, checkout, goToTab } =
    useApp()

  return (
    <>
      {cartOpen && <Backdrop onClick={() => setCartOpen(false)} />}

      <div
        className={`fixed bottom-0 left-1/2 z-40 w-full max-w-[428px] -translate-x-1/2 transform rounded-t-[26px] bg-white shadow-2xl transition-transform duration-300 ${
          cartOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '82vh' }}
      >
        <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-surface-line" />

        <div className="flex items-center justify-between px-5 pb-2 pt-3">
          <h3 className="text-[16px] font-extrabold text-ink">Your Cart</h3>
          <button
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted active:scale-90"
          >
            <X size={19} />
          </button>
        </div>

        {cartDetailed.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 pb-10 pt-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-soft text-ink-muted">
              <ShoppingBag size={24} />
            </span>
            <p className="text-[13px] font-semibold text-ink">Your cart is empty</p>
            <p className="text-[12px] text-ink-muted">Add something you'll love from the shop.</p>
            <button
              onClick={() => goToTab('shop')}
              className="mt-1 rounded-full bg-primary px-5 py-2.5 text-[12.5px] font-bold text-white shadow-cta active:scale-95"
            >
              Browse Shop
            </button>
          </div>
        ) : (
          <>
            <div className="max-h-[42vh] overflow-y-auto px-5 pb-2">
              {cartDetailed.map(({ productId, qty, product, unitPrice, lineTotal }) => {
                const Icon = product.icon || Package
                return (
                  <div key={productId} className="flex items-center gap-3 border-b border-surface-line py-3 last:border-b-0">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-200 text-primary">
                      <Icon size={24} strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] font-bold text-ink">{product.name}</p>
                      <p className="mt-0.5 text-[12px] font-extrabold text-ink">
                        ${unitPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="flex items-center gap-1.5 rounded-full bg-surface-soft px-1.5 py-1">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateCartQty(productId, qty - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-ink shadow-sm active:scale-90"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-4 text-center text-[12px] font-bold text-ink">{qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateCartQty(productId, qty + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-ink shadow-sm active:scale-90"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        aria-label={`Remove ${product.name}`}
                        onClick={() => removeFromCart(productId)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-red-500 active:scale-90"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="safe-bottom border-t border-surface-line px-5 pb-4 pt-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-ink-muted">Subtotal</span>
                <span className="text-[18px] font-extrabold text-ink">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={checkout}
                className="w-full rounded-full bg-primary py-3.5 text-[13.5px] font-extrabold tracking-wide text-white shadow-cta active:scale-[0.98]"
              >
                CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}