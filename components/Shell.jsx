'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';

export default function Shell({ children }) {
  const { catalogError } = useStore();

  return (
    <div className="min-h-[100dvh] bg-[#f4f0e8] text-[#202c2f]">
      <Header />
      {catalogError && (
        <div className="bg-[#b9553d] px-5 py-2 text-center text-[10px] uppercase tracking-[0.16em] text-[#f4f0e8]">
          Live catalog unavailable — showing the saved preview catalog.
        </div>
      )}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
