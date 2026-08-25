import { MapPin } from "lucide-react";

export default function VisitCTA() {
  return (
    <section className="max-w-[1240px] mx-auto px-8 pb-20 lg:pb-24">
      <div className="relative overflow-hidden bg-[#3C3837] rounded-[28px] px-8 py-14 lg:px-16 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-9">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#26649A]/[0.18] blur-[80px]" />
        <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-[#00C2D1]/[0.10] blur-[70px]" />

        <div className="relative max-w-lg text-center lg:text-left">
          <h2
            className="text-[26px] lg:text-[32px] font-semibold text-white leading-tight tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Prefer to see it in person?
          </h2>
          <p className="text-[14px] text-white/55 mt-3 leading-relaxed">
            Visit our shop in Main Bazaar, Lodhran — check the quality
            yourself before you buy, seven days a week.
          </p>
        </div>

        <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-sm font-semibold px-6 py-3.5 rounded-xl transition-all shadow-[0_8px_20px_rgba(0,194,209,0.25)]"
          >
            <MapPin size={16} />
            Get directions
          </a>
          <a
            href="tel:+923001234567"
            className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/35 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            Call us
          </a>
        </div>
      </div>
    </section>
  );
}