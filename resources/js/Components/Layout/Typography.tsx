import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type HeadersType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TextType = "p" | "label" | "span";

export interface TypographyProps {
  as: HeadersType | TextType;
  children: ReactNode;
  className?: string;
}

export interface HeaderProps {
  as: HeadersType;
  children: ReactNode;
  className?: string;
}

export const Header = ({
  as = "h1",
  children,
  className,
  ...props
}: HeaderProps) => {
  return (
    <Typography
      as={as}
      className={twMerge(
        as == "h1" && "text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl",
        as == "h2" && "text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
        as == "h3" && "text-lg lg:text-xl xl:text-2xl 2xl:text-3xl",
        as == "h4" && "text-base lg:text-lg xl:text-xl 2xl:text-2xl",
        as == "h5" && "text-sm lg:text-base xl:text-lg 2xl:text-xl",
        as == "h6" && "text-xs  lg:text-sm xl:text-base 2xl:text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </Typography>
  );
};
export const Typography = ({
  as = "p",
  children,
  className = "",
  ...props
}: TypographyProps) => {
  const AsType = as;

  return (
    <AsType
      className={twMerge(
        as === "p" && "text-sm md:text-base lg:text-lg xl:text-xl",
        as === "span" && "text-sm md:text-base lg:text-lg xl:text-xl",
        className,
      )}
      {...props}
    >
      {children}
    </AsType>
  );
};
