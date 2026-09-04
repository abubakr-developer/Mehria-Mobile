import Image from "next/image";
import Link from "next/link";
import PageReveal from "../components/Reuseable/PageReveal";

const galleryItems = [
  {
    title: "Premium Mobile Covers",
    category: "Accessories",
    image: "/imagegs/products/1.jfif",
  },
  {
    title: "Smart Audio Devices",
    category: "Audio",
    image: "/imagegs/products/2.jfif",
  },
  {
    title: "Fast Charging Essentials",
    category: "Chargers",
    image: "/imagegs/products/3.jfif",
  },
  {
    title: "Screen Protection",
    category: "Protection",
    image: "/imagegs/products/6.jfif",
  },
  {
    title: "Popular Mobile Accessories",
    category: "Best Sellers",
    image: "/imagegs/products/2.jfif",
  },
  {
    title: "Retail Ready Collection",
    category: "Wholesale",
    image: "/imagegs/products/1.jfif",
  },
];

export default function GalleryPage() {
  return (
    <PageReveal>
      <main className="bg-[#F7F8FA] text-[#3C3837]">
      <section className="bg-[#26649A]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-[#00C2D1] px-4 py-2 text-sm font-semibold text-white">
                Gallery
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Explore our mobile accessories collection
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
                Discover the latest mobile phone essentials, chargers, covers,
                and accessories we proudly offer to retailers and customers in
                Lodhran.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-[#1C4B75] transition hover:bg-[#00C2D1] hover:text-white"
              >
                View Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#00C2D1]">
              Our Collection
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#1C4B75] sm:text-4xl">
              Best selling products
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {galleryItems.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  unoptimized
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#26649A]/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {item.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1C4B75]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#3C3837]/70">
                  High-quality mobile essentials selected to support retailers and
                  everyday customers looking for dependable accessories.
                </p>

                <Link
                  href="/products"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#26649A] transition hover:text-[#00C2D1]"
                >
                  Explore more
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#1C4B75]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#00C2D1]">
                Ready to Shop?
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Visit our store for the latest mobile essentials
              </h2>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#00C2D1] px-7 py-3.5 font-semibold text-[#3C3837] transition hover:bg-white"
            >
              Book a Visit
            </Link>
          </div>
        </div>
      </section>
      </main>
    </PageReveal>
  );
}
