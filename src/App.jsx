import Header from './components/Header'
import BottomNav from './components/BottomNav'
import MenuDrawer from './components/Menudrawer'
import CartDrawer from './components/Cartdrawer'
import FilterSheet from './components/Filtersheet'
import { useApp } from './context/AppContext'
import { CategoriesPage, DealsPage, HomePage, ShopPage, AccountPage } from './pages/StorePages'

export default function App() {
  const {
    activeTab,
    goToTab,
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
  } = useApp()

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onAddToCart={addToCart} onShopNow={() => goToTab('shop')} />
      case 'categories':
        return <CategoriesPage categories={categories} onSelectCategory={(categoryId) => goToTab('shop') || null} />
      case 'shop':
        return (
          <ShopPage
            products={shopProducts}
            onAddToCart={addToCart}
            onOpenFilters={() => setFilterOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )
      case 'deals':
        return <DealsPage products={dealProducts} onAddToCart={addToCart} effectivePrice={effectivePrice} />
      case 'account':
        return (
          <AccountPage
            notifications={notifications}
            unreadCount={unreadCount}
            onOpenNotifications={() => setNotifOpen(true)}
          />
        )
      default:
        return <HomePage onAddToCart={addToCart} onShopNow={() => goToTab('shop')} />
    }
  }

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[428px] overflow-x-hidden bg-white shadow-[0_0_60px_rgba(0,0,0,0.12)] sm:my-8 sm:min-h-0 sm:rounded-[36px]">
      <div className="safe-top">
        <Header cartCount={cartCount} notifCount={unreadCount} />
      </div>

      <main>{renderPage()}</main>

      <div className="h-24" />

      <BottomNav activeTab={activeTab} onChange={goToTab} />
      <MenuDrawer />
      <CartDrawer />
      <FilterSheet />
    </div>
  )
}
