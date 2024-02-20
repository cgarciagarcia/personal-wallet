import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type FormErrorType = string | boolean;

export interface MessageProps extends ComponentPropsWithoutRef<"p"> {
  message?: string;
  error?: FormErrorType;
}

export const Message = ({ message, error, className }: MessageProps) => (
  <p
    className={twMerge(
      "text-black-800 block pb-1 pt-1 text-xs opacity-80",
      !!error && "text-red-500",
      className,
    )}
  >
    {error === true ? "\u200b" : !error ? message ?? "\u200b" : error}
  </p>
);
