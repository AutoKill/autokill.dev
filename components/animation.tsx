"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Animation({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
