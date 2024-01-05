import { type ReactNode } from "react";
import { motion } from "framer-motion";

export function FadeUpAni({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          ease: "linear",
          duration: 2,
          y: { duration: 0.5 },
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
