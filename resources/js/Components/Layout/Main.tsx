import { type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation, type Location } from "react-router-dom";

import { Footer } from "@/Components/Layout/Footer";
import { Navbar } from "@/Components/Layout/Navbar";

export interface MainProps {
  routes: (location: Location) => ReactNode;
}

export const Main = ({ routes }: MainProps) => {
  const location = useLocation();

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <Navbar />
      <div className="h-full w-full overflow-auto bg-gray-300 pt-20 lg:pt-24 xl:pt-28">
        <div className="mx-auto h-full w-full max-w-limit-x">
          <AnimatePresence>{routes(location)}</AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  );
};
