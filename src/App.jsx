import Header from './components/Header'
import BottomNav from './components/BottomNav'
import MenuDrawer from './components/Menudrawer'
import CartDrawer from './components/Cartdrawer'
import FilterSheet from './components/Filtersheet'
import NotificationDrawer from './components/NotificationDrawer'
import Toast from './components/Toast'
import Footer from './components/Footer'
import { useApp } from './context/AppContext'
import {
  AccountPage,
  CategoriesPage,
  DealsPage,
  HomePage,
  PaymentPage,
  ProductDetailPage,
  ShopPage,
} from './pages/StorePages'

export default function App() {
  const {
    activeTab,
    goToTab,
    goToCategory,
    addToCart,
    categories,
    shopProducts,
    dealProducts,
    effectivePrice,
    searchQuery,
    setSearchQuery,
    setFilterOpen,
    notifications,
    unreadCount,
    setNotifOpen,
    cartCount,
    cartTotal,
    products,
    featuredProducts,
    selectedProduct,
    openProduct,
    pendingPayment,
    categoryFilter,
    setCategoryFilter,
    resetFilters,
    activeFilterCount,
    isLoading,
    hasError,
    reloadProducts,
  } = useApp()

  // Shared by every catalogue-backed page.
  const catalogueState = { isLoading, hasError, onRetry: reloadProducts }

  const renderPage = () => {
    switch (activeTab) {
      case 'categories':
        return (
          <CategoriesPage
            categories={categories}
            onSelectCategory={goToCategory}
            {...catalogueState}
          />
        )

      case 'shop':
        return (
          <ShopPage
            products={shopProducts}
            categories={categories}
            categoryFilter={categoryFilter}
            onClearCategory={() => setCategoryFilter(null)}
            activeFilterCount={activeFilterCount}
            onResetFilters={resetFilters}
            onAddToCart={addToCart}
            onOpenProduct={openProduct}
            onOpenFilters={() => setFilterOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            {...catalogueState}
          />
        )

      case 'deals':
        return (
          <DealsPage
            products={dealProducts}
            onAddToCart={addToCart}
            onOpenProduct={openProduct}
            effectivePrice={effectivePrice}
            onShopNow={() => goToTab('shop')}
            {...catalogueState}
          />
        )

      case 'product':
        return selectedProduct ? (
          <ProductDetailPage
            // Keyed so quantity and the image-failed flag reset per product
            // instead of carrying over from whatever was viewed before.
            key={selectedProduct.id}
            product={selectedProduct}
            onBack={() => goToTab('shop')}
            onAddToCart={addToCart}
          />
        ) : null

      case 'payment':
        return <PaymentPage payment={pendingPayment} onBack={() => goToTab('shop')} />

      case 'account':
        return (
          <AccountPage
            notifications={notifications}
            unreadCount={unreadCount}
            onOpenNotifications={() => setNotifOpen(true)}
            cartCount={cartCount}
            cartTotal={cartTotal}
            productCount={products.length}
          />
        )

      case 'home':
      default:
        return (
          <HomePage
            products={featuredProducts}
            categories={categories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddToCart={addToCart}
            onOpenProduct={openProduct}
            onShopNow={() => goToTab('shop')}
            onCategorySelect={goToCategory}
            onOpenFilters={() => {
              goToTab('shop')
              setFilterOpen(true)
            }}
            onDeals={() => goToTab('deals')}
            {...catalogueState}
          />
        )
    }
  }

  return (
    <div className="no-x flex min-h-[100dvh] flex-col bg-surface">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      <Header cartCount={cartCount} notifCount={unreadCount} />

      {/* tabIndex -1 so the skip link moves focus here, not just the scroll
          position — without it the next Tab goes straight back to the header. */}
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {renderPage()}
      </main>

      <Footer />

      {/* Clears the fixed bottom tab bar on mobile only. */}
      <div className="h-[calc(4.25rem+env(safe-area-inset-bottom))] lg:hidden" aria-hidden="true" />

      <BottomNav activeTab={activeTab} onChange={goToTab} />

      <MenuDrawer />
      <CartDrawer />
      <FilterSheet />
      <NotificationDrawer />
      <Toast />
    </div>
  )
}
