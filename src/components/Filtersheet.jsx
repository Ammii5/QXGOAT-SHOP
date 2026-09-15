import { SlidersHorizontal } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { categoryIcon, cx } from '../lib/ui'
import { OverlayHeading, Sheet } from './Overlay'
import { Button } from './ui'

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Top rated' },
]

function Chip({ active, children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold tracking-tight',
        'transition-all duration-200 ease-spring active:scale-95',
        active
          ? 'border-primary bg-primary text-white shadow-cta'
          : 'border-surface-line bg-surface text-ink-soft hover:border-primary-300 hover:bg-primary-50 hover:text-primary',
      )}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Shared between the mobile sheet and the desktop shop sidebar so both
 * surfaces stay in sync automatically.
 */
export function FilterControls({ className }) {
  const { sortBy, setSortBy, categories, categoryFilter, toggleCategoryFilter } = useApp()

  return (
    <div className={cx('space-y-6', className)}>
      <fieldset>
        <legend className="mb-3 text-2xs font-bold tracking-tight text-ink-faint">Sort by</legend>
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              active={sortBy === option.value}
              onClick={() => setSortBy(option.value)}
            >
              {option.label}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-2xs font-bold tracking-tight text-ink-faint">Category</legend>
        <div className="flex flex-wrap gap-2">
          <Chip active={categoryFilter === null} onClick={() => toggleCategoryFilter(null)}>
            All products
          </Chip>
          {categories.map((category) => {
            const Icon = categoryIcon(category)
            const active = categoryFilter === category.id
            return (
              <Chip
                key={category.id}
                active={active}
                onClick={() => toggleCategoryFilter(category.id)}
              >
                <Icon size={14} strokeWidth={2.2} />
                {category.name}
                <span className={cx('tnum text-2xs', active ? 'text-white/70' : 'text-ink-faint')}>
                  {category.count}
                </span>
              </Chip>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}

export default function FilterSheet() {
  const { filterOpen, setFilterOpen, resetFilters, activeFilterCount, shopProducts } = useApp()
  const close = () => setFilterOpen(false)

  return (
    <Sheet open={filterOpen} onClose={close} labelledBy="filter-sheet-title">
      <OverlayHeading
        icon={SlidersHorizontal}
        title="Sort and filter"
        caption={
          activeFilterCount
            ? `${activeFilterCount} ${activeFilterCount === 1 ? 'filter' : 'filters'} applied`
            : 'Showing everything'
        }
        onClose={close}
        closeLabel="Close filters"
      />

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
        <FilterControls />
      </div>

      <div className="flex gap-3 border-t border-surface-line bg-surface-soft px-5 py-4 sm:px-6">
        <Button variant="secondary" size="lg" className="flex-1" onClick={resetFilters}>
          Reset
        </Button>
        <Button size="lg" className="flex-1" onClick={close}>
          Show {shopProducts.length} {shopProducts.length === 1 ? 'result' : 'results'}
        </Button>
      </div>
      <div className="safe-bottom" />
    </Sheet>
  )
}
