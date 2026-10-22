import Shell from '@/components/Shell';

export const metadata = {
  title: 'Our Standard',
};

export default function AboutPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-[800px] px-5 py-20 lg:py-28 text-center md:text-left">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b68b35]">About Threadline</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.06em] md:text-6xl md:leading-none">
          The pieces you reach for without thinking.
        </h1>
        <div className="mt-10 grid gap-6 text-sm leading-7 text-[#5e6761] md:mt-16 md:grid-cols-2 md:gap-10">
          <div>
            <p>
              Threadline started with a simple question: why is it so hard to find a t-shirt that just works? The kind you don't have to adjust, that doesn't lose its shape after three washes, and that you instinctively pull from the top of the pile every morning.
            </p>
            <p className="mt-5">
              We spent two years developing our core fabrics before releasing a single piece. We visited mills, tested tensions, and washed our samples until they fell apart — just to see how long it would take.
            </p>
          </div>
          <div>
            <p>
              We don't do seasons or flash sales. We build a permanent collection of essentials, refining them incrementally based on how they actually live in the world. 
            </p>
            <p className="mt-5">
              Our clothes are cut a little looser, built a little tougher, and designed to age gracefully. Because the most sustainable garment is the one you wear until it's threadbare.
            </p>
          </div>
        </div>
      </section>
      <section className="min-h-[500px] overflow-hidden bg-[#c9bfae]">
        <img
          src="https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Close up of fabric texture"
          className="h-full w-full object-cover grayscale-[0.2]"
        />
      </section>
    </Shell>
  );
}
