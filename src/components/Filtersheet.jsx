import { X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Backdrop from './Backdrop'

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Top Rated' },
]

export default function FilterSheet() {
  const {
    filterOpen,
    setFilterOpen,
    sortBy,
    setSortBy,
    categories,
    categoryFilter,
    toggleCategoryFilter,
    resetFilters,
  } = useApp()

  return (
    <>
      {filterOpen && <Backdrop onClick={() => setFilterOpen(false)} />}

      <div
        className={`fixed bottom-0 left-1/2 z-40 w-full max-w-[428px] -translate-x-1/2 transform rounded-t-[26px] bg-white shadow-2xl transition-transform duration-300 ${
          filterOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-surface-line" />

        <div className="flex items-center justify-between px-5 pb-1 pt-3">
          <h3 className="text-[16px] font-extrabold text-ink">Sort &amp; Filter</h3>
          <button
            aria-label="Close filters"
            onClick={() => setFilterOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted active:scale-90"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-5 pb-2 pt-3">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-ink-muted">Sort by</p>
          <div className="flex flex-wrap gap-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={`rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-colors active:scale-95 ${
                  sortBy === opt.value
                    ? 'border-primary bg-primary text-white'
                    : 'border-surface-line bg-white text-ink'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 pb-2 pt-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-ink-muted">Category</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => toggleCategoryFilter(null)}
              className={`rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-colors active:scale-95 ${
                categoryFilter === null
                  ? 'border-primary bg-primary text-white'
                  : 'border-surface-line bg-white text-ink'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => toggleCategoryFilter(cat.id)}
                className={`rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-colors active:scale-95 ${
                  categoryFilter === cat.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-surface-line bg-white text-ink'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="safe-bottom flex gap-3 px-5 pb-4 pt-5">
          <button
            onClick={resetFilters}
            className="flex-1 rounded-full border border-surface-line py-3 text-[12.5px] font-extrabold text-ink active:scale-[0.98]"
          >
            RESET
          </button>
          <button
            onClick={() => setFilterOpen(false)}
            className="flex-1 rounded-full bg-primary py-3 text-[12.5px] font-extrabold text-white shadow-cta active:scale-[0.98]"
          >
            APPLY
          </button>
        </div>
      </div>
    </>
  )
}