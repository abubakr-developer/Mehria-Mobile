export default function ContactPage() {
  return (
    <main className="bg-[#F7F8FA] text-[#3C3837]">
      <section className="bg-[#26649A]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-[#00C2D1] px-4 py-2 text-sm font-semibold text-white">
              Get In Touch
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Contact Mehria Mobiles
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              Have a question about our mobile phones, accessories, or
              wholesale products? Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
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
                  d="M3 5.5A2.5 2.5 0 015.5 3H8l2 5-2.5 1.5a12 12 0 005.5 5.5L14.5 12l5 2v2.5a2.5 2.5 0 01-2.5 2.5C10.925 19 5 13.075 5 6.5A2.5 2.5 0 017.5 4"
                />
              </svg>
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#1C4B75]">
              Call Us
            </h2>

            <p className="mt-2 text-sm text-[#3C3837]/70">
              Speak with our team about your requirements.
            </p>

            <a
              href="tel:+923001234567"
              className="mt-4 inline-block font-semibold text-[#26649A] hover:text-[#00C2D1]"
            >
              +92 300 1234567
            </a>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
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
                  d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#1C4B75]">
              Email Us
            </h2>

            <p className="mt-2 text-sm text-[#3C3837]/70">
              Send us your questions and wholesale inquiries.
            </p>

            <a
              href="mailto:mehriamobiles@gmail.com"
              className="mt-4 inline-block font-semibold text-[#26649A] hover:text-[#00C2D1]"
            >
              mehriamobiles@gmail.com
            </a>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
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
                  d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"
                />
                <circle cx="12" cy="9" r="2.5" strokeWidth={1.8} />
              </svg>
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#1C4B75]">
              Visit Us
            </h2>

            <p className="mt-2 text-sm text-[#3C3837]/70">
              Visit our store for mobile phones and accessories.
            </p>

            <p className="mt-4 font-semibold text-[#26649A]">
              Kumboh Plaza, Multan Road, Lodhran
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-12">
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 lg:grid-cols-2">
          <div className="p-8 sm:p-10 lg:p-12">
            <span className="text-sm font-bold uppercase tracking-widest text-[#00C2D1]">
              Send a Message
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#1C4B75]">
              Let's Talk About Your Requirements
            </h2>

            <p className="mt-4 leading-7 text-[#3C3837]/70">
              Fill out the form and our team can get back to you regarding
              mobile phones, accessories, or wholesale orders.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[#3C3837]"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-200 bg-[#F7F8FA] px-4 py-3 outline-none transition focus:border-[#00C2D1] focus:ring-2 focus:ring-[#00C2D1]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#3C3837]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-200 bg-[#F7F8FA] px-4 py-3 outline-none transition focus:border-[#00C2D1] focus:ring-2 focus:ring-[#00C2D1]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-[#3C3837]"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="+92"
                  className="w-full rounded-xl border border-gray-200 bg-[#F7F8FA] px-4 py-3 outline-none transition focus:border-[#00C2D1] focus:ring-2 focus:ring-[#00C2D1]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-[#3C3837]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#F7F8FA] px-4 py-3 outline-none transition focus:border-[#00C2D1] focus:ring-2 focus:ring-[#00C2D1]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#26649A] px-6 py-3.5 font-semibold text-white transition hover:bg-[#1C4B75]"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="flex min-h-[500px] flex-col bg-[#1C4B75] p-8 text-white sm:p-10 lg:p-12">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-[#00C2D1]">
                Find Us
              </span>

              <h2 className="mt-3 text-3xl font-bold">
                Visit Mehria Mobiles
              </h2>

              <p className="mt-5 leading-7 text-white/75">
                We're located at Kumboh Plaza on Multan Road in Lodhran. Visit
                us for your mobile phone and accessory requirements.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00C2D1]">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"
                    />
                    <circle cx="12" cy="9" r="2.5" strokeWidth={1.8} />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold">Our Location</h3>

                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Kumboh Plaza, Multan Road
                    <br />
                    Lodhran, Punjab, Pakistan
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-6">
                <h3 className="font-semibold">Business Hours</h3>

                <p className="mt-2 text-sm text-white/70">
                  Monday – Saturday
                  <br />
                  9:00 AM – 8:00 PM
                </p>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
                  Map Preview — Demo Location
              </div>

              <iframe
                src="https://www.google.com/maps?q=Multan+Fort,+Multan,+Pakistan&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#00C2D1] px-6 py-3.5 font-semibold text-white transition hover:bg-white hover:text-[#1C4B75]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#26649A]">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center sm:px-8 lg:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to discuss your wholesale requirements?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-white/75">
            Contact Mehria Mobiles today and let us help you find the right
            products for your business.
          </p>
        </div>
      </section>
    </main>
  );
}