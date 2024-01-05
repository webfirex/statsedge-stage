import { type ReactNode } from "react";
import { motion } from "framer-motion";

export function ZoomOutAni({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          ease: "linear",
          duration: 1,
          y: { duration: 0.5 },
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
