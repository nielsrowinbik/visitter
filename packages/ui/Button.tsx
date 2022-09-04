import type { ElementType, ReactElement, ReactNode } from "react";
import type {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "./util/types";

import classNames from "classnames";
import { forwardRef } from "react";

type ButtonProps<C extends ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    children?: ReactNode;
    compact?: boolean;
    variant?: "default" | "outline" | "danger";
  }
>;

type ButtonComponent = <C extends ElementType = "button">(
  props: ButtonProps<C>
) => ReactElement | null;

// eslint-disable-next-line react/display-name
export const Button: ButtonComponent = forwardRef(
  <C extends ElementType = "button">(
    { as, children, compact, variant = "default", ...props }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "button";
    const className = classNames(
      "relative box-border inline-flex shrink-0 select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-md border border-transparent text-center font-semibold leading-none no-underline outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-0 disabled:cursor-not-allowed",
      compact ? "h-6 py-1.5 px-2 text-xs" : "h-9 py-3 px-4",
      variant === "default" &&
        "bg-zinc-800 text-zinc-50 hover:bg-zinc-900 hover:text-white dark:bg-zinc-50 dark:text-zinc-800 dark:hover:bg-white dark:hover:text-zinc-900",
      variant === "outline" && "border-zinc-200 bg-white hover:bg-zinc-50",
      variant === "danger" &&
        "border-zinc-200 hover:border-red-500 bg-white text-red-700",
      props.className
    );

    return (
      <Component {...props} className={className} ref={ref}>
        {children}
      </Component>
    );
  }
);
