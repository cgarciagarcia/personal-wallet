import { type CSSProperties, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IconEnveloperProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: "sm" | "md" | "lg";
}

export const IconEnveloper = ({
  className,
  children,
  size = "md",
  style,
}: IconEnveloperProps) => (
  <div
    className={twMerge(
      "flex flex-row items-center",
      size === "lg" && "h-10 w-10",
      size === "md" && "h-6 w-6",
      size === "sm" && "h-5 w-5",
      className,
    )}
    style={style}
  >
    {children}
  </div>
);
