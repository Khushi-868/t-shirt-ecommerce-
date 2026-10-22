'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, X, Minus, Plus, ArrowRight } from 'lucide-react';
import Shell from '@/components/Shell';
import { useStore } from '@/context/StoreContext';
import { money } from '@/lib/products';

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useStore();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  
  const subtotal = cart.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);
  const shipping = subtotal >= 120 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping - discount;
  
  const applyCoupon = (e) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'THREAD10') {
      setDiscount(subtotal * 0.1);
    }
  };

  return (
    <Shell>
      <section className="mx-auto max-w-[1200px] px-5 py-12 lg:py-16">
        <div className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">Your selection</p>
          <h1 className="mt-3 font-serif text-5xl tracking-[-0.06em]">
            Your bag <span className="text-2xl text-[#7d827c]">({cart.length})</span>
          </h1>
        </div>
        
        {cart.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center border-y border-[#d9d0c0] text-center">
            <ShoppingBag size={29} strokeWidth={1.2} className="text-[#b68b35]" />
            <h2 className="mt-5 font-serif text-3xl">Your bag is quiet.</h2>
            <p className="mt-2 text-sm text-[#7d827c]">The good kind of empty. Add something you will wear often.</p>
            <Link
              href="/products"
              className="mt-7 bg-[#202c2f] px-5 py-3 text-xs uppercase tracking-[0.16em] text-[#f4f0e8]"
            >
              Keep shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            <div className="divide-y divide-[#d9d0c0] border-y border-[#d9d0c0]">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 py-5">
                  <img src={item.product.image} alt={item.product.name} className="h-32 w-24 object-cover md:h-40 md:w-32" />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-3">
                      <div>
                        <Link href={`/products/${item.product.slug}`} className="text-sm font-medium">
                          {item.product.name}
                        </Link>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.13em] text-[#7d827c]">
                          {item.color} · Size {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item)}
                        data-testid={`button-remove-${item.product.id}`}
                        aria-label="Remove item"
                      >
                        <X size={17} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#c8c0b2]">
                        <button onClick={() => changeQuantity(item, item.quantity - 1)} className="px-2 py-1.5">
                          <Minus size={13} />
                        </button>
                        <span className="w-7 text-center text-xs">{item.quantity}</span>
                        <button onClick={() => changeQuantity(item, item.quantity + 1)} className="px-2 py-1.5">
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="text-sm">{money((item.product.salePrice || item.product.price) * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <aside className="h-fit bg-[#e9e3d7] p-6 md:p-8">
              <h2 className="font-serif text-2xl">Summary</h2>
              <div className="mt-7 grid gap-4 border-b border-[#c8c0b2] pb-6 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{shipping ? money(shipping) : 'Complimentary'}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#b68b35]">
                    <span>Threadline 10</span>
                    <span>-{money(discount)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between py-6 text-lg">
                <span>Total</span>
                <span>{money(total)}</span>
              </div>
              <form onSubmit={applyCoupon} className="flex border-b border-[#202c2f]">
                <input
                  data-testid="input-coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="min-w-0 flex-1 bg-transparent py-3 text-xs outline-none"
                />
                <button data-testid="button-apply-coupon" className="text-xs uppercase tracking-[0.13em]">
                  Apply
                </button>
              </form>
              <Link
                href="/checkout"
                data-testid="link-checkout"
                className="mt-5 flex items-center justify-center gap-3 bg-[#202c2f] py-4 text-xs uppercase tracking-[0.17em] text-[#f4f0e8] hover:bg-[#b68b35]"
              >
                Checkout <ArrowRight size={15} />
              </Link>
              <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-[#7d827c]">
                Secure, simple, no surprises
              </p>
            </aside>
          </div>
        )}
      </section>
    </Shell>
  );
}
