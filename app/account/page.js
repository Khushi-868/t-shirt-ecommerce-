'use client';

import Link from 'next/link';
import { Package, UserRound, MapPin, CreditCard, LogOut } from 'lucide-react';
import Shell from '@/components/Shell';

export default function AccountPage() {
  const logout = (e) => {
    e.preventDefault();
    window.location.href = '/login';
  };

  return (
    <Shell>
      <section className="mx-auto max-w-[1200px] px-5 py-12 lg:py-16">
        <div className="mb-12 flex items-end justify-between border-b border-[#d9d0c0] pb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">Your profile</p>
            <h1 className="mt-3 font-serif text-5xl tracking-[-0.06em]">Account</h1>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#7d827c] hover:text-[#b68b35]">
            <LogOut size={14} /> Sign out
          </button>
        </div>

        <div className="grid gap-12 md:grid-cols-[250px_1fr]">
          <nav className="flex flex-col gap-4 text-sm">
            <Link href="/account" className="font-medium text-[#b68b35]">Profile overview</Link>
            <Link href="/account/orders" className="text-[#7d827c] hover:text-[#202c2f]">Order history</Link>
            <Link href="/wishlist" className="text-[#7d827c] hover:text-[#202c2f]">Wishlist</Link>
          </nav>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-[#c8c0b2] p-6 transition hover:border-[#202c2f]">
              <UserRound size={20} className="mb-4 text-[#b68b35]" />
              <h3 className="font-serif text-xl">Personal details</h3>
              <p className="mt-2 text-sm text-[#7d827c]">Jane Doe<br/>jane@example.com</p>
              <button className="mt-5 border-b border-[#202c2f] pb-1 text-xs uppercase tracking-[0.16em]">Edit details</button>
            </div>
            
            <div className="border border-[#c8c0b2] p-6 transition hover:border-[#202c2f]">
              <MapPin size={20} className="mb-4 text-[#b68b35]" />
              <h3 className="font-serif text-xl">Addresses</h3>
              <p className="mt-2 text-sm text-[#7d827c]">1 saved address</p>
              <button className="mt-5 border-b border-[#202c2f] pb-1 text-xs uppercase tracking-[0.16em]">Manage</button>
            </div>
            
            <div className="border border-[#c8c0b2] p-6 transition hover:border-[#202c2f]">
              <CreditCard size={20} className="mb-4 text-[#b68b35]" />
              <h3 className="font-serif text-xl">Payment methods</h3>
              <p className="mt-2 text-sm text-[#7d827c]">Ending in 4242</p>
              <button className="mt-5 border-b border-[#202c2f] pb-1 text-xs uppercase tracking-[0.16em]">Manage</button>
            </div>

            <Link href="/account/orders" className="border border-[#c8c0b2] p-6 transition hover:border-[#202c2f]">
              <Package size={20} className="mb-4 text-[#b68b35]" />
              <h3 className="font-serif text-xl">Recent orders</h3>
              <p className="mt-2 text-sm text-[#7d827c]">No recent orders found</p>
              <span className="mt-5 inline-block border-b border-[#202c2f] pb-1 text-xs uppercase tracking-[0.16em]">View history</span>
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
