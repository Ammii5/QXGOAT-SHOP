import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  Check,
  ChevronRight,
  Copy,
  Headphones,
  Minus,
  Package,
  PackageOpen,
  Plus,
  RefreshCw,
  SearchX,
  Send,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Tag,
  Zap,
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { FilterControls } from '../components/Filtersheet'
import { CandleChart, DarkPanel, LoadError, Page, ProductGridSkeleton } from '../components/PageKit'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Price,
  Rating,
  SearchField,
  SectionHeading,
  Skeleton,
} from '../components/ui'
import { categoryIcon, cx, formatCount, formatPrice, netPrice, productIcon } from '../lib/ui'

const PRODUCT_GRID = 'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:gap-5'

/* ================================================================== Home == */

export function HomePage({
  products,
  categories,
  searchQuery,
  onSearchChange,
  onAddToCart,
  onOpenProduct,
  onShopNow,
  onCategorySelect,
  onOpenFilters,
  onDeals,
  isLoading,
  hasError,
  onRetry,
}) {
  const trending = products.slice(0, 8)
  const dealCount = products.filter((p) => p.discountPct).length
  const avgRating = products.length
    ? products.reduce((sum, p) => sum + Number(p.rating || 0), 0) / products.length
    : 0

  const stats = [
    { label: 'Products', value: products.length ? String(products.length) : '—' },
    { label: 'Categories', value: categories.length ? String(categories.length) : '—' },
    { label: 'Avg rating', value: avgRating ? avgRating.toFixed(1) : '—' },
  ]

  return (
    <div className="py-5 sm:py-7 lg:py-10">
      {/* Mobile search — desktop has it in the header instead. Kept outside the
          spaced stack below so that hiding it leaves no gap above the hero. */}
      <Page className="mb-6 lg:hidden">
        <div className="flex gap-2.5">
          <SearchField
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search courses, bots, tools…"
            aria-label="Search products"
          />
          <button
            type="button"
            aria-label="Open sort and filter"
            onClick={onOpenFilters}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-surface-line bg-surface-soft text-ink-soft transition-colors hover:bg-surface hover:text-primary active:scale-90"
          >
            <SlidersHorizontal size={18} strokeWidth={2.2} />
          </button>
        </div>
      </Page>

      <div className="space-y-10 sm:space-y-12 lg:space-y-16">
      {/* ---------------------------------------------------------- Hero -- */}
      <Page>
        <DarkPanel className="animate-fade-up px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <div className="max-w-xl">
              <Badge className="bg-white/10 text-sky-300 backdrop-blur">
                <Zap size={11} className="fill-sky-300 text-sky-300" strokeWidth={0} />
                Instant digital delivery
              </Badge>

              <h1 className="mt-4 text-[28px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Build your trading edge.
              </h1>

              <p className="mt-3.5 max-w-md text-sm leading-relaxed text-night-text sm:mt-4 sm:text-base">
                Courses, custom broker code, automated bots and secure wallets — everything you
                need to trade with an edge, in one place.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                <Button size="lg" onClick={onShopNow}>
                  Shop now
                  <ArrowRight size={16} strokeWidth={2.6} />
                </Button>
                {dealCount > 0 ? (
                  <Button
                    size="lg"
                    variant="secondary"
                    className="border-white/15 bg-white/5 text-white hover:border-white/25 hover:bg-white/10"
                    onClick={onDeals}
                  >
                    <Tag size={16} strokeWidth={2.4} />
                    {dealCount} on offer
                  </Button>
                ) : null}
              </div>

              <dl className="mt-8 flex gap-8 border-t border-white/10 pt-6 sm:mt-10">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="tnum text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-1 text-xs font-medium text-night-text">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative hidden h-52 lg:block xl:h-64">
              <CandleChart />
            </div>
          </div>

          {/* Compact chart for small screens, below the copy. */}
          <div className="mt-8 h-24 sm:h-28 lg:hidden">
            <CandleChart />
          </div>
        </DarkPanel>
      </Page>

      {/* ---------------------------------------------------- Categories -- */}
      {isLoading || categories.length > 0 ? (
        <Page>
          <SectionHeading
            title="Browse by category"
            caption="Pick the kind of tooling you need"
            className="mb-5"
          />
          {isLoading ? (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-24 rounded-2xl sm:h-28" />
              ))}
            </div>
          ) : (
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
              {categories.map((category) => {
                const Icon = categoryIcon(category)
                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => onCategorySelect(category.id)}
                      className={cx(
                        'group flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-2xl',
                        'border border-surface-line bg-surface px-2 py-4 text-center shadow-hair sm:py-5',
                        'transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-card active:translate-y-0 active:scale-[0.97]',
                      )}
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white sm:h-12 sm:w-12">
                        <Icon size={20} strokeWidth={2} />
                      </span>
                      <span className="line-clamp-2 text-xs font-bold leading-tight tracking-tight text-ink sm:text-sm">
                        {category.name}
                      </span>
                      <span className="tnum text-2xs font-medium text-ink-faint">
                        {category.count} {category.count === 1 ? 'item' : 'items'}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </Page>
      ) : null}

      {/* ------------------------------------------------------ Trending -- */}
      <Page>
        <SectionHeading
          title="Trending now"
          caption="What other traders are buying this week"
          className="mb-5"
          action={
            <button
              type="button"
              onClick={onShopNow}
              className="inline-flex shrink-0 items-center gap-1 rounded-full px-1 py-1 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
            >
              View all
              <ChevronRight size={15} strokeWidth={2.6} />
            </button>
          }
        />

        {hasError ? (
          <LoadError onRetry={onRetry} />
        ) : isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : trending.length === 0 ? (
          <EmptyState
            icon={searchQuery ? SearchX : PackageOpen}
            title={searchQuery ? `Nothing matches “${searchQuery}”` : 'No products yet'}
            description={
              searchQuery
                ? 'Try a shorter search, or clear it to see the full catalogue.'
                : 'Products added in the admin dashboard will appear here.'
            }
            action={
              searchQuery ? (
                <Button variant="secondary" onClick={() => onSearchChange('')}>
                  Clear search
                </Button>
              ) : null
            }
          />
        ) : (
          <div className={PRODUCT_GRID}>
            {trending.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => onAddToCart(product)}
                onOpenProduct={onOpenProduct}
              />
            ))}
          </div>
        )}
      </Page>

      {/* --------------------------------------------------------- Promo -- */}
      <Page>
        <DarkPanel className="bg-night-alt px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-lg">
              <h2 className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl lg:text-3xl">
                Smarter tools, built around your strategy
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-night-text sm:text-base">
                Custom broker code and bot builds are made to your spec. Tell us the workflow and
                we’ll ship it.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 lg:shrink-0">
              <ul className="space-y-2.5">
                {['Built to your brief', 'Delivered instantly', 'Support on WhatsApp'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-night-text">
                      <Check size={15} strokeWidth={3} className="shrink-0 text-mint" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <Button size="lg" onClick={onDeals}>
                See the deals
                <ArrowRight size={16} strokeWidth={2.6} />
              </Button>
            </div>
          </div>
        </DarkPanel>
      </Page>
      </div>
    </div>
  )
}

/* ============================================================ Categories == */

export function CategoriesPage({ categories, onSelectCategory, isLoading, hasError, onRetry }) {
  return (
    <Page className="py-6 sm:py-8 lg:py-10">
      <SectionHeading
        title="Categories"
        caption={
          categories.length
            ? `${categories.length} ${categories.length === 1 ? 'collection' : 'collections'} in the store`
            : undefined
        }
        className="mb-6"
      />

      {hasError ? (
        <LoadError onRetry={onRetry} />
      ) : isLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-40 rounded-2xl" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No categories yet"
          description="Categories are generated from your products. Add a product to see one here."
        />
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = categoryIcon(category)
            return (
              <li key={category.id}>
                <Card
                  as="button"
                  interactive
                  type="button"
                  onClick={() => onSelectCategory(category.id)}
                  className="group flex h-full w-full flex-col items-start p-4 text-left sm:p-5"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white sm:h-14 sm:w-14">
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <p className="mt-4 text-md font-bold leading-snug tracking-tight text-ink">
                    {category.name}
                  </p>
                  <p className="tnum mt-1 text-sm text-ink-muted">
                    {category.count} {category.count === 1 ? 'product' : 'products'}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                    Browse
                    <ArrowRight
                      size={14}
                      strokeWidth={2.6}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Card>
              </li>
            )
          })}
        </ul>
      )}
    </Page>
  )
}

/* ================================================================== Shop == */

export function ShopPage({
  products,
  onAddToCart,
  onOpenProduct,
  onOpenFilters,
  searchQuery,
  onSearchChange,
  categories,
  categoryFilter,
  onClearCategory,
  activeFilterCount,
  onResetFilters,
  isLoading,
  hasError,
  onRetry,
}) {
  const activeCategory = categories?.find((c) => c.id === categoryFilter)
  // Categories are derived from the whole catalogue, so no categories
  // means no products at all — as opposed to filters hiding them.
  const catalogueIsEmpty = !categories?.length

  const results = hasError ? (
    <LoadError onRetry={onRetry} />
  ) : isLoading ? (
    <ProductGridSkeleton count={8} />
  ) : products.length === 0 ? (
    <EmptyState
      icon={searchQuery ? SearchX : PackageOpen}
      title={
        searchQuery
          ? `Nothing matches “${searchQuery}”`
          : catalogueIsEmpty
            ? 'No products yet'
            : 'Nothing here yet'
      }
      description={
        searchQuery
          ? 'Try a different word, or clear the filters to see everything.'
          : catalogueIsEmpty
            ? 'Products added in the admin dashboard will appear here.'
            : 'No products match the current filters.'
      }
      action={
        <div className="flex flex-wrap justify-center gap-3">
          {searchQuery ? (
            <Button variant="secondary" onClick={() => onSearchChange('')}>
              Clear search
            </Button>
          ) : null}
          {activeFilterCount > 0 ? <Button onClick={onResetFilters}>Reset filters</Button> : null}
          {/* An empty catalogue is a real state now, so it needs a way out
              that isn't "clear a filter you never set". */}
          {!searchQuery && !activeFilterCount ? (
            <Button variant="secondary" onClick={() => onRetry?.()}>
              <RefreshCw size={15} strokeWidth={2.4} />
              Refresh catalogue
            </Button>
          ) : null}
        </div>
      }
    />
  ) : (
    <div className={PRODUCT_GRID}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => onAddToCart(product)}
          onOpenProduct={onOpenProduct}
        />
      ))}
    </div>
  )

  return (
    <Page className="py-6 sm:py-8 lg:py-10">
      <SectionHeading
        title={activeCategory ? activeCategory.name : 'Shop'}
        caption={
          isLoading
            ? 'Loading the catalogue…'
            : `${products.length} ${products.length === 1 ? 'product' : 'products'}${
                searchQuery ? ` for “${searchQuery}”` : ''
              }`
        }
        className="mb-5"
      />

      <div className="lg:grid lg:grid-cols-[260px_1fr] lg:items-start lg:gap-8 xl:grid-cols-[280px_1fr]">
        {/* Desktop: persistent filter rail. Mobile: the sheet. */}
        <aside className="hidden lg:sticky lg:top-28 lg:block">
          <Card className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-extrabold tracking-tight text-ink">Filters</h3>
              {activeFilterCount > 0 ? (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="text-xs font-bold text-primary transition-colors hover:text-primary-dark"
                >
                  Reset
                </button>
              ) : null}
            </div>
            <FilterControls />
          </Card>
        </aside>

        <div className="min-w-0">
          {/* Mobile controls */}
          <div className="mb-4 flex gap-2.5 lg:hidden">
            <SearchField
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search products…"
              aria-label="Search products"
            />
            <button
              type="button"
              aria-label="Open sort and filter"
              onClick={onOpenFilters}
              className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-surface-line bg-surface-soft text-ink-soft transition-colors hover:bg-surface hover:text-primary active:scale-90"
            >
              <SlidersHorizontal size={18} strokeWidth={2.2} />
              {activeFilterCount > 0 ? (
                <span className="tnum absolute -right-0.5 -top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full border-2 border-surface bg-primary px-1 text-[10px] font-extrabold text-white">
                  {activeFilterCount}
                </span>
              ) : null}
            </button>
          </div>

          {/* Active category shows as a dismissible chip on small screens. */}
          {activeCategory ? (
            <div className="mb-4 flex flex-wrap items-center gap-2 lg:hidden">
              <Badge tone="primary" className="py-1.5 pl-3 pr-1.5 text-xs">
                {activeCategory.name}
                <button
                  type="button"
                  aria-label={`Clear ${activeCategory.name} filter`}
                  onClick={onClearCategory}
                  className="ml-1 grid h-5 w-5 place-items-center rounded-full bg-primary/15 transition-colors hover:bg-primary hover:text-white"
                >
                  <Plus size={12} strokeWidth={3} className="rotate-45" />
                </button>
              </Badge>
            </div>
          ) : null}

          {results}
        </div>
      </div>
    </Page>
  )
}

/* ================================================================= Deals == */

export function DealsPage({
  products,
  onAddToCart,
  onOpenProduct,
  effectivePrice,
  isLoading,
  hasError,
  onRetry,
  onShopNow,
}) {
  return (
    <Page className="py-6 sm:py-8 lg:py-10">
      <SectionHeading
        title="Deals"
        caption="Discounted products, updated as stock changes"
        className="mb-5"
        action={
          products.length ? (
            <Badge tone="mint" className="shrink-0 gap-1.5 px-2.5 py-1 text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              {products.length} live
            </Badge>
          ) : null
        }
      />

      {hasError ? (
        <LoadError onRetry={onRetry} />
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-24 rounded-2xl sm:h-28" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="No deals running"
          description="When a product goes on offer it’ll show up here first."
          action={<Button onClick={onShopNow}>Browse the shop</Button>}
        />
      ) : (
        <ul className="grid gap-3 sm:gap-4 xl:grid-cols-2">
          {products.map((product) => {
            const discountedPrice = effectivePrice(product)
            const discount = Math.round(
              ((product.price - discountedPrice) / (product.price || 1)) * 100,
            )
            const Icon = productIcon(product)

            return (
              <li key={product.id}>
                <Card
                  interactive
                  role="button"
                  tabIndex={0}
                  onClick={() => onOpenProduct(product)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onOpenProduct(product)
                    }
                  }}
                  className="flex items-center gap-3.5 p-3 sm:gap-4 sm:p-4"
                >
                  <span className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-surface-line bg-gradient-to-br from-surface-soft to-surface-sunk text-primary/40 sm:h-24 sm:w-24">
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
                      <Icon size={30} strokeWidth={1.4} />
                    )}
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <Badge tone="mint" className="tnum shrink-0 px-2 py-0.5">
                        −{discount}%
                      </Badge>
                      {product.category ? (
                        <span className="truncate text-2xs font-bold text-ink-faint">
                          {product.category}
                        </span>
                      ) : null}
                    </div>

                    <p className="line-clamp-2 text-sm font-bold leading-snug tracking-tight text-ink sm:text-base">
                      {product.name}
                    </p>

                    <Rating value={product.rating} reviews={product.reviews} className="hidden sm:inline-flex" />

                    <Price value={discountedPrice} was={product.price} size="sm" className="sm:hidden" />
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2.5">
                    <Price
                      value={discountedPrice}
                      was={product.price}
                      size="md"
                      className="hidden flex-col items-end gap-0 sm:flex"
                    />
                    <Button
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation()
                        onAddToCart(product)
                      }}
                    >
                      <Plus size={14} strokeWidth={2.8} />
                      Add
                    </Button>
                  </div>
                </Card>
              </li>
            )
          })}
        </ul>
      )}
    </Page>
  )
}

/* ======================================================== Product detail == */

export function ProductDetailPage({ product, onBack, onAddToCart }) {
  const [qty, setQty] = useState(1)
  const [imageFailed, setImageFailed] = useState(false)

  const Icon = productIcon(product)
  const discount = Number(product.discountPct || 0)
  const finalPrice = netPrice(product)
  const showImage = Boolean(product.image) && !imageFailed

  const highlights = [
    { icon: Zap, label: 'Instant delivery', detail: 'Access details sent right after payment' },
    { icon: ShieldCheck, label: 'Verified seller', detail: 'Trusted by traders since 2021' },
    { icon: Headphones, label: 'Direct support', detail: 'Reach us on WhatsApp or Telegram' },
  ]

  return (
    <Page className="py-5 sm:py-7 lg:py-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 rounded-full py-1 text-sm font-bold text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} strokeWidth={2.4} />
        Back to shop
      </button>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        {/* Media */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-surface-line bg-gradient-to-br from-surface-soft to-surface-sunk shadow-card sm:aspect-[16/10] lg:aspect-square">
            {showImage ? (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImageFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="grid h-full w-full place-items-center text-primary/25">
                <Icon size={96} strokeWidth={1} />
              </span>
            )}

            <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
              {product.badge ? (
                <span
                  className={cx(
                    'rounded-full px-3 py-1.5 text-2xs font-extrabold uppercase tracking-wider text-white shadow-sm',
                    product.badgeColor || 'bg-primary',
                  )}
                >
                  {product.badge}
                </span>
              ) : (
                <span />
              )}
              {discount > 0 ? (
                <span className="tnum rounded-full bg-mint px-3 py-1.5 text-xs font-extrabold text-white shadow-sm">
                  −{Math.round(discount)}%
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="min-w-0">
          {product.category ? (
            <p className="text-sm font-bold tracking-tight text-primary">{product.category}</p>
          ) : null}

          <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Rating value={product.rating} reviews={product.reviews} className="text-sm" />
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-mint-dark">
              <BadgeCheck size={15} strokeWidth={2.4} />
              In stock
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-end gap-3 border-y border-surface-line py-5">
            <Price value={finalPrice} was={discount > 0 ? product.price : null} size="lg" />
            {discount > 0 ? (
              <Badge tone="mint" className="tnum mb-1 px-2.5 py-1 text-xs">
                You save {formatPrice(product.price - finalPrice)}
              </Badge>
            ) : null}
          </div>

          <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-soft">
            {product.description || 'No description has been added for this product yet.'}
          </p>

          {/* Quantity + add. `addToCart` already accepted a qty argument. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-12 shrink-0 items-center gap-1 rounded-full border border-surface-line bg-surface-soft p-1 sm:h-[52px]">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                className="grid h-10 w-10 place-items-center rounded-full bg-surface text-ink shadow-hair transition-colors hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-40 active:scale-90"
              >
                <Minus size={15} strokeWidth={2.8} />
              </button>
              <span className="tnum w-10 text-center text-md font-bold text-ink">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                className="grid h-10 w-10 place-items-center rounded-full bg-surface text-ink shadow-hair transition-colors hover:bg-ink hover:text-white active:scale-90"
              >
                <Plus size={15} strokeWidth={2.8} />
              </button>
            </div>

            <Button size="lg" className="flex-1" onClick={() => onAddToCart(product, qty)}>
              <ShoppingBag size={17} strokeWidth={2.4} />
              Add to cart · {formatPrice(finalPrice * qty)}
            </Button>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {highlights.map(({ icon: HighlightIcon, label, detail }) => (
              <li
                key={label}
                className="rounded-2xl border border-surface-line bg-surface-soft p-4"
              >
                <HighlightIcon size={18} strokeWidth={2.1} className="text-primary" />
                <p className="mt-2.5 text-sm font-bold tracking-tight text-ink">{label}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">{detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  )
}

/* =============================================================== Payment == */

function CopyField({ label, value, hint }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Clipboard can be blocked (insecure origin, permissions). Selecting
      // the text is the fallback, so still confirm the interaction.
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-surface-line bg-surface p-3">
      <div className="min-w-0 flex-1">
        <p className="text-2xs font-bold tracking-tight text-ink-faint">{label}</p>
        <p className="tnum mt-0.5 break-all text-sm font-bold text-ink">{value}</p>
        {hint ? <p className="mt-0.5 text-xs text-ink-muted">{hint}</p> : null}
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className={cx(
          'grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors',
          copied
            ? 'bg-mint text-white'
            : 'bg-surface-sunk text-ink-soft hover:bg-ink hover:text-white',
        )}
      >
        {copied ? <Check size={15} strokeWidth={3} /> : <Copy size={15} strokeWidth={2.2} />}
      </button>
    </div>
  )
}

export function PaymentPage({ payment, onBack }) {
  if (!payment) return null

  const steps = [
    'Send the exact total to one of the accounts below.',
    'Screenshot the confirmation from your banking or Binance app.',
    'Send the screenshot on WhatsApp or Telegram to receive your files.',
  ]

  return (
    <Page className="py-5 sm:py-7 lg:py-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 rounded-full py-1 text-sm font-bold text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} strokeWidth={2.4} />
        Back to shop
      </button>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-8">
        <div className="space-y-5">
          <DarkPanel className="px-5 py-7 sm:px-8 sm:py-9">
            <Badge className="bg-mint/15 text-mint">
              <Check size={11} strokeWidth={3.5} />
              Order created
            </Badge>
            <h1 className="mt-3.5 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
              Complete your payment
            </h1>
            <p className="mt-2.5 max-w-md text-sm leading-relaxed text-night-text">
              Nothing has been charged automatically. Transfer the total, then send us the receipt.
            </p>
          </DarkPanel>

          {/* A genuine sequence, so numbering it is meaningful. */}
          <Card className="p-5 sm:p-6">
            <h2 className="text-md font-extrabold tracking-tight text-ink">How this works</h2>
            <ol className="mt-4 space-y-4">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3.5">
                  <span className="tnum grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-50 text-xs font-extrabold text-primary">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-ink-soft">{step}</p>
                </li>
              ))}
            </ol>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="overflow-hidden">
              <div className="flex items-center gap-2.5 border-b border-surface-line bg-mint-light px-4 py-3">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-mint text-white">
                  <Zap size={14} strokeWidth={2.6} />
                </span>
                <h3 className="text-sm font-extrabold tracking-tight text-mint-dark">Easypaisa</h3>
              </div>
              <div className="space-y-2.5 p-4">
                <CopyField label="Account number" value="03420599386" hint="Name: HAFEEZAN" />
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="flex items-center gap-2.5 border-b border-surface-line bg-amber-light px-4 py-3">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber text-white">
                  <Tag size={14} strokeWidth={2.6} />
                </span>
                <h3 className="text-sm font-extrabold tracking-tight text-amber">Binance</h3>
              </div>
              <div className="space-y-2.5 p-4">
                <CopyField label="Binance ID" value="773356324" />
                <CopyField
                  label="USDT · TRC20"
                  value="TAZChp6cFZoUM4gNRHMHwueuHNye9vifFw"
                  hint="Send on the TRON network only"
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Order summary */}
        <Card className="lg:sticky lg:top-28 lg:self-start">
          <div className="border-b border-surface-line px-5 py-4">
            <h2 className="text-md font-extrabold tracking-tight text-ink">Order summary</h2>
            <p className="tnum mt-0.5 text-xs text-ink-muted">
              {payment.items?.length || 0} {payment.items?.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {payment.items?.length ? (
            <ul className="divide-y divide-surface-hair px-5">
              {payment.items.map(({ productId, product, qty, lineTotal }) => (
                <li key={productId} className="flex items-start gap-3 py-3.5">
                  <span className="tnum grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-sunk text-xs font-bold text-ink-soft">
                    {qty}
                  </span>
                  <p className="line-clamp-2 flex-1 text-sm font-semibold leading-snug text-ink">
                    {product.name}
                  </p>
                  <span className="tnum shrink-0 text-sm font-bold text-ink">
                    {formatPrice(lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="border-t border-surface-line bg-surface-soft px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-md font-bold text-ink">Total due</span>
              <span className="tnum text-2xl font-extrabold tracking-tight text-ink">
                {formatPrice(payment.total)}
              </span>
            </div>

            <div className="mt-4 grid gap-2.5">
              <Button
                as="a"
                href="https://wa.me/923420599386"
                target="_blank"
                rel="noreferrer"
                block
                className="bg-[#25D366] shadow-[0_6px_16px_-4px_rgba(37,211,102,0.45)] hover:bg-[#1FB959]"
              >
                <Send size={16} strokeWidth={2.4} />
                Send receipt on WhatsApp
              </Button>
              <Button
                as="a"
                href="https://t.me/QXGOAT"
                target="_blank"
                rel="noreferrer"
                block
                className="bg-[#229ED9] shadow-[0_6px_16px_-4px_rgba(34,158,217,0.45)] hover:bg-[#1C87BA]"
              >
                <Send size={16} strokeWidth={2.4} />
                Message @QXGOAT
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  )
}

/* =============================================================== Account == */

export function AccountPage({
  notifications,
  unreadCount,
  onOpenNotifications,
  cartCount,
  cartTotal,
  productCount,
}) {
  const summary = [
    { label: 'In your cart', value: String(cartCount ?? 0), icon: ShoppingBag },
    { label: 'Cart value', value: formatPrice(cartTotal ?? 0), icon: Tag },
    { label: 'Products available', value: formatCount(productCount ?? 0), icon: Package },
  ]

  const support = [
    {
      label: 'WhatsApp support',
      detail: 'Fastest reply — usually within an hour',
      href: 'https://wa.me/923420599386',
    },
    {
      label: 'Telegram @QXGOAT',
      detail: 'Order updates and product drops',
      href: 'https://t.me/QXGOAT',
    },
  ]

  return (
    <Page className="py-6 sm:py-8 lg:py-10">
      <SectionHeading title="Account" className="mb-5" />

      <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
        <div className="space-y-5">
          <DarkPanel className="px-5 py-6 sm:px-7 sm:py-8">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-xl font-extrabold text-white backdrop-blur sm:h-16 sm:w-16">
                QX
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-extrabold tracking-tight text-white sm:text-xl">
                  Guest shopper
                </p>
                <p className="mt-1 text-sm text-night-text">
                  Orders are confirmed over WhatsApp or Telegram
                </p>
              </div>
            </div>

            <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              {summary.map(({ label, value }) => (
                <div key={label}>
                  <dd className="tnum text-lg font-extrabold tracking-tight text-white sm:text-xl">
                    {value}
                  </dd>
                  <dt className="mt-1 text-xs leading-tight text-night-text">{label}</dt>
                </div>
              ))}
            </dl>
          </DarkPanel>

          <Card className="overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-surface-line px-5 py-4">
              <div className="flex items-center gap-2.5">
                <h2 className="text-md font-extrabold tracking-tight text-ink">Notifications</h2>
                {unreadCount > 0 ? (
                  <Badge tone="primary" className="tnum">
                    {unreadCount} new
                  </Badge>
                ) : null}
              </div>
              <Button size="sm" variant="secondary" onClick={onOpenNotifications}>
                Open
              </Button>
            </div>

            {notifications.length ? (
              <ul className="divide-y divide-surface-hair">
                {notifications.slice(0, 5).map((item) => (
                  <li key={item.id} className="flex items-start gap-3 px-5 py-4">
                    <span
                      className={cx(
                        'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                        item.read ? 'bg-surface-line' : 'bg-primary',
                      )}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-snug text-ink">{item.title}</p>
                      {item.body ? (
                        <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{item.body}</p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-5 py-10">
                <EmptyState
                  icon={Bell}
                  title="Nothing to catch up on"
                  description="Order updates and new product drops will appear here."
                  className="border-none bg-transparent py-0"
                />
              </div>
            )}
          </Card>
        </div>

        <Card className="overflow-hidden">
          <div className="border-b border-surface-line px-5 py-4">
            <h2 className="text-md font-extrabold tracking-tight text-ink">Get help</h2>
            <p className="mt-0.5 text-xs text-ink-muted">Questions about an order or a build</p>
          </div>
          <ul className="divide-y divide-surface-hair">
            {support.map(({ label, detail, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-surface-soft"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary">
                    <Headphones size={18} strokeWidth={2.1} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold tracking-tight text-ink">{label}</p>
                    <p className="mt-0.5 truncate text-xs text-ink-muted">{detail}</p>
                  </div>
                  <ChevronRight size={16} className="shrink-0 text-ink-faint" />
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  )
}
