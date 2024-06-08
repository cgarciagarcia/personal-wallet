import {
  useState,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type ReactNode,
} from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

import { Message, type FormErrorType } from "@/Components/Forms/Message";
import { IconEnveloper } from "@/Components/IconEnveloper";
import { Text } from "@/Components/Layout/Text";
import { forwardRef } from "@/Helpers/forwardRef";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  compact?: boolean;
  containerClassName?: string;
  error?: FormErrorType;
  id: string;
  label?: ReactNode;
  left?: ReactNode;
  message?: string;
  preventEventsRightIcon?: boolean;
  right?: ReactNode;
  rightwMergeidth?: number;
  type?: string;
}

export const Input = forwardRef(
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
      rightwMergeidth = 40,
      style,
      type = "text",
      required,
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

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
          {(!!left || type === "password") && (
            <div
              className="pointer-events-none pl-3"
              style={{
                position: "absolute",
              }}
            >
              <IconEnveloper size="sm">
                {left ?? (
                  <LockClosedIcon
                    className={twMerge(
                      "h-32 w-32 cursor-pointer fill-gray-800 stroke-gray-800 stroke-[.2px]",
                      !!error && "fill-red-500 stroke-red-500",
                    )}
                    onClick={() => setShowPassword((current) => !current)}
                  />
                )}
              </IconEnveloper>
            </div>
          )}
          <input
            ref={ref}
            type={type === "password" ? (showPassword ? "text" : type) : type}
            id={id}
            {...rest}
            className={twMerge(
              "block h-[46px] w-full rounded-md border border-gray-200 px-2 py-3",
              "focus:ring-secondary-green-300 focus:border-secondary-green text-gray-700 focus:ring-1",
              "font-normal ",
              "placeholder:text-sm placeholder:font-normal placeholder:text-gray-400 md:placeholder:text-base",
              "rounded border-solid border-gray-800",
              (!!left || type === "password") && "pl-10",
              !!rest.disabled && "bg-black-100 border-gray-500",
              !!error &&
                "focus:border-red border-red-500 placeholder:text-red-500 focus:ring-red-200",
              type === "password" || right ? `mr-[${rightwMergeidth}px]` : "",
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error-description` : undefined}
            aria-required={required}
            required={required}
          />
          {(!!right || type === "password") && (
            <IconEnveloper
              size="sm"
              className={twMerge(
                "absolute right-3 flex flex-row items-center justify-center",
                `w-[${rightwMergeidth}px]`,
                preventEventsRightIcon ? "pointer-events-none" : "",
              )}
            >
              {right ??
                (showPassword ? (
                  <EyeSlashIcon
                    className={twMerge(
                      "h-5 w-5 cursor-pointer fill-gray-800 stroke-[.2px] text-gray-800",
                      !!error && "fill-red-500 stroke-red-500",
                    )}
                    onClick={() => setShowPassword((current) => !current)}
                  />
                ) : (
                  <EyeIcon
                    className={twMerge(
                      "h-5 w-5 cursor-pointer stroke-1 text-gray-800",
                      !!error && "fill-red-500 stroke-red-500",
                    )}
                    onClick={() => setShowPassword((current) => !current)}
                  />
                ))}
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
