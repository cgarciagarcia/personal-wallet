import * as React from "react";
import { type ReactNode } from "react";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  Link,
  NavLink,
  useLocation,
  type NavLinkProps,
} from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Typography } from "@/Components/Layout/Typography";
import { ROUTES } from "@/Router/routes";

const navLinks = [
  {
    path: ROUTES.home.path,
    label: ROUTES.home.label,
  },
];

const NavbarLink = ({
  active,
  children,
  ...props
}: NavLinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    active?: boolean;
  }) => {
  return (
    <li
      className={twMerge(
        "mt-8 w-full p-4 md:mt-0 md:p-0",
        active &&
          "w-auto rounded bg-primary-50 p-4 md:rounded-none md:border-b-2 md:border-solid md:border-b-white md:bg-transparent md:p-0",
      )}
    >
      <NavLink
        {...props}
        className={twMerge(
          "",
          active && "border-b-black md:border-b-4 md:border-solid",
        )}
      >
        <Typography
          className={twMerge("text-nowrap text-white", active && "font-bold")}
          as="p"
        >
          {children as ReactNode}
        </Typography>
      </NavLink>
    </li>
  );
};

const MobileNavbar = ({
  className,
  location,
}: {
  className?: string;
  location: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={twMerge("block h-full w-screen md:hidden", className)}>
      <div className="flex flex-row items-center justify-between">
        <Link to="/">
          <img
            src="/img/logo-cg.png"
            alt="logo"
            className="h-14 w-14 opacity-0"
          />
        </Link>
        <div className="pr-4">
          <Bars3Icon
            className="mr-4 block h-6 w-6 text-white md:hidden"
            onClick={() => setIsOpen((prevState) => !prevState)}
          />
        </div>
      </div>
      <ul
        className={twMerge(
          "flex h-0 w-auto flex-col overflow-y-hidden bg-gray-50 px-8 shadow-lg duration-500",
          isOpen && "h-[300px]",
        )}
      >
        {navLinks.map((link) => (
          <NavbarLink
            to={link.path}
            key={link.label}
            active={location === link.path}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </NavbarLink>
        ))}
      </ul>
    </div>
  );
};
const DesktopNavbar = ({
  className,
  location,
}: {
  className?: string;
  location: string;
}) => {
  return (
    <div
      className={twMerge(
        "hidden w-full bg-primary md:flex md:flex-row md:items-center md:justify-between lg:px-6",
        className,
      )}
    >
      <Link to="/">
        <img
          src="/img/logo-cg.png"
          alt="logo"
          className="h-14 w-14 opacity-0 lg:h-16 lg:w-16 xl:h-20 xl:w-20"
        />
      </Link>

      <ul
        className={twMerge(
          "flex flex-row items-center gap-12  md:flex md:flex-row",
        )}
      >
        {navLinks.map((link) => (
          <NavbarLink
            to={link.path}
            key={link.label}
            active={location === link.path}
          >
            {link.label}
          </NavbarLink>
        ))}
      </ul>
      <div className="pr-4">
        <Link to="/logout">
          <Typography as="span" className="text-white">
            Logout
          </Typography>
        </Link>
      </div>
    </div>
  );
};

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="absolute h-14 w-full bg-primary shadow-lg lg:h-16 xl:h-20">
      <div className="mx-auto flex max-w-limit-nav ">
        <DesktopNavbar location={location.pathname} />
        <MobileNavbar location={location.pathname} />
      </div>
    </nav>
  );
};
