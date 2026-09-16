"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const contentVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const curtainVariants = {
  initial: { x: "-100%" },
  animate: { x: "100%" },
};

export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="relative flex-1 overflow-hidden"
        initial={prefersReducedMotion ? false : "initial"}
        animate="animate"
        exit={prefersReducedMotion ? undefined : "exit"}
        variants={contentVariants}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-40 bg-[#00C2D1]"
            initial="initial"
            animate="animate"
            variants={curtainVariants}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}