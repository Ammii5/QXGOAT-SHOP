import { NAV_ITEMS, resolveActiveTab } from '../lib/nav'
import { cx } from '../lib/ui'

/**
 * Mobile and tablet only. On desktop the primary nav lives in the header,
 * where there's room for it.
 */
export default function BottomNav({ activeTab, onChange }) {
  const current = resolveActiveTab(activeTab)

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-surface-line bg-surface/95 backdrop-blur-lg lg:hidden"
    >
      <div className="mx-auto flex h-[68px] w-full max-w-md items-stretch justify-around px-2">
        {NAV_ITEMS.map(({ key, label, icon: Icon, primary }) => {
          const isActive = current === key

          if (primary) {
            return (
              <button
                key={key}
                type="button"
                onClick={() => onChange(key)}
                aria-current={isActive ? 'page' : undefined}
                className="relative -top-5 flex flex-1 flex-col items-center justify-start"
              >
                <span
                  className={cx(
                    'grid h-14 w-14 place-items-center rounded-2xl border-4 border-surface text-white',
                    'bg-gradient-to-br from-primary-light to-primary shadow-fab',
                    'transition-transform duration-200 ease-spring active:scale-90',
                    isActive && 'ring-2 ring-primary/30 ring-offset-2 ring-offset-surface',
                  )}
                >
                  <Icon size={22} strokeWidth={2.2} />
                </span>
                <span
                  className={cx(
                    'mt-1 text-[10px] font-bold tracking-tight',
                    isActive ? 'text-primary' : 'text-ink-muted',
                  )}
                >
                  {label}
                </span>
              </button>
            )
          }

          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              aria-current={isActive ? 'page' : undefined}
              className={cx(
                'flex flex-1 flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-200',
                isActive ? 'text-primary' : 'text-ink-muted',
              )}
            >
              <span className="relative">
                <Icon size={21} strokeWidth={isActive ? 2.4 : 2} />
                {isActive ? (
                  <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                ) : null}
              </span>
              <span className="text-[10px] font-bold tracking-tight">{label}</span>
            </button>
          )
        })}
      </div>
      <div className="safe-bottom" />
    </nav>
  )
}
