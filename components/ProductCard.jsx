'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { money } from '@/lib/products';

export default function ProductCard({ product, addToCart, toggleWishlist, isWishlisted }) {
  const [hover, setHover] = useState(false);

  return (
    <article data-testid={`card-product-${product.id}`} className="group">
      <div
        className="relative aspect-[0.82] overflow-hidden bg-[#ded5c5]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link href={`/products/${product.slug}`} data-testid={`link-product-${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-cover transition duration-700 ${hover ? 'scale-[1.04]' : 'scale-100'}`}
          />
        </Link>
        {product.salePrice && (
          <span className="absolute left-3 top-3 bg-[#b9553d] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#f4f0e8]">
            - {product.discount}%
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          data-testid={`button-wishlist-${product.id}`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f0e8]/85 transition hover:bg-[#f4f0e8]"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart size={16} fill={isWishlisted ? '#b68b35' : 'none'} color={isWishlisted ? '#b68b35' : '#202c2f'} />
        </button>
        <button
          onClick={() => addToCart(product, product.sizes[1] || product.sizes[0], product.color, 1)}
          data-testid={`button-quick-add-${product.id}`}
          className="absolute bottom-3 left-3 right-3 translate-y-14 bg-[#202c2f] py-3 text-xs uppercase tracking-[0.16em] text-[#f4f0e8] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#b68b35]"
        >
          Quick add
        </button>
      </div>
      <div className="flex justify-between gap-3 pt-4">
        <div>
          <Link href={`/products/${product.slug}`} className="text-sm font-medium hover:text-[#b68b35]">
            {product.name}
          </Link>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7d827c]">
            {product.color} · {product.collection}
          </p>
        </div>
        <div className="text-right text-sm">
          {product.salePrice ? (
            <>
              <span className="text-[#b9553d]">{money(product.salePrice)}</span>
              <span className="ml-2 text-xs text-[#8d918a] line-through">{money(product.price)}</span>
            </>
          ) : (
            money(product.price)
          )}
        </div>
      </div>
    </article>
  );
}
