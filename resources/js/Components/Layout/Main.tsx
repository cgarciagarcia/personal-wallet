import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation, type Location } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Footer } from "@/Components/Footer";
import { Navbar } from "@/Components/Layout/Navbar";
import { routes } from "@/Router/routes";

export interface MainProps {
  renderRoutes: (location: Location) => ReactNode;
}

export const Main = ({ renderRoutes }: MainProps) => {
  const location = useLocation();

  const [useNavbar, setUseNavbar] = useState(false);

  useEffect(() => {
    routes.map((route) => {
      if (route.path === location.pathname) {
        setUseNavbar(route.useNavbar === undefined || route.useNavbar);
      }
    });
  }, [location]);

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {useNavbar && <Navbar />}
      <div
        className={twMerge(
          "h-full w-full overflow-auto pt-14 lg:pt-16 xl:pt-20",
          !useNavbar && "!pt-0",
        )}
      >
        <div className="mx-auto h-full w-full max-w-limit-x">
          <AnimatePresence>{renderRoutes(location)}</AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  );
};
