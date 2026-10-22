'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (email) {
      setDone(true);
      setEmail('');
    }
  };

  return (
    <footer className="mt-24 bg-[#202c2f] text-[#ede6d8]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr_1.4fr] lg:px-10">
        <div>
          <Link href="/" className="font-serif text-3xl tracking-[-0.05em]">
            threadline<span className="text-[#c9a24d]">.</span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-6 text-[#b6b9ae]">
            A considered wardrobe, built around the pieces you reach for without thinking.
          </p>
        </div>
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c9a24d]">Explore</h3>
          <div className="mt-5 grid gap-3 text-sm">
            <Link href="/products">Shop all</Link>
            <Link href="/category/tees">Tees</Link>
            <Link href="/about">Our standard</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c9a24d]">Care</h3>
          <div className="mt-5 grid gap-3 text-sm">
            <Link href="/account/orders">Order status</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <span className="text-[#b6b9ae]">Mon–Fri, 9–5 EST</span>
          </div>
        </div>
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c9a24d]">The long view</h3>
          <p className="mt-5 text-sm leading-6 text-[#b6b9ae]">Notes on fabric, fit, and making things last.</p>
          {done ? (
            <div className="mt-5 flex items-center gap-2 text-sm text-[#c9a24d]">
              <Check size={15} /> You are on the list.
            </div>
          ) : (
            <form onSubmit={subscribe} className="mt-5 flex border-b border-[#68716b]">
              <input
                data-testid="input-newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#818a82]"
              />
              <button data-testid="button-newsletter" aria-label="Subscribe">
                <ArrowRight size={17} />
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] justify-between border-t border-[#3e4a49] px-5 py-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#818a82] lg:px-10">
        <span>© 2024 Threadline studio</span>
        <span className="hidden sm:block">Made slowly in New York</span>
      </div>
    </footer>
  );
}
