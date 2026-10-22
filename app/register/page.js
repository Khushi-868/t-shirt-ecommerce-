'use client';

import { useState } from 'react';
import Link from 'next/link';
import Shell from '@/components/Shell';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    window.location.href = '/account';
  };

  return (
    <Shell>
      <section className="mx-auto flex min-h-[500px] max-w-[500px] flex-col justify-center px-5 py-20 text-center md:min-h-[600px]">
        <h1 className="font-serif text-4xl tracking-[-0.05em]">Join us.</h1>
        <p className="mt-4 text-sm text-[#7d827c]">Create an account to save your preferences and track orders.</p>
        
        <form onSubmit={submit} className="mt-10 flex flex-col gap-5 text-left">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="line-input"
          />
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
            Create account
          </button>
        </form>
        
        <div className="mt-8 text-xs text-[#7d827c]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#202c2f] underline underline-offset-4 hover:text-[#b68b35]">
            Sign in
          </Link>
        </div>
      </section>
    </Shell>
  );
}
