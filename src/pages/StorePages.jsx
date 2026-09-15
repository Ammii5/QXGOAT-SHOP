import {
  ArrowRight,
  Gift,
  Search,
  ShieldCheck,
  Star,
  Tag,
  UserCircle,
  Sparkles,
  SlidersHorizontal,
  Package,
} from 'lucide-react'
import ProductCard from '../components/ProductCard'

export function HomePage({ products, categories, onAddToCart, onShopNow }) {
  return (
    <>
      <div className="flex gap-2.5 px-4 pb-1 pt-3.5">
        <label className="flex h-12 flex-1 items-center gap-2.5 rounded-full bg-surface-soft px-4">
          <Search size={17} strokeWidth={2.2} className="shrink-0 text-ink-muted" />
          <input
            type="text"
            placeholder="Search gadgets, electronics, accessories..."
            className="w-full bg-transparent text-[13.5px] text-ink placeholder:text-ink-muted focus:outline-none"
            readOnly
          />
        </label>
        <button
          aria-label="Filters"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-soft text-ink transition-transform active:scale-90"
          onClick={onShopNow}
        >
          <SlidersHorizontal size={18} strokeWidth={2} />
        </button>
      </div>

      <section className="relative mx-4 mt-2 overflow-hidden rounded-xl2 bg-night px-5 pb-4 pt-6">
        <div
          className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full opacity-40"
          style={{ background: 'radial-gradient(closest-side, rgba(22,133,255,0.55), transparent)' }}
        />

        <div className="relative flex justify-between gap-3">
          <div className="max-w-[58%]">
            <span className="mb-2 block text-[11px] font-bold tracking-wide text-sky-400">DIGITAL DEALS</span>
            <h1 className="text-[21px] font-extrabold leading-[1.18] text-white">
              BUILD YOUR
              <br />
              <span className="text-primary-light">TRADING EDGE.</span>
            </h1>
            <p className="mt-2.5 max-w-[210px] text-[12.5px] leading-relaxed text-slate-400">
              Courses, custom trading systems, broker code solutions, and secure wallet products in one place.
            </p>
          </div>

          <div className="flex w-[38%] items-center justify-center">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <div className="absolute h-24 w-24 rounded-full bg-night-card2/70" />
              <Sparkles size={40} className="absolute -translate-x-4 text-white" strokeWidth={1.5} />
              <Gift size={30} className="absolute translate-x-6 -translate-y-5 text-primary-light" strokeWidth={1.5} />
              <Tag size={22} className="absolute translate-x-3 translate-y-7 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="relative mt-4 flex items-center justify-between">
          <button
            onClick={onShopNow}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-[18px] py-3 text-[12.5px] font-bold tracking-wide text-white shadow-cta transition-transform active:scale-95"
          >
            SHOP NOW
            <ArrowRight size={14} strokeWidth={2.6} />
          </button>

          <div className="flex gap-1.5">
            <span className="h-1.5 w-4 rounded-full bg-primary-light" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          </div>
        </div>
      </section>

      <section>
        <div className="px-4 pt-4">
          <h2 className="text-[18px] font-extrabold text-ink">Top Digital Categories</h2>
        </div>
        <div className="no-scrollbar snap-x-mandatory flex gap-4 overflow-x-auto px-4 pb-1.5 pt-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex w-16 shrink-0 snap-start flex-col items-center gap-2 transition-transform active:scale-95"
              onClick={onShopNow}
            >
              <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-surface-line bg-white text-primary shadow-soft">
                <Star size={22} strokeWidth={2} />
              </span>
              <span className="text-center text-[11px] font-semibold text-ink">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="text-[18px] font-extrabold text-ink">Trending Digital Products</h2>
          <button className="flex items-center gap-1 text-xs font-bold text-primary" onClick={onShopNow}>
            View All
            <ArrowRight size={13} strokeWidth={2.6} />
          </button>
        </div>

        <div className="no-scrollbar snap-x-mandatory flex gap-3.5 overflow-x-auto px-4 pb-2 pt-3.5">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => onAddToCart(product)} />
          ))}
        </div>
      </section>

      <div className="relative mx-4 mt-4 flex h-[156px] justify-between overflow-hidden rounded-xl2 bg-night-alt px-4.5 py-4">
        <div className="pointer-events-none absolute -bottom-10 -right-6 h-40 w-40 rounded-full opacity-40" style={{ background: 'radial-gradient(closest-side, rgba(22,133,255,0.5), transparent)' }} />
        <span className="absolute right-4 top-3.5 flex h-[52px] w-[52px] flex-col items-center justify-center rounded-full border-2 border-white/15 bg-primary text-center text-[9px] font-extrabold leading-tight text-white shadow-fab">
          SAVE
          <br />
          20%
        </span>
        <div className="relative max-w-[58%]">
          <span className="mb-1.5 block text-[11px] font-bold tracking-wide text-sky-400">SPECIAL OFFER</span>
          <h3 className="text-[17px] font-extrabold leading-tight text-white">SMARTER DIGITAL TOOLS</h3>
          <p className="mt-1.5 text-[11.5px] leading-snug text-slate-400">Courses, custom code, and trading systems designed to grow your edge.</p>
          <button className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2.5 text-[11.5px] font-bold tracking-wide text-white shadow-cta transition-transform active:scale-95" onClick={onShopNow}>
            EXPLORE DEALS
            <ArrowRight size={13} strokeWidth={2.6} />
          </button>
        </div>

        <div className="relative flex w-[38%] items-end justify-center pb-1">
          <div className="relative flex h-16 w-24 items-center justify-center rounded-lg border border-night-wire bg-night-card">
            <Sparkles size={26} className="text-primary-light" strokeWidth={1.5} />
            <Gift size={16} className="absolute -bottom-2 -left-2 text-night-wire" strokeWidth={1.5} />
            <Tag size={14} className="absolute -bottom-2 right-1 text-night-wire" strokeWidth={1.5} />
            <Star size={14} className="absolute -right-3 top-1 text-slate-500" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </>
  )
}

export function CategoriesPage({ categories, onSelectCategory }) {
  return (
    <section className="px-4 py-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[20px] font-extrabold text-ink">Browse Categories</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map(({ id, name, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => onSelectCategory(id)}
            className="rounded-2xl border border-surface-line bg-white p-4 text-left shadow-card transition-transform active:scale-[0.98]"
          >
            <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon size={22} strokeWidth={2} />
            </span>
            <p className="text-[14px] font-bold text-ink">{name}</p>
            <p className="mt-1 text-[11px] font-medium text-ink-muted">{count} items</p>
          </button>
        ))}
      </div>
    </section>
  )
}

export function ShopPage({ products, onAddToCart, onOpenFilters, searchQuery, onSearchChange }) {
  return (
    <section className="px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[20px] font-extrabold text-ink">Shop</h2>
        <button onClick={onOpenFilters} className="rounded-full bg-surface-soft px-3 py-2 text-[11px] font-bold text-ink">
          Filters
        </button>
      </div>

      <label className="mb-4 flex h-12 items-center gap-2.5 rounded-full bg-surface-soft px-4">
        <Search size={17} strokeWidth={2.2} className="text-ink-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          className="w-full bg-transparent text-[13.5px] text-ink placeholder:text-ink-muted focus:outline-none"
        />
      </label>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-surface-line bg-surface-soft p-8 text-center">
          <p className="text-[14px] font-bold text-ink">No products match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => onAddToCart(product)} />
          ))}
        </div>
      )}
    </section>
  )
}

export function DealsPage({ products, onAddToCart, effectivePrice }) {
  return (
    <section className="px-4 py-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[20px] font-extrabold text-ink">Hot Deals</h2>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">LIVE</span>
      </div>

      <div className="space-y-3">
        {products.map((product) => {
          const discountedPrice = effectivePrice(product)
          const discount = Math.round(((product.price - discountedPrice) / product.price) * 100)
          const Icon = product.icon || Package

          return (
            <div key={product.id} className="rounded-2xl border border-surface-line bg-white p-3 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-soft text-primary">
                  <Icon size={26} strokeWidth={1.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-ink">{product.name}</p>
                  <div className="mt-1 flex items-center gap-2 text-[11px]">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 font-bold text-primary">-{discount}%</span>
                    <span className="font-bold text-ink">${discountedPrice.toFixed(2)}</span>
                    <span className="text-ink-muted line-through">${Number(product.price).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  className="rounded-full bg-primary px-3 py-2 text-[11px] font-bold text-white shadow-cta"
                >
                  Add
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function AccountPage({ notifications, unreadCount, onOpenNotifications }) {
  return (
    <section className="px-4 py-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[20px] font-extrabold text-ink">Account</h2>
        <button className="rounded-full bg-surface-soft px-3 py-2 text-[11px] font-bold text-ink" onClick={onOpenNotifications}>
          {unreadCount} unread
        </button>
      </div>

      <div className="rounded-3xl bg-night px-4 py-5 text-white shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-primary-light">
              <UserCircle size={26} />
            </span>
            <div>
              <p className="text-[16px] font-extrabold">Alex Morgan</p>
              <p className="text-[11px] text-slate-300">Premium Member</p>
            </div>
          </div>
          <ShieldCheck size={22} className="text-primary-light" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <p className="text-[11px] text-ink-muted">Orders</p>
          <p className="mt-2 text-[22px] font-extrabold text-ink">12</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <p className="text-[11px] text-ink-muted">Rewards</p>
          <p className="mt-2 text-[22px] font-extrabold text-ink">840</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-white p-4 shadow-card">
        <h3 className="mb-3 text-[15px] font-extrabold text-ink">Notifications</h3>
        <div className="space-y-3">
          {notifications.map((item) => (
            <div key={item.id} className="rounded-xl bg-surface-soft p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[12px] font-bold text-ink">{item.title}</p>
                {!item.read && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
              </div>
              <p className="mt-1 text-[11px] text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
