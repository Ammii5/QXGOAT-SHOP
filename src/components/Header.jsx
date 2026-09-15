import { Menu, Bell, ShoppingCart, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'

function IconButton({ children, badge, label, onClick }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center text-ink transition-transform active:scale-90"
    >
      {children}
      {badge != null && (
        <span className="absolute right-0 top-0 flex h-4 min-w-[16px] items-center justify-center rounded-full border-2 border-white bg-primary px-[3px] text-[9px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  )
}

export default function Header({ cartCount, notifCount }) {
  const { setMenuOpen, setCartOpen, setNotifOpen } = useApp()

  return (
    <header className="flex h-16 items-center justify-between px-4">
      <IconButton label="Open menu" onClick={() => setMenuOpen(true)}>
        <Menu size={22} strokeWidth={2.2} />
      </IconButton>

      <div className="flex flex-col items-center leading-none">
        <div className="flex items-center gap-1.5">
          <Zap size={17} className="fill-primary text-primary" strokeWidth={0} />
          <span className="text-[19px] font-extrabold tracking-wide text-ink">@QXGOAT Store</span>
        </div>
        <span className="mt-1 text-[8.5px] font-bold tracking-[1.2px] text-primary">
          DIGITAL EDGE MARKET
        </span>
      </div>

      <div className="flex items-center gap-0.5">
        <IconButton label="Notifications" badge={notifCount} onClick={() => setNotifOpen(true)}>
          <Bell size={21} strokeWidth={2} />
        </IconButton>
        <IconButton label="Cart" badge={cartCount} onClick={() => setCartOpen(true)}>
          <ShoppingCart size={21} strokeWidth={2} />
        </IconButton>
      </div>
    </header>
  )
}
