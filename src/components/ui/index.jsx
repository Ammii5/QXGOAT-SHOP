import { Search, Star, X } from 'lucide-react'
import { cx, formatCount, formatPrice, formatRating } from '../../lib/ui'

/* ------------------------------------------------------------------ Button */

const BUTTON_VARIANTS = {
  primary:
    'bg-primary text-white shadow-cta hover:bg-primary-500 hover:shadow-raised active:bg-primary-dark',
  secondary:
    'bg-surface text-ink border border-surface-line shadow-hair hover:bg-surface-soft hover:border-ink-faint/50',
  ghost: 'text-ink-soft hover:bg-surface-soft hover:text-ink',
  dark: 'bg-ink text-white hover:bg-night-card active:bg-night',
  mint: 'bg-mint text-white shadow-[0_6px_16px_-4px_rgba(0,179,131,0.45)] hover:bg-mint-dark',
  danger: 'bg-danger-light text-danger hover:bg-danger hover:text-white',
}

const BUTTON_SIZES = {
  sm: 'h-9 px-3.5 text-xs gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2 sm:h-[52px] sm:px-7',
}

export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  block,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-full font-bold tracking-tight',
        'transition-all duration-200 ease-spring active:scale-[0.97]',
        'disabled:pointer-events-none disabled:opacity-50',
        BUTTON_SIZES[size],
        BUTTON_VARIANTS[variant],
        block && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/* -------------------------------------------------------------- IconButton */

export function IconButton({ label, badge, className, children, tone = 'default', ...props }) {
  const tones = {
    default: 'text-ink-soft hover:bg-surface-soft hover:text-ink',
    onDark: 'text-white/70 hover:bg-white/10 hover:text-white',
    danger: 'text-ink-faint hover:bg-danger-light hover:text-danger',
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx(
        'relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
        'transition-all duration-200 ease-spring active:scale-90',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
      {badge > 0 && (
        <span
          className={cx(
            'tnum absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center',
            'rounded-full border-2 border-white bg-primary px-1 text-[10px] font-extrabold leading-none text-white',
            tone === 'onDark' && 'border-night-card',
          )}
        >
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  )
}

/* ------------------------------------------------------------------- Badge */

export function Badge({ className, children, tone, ...props }) {
  const tones = {
    mint: 'bg-mint-light text-mint-dark',
    primary: 'bg-primary-50 text-primary',
    amber: 'bg-amber-light text-amber',
    neutral: 'bg-surface-sunk text-ink-soft',
    outline: 'border border-surface-line bg-surface text-ink-soft',
  }

  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-2xs font-bold leading-5',
        tone && tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------- Card */

export function Card({ as: Tag = 'div', interactive, className, children, ...props }) {
  return (
    <Tag
      className={cx(
        'rounded-2xl border border-surface-line bg-surface shadow-soft',
        interactive &&
          'cursor-pointer transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-raised active:translate-y-0 active:scale-[0.99]',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------- SearchField */

export function SearchField({ value, onChange, onClear, className, ...props }) {
  return (
    <div
      className={cx(
        'group flex h-12 flex-1 items-center gap-2.5 rounded-full border border-surface-line bg-surface-soft px-4',
        'transition-all duration-200 focus-within:border-primary focus-within:bg-surface focus-within:shadow-ring',
        className,
      )}
    >
      <Search
        size={17}
        strokeWidth={2.4}
        className="shrink-0 text-ink-faint transition-colors group-focus-within:text-primary"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cx(
          'w-full min-w-0 bg-transparent text-base text-ink placeholder:text-ink-faint',
          'focus:outline-none [&::-webkit-search-cancel-button]:appearance-none',
        )}
        {...props}
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => (onClear ? onClear() : onChange(''))}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface-sunk text-ink-muted transition-colors hover:bg-ink hover:text-white"
        >
          <X size={13} strokeWidth={2.6} />
        </button>
      ) : null}
    </div>
  )
}

/* ---------------------------------------------------------- SectionHeading */

export function SectionHeading({ title, caption, action, className }) {
  return (
    <div className={cx('flex items-end justify-between gap-4', className)}>
      <div className="min-w-0">
        <h2 className="text-lg font-extrabold tracking-tight text-ink sm:text-xl lg:text-2xl">
          {title}
        </h2>
        {caption ? <p className="mt-1 text-sm text-ink-muted">{caption}</p> : null}
      </div>
      {action}
    </div>
  )
}

/* ------------------------------------------------------------------- Price */

export function Price({ value, was, size = 'md', className }) {
  const sizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
  }
  return (
    <span className={cx('flex flex-wrap items-baseline gap-x-2 gap-y-0.5', className)}>
      <strong className={cx('tnum font-extrabold tracking-tight text-ink', sizes[size])}>
        {formatPrice(value)}
      </strong>
      {was != null && was > value ? (
        <span className="tnum text-xs font-semibold text-ink-faint line-through">
          {formatPrice(was)}
        </span>
      ) : null}
    </span>
  )
}

/* ------------------------------------------------------------------ Rating */

export function Rating({ value, reviews, className }) {
  return (
    <span className={cx('inline-flex items-center gap-1.5 text-xs text-ink-muted', className)}>
      <Star size={13} className="shrink-0 fill-amber text-amber" strokeWidth={0} />
      <b className="tnum font-bold text-ink">{formatRating(value)}</b>
      {reviews != null && reviews !== '' ? (
        <span className="tnum">({formatCount(reviews)})</span>
      ) : null}
    </span>
  )
}

/* ---------------------------------------------------------------- Skeleton */

export function Skeleton({ className }) {
  return <div className={cx('skeleton rounded-lg', className)} />
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-surface-line bg-surface">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-2.5 p-3.5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between pt-1.5">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- EmptyState */

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-line',
        'bg-surface-soft px-6 py-14 text-center',
        className,
      )}
    >
      {Icon ? (
        <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-surface text-ink-faint shadow-hair">
          <Icon size={24} strokeWidth={1.8} />
        </span>
      ) : null}
      <p className="text-md font-bold text-ink">{title}</p>
      {description ? (
        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-ink-muted">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
