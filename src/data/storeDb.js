export const BASE44_API_KEY = import.meta.env.VITE_FILESTORE_API_KEY ||
  '9317e9c78aca4531a58fc6301fb4ff97d9f40b41224648d2978d48cf7a0b10bf'
export const BASE44_DISPATCHER = import.meta.env.DEV
  ? '/base44'
  : 'https://sweet-sync-your-stack.base44.app/functions'
export const FILESTORE_UPLOAD_ENDPOINT = `${BASE44_DISPATCHER}/filestoreUpload`
export const FILESTORE_LIST_ENDPOINT = `${BASE44_DISPATCHER}/filestoreList`

let productsSyncPromise = null

export const defaultProducts = []
export const defaultCategories = []

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

      return remoteProducts
    })
  }

  return productsSyncPromise
}

export function getStoredProducts() {
  return []
}

export function getStoredCategories() {
  return []
}
