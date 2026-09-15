import { Home, Grid3x3, ShoppingBag, Tag, User } from 'lucide-react'

const TABS = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'categories', label: 'Categories', icon: Grid3x3 },
  { key: 'shop', label: 'Shop', icon: ShoppingBag, isFab: true },
  { key: 'deals', label: 'Deals', icon: Tag },
  { key: 'account', label: 'Account', icon: User },
]

export default function BottomNav({ activeTab, onChange }) {
  return (
    <nav className="safe-bottom fixed bottom-0 left-1/2 flex h-[72px] w-full max-w-[428px] -translate-x-1/2 items-center justify-around border-t border-surface-line bg-white px-1.5">
      {TABS.map(({ key, label, icon: Icon, isFab }) => {
        const isActive = activeTab === key

        if (isFab) {
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className="relative -top-[22px] flex flex-1 flex-col items-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary-light to-primary shadow-fab transition-transform active:scale-90">
                <Icon size={22} className="text-white" strokeWidth={2.2} />
              </span>
              <span className="mt-0.5 text-[10px] font-bold text-primary">{label}</span>
            </button>
          )
        }

        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex flex-1 flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-primary' : 'text-ink-muted'
            }`}
          >
            <Icon size={21} strokeWidth={2.2} />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
