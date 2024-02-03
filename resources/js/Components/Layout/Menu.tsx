import * as React from "react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Link, NavLink, type NavLinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Typography } from "@/Components/Layout/Typography";

const navLinks = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/404",
    label: "Not found",
  },
];
const NavbarLink = ({
  children,
  ...props
}: NavLinkProps & React.RefAttributes<HTMLAnchorElement>) => {
  const [active, setActive] = useState(false);

  return (
    <li
      className={twMerge(
        "w-full p-4 md:p-0",
        active && "md:p0 w-auto rounded bg-violet-200 p-4 md:bg-transparent",
      )}
    >
      <NavLink
        {...props}
        className={({ isActive }) => {
          setActive(isActive);

          return isActive
            ? "sm:border-rounded w-full rounded border-solid border-gray-200 font-bold md:bg-none"
            : "w-full";
        }}
      >
        <Typography className="text-nowrap" as="span">
          {children as ReactNode}
        </Typography>
      </NavLink>
    </li>
  );
};

const MobileNavbar = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={twMerge("block h-full w-screen md:hidden", className)}>
      <div className="flex flex-row items-center justify-between">
        <Link to="/">
          <img
            src="/img/logo-cg.png"
            alt="logo"
            className="h-14 w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20"
          />
        </Link>
        <div className="pr-4">
          <Bars3Icon
            className="block h-6 w-6 md:hidden"
            onClick={() => setIsOpen((prevState) => !prevState)}
          />
        </div>
      </div>
      <ul
        className={twMerge(
          "flex h-[300px] w-auto flex-col gap-6 bg-white px-8 py-8 shadow-lg",
          !isOpen && "hidden",
        )}
      >
        {navLinks.map((link) => (
          <NavbarLink to={link.path} key={link.label}>
            {link.label}
          </NavbarLink>
        ))}
      </ul>
    </div>
  );
};
const DesktopNavbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "hidden w-full md:flex md:flex-row md:items-center md:justify-between lg:px-6",
        className,
      )}
    >
      <Link to="/">
        <img
          src="/img/logo-cg.png"
          alt="logo"
          className="h-14 w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20"
        />
      </Link>

      <ul
        className={twMerge(
          "flex flex-row items-center gap-12  md:flex md:flex-row",
        )}
      >
        {navLinks.map((link) => (
          <NavbarLink to={link.path} key={link.label}>
            {link.label}
          </NavbarLink>
        ))}
      </ul>
      <div className="pr-4">
        <button type="button">Login</button>
      </div>
    </div>
  );
};

export const Menu = () => {
  return (
    <nav className="absolute h-14 w-full bg-gray-50 shadow-lg lg:h-16 xl:h-20">
      <div className="mx-auto my-0 flex max-w-limit-nav">
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </nav>
  );
};
