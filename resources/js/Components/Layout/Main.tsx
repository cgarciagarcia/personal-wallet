import { type ReactNode } from "react";

import { Footer } from "@/Components/Layout/Footer";
import { Menu } from "./Menu";

export interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <Menu />
      <div className="h-full w-full overflow-auto bg-gray-300 pt-20 lg:pt-24 xl:pt-28">
        <div className="mx-auto h-full w-full max-w-limit-x">{children}</div>
      </div>
      <Footer />
    </main>
  );
};
