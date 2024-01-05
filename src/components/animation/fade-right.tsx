import { type ReactNode } from "react";
import { motion } from "framer-motion";

export function FadeRightAni({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          ease: "linear",
          duration: 1,
          x: { duration: 0.5 },
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
