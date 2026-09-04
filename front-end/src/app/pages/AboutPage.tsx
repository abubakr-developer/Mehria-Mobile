import PageReveal from "../components/Reuseable/PageReveal";
import Image from "next/image";

export default function AboutPage() {
  return (
    <PageReveal>
      <main className="bg-[#F7F8FA] text-[#3C3837]">
        <section className="relative overflow-hidden bg-[#26649A]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/imagegs/products/case.webp"
              alt="Background"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>

          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00C2D1]/20 z-10" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#1C4B75]/40 z-10" />

          {/* Content */}
          <div className="relative z-20 mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
            <div className="max-w-3xl">
              <span className="mb-5 inline-block rounded-full bg-[#00C2D1] px-4 py-2 text-sm font-semibold text-white">
                Mehria Mobiles
              </span>

              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Your Trusted Mobile Wholesale Partner
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">
                Mehria Mobiles is a mobile phones and accessories wholesaler
                serving businesses and retailers from Kumboh Plaza, Multan Road,
                Lodhran.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-[#00C2D1]">
                Who We Are
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#1C4B75] sm:text-4xl">
                Mehria Mobiles
              </h2>

              <p className="mt-6 text-base leading-8 text-[#3C3837]/80">
                We are a dedicated mobile phones and accessories wholesaler
                based in Lodhran. Our goal is to make quality mobile products
                accessible to retailers and businesses through reliable supply,
                competitive wholesale pricing, and professional service.
              </p>

              <p className="mt-4 text-base leading-8 text-[#3C3837]/80">
                Located at Kumboh Plaza on Multan Road, Mehria Mobiles provides
                a convenient destination for businesses looking for mobile
                devices and essential accessories in one place.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00C2D1]/10">
                <svg
                  className="h-7 w-7 text-[#26649A]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M12 18h.01M8.2 21h7.6a2.2 2.2 0 002.2-2.2V5.2A2.2 2.2 0 0015.8 3H8.2A2.2 2.2 0 006 5.2v13.6A2.2 2.2 0 008.2 21z"
                  />
                </svg>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#1C4B75]">
                Built Around Your Business
              </h3>

              <p className="mt-4 leading-7 text-[#3C3837]/75">
                Whether you are a mobile retailer, reseller, or business
                customer, we focus on making your sourcing experience simple,
                dependable, and efficient.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-[#00C2D1]">
                What We Offer
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#1C4B75] sm:text-4xl">
                Everything You Need in One Place
              </h2>

              <p className="mt-4 leading-7 text-[#3C3837]/70">
                We provide mobile products and accessories designed to support
                the needs of retailers and wholesale customers.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-[#F7F8FA] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#26649A] text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="10"
                      height="18"
                      x="7"
                      y="3"
                      rx="2"
                      strokeWidth={1.8}
                    />
                    <path
                      strokeLinecap="round"
                      strokeWidth={1.8}
                      d="M11 18h2"
                    />
                  </svg>
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#1C4B75]">
                  Mobile Phones
                </h3>

                <p className="mt-3 leading-7 text-[#3C3837]/70">
                  A selection of mobile phones suitable for retailers and
                  businesses looking to source devices at wholesale prices.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F7F8FA] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#26649A] text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M9 7V5a3 3 0 013-3h0a3 3 0 013 3v2m-8 0h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z"
                    />
                  </svg>
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#1C4B75]">
                  Mobile Accessories
                </h3>

                <p className="mt-3 leading-7 text-[#3C3837]/70">
                  Essential accessories including chargers, cases, earbuds, and
                  other products that complement your mobile business.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F7F8FA] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#26649A] text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M3 21h18M5 21V9l7-4 7 4v12M9 21v-6h6v6M9 10h.01M12 10h.01M15 10h.01"
                    />
                  </svg>
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#1C4B75]">
                  Wholesale Supply
                </h3>

                <p className="mt-3 leading-7 text-[#3C3837]/70">
                  Reliable wholesale sourcing for retailers and businesses,
                  helping you keep your inventory ready for your customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F8FA]">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-[#00C2D1]">
                Why Choose Us
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#1C4B75] sm:text-4xl">
                A Partner You Can Rely On
              </h2>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Quality Products",
                  text: "We focus on providing dependable mobile products and accessories for your business.",
                },
                {
                  title: "Competitive Pricing",
                  text: "Wholesale-focused pricing helps retailers maintain competitive margins.",
                },
                {
                  title: "Wide Selection",
                  text: "Find mobile devices and essential accessories across different product categories.",
                },
                {
                  title: "Reliable Service",
                  text: "We aim to build lasting relationships with our customers through professional service.",
                },
              ].map((item: { title: string; text: string }) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5"
                >
                  <div className="h-1.5 w-10 rounded-full bg-[#00C2D1]" />

                  <h3 className="mt-6 text-lg font-bold text-[#1C4B75]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#3C3837]/70">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1C4B75]">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <span className="text-sm font-bold uppercase tracking-widest text-[#00C2D1]">
                  Let&apos;s Work Together
                </span>

                <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                  Looking for a reliable wholesale mobile partner?
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-white/75">
                  Get in touch with Mehria Mobiles and discover how we can
                  support your mobile business.
                </p>
              </div>

              <a
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#00C2D1] px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-[#1C4B75]"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageReveal>
  );
}