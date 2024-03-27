import { type ReactNode } from "react";
import { motion } from "framer-motion";

export const Animation = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      className="h-full w-full"
      layoutRoot
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0.5, transition: { duration: 0 } }}
    >
      {children}
    </motion.div>
  );
};
