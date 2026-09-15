import { useEffect, useState } from 'react'
import { ArrowRight, Smartphone, Watch, Headphones } from 'lucide-react'
import { useApp } from '../context/AppContext'

const SLIDE_COUNT = 4

export default function Hero() {
  const { goToTab } = useApp()
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((s) => (s + 1) % SLIDE_COUNT)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative mx-4 mt-2 overflow-hidden rounded-xl2 bg-night px-5 pb-4 pt-6">
      <div
        className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full opacity-40"
        style={{ background: 'radial-gradient(closest-side, rgba(22,133,255,0.55), transparent)' }}
      />

      <div className="relative flex justify-between gap-3">
        <div className="max-w-[58%]">
          <span className="mb-2 block text-[11px] font-bold tracking-wide text-sky-400">
            NEW ARRIVALS
          </span>
          <h1 className="text-[21px] font-extrabold leading-[1.18] text-white">
            SMART TECH.
            <br />
            <span className="text-primary-light">BETTER EVERY DAY.</span>
          </h1>
          <p className="mt-2.5 max-w-[210px] text-[12.5px] leading-relaxed text-slate-400">
            Discover the latest gadgets designed for work, entertainment &amp; everyday life.
          </p>
        </div>

        <div className="flex w-[38%] items-center justify-center">
          <div className="relative flex h-28 w-28 items-center justify-center">
            <div className="absolute h-24 w-24 rounded-full bg-night-card2/70" />
            <Smartphone size={40} className="absolute -translate-x-4 text-white" strokeWidth={1.5} />
            <Headphones size={30} className="absolute translate-x-6 -translate-y-5 text-primary-light" strokeWidth={1.5} />
            <Watch size={22} className="absolute translate-x-3 translate-y-7 text-white" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between">
        <button
          onClick={() => goToTab('shop')}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-[18px] py-3 text-[12.5px] font-bold tracking-wide text-white shadow-cta transition-transform active:scale-95"
        >
          SHOP NOW
          <ArrowRight size={14} strokeWidth={2.6} />
        </button>

        <div className="flex gap-1.5">
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActiveSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeSlide ? 'w-4 bg-primary-light' : 'w-1.5 bg-white/25'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}