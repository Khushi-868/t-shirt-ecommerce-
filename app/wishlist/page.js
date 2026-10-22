'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import Shell from '@/components/Shell';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';

export default function WishlistPage() {
  const { products, wishlist, toggleWishlist, addToCart } = useStore();
  const visible = products.filter((p) => wishlist.includes(p.id));

  return (
    <Shell>
      <section className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10 lg:py-16">
        <div className="mb-12 border-b border-[#d9d0c0] pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">Saved pieces</p>
          <h1 className="mt-3 font-serif text-5xl tracking-[-0.06em]">Wishlist</h1>
        </div>

        {visible.length ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
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
          <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
            <Heart size={29} strokeWidth={1.2} className="text-[#b68b35]" />
            <h2 className="mt-5 font-serif text-3xl">Nothing saved yet.</h2>
            <p className="mt-2 text-sm text-[#7d827c]">Tap the heart on items you want to keep track of.</p>
            <Link
              href="/products"
              className="mt-7 border-b border-[#202c2f] pb-1 text-xs uppercase tracking-[0.16em]"
            >
              Explore the collection
            </Link>
          </div>
        )}
      </section>
    </Shell>
  );
}
