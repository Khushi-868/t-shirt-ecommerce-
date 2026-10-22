'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Heart, Minus, Plus, Star, Truck, RefreshCw, ShieldCheck, Check } from 'lucide-react';
import Shell from '@/components/Shell';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';
import { money } from '@/lib/products';

export default function ProductDetailPage({ slug }) {
  const { products, wishlist, toggleWishlist, addToCart } = useStore();
  const router = useRouter();
  
  const product = products.find((p) => p.slug === slug) || products[0];
  
  const [image, setImage] = useState(product.image);
  const [size, setSize] = useState('');
  const [color, setColor] = useState(product.color);
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState('');
  
  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  const add = (go) => {
    if (!size) {
      setNotice('Choose a size to continue.');
      return;
    }
    addToCart(product, size, color, quantity);
    setNotice(go ? 'Added — taking you to your bag.' : 'Added to your bag.');
    if (go) router.push('/cart');
  };

  return (
    <Shell>
      <section className="mx-auto max-w-[1440px] px-5 py-8 lg:px-10 lg:py-14">
        <div className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#7d827c]">
          <Link href="/products">Shop</Link>
          <ChevronRight size={12} />
          <span>{product.name}</span>
        </div>
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="grid gap-3 sm:grid-cols-[90px_1fr]">
            <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
              {[product.image, product.image].map((src, i) => (
                <button
                  key={i}
                  data-testid={`button-gallery-${i}`}
                  onClick={() => setImage(src)}
                  className={`aspect-square w-20 overflow-hidden border ${
                    image === src && i === 0 ? 'border-[#202c2f]' : 'border-transparent'
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="order-1 aspect-[0.86] overflow-hidden bg-[#ded5c5] sm:order-2">
              <img src={image} alt={product.name} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="md:pt-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">
                  {product.collection}
                </p>
                <h1 className="mt-3 font-serif text-5xl leading-none tracking-[-0.06em]">{product.name}</h1>
              </div>
              <button
                onClick={() => toggleWishlist(product.id)}
                data-testid="button-product-wishlist"
                className="mt-1 rounded-full border border-[#c8c0b2] p-3"
              >
                <Heart
                  size={18}
                  fill={wishlist.includes(product.id) ? '#b68b35' : 'none'}
                  color={wishlist.includes(product.id) ? '#b68b35' : '#202c2f'}
                />
              </button>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <span className="text-lg">{product.salePrice ? money(product.salePrice) : money(product.price)}</span>
              {product.salePrice && (
                <span className="text-sm text-[#8d918a] line-through">{money(product.price)}</span>
              )}
              <span className="flex items-center gap-1 border-l border-[#c8c0b2] pl-4 text-xs">
                <Star size={13} fill="#b68b35" color="#b68b35" /> {product.rating} ({product.reviews})
              </span>
            </div>
            <p className="mt-7 max-w-lg text-sm leading-7 text-[#5e6761]">{product.description}</p>
            <div className="mt-8 border-t border-[#d9d0c0] pt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.14em]">
                  Color: <b>{color}</b>
                </span>
                <span className="font-mono text-[10px] text-[#7d827c]">{product.inventory} left</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.colors.map((item) => (
                  <button
                    key={item}
                    onClick={() => setColor(item)}
                    data-testid={`button-color-${item}`}
                    className={`border px-4 py-2 text-xs ${
                      color === item ? 'border-[#202c2f] bg-[#202c2f] text-[#f4f0e8]' : 'border-[#c8c0b2]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.14em]">Size</span>
                <button className="text-xs underline underline-offset-4">Size guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSize(item);
                      setNotice('');
                    }}
                    data-testid={`button-size-${item}`}
                    className={`border py-3 text-xs ${
                      size === item ? 'border-[#202c2f] bg-[#202c2f] text-[#f4f0e8]' : 'border-[#c8c0b2]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-7 flex gap-3">
              <div className="flex items-center border border-[#c8c0b2]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid="button-quantity-minus"
                  className="px-3 py-3"
                >
                  <Minus size={14} />
                </button>
                <span data-testid="text-product-quantity" className="w-8 text-center text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                  data-testid="button-quantity-plus"
                  className="px-3 py-3"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => add(false)}
                data-testid="button-add-to-cart"
                className="flex-1 bg-[#202c2f] py-3 text-xs uppercase tracking-[0.18em] text-[#f4f0e8] transition hover:bg-[#b68b35]"
              >
                Add to bag
              </button>
            </div>
            <button
              onClick={() => add(true)}
              data-testid="button-buy-now"
              className="mt-3 w-full border border-[#202c2f] py-3 text-xs uppercase tracking-[0.18em] transition hover:bg-[#ded5c5]"
            >
              Buy now
            </button>
            {notice && (
              <p data-testid="status-product-notice" className="mt-4 flex items-center gap-2 text-xs text-[#b68b35]">
                <Check size={14} /> {notice}
              </p>
            )}
            <div className="mt-9 grid gap-3 border-t border-[#d9d0c0] pt-6 text-xs text-[#5e6761]">
              <div className="flex items-center gap-3">
                <Truck size={16} className="text-[#b68b35]" /> Free delivery over $120
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw size={16} className="text-[#b68b35]" /> 30-day easy returns
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-[#b68b35]" /> Two-year quality promise
              </div>
            </div>
          </div>
        </div>
        <section className="mt-24 border-t border-[#d9d0c0] pt-14">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">Complete the line</p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.05em]">You may also like</h2>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                isWishlisted={wishlist.includes(item.id)}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>
      </section>
    </Shell>
  );
}
