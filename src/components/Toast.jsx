import { Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

/**
 * `toast` / `showToast` already existed in the context but were never
 * rendered, so add-to-cart gave no feedback at all. This renders them.
 */
export default function Toast() {
  const { toast } = useApp()

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[60] flex justify-center px-4 lg:bottom-8"
    >
      {toast ? (
        <div
          key={toast.id}
          className="animate-toast-in pointer-events-auto flex max-w-[min(26rem,100%)] items-center gap-3 rounded-full bg-ink py-2.5 pl-2.5 pr-5 shadow-overlay"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint text-white">
            <Check size={15} strokeWidth={3} />
          </span>
          <p className="truncate text-sm font-semibold text-white">{toast.message}</p>
        </div>
      ) : null}
    </div>
  )
}
