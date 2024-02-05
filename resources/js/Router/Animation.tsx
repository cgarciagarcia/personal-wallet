import { type ReactNode } from "react";
import { motion } from "framer-motion";

export const Animation = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      layoutRoot
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
    >
      {children}
    </motion.div>
  );
};
