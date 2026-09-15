import { useApp } from '../context/AppContext'
import { NAV_ITEMS } from '../lib/nav'

export default function Footer() {
  const { goToTab } = useApp()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-surface-line bg-surface-soft lg:mt-20">
      <div className="mx-auto w-full max-w-shell px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <p className="text-md font-extrabold tracking-tight text-ink">@QXGOAT Store</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Courses, custom broker code, trading bots and wallets — delivered digitally and
              confirmed over chat.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-16">
            <nav aria-label="Footer">
              <p className="text-2xs font-bold tracking-tight text-ink-faint">Store</p>
              <ul className="mt-3 space-y-2.5">
                {NAV_ITEMS.map(({ key, label }) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => goToTab(key)}
                      className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-2xs font-bold tracking-tight text-ink-faint">Contact</p>
              <ul className="mt-3 space-y-2.5">
                <li>
                  <a
                    href="https://wa.me/923420599386"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/QXGOAT"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary"
                  >
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-surface-line pt-6 text-xs text-ink-faint">
          © {year} @QXGOAT Store. Trading involves risk; products are educational and tooling only.
        </p>
      </div>
    </footer>
  )
}
