import { Search, SlidersHorizontal } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="flex gap-2.5 px-4 pb-1 pt-3.5">
      <label className="flex h-12 flex-1 items-center gap-2.5 rounded-full bg-surface-soft px-4">
        <Search size={17} strokeWidth={2.2} className="shrink-0 text-ink-muted" />
        <input
          type="text"
          placeholder="Search gadgets, electronics, accessories..."
          className="w-full bg-transparent text-[13.5px] text-ink placeholder:text-ink-muted focus:outline-none"
        />
      </label>
      <button
        aria-label="Filters"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-soft text-ink transition-transform active:scale-90"
      >
        <SlidersHorizontal size={18} strokeWidth={2} />
      </button>
    </div>
  )
}
