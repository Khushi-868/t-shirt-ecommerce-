import Link from 'next/link';
import Shell from '@/components/Shell';

export default function NotFoundPage() {
  return (
    <Shell>
      <section className="mx-auto flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">404 error</p>
        <h1 className="mt-3 font-serif text-5xl tracking-[-0.06em]">Page not found</h1>
        <p className="mt-5 text-sm text-[#7d827c]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 border-b border-[#202c2f] pb-1 text-xs uppercase tracking-[0.16em]"
        >
          Return home
        </Link>
      </section>
    </Shell>
  );
}
