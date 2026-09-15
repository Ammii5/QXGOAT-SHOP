import { categories } from '../data/categories'

export default function Categories() {
  return (
    <div className="no-scrollbar snap-x-mandatory flex gap-4 overflow-x-auto px-4 pb-1.5 pt-4">
      {categories.map(({ name, icon: Icon }) => (
        <button
          key={name}
          className="flex w-16 shrink-0 snap-start flex-col items-center gap-2 transition-transform active:scale-95"
        >
          <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-surface-line bg-white text-primary shadow-soft">
            <Icon size={22} strokeWidth={2} />
          </span>
          <span className="text-center text-[11px] font-semibold text-ink">{name}</span>
        </button>
      ))}
    </div>
  )
}
