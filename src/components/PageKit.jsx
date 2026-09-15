import { AlertCircle, RefreshCw } from 'lucide-react'
import { cx } from '../lib/ui'
import { Button, ProductCardSkeleton } from './ui'

/** One container, one rhythm — every page sits on the same grid. */
export function Page({ className, children }) {
  return (
    <div className={cx('mx-auto w-full max-w-shell px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}

/**
 * Rising candlestick motif. Replaces the floating gift/sparkle clip-art that
 * had nothing to do with what the store actually sells.
 */
export function CandleChart({ className }) {
  const candles = [
    { x: 8, wickTop: 52, wickBottom: 96, y: 62, h: 26, up: false },
    { x: 34, wickTop: 44, wickBottom: 88, y: 52, h: 30, up: true },
    { x: 60, wickTop: 30, wickBottom: 74, y: 38, h: 28, up: true },
    { x: 86, wickTop: 40, wickBottom: 80, y: 48, h: 24, up: false },
    { x: 112, wickTop: 16, wickBottom: 66, y: 24, h: 34, up: true },
    { x: 138, wickTop: 6, wickBottom: 54, y: 14, h: 30, up: true },
  ]

  return (
    <svg
      viewBox="0 0 160 108"
      className={cx('h-full w-full', className)}
      role="img"
      aria-label="Rising candlestick chart"
    >
      <defs>
        <linearGradient id="candle-glow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E7BFF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#00B383" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d="M8 96 L34 84 L60 66 L86 72 L112 44 L150 22 L150 108 L8 108 Z" fill="url(#candle-glow)" />
      <path
        d="M8 96 L34 84 L60 66 L86 72 L112 44 L150 22"
        fill="none"
        stroke="#1E7BFF"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />

      {candles.map((candle) => {
        const colour = candle.up ? '#00B383' : '#2A415F'
        return (
          <g key={candle.x}>
            <line
              x1={candle.x + 5}
              y1={candle.wickTop}
              x2={candle.x + 5}
              y2={candle.wickBottom}
              stroke={colour}
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.85"
            />
            <rect
              x={candle.x}
              y={candle.y}
              width="10"
              height={candle.h}
              rx="2.5"
              fill={colour}
              opacity={candle.up ? 0.95 : 0.7}
            />
          </g>
        )
      })}
    </svg>
  )
}

/** Dark panel used by the hero and the promo band. */
export function DarkPanel({ className, children }) {
  return (
    <div
      className={cx(
        'chart-grid relative overflow-hidden rounded-3xl bg-night text-white',
        'ring-1 ring-inset ring-white/[0.06]',
        className,
      )}
    >
      {/* A single soft light source, top-right, instead of scattered blobs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full opacity-70"
        style={{ background: 'radial-gradient(closest-side, rgba(30,123,255,0.30), transparent)' }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

/** Grid of skeleton cards matching the real product grid columns. */
export function ProductGridSkeleton({ count = 8, className }) {
  return (
    <div
      className={cx(
        'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:gap-5',
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

/** The catalogue is remote, so a failed fetch needs a way back. */
export function LoadError({ onRetry, className }) {
  return (
    <div
      className={cx(
        'flex flex-col items-center rounded-2xl border border-danger/20 bg-danger-light px-6 py-12 text-center',
        className,
      )}
    >
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-surface text-danger shadow-hair">
        <AlertCircle size={24} strokeWidth={1.9} />
      </span>
      <p className="text-md font-bold text-ink">The catalogue didn’t load</p>
      <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-ink-soft">
        We couldn’t reach the product service. Check your connection and try again.
      </p>
      <Button variant="secondary" className="mt-6" onClick={() => onRetry?.()}>
        <RefreshCw size={15} strokeWidth={2.4} />
        Try again
      </Button>
    </div>
  )
}
