import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

import Spinner from "@/Components//Layout/Spinner";
import { IconEnveloper } from "@/Components/IconEnveloper";
import { forwardRef } from "@/Helpers/forwardRef";
import { Typography } from "./Typography";

export const buttonVariants = ["primary", "complementary", "tertiary"] as const;
export type ButtonVariant = (typeof buttonVariants)[number];

export const buttonSizes = ["sm", "md", "lg"] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  left?: ReactNode;
  right?: ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      left,
      right,
      size = "md",
      type = "button",
      variant = "primary",
      isLoading,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => (
    <button
      ref={ref}
      type={type}
      className={twMerge(
        "flex h-12 cursor-pointer flex-row items-center justify-between gap-2 border border-black text-center focus:outline-none disabled:cursor-not-allowed",
        "rounded-3xl focus:ring-2 focus:ring-offset-0",
        !left && !right && "justify-center",
        variant === "primary" &&
          "focus:ring-primary-100 bg-primary hover:bg-primary-500 focus:bg-primary disabled:bg-primary-50",
        variant === "complementary" &&
          "bg-complementary text-white hover:text-black focus:text-black focus:ring-1 focus:ring-complementary-700 disabled:bg-complementary-20 disabled:hover:text-white disabled:focus:text-white",

        size === "sm" && "px-4 py-2",
        size === "md" && "px-[18px] py-3",
        size === "lg" && "px-7 py-4",

        !children && [
          size === "sm" && "p-2",
          size === "md" && "p-3",
          size === "lg" && "p-4",
        ],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      <div className="flex flex-row items-center gap-2">
        {left && <IconEnveloper size={size}>{left}</IconEnveloper>}
        <Typography
          weight="medium"
          className={twMerge(
            "text-base",
            "md:text-sm",
            "lg:text-lg",
            "xl:text-xl",
            "2xl:text-xl",
            "3xl:text-2xl",
            variant === "primary" && "text-white",
          )}
          as="span"
        >
          {isLoading ? "Loading..." : children}
        </Typography>
      </div>
      {(right ?? isLoading) && (
        <IconEnveloper size={size}>
          {isLoading ? <Spinner /> : right}
        </IconEnveloper>
      )}
    </button>
  ),
);
