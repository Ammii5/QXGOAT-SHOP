import { Home, LayoutGrid, ShoppingBag, Tag, User } from 'lucide-react'

/**
 * Single source of truth for the tab set. Previously the header, bottom nav
 * and menu drawer each kept their own copy and had drifted apart.
 */
export const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'categories', label: 'Categories', icon: LayoutGrid },
  { key: 'shop', label: 'Shop', icon: ShoppingBag, primary: true },
  { key: 'deals', label: 'Deals', icon: Tag },
  { key: 'account', label: 'Account', icon: User },
]

/** Sub-pages highlight the tab they belong to. */
export const TAB_PARENT = {
  product: 'shop',
  payment: 'shop',
}

export const resolveActiveTab = (activeTab) => TAB_PARENT[activeTab] || activeTab
