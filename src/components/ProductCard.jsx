import { Package, Star, ShoppingCart } from 'lucide-react'

const formatPrice = (price) => `$${Number(price).toFixed(2)}`

export default function ProductCard({ product, onAddToCart, onOpenProduct }) {
  const { name, badge, badgeColor, rating, reviews, price } = product
  const Icon = product.icon || Package

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpenProduct(product)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onOpenProduct(product)
      }}
      className="w-[164px] shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card lg:w-full"
    >
      <div className="relative flex h-[118px] items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 lg:h-[170px]">
        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[8.5px] font-extrabold tracking-wide text-white ${badgeColor}`}
        >
          {badge}
        </span>
        {product.image ? (
          <img
            src={product.image}
            alt={name}
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
        ) : null}
        <Icon size={46} strokeWidth={1.5} className="text-primary" />
      </div>

      <div className="px-2.5 pb-3 pt-2.5">
        <p className="min-h-[32px] text-[12.5px] font-bold leading-snug text-ink">{name}</p>

        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-ink-muted">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <b className="font-bold text-ink">{rating}</b>
          <span>({reviews})</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[14.5px] font-extrabold text-ink">{formatPrice(price)}</span>
          <button
            aria-label={`Add ${name} to cart`}
            onClick={(event) => {
              event.stopPropagation()
              onAddToCart()
            }}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary text-white shadow-cta transition-transform active:scale-90"
          >
            <ShoppingCart size={14} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </div>
  )
}
