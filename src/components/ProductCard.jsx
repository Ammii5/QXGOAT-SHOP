import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cx, netPrice, productIcon } from '../lib/ui'
import { Price, Rating } from './ui'

/**
 * Fluid by default — the parent grid or scroller decides the width, so the
 * same card works in a 2-up phone grid and a 4-up desktop grid.
 */
export default function ProductCard({ product, onAddToCart, onOpenProduct, className }) {
  const { name, badge, badgeColor, rating, reviews, price, discountPct } = product
  const Icon = productIcon(product)

  // The old card rendered the <img> *and* the fallback icon, so the icon sat
  // on top of every real photo. Now the icon only appears if there's no usable
  // image — including when the image 404s at runtime.
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(product.image) && !imageFailed

  const discount = Number(discountPct || 0)
  const finalPrice = netPrice(product)

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`View ${name}`}
      onClick={() => onOpenProduct(product)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpenProduct(product)
        }
      }}
      className={cx(
        'group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-surface-line bg-surface shadow-soft',
        'transition-all duration-200 ease-spring',
        'hover:-translate-y-1 hover:border-primary-200 hover:shadow-raised active:translate-y-0 active:scale-[0.99]',
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-surface-soft to-surface-sunk">
        {showImage ? (
          <img
            src={product.image}
            alt={name}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
          />
        ) : (
          <span className="grid h-full w-full place-items-center text-primary/35">
            <Icon size={44} strokeWidth={1.25} className="sm:h-12 sm:w-12" />
          </span>
        )}

        <div className="pointer-events-none absolute inset-x-2 top-2 flex items-start justify-between gap-2">
          {badge ? (
            <span
              className={cx(
                'rounded-full px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-sm',
                badgeColor || 'bg-primary',
              )}
            >
              {badge}
            </span>
          ) : (
            <span />
          )}
          {discount > 0 ? (
            <span className="tnum rounded-full bg-mint px-2 py-1 text-[10px] font-extrabold leading-none text-white shadow-sm">
              −{Math.round(discount)}%
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-3.5">
        {product.category ? (
          <p className="truncate text-[10px] font-bold tracking-tight text-primary">
            {product.category}
          </p>
        ) : null}

        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug tracking-tight text-ink sm:text-base">
          {name}
        </h3>

        <Rating value={rating} reviews={reviews} />

        <div className="mt-auto flex items-end justify-between gap-2 pt-1.5">
          <Price value={finalPrice} was={discount > 0 ? price : null} size="sm" />

          <button
            type="button"
            aria-label={`Add ${name} to cart`}
            onClick={(event) => {
              event.stopPropagation()
              onAddToCart()
            }}
            className={cx(
              'grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-white shadow-cta',
              'transition-all duration-200 ease-spring hover:bg-primary-500 hover:shadow-raised active:scale-90',
            )}
          >
            <Plus size={17} strokeWidth={2.8} />
          </button>
        </div>
      </div>
    </article>
  )
}
