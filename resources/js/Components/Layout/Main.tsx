import { type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Footer } from "@/Components/Footer";
import { Navbar } from "@/Components/Layout/Navbar";
import { useFooter } from "@/Hooks/useFooter";
import { useNavbar } from "@/Hooks/useNavbar";

export interface MainProps {
  children?: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  const renderNavbar = useNavbar();
  const renderFooter = useFooter();

  return (
    <main className="flex-column relative h-full min-h-screen  w-full items-center justify-between md:h-screen">
      <Navbar />
      <div
        className={twMerge(
          "h-screen w-full bg-background py-16 pt-14 lg:pt-16 xl:pt-20",
          !renderNavbar && " min-h-screen !pt-0",
        )}
      >
        <div className="mx-auto h-full w-full max-w-limit-x">
          <AnimatePresence>{children ?? <Outlet />}</AnimatePresence>
        </div>
      </div>
      {renderFooter && <Footer />}
    </main>
  );
};
