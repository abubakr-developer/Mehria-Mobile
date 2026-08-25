import { BadgeCheck, Truck, Banknote, RotateCcw } from "lucide-react";

const trustPoints = [
  { icon: BadgeCheck, label: "100% Genuine Products" },
  { icon: Truck, label: "Same-Day Delivery in Lodhran" },
  { icon: Banknote, label: "Cash on Delivery" },
  { icon: RotateCcw, label: "Easy Exchange" },
];

export default function TrustStrip() {
  return (
    <div className="border-y border-[#3C3837]/[0.06] bg-white">
      <div className="max-w-[1240px] mx-auto px-8 py-5 flex flex-wrap items-center justify-center lg:justify-between gap-x-10 gap-y-3">
        {trustPoints.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5">
            <item.icon size={16} className="text-[#26649A]" />
            <span className="text-[13px] font-medium text-[#3C3837]/70">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}