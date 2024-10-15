import {
  useCallback,
  useId,
  type ElementType,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

interface TableProps extends PropsWithChildren {
  isFetching?: boolean;
  children: ReactNode[];
  fallbackElement?: ElementType;
  fallbackRepetitions?: number;
}

const Template = ({
  children,
  isFetching,
  containerClassName,
}: {
  children: ReactNode;
  isFetching: boolean;
  containerClassName?: string;
}) => {
  return (
    <div
      className={twMerge(
        "border-style relative h-[600px] w-full max-w-full overflow-hidden lg:w-[700px] ",
        containerClassName,
      )}
    >
      <ul
        className={twMerge(
          "no-scrollbar flex h-full w-full flex-col overflow-y-scroll bg-white [&>*:nth-child(even)]:bg-primary/5",
          isFetching && "overflow-y-hidden",
        )}
      >
        {children}
      </ul>
    </div>
  );
};

export const Table = ({
  children,
  fallbackElement: FallbackElement,
  isFetching = false,
  fallbackRepetitions = 1,
}: TableProps) => {
  const id = useId();

  const renderFallBack = useCallback(() => {
    return FallbackElement
      ? Array.from({ length: fallbackRepetitions }, (_, i) => i + 1).map(
          () => FallbackElement,
        )
      : [];
  }, [FallbackElement, fallbackRepetitions]);

  if (!isFetching && children?.length === 0) {
    return (
      <Template isFetching={isFetching} containerClassName="bg-white">
        <article className="min-h-auto w-full bg-white p-4 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-200">
          <div className="flex items-center justify-between">
            Nothing to show...
          </div>
        </article>
      </Template>
    );
  }

  return (
    <Template isFetching={isFetching}>
      {isFetching
        ? FallbackElement &&
          renderFallBack().map((Element, index) => (
            <Element key={`skeleton-${id}-${index}`} />
          ))
        : children}
    </Template>
  );
};
