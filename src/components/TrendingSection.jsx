import { ArrowRight } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from './ProductCard'

export default function TrendingSection({ onAddToCart }) {
  return (
    <section>
      <div className="flex items-center justify-between px-4 pt-4">
        <h2 className="text-[18px] font-extrabold text-ink">Trending Electronics</h2>
        <button className="flex items-center gap-1 text-xs font-bold text-primary">
          View All
          <ArrowRight size={13} strokeWidth={2.6} />
        </button>
      </div>

      <div className="no-scrollbar snap-x-mandatory flex gap-3.5 overflow-x-auto px-4 pb-2 pt-3.5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={() => onAddToCart(product)} />
        ))}
      </div>
    </section>
  )
}
