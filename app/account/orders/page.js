'use client';

import Link from 'next/link';
import { Package, ArrowLeft } from 'lucide-react';
import Shell from '@/components/Shell';

export default function OrdersPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-[1200px] px-5 py-12 lg:py-16">
        <Link href="/account" className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#7d827c] hover:text-[#b68b35]">
          <ArrowLeft size={14} /> Back to account
        </Link>
        <div className="mb-12 border-b border-[#d9d0c0] pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">Your history</p>
          <h1 className="mt-3 font-serif text-5xl tracking-[-0.06em]">Orders</h1>
        </div>

        <div className="flex min-h-[300px] flex-col items-center justify-center border border-[#d9d0c0] bg-[#fdfaf5] p-10 text-center">
          <Package size={30} strokeWidth={1.2} className="text-[#b68b35]" />
          <h2 className="mt-5 font-serif text-2xl">No orders yet</h2>
          <p className="mt-2 max-w-sm text-sm text-[#7d827c]">When you make a purchase, it will appear here so you can track its status.</p>
          <Link
            href="/products"
            className="mt-8 border border-[#202c2f] px-6 py-3 text-xs uppercase tracking-[0.16em] hover:bg-[#202c2f] hover:text-[#f4f0e8] transition"
          >
            Start shopping
          </Link>
        </div>
      </section>
    </Shell>
  );
}
