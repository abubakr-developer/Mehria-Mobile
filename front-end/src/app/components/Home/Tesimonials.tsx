import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Raza",
    text: "Best mobile accessories shop in Lodhran. Genuine products and the charger I bought is still working great after months.",
  },
  {
    name: "Sana Fatima",
    text: "Ordered a phone case on WhatsApp, delivered same day. Very responsive and honest pricing.",
  },
  {
    name: "Bilal Hussain",
    text: "Their screen protector installation is neat, no bubbles at all. Been a regular customer for over a year.",
  },
];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function Testimonials() {
  return (
    <section className="max-w-[1240px] mx-auto px-8 py-20 lg:py-24">
      <div className="text-center mb-12">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#26649A] uppercase mb-2">Reviews</p>
        <h2
          className="text-[28px] lg:text-[32px] font-semibold tracking-tight text-[#3C3837]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          What Lodhran says about us
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white border border-[#3C3837]/[0.06] rounded-2xl p-6 hover:border-[#26649A]/20 transition-colors"
          >
            <div className="flex items-center gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="#00C2D1" strokeWidth={0} />
              ))}
            </div>
            <p className="text-[13.5px] text-[#3C3837]/65 leading-relaxed mb-5">"{t.text}"</p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#26649A]/10 flex items-center justify-center text-[11px] font-semibold text-[#26649A]">
                {initials(t.name)}
              </div>
              <p className="text-[13px] font-semibold text-[#3C3837]">{t.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}