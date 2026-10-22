'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import Shell from '@/components/Shell';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';

export default function ListingPage({ categorySlug = '' }) {
  const { products, wishlist, toggleWishlist, addToCart } = useStore();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const initialFilter = categorySlug
    ? categorySlug === 'field-notes'
      ? 'Field Notes'
      : categorySlug === 'late-light'
      ? 'Late Light'
      : categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)
    : '';

  const [sort, setSort] = useState('featured');
  const [filter, setFilter] = useState(initialFilter);
  const [showFilters, setShowFilters] = useState(false);

  const visible = useMemo(() => {
    let result = products.filter(
      (p) =>
        (!filter || p.category === filter.toLowerCase().replace(' ', '-') || p.collection === filter) &&
        (!query || `${p.name} ${p.color} ${p.collection}`.toLowerCase().includes(query.toLowerCase()))
    );

    if (sort === 'low') {
      result = [...result].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    }
    if (sort === 'high') {
      result = [...result].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    }
    if (sort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    
    return result;
  }, [filter, query, sort, products]);

  return (
    <Shell>
      <section className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10 lg:py-16">
        <div className="flex flex-col justify-between gap-6 border-b border-[#d9d0c0] pb-9 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">
              {query ? 'Search results' : 'The collection'}
            </p>
            <h1 className="mt-3 font-serif text-5xl tracking-[-0.06em]">
              {query ? `For “${query}”` : filter || 'Everything'}
            </h1>
            <p className="mt-3 text-sm text-[#7d827c]">{visible.length} considered pieces</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              data-testid="button-toggle-filters"
              className="flex items-center gap-2 border border-[#c8c0b2] px-4 py-2.5 text-xs uppercase tracking-[0.14em] md:hidden"
            >
              <SlidersHorizontal size={14} /> Filter
            </button>
            <label className="flex items-center gap-3 text-xs uppercase tracking-[0.14em]">
              Sort{' '}
              <select
                data-testid="select-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border-b border-[#202c2f] bg-transparent py-2 text-xs outline-none"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>
        </div>

        <div className={`${showFilters ? 'flex' : 'hidden'} mt-5 flex-wrap gap-2 md:flex`}>
          <button
            onClick={() => setFilter('')}
            className={`border px-4 py-2 text-xs ${
              !filter ? 'border-[#202c2f] bg-[#202c2f] text-[#f4f0e8]' : 'border-[#c8c0b2]'
            }`}
          >
            All
          </button>
          {['Tees', 'Layers', 'Field Notes', 'Late Light', 'Knitwear', 'Bottoms'].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              data-testid={`button-filter-${item.toLowerCase().replace(' ', '-')}`}
              className={`border px-4 py-2 text-xs ${
                filter === item ? 'border-[#202c2f] bg-[#202c2f] text-[#f4f0e8]' : 'border-[#c8c0b2]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {visible.length ? (
          <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
            <Search size={30} strokeWidth={1.2} className="text-[#b68b35]" />
            <h2 className="mt-5 font-serif text-3xl">Nothing found here.</h2>
            <p className="mt-2 text-sm text-[#7d827c]">Try another fabric, color, or category.</p>
            <Link href="/products" className="mt-6 border-b border-[#202c2f] pb-1 text-xs uppercase tracking-[0.16em]">
              View everything
            </Link>
          </div>
        )}
      </section>
    </Shell>
  );
}
