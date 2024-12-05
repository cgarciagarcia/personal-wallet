import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

import { Message, type FormErrorType } from "@/Components/Forms/Message";
import { IconEnveloper } from "@/Components/IconEnveloper";
import { Text } from "@/Components/Layout";
import { forwardRef } from "@/Helpers/forwardRef";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  compact?: boolean;
  containerClassName?: string;
  error?: FormErrorType;
  id: string;
  label?: ReactNode;
  left?: ReactNode;
  message?: string;
  preventEventsRightIcon?: boolean;
  right?: ReactNode;
  rightMarginWidth?: number;
  decimals?: boolean;
}

export const InputNumber = forwardRef(
  (
    {
      className,
      compact,
      containerClassName,
      error,
      id,
      label,
      left,
      message,
      preventEventsRightIcon,
      right,
      rightMarginWidth = 40,
      style,
      required,
      decimals = true,
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div style={style} className={twMerge("relative", containerClassName)}>
        {!!label && (
          <Text as="label" className="font-medium" htmlFor={id}>
            {label}
          </Text>
        )}
        <div
          className={twMerge(
            "flex flex-row items-center rounded-md",
            !!rest.disabled && "opacity-30",
          )}
        >
          {!!left && (
            <div
              className="pointer-events-none pl-3"
              style={{
                position: "absolute",
              }}
            >
              <IconEnveloper size="sm">{left}</IconEnveloper>
            </div>
          )}
          <input
            ref={ref}
            type="text"
            id={id}
            className={twMerge(
              "block h-[46px] w-full rounded-md border border-gray-200 px-2 py-3",
              "focus:ring-secondary-green-300 focus:border-secondary-green text-gray-700 focus:ring-1",
              "font-normal ",
              "placeholder:text-sm placeholder:font-normal placeholder:text-gray-400 md:placeholder:text-base",
              "rounded border-solid border-gray-800",
              !!left && "pl-10",
              !!rest.disabled &&
                "bg-black-100 border-gray-500  hover:cursor-not-allowed",
              !!error && "focus:border-red focus:ring-red-200",
              right ? `mr-[${rightMarginWidth}px]` : "",
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error-description` : undefined}
            aria-required={required}
            required={required}
            autoComplete="off"
            {...rest}
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");
              rest.onChange!(e);
            }}
            onKeyDown={(event) => {
              if (!decimals && event.key === ".") {
                event.preventDefault();
                event.stopPropagation();
              }
              rest.onKeyDown ? rest.onKeyDown(event) : undefined;
            }}
          />
          {!!right && (
            <IconEnveloper
              size="sm"
              className={twMerge(
                "absolute right-3 flex flex-row items-center justify-center",
                `w-[${rightMarginWidth}px]`,
                preventEventsRightIcon ? "pointer-events-none" : "",
              )}
            >
              {right}
            </IconEnveloper>
          )}
        </div>
        {}
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
