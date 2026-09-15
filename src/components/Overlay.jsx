import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cx } from '../lib/ui'

/* --------------------------------------------------------------- Backdrop */

export function Backdrop({ open, onClick, className = '' }) {
  return (
    <div
      aria-hidden="true"
      onClick={onClick}
      className={cx(
        'fixed inset-0 z-40 bg-night/50 backdrop-blur-sm transition-opacity duration-300',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
        className,
      )}
    />
  )
}

/* ------------------------------------------------- shared overlay behaviour */

function useOverlay(open, onClose) {
  const panelRef = useRef(null)

  // Close on Escape.
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  // Lock body scroll without the layout shifting as the scrollbar disappears.
  useEffect(() => {
    if (!open) return undefined
    const { body } = document
    const gap = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [open])

  // Move focus into the panel so keyboard and screen-reader users land there.
  useEffect(() => {
    if (!open) return
    const node = panelRef.current
    if (!node) return
    const target = node.querySelector('[data-autofocus]') || node
    window.requestAnimationFrame(() => target.focus({ preventScroll: true }))
  }, [open])

  return panelRef
}

/* --------------------------------------------------------- OverlayHeading */

export function OverlayHeading({ icon: Icon, title, caption, onClose, closeLabel = 'Close' }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-surface-line px-5 py-4 sm:px-6 sm:py-5">
      <div className="flex min-w-0 items-center gap-3">
        {Icon ? (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary">
            <Icon size={18} strokeWidth={2.2} />
          </span>
        ) : null}
        <div className="min-w-0">
          <h2 className="truncate text-md font-extrabold tracking-tight text-ink">{title}</h2>
          {caption ? <p className="mt-0.5 truncate text-xs text-ink-muted">{caption}</p> : null}
        </div>
      </div>
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink active:scale-90"
      >
        <X size={18} strokeWidth={2.4} />
      </button>
    </div>
  )
}

/* ----------------------------------------------------------------- Drawer */
/** Slides in from the left or right. Full-height on every breakpoint. */

export function Drawer({ open, onClose, side = 'right', labelledBy, className, children }) {
  const panelRef = useOverlay(open, onClose)

  return (
    <>
      <Backdrop open={open} onClick={onClose} />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-hidden={!open}
        tabIndex={-1}
        className={cx(
          'fixed top-0 z-50 flex h-[100dvh] w-[86%] max-w-sm flex-col bg-surface shadow-overlay outline-none',
          'transition-transform duration-300 ease-spring will-change-transform',
          side === 'left' ? 'left-0' : 'right-0',
          open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full',
          className,
        )}
        // Keep the panel out of the tab order while it's parked off-screen.
        {...(!open ? { inert: '' } : {})}
      >
        {children}
      </aside>
    </>
  )
}

/* ------------------------------------------------------------------ Sheet */
/**
 * Bottom sheet on mobile. On desktop it becomes a centred dialog, because a
 * sheet pinned to the bottom of a 1440px window is a phone pattern stranded
 * on the wrong device.
 */

export function Sheet({ open, onClose, labelledBy, className, children }) {
  const panelRef = useOverlay(open, onClose)

  return (
    <>
      <Backdrop open={open} onClick={onClose} />
      <div
        className={cx(
          'pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center',
          'sm:inset-0 sm:items-center sm:p-6',
        )}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          aria-hidden={!open}
          tabIndex={-1}
          className={cx(
            'pointer-events-auto flex max-h-[88dvh] w-full flex-col overflow-hidden bg-surface outline-none',
            'rounded-t-3xl shadow-overlay',
            'transition-all duration-300 ease-spring will-change-transform',
            open ? 'translate-y-0' : 'translate-y-full',
            'sm:max-h-[86dvh] sm:max-w-lg sm:rounded-3xl sm:border sm:border-surface-line',
            open ? 'sm:scale-100 sm:opacity-100' : 'sm:translate-y-3 sm:scale-95 sm:opacity-0',
            className,
          )}
          {...(!open ? { inert: '' } : {})}
        >
          {/* Grab handle reads as a sheet on touch; pointless on desktop. */}
          <div className="mx-auto mt-3 h-1.5 w-11 shrink-0 rounded-full bg-surface-line sm:hidden" />
          {children}
        </div>
      </div>
    </>
  )
}
