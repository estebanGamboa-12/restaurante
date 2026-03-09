"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const transition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1],
};

export default function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
