import { BookOpen, Bot, Code2, WalletCards } from 'lucide-react'

export const STORAGE_KEY = 'qxgoat_store_products'
export const BASE44_API_KEY = import.meta.env.VITE_FILESTORE_API_KEY ||
  '9317e9c78aca4531a58fc6301fb4ff97d9f40b41224648d2978d48cf7a0b10bf'
export const BASE44_DISPATCHER = import.meta.env.DEV
  ? '/base44'
  : 'https://sweet-sync-your-stack.base44.app/functions'
export const FILESTORE_UPLOAD_ENDPOINT = `${BASE44_DISPATCHER}/filestoreUpload`
export const FILESTORE_LIST_ENDPOINT = `${BASE44_DISPATCHER}/filestoreList`

let productsSyncPromise = null

export const defaultProducts = [
  {
    id: 'p1',
    categoryId: 'courses',
    category: 'Courses',
    name: 'Courses',
    badge: 'TOP PICK',
    badgeColor: 'bg-primary',
    rating: 4.9,
    reviews: '2.4K+',
    price: 149.99,
    discountPct: 20,
    description: 'Learn practical digital trading systems, automation flows, and product-building workflows.',
  },
  {
    id: 'p2',
    categoryId: 'qoutex',
    category: 'Qoutex Coding',
    name: 'Create Your Own Qoutex Coding',
    badge: 'BUNDLE',
    badgeColor: 'bg-emerald-600',
    rating: 4.8,
    reviews: '1.3K+',
    price: 499.99,
    discountPct: 15,
    description: 'Custom Qoutex coding setup tailored for your business or trading workflow.',
  },
  {
    id: 'p3',
    categoryId: 'exness',
    category: 'Exness Coding',
    name: 'Create Your Own Exness Coding',
    badge: 'PREMIUM',
    badgeColor: 'bg-violet-600',
    rating: 4.9,
    reviews: '1.7K+',
    price: 599.99,
    discountPct: 18,
    description: 'Build a custom Exness-ready solution tailored to your trading and automation goals.',
  },
  {
    id: 'p4',
    categoryId: 'bots',
    category: 'Trading Bot',
    name: 'Advanced Trading Bot Creation',
    badge: 'HOT',
    badgeColor: 'bg-amber-500',
    rating: 4.8,
    reviews: '980+',
    price: 799.99,
    discountPct: 25,
    description: 'Professional bot creation focused on automation, execution speed, and strategy control.',
  },
  {
    id: 'p5',
    categoryId: 'bots',
    category: 'Trading Bot',
    name: 'Create Your Own Trading Bot',
    badge: 'POPULAR',
    badgeColor: 'bg-cyan-600',
    rating: 4.7,
    reviews: '1.1K+',
    price: 399.99,
    discountPct: 12,
    description: 'A customizable trading bot package built around your preferred strategy and execution rules.',
  },
  {
    id: 'p6',
    categoryId: 'qoutex',
    category: 'Qoutex Coding',
    name: 'Qoutex Coding',
    badge: 'NEW',
    badgeColor: 'bg-sky-500',
    rating: 4.8,
    reviews: '890+',
    price: 249.99,
    discountPct: 10,
    description: 'A ready-to-launch Qoutex coding solution for fast deployment and smoother trading operations.',
  },
  {
    id: 'p7',
    categoryId: 'exness',
    category: 'Exness Coding',
    name: 'Exness Coding',
    badge: 'BESTSELLER',
    badgeColor: 'bg-indigo-600',
    rating: 4.9,
    reviews: '1.5K+',
    price: 299.99,
    discountPct: 17,
    description: 'Efficient Exness coding support for onboarding, execution flow, and trading setup optimization.',
  },
  {
    id: 'p8',
    categoryId: 'wallets',
    category: 'Wallets',
    name: 'Binanace Wallets',
    badge: 'SECURE',
    badgeColor: 'bg-rose-500',
    rating: 4.6,
    reviews: '780+',
    price: 129.99,
    discountPct: 14,
    description: 'Secure wallet solutions built for digital trading and day-to-day finance workflows.',
  },
]

export const defaultCategories = [
  { id: 'courses', name: 'Courses', icon: BookOpen, count: 1 },
  { id: 'qoutex', name: 'Qoutex Coding', icon: Code2, count: 2 },
  { id: 'exness', name: 'Exness Coding', icon: Code2, count: 2 },
  { id: 'bots', name: 'Trading Bots', icon: Bot, count: 2 },
  { id: 'wallets', name: 'Wallets', icon: WalletCards, count: 1 },
]

function safeReadStorage() {
  try {
    if (typeof window === 'undefined') return null
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
    if (parsed && Array.isArray(parsed.products)) return parsed.products
    return null
  } catch {
    return null
  }
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeProduct(product) {
  return {
    id: product.id || product._id || `${slugify(product.name || 'product')}-${Date.now()}`,
    categoryId: product.categoryId || slugify(product.category || 'courses'),
    category: product.category || 'Courses',
    name: product.name || 'Untitled product',
    badge: product.badge || 'NEW',
    badgeColor: product.badgeColor || 'bg-primary',
    rating: Number(product.rating || 4.5),
    reviews: product.reviews || '0',
    price: Number(product.price || 0),
    discountPct: Number(product.discountPct || product.discount || 0),
    description: product.description || 'Digital product',
    image: product.image || product.imageUrl || product.image_url || product.thumbnail || '',
  }
}

function extractRemoteFiles(payload) {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.files)) return payload.files
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.result)) return payload.result
  if (payload.files && Array.isArray(payload.files.items)) return payload.files.items
  return []
}

function getRemoteFileUrl(file) {
  return file.url || file.file_url || file.downloadUrl || file.download_url || file.public_url || file.publicUrl || file.signed_url || file.path || ''
}

function getRemoteFileName(file) {
  return file.name || file.filename || file.file_name || file.title || ''
}

function attachRemoteImages(products, files) {
  const imageFiles = files.filter((file) => {
    const name = getRemoteFileName(file).toLowerCase()
    const contentType = String(file.content_type || file.contentType || file.mime_type || '').toLowerCase()
    return Boolean(getRemoteFileUrl(file)) && (contentType.startsWith('image/') || /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(name))
  })

  return products.map((product) => {
    if (/^(https?:|data:|blob:)/i.test(product.image)) return product

    const productKey = slugify(product.image || product.name || product.id)
    const imageFile = imageFiles.find((file) => slugify(getRemoteFileName(file)).includes(productKey))
    return imageFile ? { ...product, image: getRemoteFileUrl(imageFile) } : product
  })
}

async function base44Request(endpoint, body) {
  const response = await fetch(`${BASE44_DISPATCHER}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': BASE44_API_KEY,
    },
    body: JSON.stringify(body || {}),
  })

  if (!response.ok) {
    const error = new Error(`Base44 request failed: ${response.status}`)
    error.status = response.status
    throw error
  }

  return response.json()
}

export async function ingestWebsiteFile({ fileUrl, name, tags = 'ai-ingest' }) {
  if (!fileUrl || !name) {
    throw new Error('fileUrl and name are required to ingest a website file')
  }

  return base44Request('/filestoreUpload', {
    file_url: fileUrl,
    name,
    tags,
  })
}

export async function uploadToStore({ file_url, file_base64, name, content_type, tags }) {
  return base44Request('/filestoreUpload', {
    file_url,
    file_base64,
    name,
    content_type,
    tags,
  })
}

export async function listStoredFiles(limit = 200) {
  return base44Request('/filestoreList', { limit })
}

export async function fetchProductsFromApi() {
  const listResponse = await listStoredFiles(200)
  const files = extractRemoteFiles(listResponse)

  const productFile = files.find((file) => {
    const name = (file.name || file.filename || file.title || '').toLowerCase()
    return /qxgoat|products|store/.test(name) && /\.json$/i.test(name)
  })

  if (!productFile) {
    throw new Error('No QXGOAT product JSON file found in FileStore')
  }

  const fileUrl = getRemoteFileUrl(productFile)
  if (!fileUrl) {
    throw new Error('The QXGOAT product file has no public URL')
  }

  const raw = await fetch(fileUrl)
  if (!raw.ok) {
    throw new Error(`Product file download failed: ${raw.status}`)
  }

  const json = await raw.json()
  if (Array.isArray(json)) return attachRemoteImages(json.map(normalizeProduct), files)
  if (json && Array.isArray(json.products)) return attachRemoteImages(json.products.map(normalizeProduct), files)
  if (json && Array.isArray(json.data)) return attachRemoteImages(json.data.map(normalizeProduct), files)
  throw new Error('The QXGOAT product file has an unsupported JSON shape')
}

export async function syncProductsFromApi() {
  if (!productsSyncPromise) {
    productsSyncPromise = fetchProductsFromApi().then((remoteProducts) => {
      if (!remoteProducts.length) {
        throw new Error('FileStore returned no products')
      }

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteProducts))
      return remoteProducts
    })
  }

  return productsSyncPromise
}

export function getStoredProducts() {
  const stored = safeReadStorage()
  return stored && stored.length ? stored.map(normalizeProduct) : defaultProducts
}

export function getStoredCategories() {
  const stored = safeReadStorage()
  if (!stored || !stored.length) {
    return defaultCategories
  }

  const map = new Map()
  for (const item of stored) {
    const categoryName = item.category || 'Courses'
    const categoryId = item.categoryId || categoryName.toLowerCase().replace(/\s+/g, '-')
    if (!map.has(categoryId)) {
      const icon = categoryId === 'courses'
        ? BookOpen
        : categoryId === 'bots' || categoryId === 'trading-bot'
          ? Bot
          : categoryId === 'wallets'
            ? WalletCards
            : Code2
      map.set(categoryId, { id: categoryId, name: categoryName, icon, count: 0 })
    }
    map.get(categoryId).count += 1
  }

  return [...map.values()].map((category) => ({ ...category, count: category.count || 0 }))
}
