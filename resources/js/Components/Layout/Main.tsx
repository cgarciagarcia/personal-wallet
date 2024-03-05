import { type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Footer } from "@/Components/Footer";
import { Navbar } from "@/Components/Layout/Navbar";
import { useNavbar } from "@/Hooks/useNavbar";

export interface MainProps {
  children?: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  const renderNavbar = useNavbar();
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <Navbar />
      <div
        className={twMerge(
          "h-full w-full overflow-auto pt-14 lg:pt-16 xl:pt-20",
          !renderNavbar && "!pt-0",
        )}
      >
        <div className="mx-auto h-full w-full max-w-limit-x">
          <AnimatePresence>{children ?? <Outlet />}</AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  );
};
