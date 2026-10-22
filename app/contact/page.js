import Shell from '@/components/Shell';

export const metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-[600px] px-5 py-20 lg:py-28">
        <h1 className="font-serif text-5xl tracking-[-0.06em]">Get in touch.</h1>
        <p className="mt-5 text-sm leading-6 text-[#5e6761]">
          Questions about sizing, an existing order, or just want to talk fabric? We're here.
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-serif text-xl">Customer Care</h3>
            <p className="mt-3 text-sm text-[#7d827c]">help@threadline.com</p>
            <p className="text-sm text-[#7d827c]">Mon–Fri, 9am–5pm EST</p>
          </div>
          <div>
            <h3 className="font-serif text-xl">Press & Wholesale</h3>
            <p className="mt-3 text-sm text-[#7d827c]">studio@threadline.com</p>
          </div>
        </div>
        <form className="mt-16 grid gap-6 border-t border-[#d9d0c0] pt-12">
          <h2 className="font-serif text-2xl">Send a message</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Name" className="line-input" />
            <input required type="email" placeholder="Email" className="line-input" />
          </div>
          <input required placeholder="Subject (Optional)" className="line-input" />
          <textarea required placeholder="Message" rows={4} className="line-input resize-none"></textarea>
          <button className="mt-2 w-fit bg-[#202c2f] px-8 py-3 text-xs uppercase tracking-[0.16em] text-[#f4f0e8] hover:bg-[#b68b35]">
            Send message
          </button>
        </form>
      </section>
    </Shell>
  );
}
