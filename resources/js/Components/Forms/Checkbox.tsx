import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

import { Message, type FormErrorType } from "@/Components/Forms/Message";
import { Text } from "@/Components/Layout";
import { forwardRef } from "@/Helpers/forwardRef";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  compact?: boolean;
  containerClassName?: string;
  error?: FormErrorType;
  id: string;
  label?: ReactNode;
  message?: string;
  preventEventsRightIcon?: boolean;
  rightMarginWidth?: number;
  type?: string;
}

export const CheckboxInput = forwardRef(
  (
    {
      className,
      compact,
      containerClassName,
      error,
      id,
      label,
      message,
      style,
      required,
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div style={style} className={twMerge("relative", containerClassName)}>
        <div
          className={twMerge(
            "flex flex-row items-center gap-4 rounded-md",
            !!rest.disabled && "opacity-80",
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            id={id}
            className={twMerge(
              "block h-[46px] w-8  rounded-md px-2 py-3",
              "focus:ring-secondary-green-300 focus:border-secondary-green text-gray-700 ",
              "font-normal ",
              "placeholder:text-sm placeholder:font-normal placeholder:text-gray-400 md:placeholder:text-base",
              "rounded border-solid border-gray-800",
              !!rest.disabled &&
                "bg-black-100 border-gray-500 hover:cursor-not-allowed",
              !!error && "focus:border-red focus:ring-red-200",
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error-description` : undefined}
            aria-required={required}
            required={required}
            autoComplete="off"
            onChange={(e) => {
              console.log(
                e.currentTarget.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*)\./g, "$1"),
              );
            }}
            {...rest}
          />
          {!!label && (
            <Text as="label" className="font-medium" htmlFor={id}>
              {label}
            </Text>
          )}
        </div>
        {!compact && (
          <Message
            message={message}
            error={error}
            role={error ? "alert" : undefined}
            id={error ? `${id}-error-description` : undefined}
          />
        )}
      </div>
    );
  },
);
