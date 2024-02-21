import React from "react";
import { twMerge } from "tailwind-merge";

export const IconWrapper = ({
  size = "md",
  className,
  style,
  children,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => (
  <div
    className={twMerge(
      "flex flex-row items-center",
      size === "sm" && "h-5 w-5",
      size === "md" && "h-6 w-6",
      size === "lg" && "h-10 w-10",
      className,
    )}
    style={style}
  >
    {children}
  </div>
);
