import { ArrowRight, Laptop, Keyboard, Mouse, Speaker } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function PromoBanner() {
  const { goToTab } = useApp()
  return (
    <div className="relative mx-4 mt-4 flex h-[156px] justify-between overflow-hidden rounded-xl2 bg-night-alt px-4.5 py-4">
      <div
        className="pointer-events-none absolute -bottom-10 -right-6 h-40 w-40 rounded-full opacity-40"
        style={{ background: 'radial-gradient(closest-side, rgba(22,133,255,0.5), transparent)' }}
      />

      <span className="absolute right-4 top-3.5 flex h-[52px] w-[52px] flex-col items-center justify-center rounded-full border-2 border-white/15 bg-primary text-center text-[9px] font-extrabold leading-tight text-white shadow-fab">
        SAVE
        <br />
        20%
      </span>

      <div className="relative max-w-[58%]">
        <span className="mb-1.5 block text-[11px] font-bold tracking-wide text-sky-400">
          SPECIAL OFFER
        </span>
        <h3 className="text-[17px] font-extrabold leading-tight text-white">UPGRADE YOUR SETUP</h3>
        <p className="mt-1.5 text-[11.5px] leading-snug text-slate-400">
          Smart gadgets for a smarter lifestyle.
        </p>
        <button className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2.5 text-[11.5px] font-bold tracking-wide text-white shadow-cta transition-transform active:scale-95">
          EXPLORE DEALS
          <ArrowRight size={13} strokeWidth={2.6} />
        </button>
      </div>

      <div className="relative flex w-[38%] items-end justify-center pb-1">
        <div className="relative flex h-16 w-24 items-center justify-center rounded-lg border border-night-wire bg-night-card">
          <Laptop size={26} className="text-primary-light" strokeWidth={1.5} />
          <Keyboard size={16} className="absolute -bottom-2 -left-2 text-night-wire" strokeWidth={1.5} />
          <Mouse size={14} className="absolute -bottom-2 right-1 text-night-wire" strokeWidth={1.5} />
          <Speaker size={14} className="absolute -right-3 top-1 text-slate-500" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}