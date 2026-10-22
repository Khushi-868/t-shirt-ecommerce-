'use client';

import { useState } from 'react';
import Link from 'next/link';
import Shell from '@/components/Shell';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    // Simulate login for demo purposes
    window.location.href = '/account';
  };

  return (
    <Shell>
      <section className="mx-auto flex min-h-[500px] max-w-[500px] flex-col justify-center px-5 py-20 text-center md:min-h-[600px]">
        <h1 className="font-serif text-4xl tracking-[-0.05em]">Welcome back.</h1>
        <p className="mt-4 text-sm text-[#7d827c]">Sign in to access your orders and saved items.</p>
        
        <form onSubmit={submit} className="mt-10 flex flex-col gap-5 text-left">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="line-input"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="line-input"
          />
          <button
            type="submit"
            className="mt-4 bg-[#202c2f] py-4 text-xs uppercase tracking-[0.17em] text-[#f4f0e8] hover:bg-[#b68b35]"
          >
            Sign in
          </button>
        </form>
        
        <div className="mt-8 text-xs text-[#7d827c]">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#202c2f] underline underline-offset-4 hover:text-[#b68b35]">
            Create one
          </Link>
        </div>
      </section>
    </Shell>
  );
}
