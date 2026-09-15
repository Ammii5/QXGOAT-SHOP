import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { getStoredProducts, getStoredCategories, syncProductsFromApi } from '../data/storeDb'

const AppContext = createContext(null)

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Your order has shipped',
    body: 'Order #TH-10492 is on its way and arrives Thursday.',
    time: '2h ago',
    read: false,
  },
  {
    id: 'n2',
    title: 'Weekend deal unlocked',
    body: 'Save up to 30% on Smart Home gadgets, today only.',
    time: '5h ago',
    read: false,
  },
]

export function AppProvider({ children }) {
  // ---- navigation ----
  const [activeTab, setActiveTabState] = useState('home')

  // ---- search ----
  const [searchQuery, setSearchQuery] = useState('')

  // ---- filters ----
  const [sortBy, setSortBy] = useState('popularity') // popularity | price-asc | price-desc | rating-desc
  const [categoryFilter, setCategoryFilter] = useState(null) // categoryId | null

  // ---- cart ----
  const [cartItems, setCartItems] = useState([]) // [{ productId, qty }]
  const [liveProducts, setLiveProducts] = useState(() => getStoredProducts())
  const allProducts = liveProducts
  const allCategories = useMemo(() => getStoredCategories(), [liveProducts])

  useEffect(() => {
    let isMounted = true

    function handleProductStorageChange(event) {
      if (event.key !== 'qxgoat_store_products' || !isMounted) return
      setLiveProducts(getStoredProducts())
    }

    window.addEventListener('storage', handleProductStorageChange)

    async function refreshProducts() {
      try {
        const remote = await syncProductsFromApi()
        if (isMounted) setLiveProducts(remote)
      } catch (error) {
        console.warn('Product sync failed', error)
      }
    }

    refreshProducts()
    return () => {
      isMounted = false
      window.removeEventListener('storage', handleProductStorageChange)
    }
  }, [])

  // ---- notifications ----
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  // ---- overlays / drawers ----
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  // ---- toast ----
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  function showToast(message) {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2000)
  }

  function closeAllOverlays() {
    setMenuOpen(false)
    setNotifOpen(false)
    setCartOpen(false)
    setFilterOpen(false)
  }

  function goToTab(tab) {
    setActiveTabState(tab)
    setSearchQuery('')
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
        return items.map((i) =>
          i.productId === product.id ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [...items, { productId: product.id, qty }]
    })
    showToast(`Added "${product.name}" to cart`)
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
    setCartItems([])
    setCartOpen(false)
    showToast('Order placed! Thanks for shopping with @QXGOAT Store.')
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
        count: allProducts.filter((p) => (p.categoryId || p.category?.toLowerCase().replace(/\s+/g, '-')) === cat.id).length,
      })),
    [allCategories, allProducts],
  )

  const cartCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.qty, 0),
    [cartItems],
  )

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
    [cartItems],
  )

  const cartTotal = useMemo(
    () => cartDetailed.reduce((sum, i) => sum + i.lineTotal, 0),
    [cartDetailed],
  )

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  )

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

  function effectivePrice(p) {
    return p.discountPct ? p.price * (1 - p.discountPct / 100) : p.price
  }

  const shopProducts = useMemo(() => {
    let list = allProducts
    if (categoryFilter) list = list.filter((p) => p.categoryId === categoryFilter)
    return sortProducts(list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, sortBy])

  const dealProducts = useMemo(
    () => sortProducts(allProducts.filter((p) => p.discountPct)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortBy],
  )

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        allCategories.find((c) => c.id === (p.categoryId || p.category?.toLowerCase().replace(/\s+/g, '-')))?.name.toLowerCase().includes(q),
    )
  }, [searchQuery])

  const value = {
    products: allProducts,
    categories: categoriesWithCounts,
    activeTab,
    goToTab,
    goToCategory,
    searchQuery,
    setSearchQuery,
    searchResults,
    sortBy,
    setSortBy,
    categoryFilter,
    toggleCategoryFilter,
    setCategoryFilter,
    resetFilters,
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