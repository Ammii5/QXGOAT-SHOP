import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { syncProductsFromApi } from '../data/storeDb'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // ---- navigation ----
  const [activeTab, setActiveTabState] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [pendingPayment, setPendingPayment] = useState(null)

  // ---- search ----
  const [searchQuery, setSearchQuery] = useState('')

  // ---- filters ----
  const [sortBy, setSortBy] = useState('popularity') // popularity | price-asc | price-desc | rating-desc
  const [categoryFilter, setCategoryFilter] = useState(null) // categoryId | null

  // ---- cart ----
  const [cartItems, setCartItems] = useState([]) // [{ productId, qty }]
  const [liveProducts, setLiveProducts] = useState([])

  // 'loading' | 'ready' | 'error' — drives skeletons and the retry affordance.
  const [status, setStatus] = useState('loading')

  const allProducts = useMemo(
    () =>
      liveProducts
        .filter((product) => product.active !== false)
        .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0)),
    [liveProducts],
  )

  const allCategories = useMemo(() => {
    const map = new Map()
    for (const product of allProducts) {
      const id = product.categoryId || product.category?.toLowerCase().replace(/\s+/g, '-')
      if (!id) continue
      const category = map.get(id) || { id, name: product.category || id, count: 0 }
      category.count += 1
      map.set(id, category)
    }
    return [...map.values()]
  }, [allProducts])

  const loadProducts = useCallback(async ({ signal } = {}) => {
    setStatus('loading')
    try {
      const remote = await syncProductsFromApi()
      if (signal?.aborted) return
      setLiveProducts(remote)
      setStatus('ready')
    } catch (error) {
      if (signal?.aborted) return
      console.warn('Product sync failed', error)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    loadProducts({ signal: controller.signal })
    return () => controller.abort()
  }, [loadProducts])

  // ---- notifications ----
  const [notifications, setNotifications] = useState([])

  // ---- overlays / drawers ----
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  // ---- toast ----
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  function showToast(message) {
    // Re-keyed so repeat adds of the same product replay the animation.
    setToast({ id: Date.now(), message })
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2600)
  }

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  function closeAllOverlays() {
    setMenuOpen(false)
    setNotifOpen(false)
    setCartOpen(false)
    setFilterOpen(false)
  }

  function goToTab(tab) {
    setActiveTabState(tab)
    setSelectedProduct(null)
    setSearchQuery('')
    closeAllOverlays()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openProduct(product) {
    setSelectedProduct(product)
    setActiveTabState('product')
    closeAllOverlays()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goToCategory(categoryId) {
    setCategoryFilter(categoryId)
    setActiveTabState('shop')
    setSearchQuery('')
    closeAllOverlays()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function addToCart(product, qty = 1) {
    setCartItems((items) => {
      const existing = items.find((i) => i.productId === product.id)
      if (existing) {
        return items.map((i) => (i.productId === product.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...items, { productId: product.id, qty }]
    })
    showToast(`Added “${product.name}” to cart`)
  }

  function updateCartQty(productId, qty) {
    setCartItems((items) => {
      if (qty <= 0) return items.filter((i) => i.productId !== productId)
      return items.map((i) => (i.productId === productId ? { ...i, qty } : i))
    })
  }

  function removeFromCart(productId) {
    setCartItems((items) => items.filter((i) => i.productId !== productId))
  }

  function checkout() {
    if (!cartDetailed.length) return
    setPendingPayment({
      items: cartDetailed,
      total: cartTotal,
      createdAt: new Date().toISOString(),
    })
    setCartItems([])
    setCartOpen(false)
    setActiveTabState('payment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function markAllNotificationsRead() {
    setNotifications((list) => list.map((n) => ({ ...n, read: true })))
  }

  function toggleCategoryFilter(categoryId) {
    setCategoryFilter((current) => (current === categoryId ? null : categoryId))
  }

  function resetFilters() {
    setSortBy('popularity')
    setCategoryFilter(null)
  }

  // ---- derived data ----
  const categoriesWithCounts = useMemo(
    () =>
      allCategories.map((cat) => ({
        ...cat,
        count: allProducts.filter(
          (p) => (p.categoryId || p.category?.toLowerCase().replace(/\s+/g, '-')) === cat.id,
        ).length,
      })),
    [allCategories, allProducts],
  )

  const cartCount = useMemo(() => cartItems.reduce((sum, i) => sum + i.qty, 0), [cartItems])

  const cartDetailed = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = allProducts.find((p) => p.id === item.productId)
          if (!product) return null
          const unitPrice = product.discountPct
            ? product.price * (1 - product.discountPct / 100)
            : product.price
          return { ...item, product, unitPrice, lineTotal: unitPrice * item.qty }
        })
        .filter(Boolean),
    // `allProducts` was missing here: cart rows could resolve against an empty
    // catalogue and silently drop.
    [cartItems, allProducts],
  )

  const cartTotal = useMemo(
    () => cartDetailed.reduce((sum, i) => sum + i.lineTotal, 0),
    [cartDetailed],
  )

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  function effectivePrice(p) {
    return p.discountPct ? p.price * (1 - p.discountPct / 100) : p.price
  }

  function sortProducts(list) {
    const sorted = [...list]
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b))
        break
      case 'price-desc':
        sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a))
        break
      case 'rating-desc':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        break // popularity = catalog order
    }
    return sorted
  }

  /** The search box was already bound to state but nothing ever read it. */
  function matchesQuery(product, query) {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return [product.name, product.category, product.description, product.badge]
      .filter(Boolean)
      .some((field) => String(field).toLowerCase().includes(q))
  }

  const shopProducts = useMemo(() => {
    let list = allProducts
    if (categoryFilter) list = list.filter((p) => p.categoryId === categoryFilter)
    if (searchQuery.trim()) list = list.filter((p) => matchesQuery(p, searchQuery))
    return sortProducts(list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, sortBy, allProducts, searchQuery])

  const dealProducts = useMemo(
    () => sortProducts(allProducts.filter((p) => p.discountPct)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortBy, allProducts],
  )

  /** Home's trending row should react to the header search too. */
  const featuredProducts = useMemo(() => {
    if (!searchQuery.trim()) return allProducts
    return allProducts.filter((p) => matchesQuery(p, searchQuery))
  }, [allProducts, searchQuery])

  const activeFilterCount = (categoryFilter ? 1 : 0) + (sortBy !== 'popularity' ? 1 : 0)

  const value = {
    products: allProducts,
    featuredProducts,
    status,
    isLoading: status === 'loading',
    hasError: status === 'error',
    reloadProducts: loadProducts,
    selectedProduct,
    openProduct,
    pendingPayment,
    categories: categoriesWithCounts,
    activeTab,
    goToTab,
    goToCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    categoryFilter,
    toggleCategoryFilter,
    setCategoryFilter,
    resetFilters,
    activeFilterCount,
    shopProducts,
    dealProducts,
    effectivePrice,
    cartItems,
    cartDetailed,
    cartCount,
    cartTotal,
    addToCart,
    updateCartQty,
    removeFromCart,
    checkout,
    notifications,
    unreadCount,
    markAllNotificationsRead,
    menuOpen,
    setMenuOpen,
    notifOpen,
    setNotifOpen,
    cartOpen,
    setCartOpen,
    filterOpen,
    setFilterOpen,
    closeAllOverlays,
    toast,
    showToast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
