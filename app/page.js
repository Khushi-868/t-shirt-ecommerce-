'use client';

import Link from 'next/link';
import Shell from '@/components/Shell';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';
import { categories } from '@/lib/products';
import {
  ArrowRight, Package, RefreshCw, ShieldCheck, Truck,
} from 'lucide-react';

export default function HomePage() {
  const { products, wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <Shell>
      <div>
        {/* Hero */}
        <section className="relative min-h-[620px] overflow-hidden bg-[#c9bfae] md:min-h-[680px]">
          <img
            src="https://images.pexels.com/photos/6311604/pexels-photo-6311604.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Model wearing a relaxed Threadline tee"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#202c2f]/75 via-[#202c2f]/15 to-transparent" />
          <div className="relative mx-auto flex min-h-[620px] max-w-[1440px] items-end px-5 pb-16 md:min-h-[680px] md:items-center md:pb-0 lg:px-10">
            <div className="max-w-xl text-[#f4f0e8]">
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.26em] text-[#d8bd77]">New collection · FW24</p>
              <h1 className="font-serif text-6xl leading-[0.9] tracking-[-0.06em] md:text-8xl">
                Wear the<br /><em className="text-[#d8bd77]">quiet</em> well.
              </h1>
              <p className="mt-7 max-w-sm text-sm leading-6 text-[#e5dfd3]">
                Essential pieces with a point of view. Made from fabrics that reward a closer look.
              </p>
              <Link
                href="/products"
                data-testid="link-hero-shop"
                className="mt-9 inline-flex items-center gap-3 border border-[#e5dfd3] px-5 py-3 text-xs uppercase tracking-[0.18em] transition hover:bg-[#f4f0e8] hover:text-[#202c2f]"
              >
                Shop the collection <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">The edit</p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.05em] md:text-5xl">Pieces in rotation</h2>
            </div>
            <Link href="/products" className="hidden items-center gap-2 text-xs uppercase tracking-[0.16em] md:flex">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-5">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>

        {/* Brand philosophy */}
        <section className="bg-[#ded5c5]">
          <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
            <div className="flex min-h-[480px] flex-col justify-center px-5 py-16 md:px-16 lg:px-24">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">Our standard</p>
              <h2 className="mt-5 max-w-md font-serif text-5xl leading-[0.98] tracking-[-0.06em]">Good clothes get better with time.</h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#4c5753]">
                We choose the long way around: better yarns, honest construction, and silhouettes that leave room for a life to happen.
              </p>
              <Link href="/about" className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em]">
                Read our approach <ArrowRight size={15} />
              </Link>
            </div>
            <div className="min-h-[420px] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Natural cotton texture and shirt"
                className="h-full w-full object-cover grayscale-[0.2]"
              />
            </div>
          </div>
        </section>

        {/* Shop by category */}
        <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">Find your line</p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.05em] md:text-5xl">Shop by feeling</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {categories.map((category) => (
              <Link
                href={`/category/${category.slug}`}
                key={category.slug}
                className="group relative aspect-[0.76] overflow-hidden bg-[#c9bfae]"
              >
                <img
                  src={category.image}
                  alt={category.label}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#202c2f]/25 group-hover:bg-[#202c2f]/40" />
                <div className="absolute bottom-5 left-5 text-[#f4f0e8]">
                  <p className="font-serif text-2xl">{category.label}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#e5dfd3]">{category.note}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust signals */}
        <section className="border-y border-[#d9d0c0] bg-[#e9e3d7] py-14">
          <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-8 px-5 text-center md:grid-cols-4">
            <div>
              <ShieldCheck className="mx-auto text-[#b68b35]" size={23} strokeWidth={1.4} />
              <p className="mt-4 text-xs uppercase tracking-[0.13em]">Thoughtful materials</p>
            </div>
            <div>
              <Truck className="mx-auto text-[#b68b35]" size={23} strokeWidth={1.4} />
              <p className="mt-4 text-xs uppercase tracking-[0.13em]">Fast, considered delivery</p>
            </div>
            <div>
              <RefreshCw className="mx-auto text-[#b68b35]" size={23} strokeWidth={1.4} />
              <p className="mt-4 text-xs uppercase tracking-[0.13em]">Easy returns</p>
            </div>
            <div>
              <Package className="mx-auto text-[#b68b35]" size={23} strokeWidth={1.4} />
              <p className="mt-4 text-xs uppercase tracking-[0.13em]">Packed without plastic</p>
            </div>
          </div>
        </section>
      </div>
    </Shell>
  );
}
