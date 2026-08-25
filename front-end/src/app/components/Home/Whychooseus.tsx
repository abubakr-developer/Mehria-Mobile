"use client";

import { motion } from "framer-motion";
import {
  Award,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Premium Quality",
    description:
      "Every piece is crafted with carefully selected materials and attention to detail, built to look beautiful and last for years.",
    icon: Award,
  },
  {
    number: "02",
    title: "Timeless Design",
    description:
      "We create elegant designs that complement modern interiors while maintaining a timeless character.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Built to Last",
    description:
      "From materials to finishing, quality is considered at every step to ensure durability and lasting comfort.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Customer First",
    description:
      "Your experience matters. We focus on honest service, attention to detail, and making every purchase worthwhile.",
    icon: HeartHandshake,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#3C3837] py-24 text-white md:py-32">
      {/* Background Accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00AEBC] blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#00AEBC]" />

              <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#00AEBC]">
                Why Choose Us
              </span>
            </div>

            <h2 className="max-w-xl text-4xl font-semibold tracking-tight md:text-6xl">
              More than furniture.
              <span className="block text-gray-400">
                It&apos;s your space.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-base leading-7 text-gray-400 md:ml-auto md:text-lg">
            We combine thoughtful design, premium materials, and skilled
            craftsmanship to create pieces that make your space feel truly
            yours.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid overflow-hidden rounded-3xl border border-white/10 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover="hover"
                className="group relative border-b border-white/10 p-8 transition-colors duration-500 hover:bg-white/[0.04] md:p-10"
              >
                {/* Number */}
                <div className="mb-12 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    {feature.number}
                  </span>

                  <motion.div
                    variants={{
                      hover: {
                        rotate: 8,
                        scale: 1.1,
                      },
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]"
                  >
                    <Icon
                      size={21}
                      strokeWidth={1.5}
                      className="text-[#00AEBC]"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="mb-4 text-2xl font-medium md:text-3xl">
                    {feature.title}
                  </h3>

                  <p className="max-w-md leading-7 text-gray-400">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Arrow */}
                <motion.div
                  variants={{
                    hover: {
                      x: 5,
                      y: -5,
                    },
                  }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 flex h-9 w-9 items-center justify-center rounded-full border border-white/10"
                >
                  <ArrowUpRight
                    size={17}
                    className="text-gray-500 transition-colors duration-300 group-hover:text-[#00AEBC]"
                  />
                </motion.div>

                {/* Hover Accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  variants={{
                    hover: {
                      scaleX: 1,
                    },
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#00AEBC]"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Crafted with purpose
          </p>

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#00AEBC]" />

            <span className="text-sm text-gray-400">
              Quality you can feel
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}