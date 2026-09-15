import {
  Bot,
  Braces,
  Code2,
  GraduationCap,
  LineChart,
  Package,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react'

/** Tiny classnames joiner — keeps conditional Tailwind readable. */
export function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export const formatPrice = (value) =>
  `$${Number(value || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

/** "1.5K+" and 1500 both need to render sensibly. */
export const formatCount = (value) => {
  if (value == null || value === '') return '0'
  if (typeof value === 'string' && /[^0-9.]/.test(value)) return value
  const n = Number(value)
  if (!Number.isFinite(n)) return String(value)
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`
  return String(n)
}

export const formatRating = (value) => Number(value || 0).toFixed(1)

/**
 * Every category used to render the same star. Map the catalogue's real
 * vocabulary to icons that mean something, and fall back deterministically
 * so a brand-new category never renders blank.
 */
const ICON_RULES = [
  [/course|class|learn|academy|training/i, GraduationCap],
  [/bot|automat|algo|robot/i, Bot],
  [/wallet|crypto|binance|payment/i, Wallet],
  [/qoutex|quotex|exness|broker|coding|code|script/i, Code2],
  [/market|tool|indicator|signal|analys|chart/i, LineChart],
  [/secure|licen|key|access/i, ShieldCheck],
  [/api|integration|dev/i, Braces],
  [/new|premium|bundle|pro/i, Sparkles],
]

const FALLBACKS = [Package, Sparkles, LineChart, Code2, Wallet]

export function categoryIcon(category) {
  const label = `${category?.name || ''} ${category?.id || ''} ${category?.category || ''}`
  for (const [pattern, Icon] of ICON_RULES) {
    if (pattern.test(label)) return Icon
  }
  // Stable pseudo-random pick so the same category always gets the same icon.
  const seed = [...String(category?.id || label)].reduce((a, c) => a + c.charCodeAt(0), 0)
  return FALLBACKS[seed % FALLBACKS.length]
}

export function productIcon(product) {
  if (product?.icon) return product.icon
  return categoryIcon({ id: product?.categoryId, name: product?.category })
}

/** Discounted price. Mirrors the context helper so cards can work standalone. */
export function netPrice(product) {
  const base = Number(product?.price || 0)
  const pct = Number(product?.discountPct || product?.discount || 0)
  return pct > 0 ? base * (1 - pct / 100) : base
}
