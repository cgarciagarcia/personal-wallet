import { type HTMLProps, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type HeadersType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TextType = "p" | "label" | "span";
type AllTextType = TextType | HeadersType;

type FontWeightType =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export interface HeaderProps {
  as: HeadersType;
  children: ReactNode;
  className?: string;
  weight?: FontWeightType;
}

export const Header = ({
  as = "h1",
  children,
  className,
  weight,
  ...props
}: HeaderProps) => {
  return (
    <Typography
      as={as}
      weight={weight}
      className={twMerge(
        as == "h1" &&
          "text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl",
        as == "h2" && "text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
        as == "h3" && "text-lg lg:text-xl xl:text-2xl 2xl:text-3xl",
        as == "h4" && "text-base lg:text-lg xl:text-xl 2xl:text-2xl",
        as == "h5" && "text-sm lg:text-base xl:text-lg 2xl:text-xl",
        as == "h6" && "text-xs lg:text-sm xl:text-base 2xl:text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </Typography>
  );
};

export interface TypographyProps<T extends AllTextType> extends HTMLProps<T> {
  as?: T;
  weight?: FontWeightType;
  wrap?: "nowrap" | "wrap";
}

export const Typography = ({
  as: Component = "p",
  children,
  weight,
  className = "",
  wrap,
  ...props
}: TypographyProps<AllTextType>) => {
  return (
    // Fix me
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Component
      className={twMerge(
        "font-base text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl",
        Component === "label" &&
          "text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm",
        Component === "p" && "",
        Component === "span" && "",
        weight == "thin" && "font-thin",
        weight == "extralight" && "font-extralight",
        weight == "light" && "font-light",
        weight == "normal" && "font-normal",
        weight == "medium" && "font-medium",
        weight == "semibold" && "font-semibold",
        weight == "bold" && "font-bold",
        weight == "extrabold" && "font-extrabold",
        weight == "black" && "font-black",
        wrap == "wrap" && "text-wrap",
        wrap == "nowrap" && "text-nowrap",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
