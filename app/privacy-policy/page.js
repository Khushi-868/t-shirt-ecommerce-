import Shell from '@/components/Shell';

export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-[700px] px-5 py-20 lg:py-28">
        <h1 className="font-serif text-5xl tracking-[-0.06em]">Privacy Policy</h1>
        <div className="prose prose-sm mt-10 max-w-none text-[#5e6761] prose-headings:font-serif prose-headings:text-[#202c2f]">
          <p>Last updated: October 2023</p>
          <h2>1. Introduction</h2>
          <p>This Privacy Policy explains how Threadline collects, uses, and discloses information about you when you access or use our website.</p>
          <h2>2. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, place an order, or communicate with us.</p>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, and to process your transactions.</p>
          <h2>4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@threadline.com.</p>
        </div>
      </section>
    </Shell>
  );
}
