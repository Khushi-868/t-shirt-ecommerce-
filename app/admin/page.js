import Shell from '@/components/Shell';
import { ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard',
};

export default function AdminPage() {
  return (
    <Shell>
      <section className="mx-auto flex min-h-[500px] max-w-[800px] flex-col items-center justify-center px-5 text-center">
        <ShieldAlert size={40} className="text-[#b68b35] mb-6" />
        <h1 className="font-serif text-4xl tracking-[-0.05em]">Admin Area</h1>
        <p className="mt-4 text-sm text-[#7d827c]">
          You do not have permission to view this page. Please sign in with an administrator account.
        </p>
      </section>
    </Shell>
  );
}
