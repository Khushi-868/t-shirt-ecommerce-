'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, CreditCard, LockKeyhole } from 'lucide-react';
import Shell from '@/components/Shell';
import { useStore } from '@/context/StoreContext';
import { money } from '@/lib/products';

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const [placed, setPlaced] = useState(false);
  
  const submit = (e) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };
  
  if (placed) {
    return (
      <Shell>
        <section className="mx-auto flex min-h-[560px] max-w-[700px] flex-col items-center justify-center px-5 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#b68b35] text-[#f4f0e8]">
            <Check size={30} />
          </div>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">Order confirmed</p>
          <h1 className="mt-3 font-serif text-5xl tracking-[-0.06em]">Good choice.</h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#5e6761]">
            Your Threadline pieces are being prepared with care. A confirmation is on its way to your inbox.
          </p>
          <Link
            href="/products"
            className="mt-8 bg-[#202c2f] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#f4f0e8]"
          >
            Continue shopping
          </Link>
        </section>
      </Shell>
    );
  }
  
  return (
    <Shell>
      <section className="mx-auto max-w-[1200px] px-5 py-12 lg:py-16">
        <div className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">Almost there</p>
          <h1 className="mt-3 font-serif text-5xl tracking-[-0.06em]">Checkout</h1>
        </div>
        <form onSubmit={submit} className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-9">
            <fieldset>
              <legend className="font-serif text-2xl">Contact</legend>
              <div className="mt-5 grid gap-4">
                <input required data-testid="input-checkout-email" type="email" placeholder="Email address" className="line-input" />
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-serif text-2xl">Delivery</legend>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <input required data-testid="input-checkout-name" placeholder="Full name" className="line-input md:col-span-2" />
                <input required placeholder="Address" className="line-input md:col-span-2" />
                <input required placeholder="City" className="line-input" />
                <input required placeholder="Postal code" className="line-input" />
                <select className="line-input md:col-span-2" defaultValue="US">
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-serif text-2xl">Payment</legend>
              <div className="mt-5 border border-[#c8c0b2] bg-[#e9e3d7] p-5">
                <div className="flex items-center gap-3 text-sm">
                  <CreditCard size={18} className="text-[#b68b35]" /> Card details
                </div>
                <div className="mt-4 grid gap-3">
                  <input required placeholder="Card number" className="line-input bg-[#f4f0e8]" />
                  <div className="grid grid-cols-2 gap-3">
                    <input required placeholder="MM / YY" className="line-input bg-[#f4f0e8]" />
                    <input required placeholder="CVC" className="line-input bg-[#f4f0e8]" />
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-2 text-[10px] text-[#7d827c]">
                  <LockKeyhole size={12} /> This is a demo — no payment will be processed.
                </p>
              </div>
            </fieldset>
          </div>
          <aside className="h-fit bg-[#e9e3d7] p-6 md:p-8">
            <h2 className="font-serif text-2xl">Your order</h2>
            {cart.length === 0 ? (
              <p className="mt-5 text-sm text-[#7d827c]">Your bag is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="mt-5 flex gap-3 text-sm">
                    <img src={item.product.image} alt="" className="h-16 w-12 object-cover" />
                    <div className="flex-1">
                      <p>{item.product.name}</p>
                      <p className="font-mono text-[10px] text-[#7d827c]">
                        {item.quantity} · {item.size}
                      </p>
                    </div>
                    <span>{money((item.product.salePrice || item.product.price) * item.quantity)}</span>
                  </div>
                ))}
                <button
                  data-testid="button-place-order"
                  className="mt-8 w-full bg-[#202c2f] py-4 text-xs uppercase tracking-[0.17em] text-[#f4f0e8] hover:bg-[#b68b35]"
                >
                  Place order
                </button>
              </>
            )}
          </aside>
        </form>
      </section>
    </Shell>
  );
}
