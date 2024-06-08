import * as React from "react";
import { type ReactNode } from "react";
import { useState } from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Link, NavLink, type NavLinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Text } from "@/Components/Layout/Text";
import { useAuth } from "@/Hooks/Api/useAuth";
import { useNavbar } from "@/Hooks/useNavbar";
import { ROUTES } from "@/Router/routes";

const navLinks = [
  {
    path: ROUTES.home.path,
    label: ROUTES.home.label,
  },
  {
    path: ROUTES.budget.path,
    label: ROUTES.budget.label,
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
        "mt-4 w-full rounded p-4 transition-all duration-150 md:mt-0 md:p-0",
        active &&
          "w-auto bg-primary-700 p-4 md:rounded-none md:bg-transparent md:p-0",
        false && "w-0 md:border-b-2 md:border-solid md:border-b-white",
      )}
    >
      <NavLink
        {...props}
        className={twMerge(
          "group/link",
          active && "hover:font-medium md:border-b-4 md:border-solid",
        )}
      >
        <Text
          className={twMerge(
            "text-nowrap capitalize transition-all md:text-white",
            active && "font-bold text-white",
            !active && "hover:text-gray-400",
          )}
          as="p"
          weight={active ? "medium" : "thin"}
        >
          {children as ReactNode}
        </Text>
        <div
          className={twMerge(
            "w-full transition-all duration-150 md:border-solid md:border-b-white",
            !active &&
              "w-0 group-hover/link:w-full group-focus/link:w-full md:border-b-2",
            active && "md:border-b-2 ",
          )}
        />
      </NavLink>
    </li>
  );
};

const MobileNavbar = ({
  className,
  location,
  logout,
}: {
  className?: string;
  location: string;
  logout: () => void;
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
        <div
          className="mr-8"
          role="button"
          onKeyDown={() => null}
          onClick={() => setIsOpen((prevState) => !prevState)}
          tabIndex={0}
        >
          <Bars3Icon className="block h-6 w-6 text-white md:hidden" />
        </div>
      </div>
      <div
        className={twMerge(
          "flex h-0 w-auto flex-col justify-between overflow-y-hidden bg-white px-4 shadow-lg duration-200",
          isOpen && "h-[300px]",
        )}
      >
        <ul>
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
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => null}
          onClick={() => logout()}
          className="my-4 flex items-center"
        >
          <div className="flex items-center justify-center rounded-full bg-complementary p-2">
            <ArrowRightEndOnRectangleIcon className="h-4 text-white" />
          </div>
          <Text className="ml-2">Logout</Text>
        </div>
      </div>
    </div>
  );
};
const DesktopNavbar = ({
  className,
  location,
  logout,
}: {
  className?: string;
  location: string;
  logout: () => void;
}) => {
  return (
    <div
      className={twMerge(
        "hidden w-full md:flex md:flex-row md:items-center md:justify-between lg:px-6",
        className,
      )}
    >
      <Link to="/" aria-label="Go to home">
        <img
          src="/img/logo-cg.png"
          alt="This is the  wallet-app's logo"
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
      <button
        className="relative mr-4 h-8 w-8 border-complementary focus:border-solid focus:border-complementary"
        onClick={() => logout()}
        id="logout"
        aria-label="Press to logout"
        data-tooltip-id="tooltip"
        data-tooltip-content="Logout"
      >
        <ArrowRightEndOnRectangleIcon className="h-full text-white" />
        <div className="absolute rounded bg-gray-800 p-2 opacity-0 transition-opacity duration-200 group-hover/logout:opacity-100">
          <Text className="float-left !text-sm text-white" weight="thin">
            Logout
          </Text>
        </div>
      </button>
    </div>
  );
};

export const Navbar = () => {
  const { logout } = useAuth();

  const renderNavbar = useNavbar();
  if (!renderNavbar) return;

  return (
    <nav className="fixed z-10 h-14 w-full bg-primary-900 shadow-lg lg:h-16 xl:h-20">
      <div className="mx-auto flex max-w-limit-nav ">
        <DesktopNavbar location={location.pathname} logout={logout} />
        <MobileNavbar location={location.pathname} logout={logout} />
      </div>
    </nav>
  );
};
