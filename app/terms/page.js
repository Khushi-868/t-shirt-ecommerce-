import Shell from '@/components/Shell';

export const metadata = {
  title: 'Terms of Service',
};

export default function TermsPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-[700px] px-5 py-20 lg:py-28">
        <h1 className="font-serif text-5xl tracking-[-0.06em]">Terms of Service</h1>
        <div className="prose prose-sm mt-10 max-w-none text-[#5e6761] prose-headings:font-serif prose-headings:text-[#202c2f]">
          <p>Last updated: October 2023</p>
          <h2>1. Agreement to Terms</h2>
          <p>By accessing our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on Threadline's website for personal, non-commercial transitory viewing only.</p>
          <h2>3. Disclaimer</h2>
          <p>The materials on Threadline's website are provided on an 'as is' basis. We make no warranties, expressed or implied.</p>
          <h2>4. Limitations</h2>
          <p>In no event shall Threadline or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>
        </div>
      </section>
    </Shell>
  );
}
