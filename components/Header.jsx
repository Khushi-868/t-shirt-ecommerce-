'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Menu, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Header() {
  const { cart, wishlist } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const submitSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      <div className="bg-[#202c2f] px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#ede6d8]">
        Complimentary delivery on orders over $120
      </div>
      <header className="sticky top-0 z-40 border-b border-[#d9d0c0] bg-[#f4f0e8]/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-5 px-5 lg:px-10">
          <button
            data-testid="button-mobile-menu"
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <Link
            href="/"
            data-testid="link-logo"
            className="font-serif text-[26px] tracking-[-0.05em] text-[#202c2f]"
          >
            threadline<span className="text-[#b68b35]">.</span>
          </Link>
          <nav
            className={`${
              open ? 'flex' : 'hidden'
            } absolute left-0 top-[72px] w-full flex-col gap-5 border-b border-[#d9d0c0] bg-[#f4f0e8] px-5 py-6 md:static md:flex md:w-auto md:flex-row md:border-0 md:bg-transparent md:p-0`}
            aria-label="Primary"
          >
            <Link href="/products" className="text-xs uppercase tracking-[0.18em] hover:text-[#b68b35]">Shop all</Link>
            <Link href="/category/tees" className="text-xs uppercase tracking-[0.18em] hover:text-[#b68b35]">Tees</Link>
            <Link href="/category/field-notes" className="text-xs uppercase tracking-[0.18em] hover:text-[#b68b35]">Field notes</Link>
            <Link href="/about" className="text-xs uppercase tracking-[0.18em] hover:text-[#b68b35]">Our standard</Link>
          </nav>
          <div className="flex items-center gap-4">
            <form onSubmit={submitSearch} className="hidden items-center border-b border-[#202c2f] md:flex">
              <Search size={15} strokeWidth={1.6} />
              <input
                data-testid="input-header-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-20 bg-transparent px-2 py-1 text-xs outline-none placeholder:text-[#7d827c]"
              />
            </form>
            <Link href="/account" data-testid="link-account" aria-label="Account" className="hidden sm:block">
              <UserRound size={19} strokeWidth={1.6} />
            </Link>
            <Link href="/wishlist" data-testid="link-wishlist" aria-label="Wishlist" className="relative">
              <Heart size={19} strokeWidth={1.6} />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b68b35] px-1 font-mono text-[9px] text-[#f4f0e8]">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" data-testid="link-cart" aria-label="Shopping bag" className="relative">
              <ShoppingBag size={19} strokeWidth={1.6} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b68b35] px-1 font-mono text-[9px] text-[#f4f0e8]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
