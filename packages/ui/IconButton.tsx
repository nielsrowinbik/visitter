import type { ElementType, ReactElement, ReactNode } from "react";
import type {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "./util/types";

import classNames from "classnames";
import { forwardRef } from "react";

type IconButtonProps<C extends ElementType> = PolymorphicComponentPropWithRef<
  C,
  { icon: ReactNode }
>;

type IconButtonComponent = <C extends ElementType = "button">(
  props: IconButtonProps<C>
) => ReactElement | null;

// eslint-disable-next-line react/display-name
export const IconButton: IconButtonComponent = forwardRef(
  <C extends ElementType = "button">(
    { as, icon, ...props }: IconButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "button";
    const className = classNames(
      "h-6 w-6 rounded-md bg-white p-px outline-none hover:bg-zinc-50",
      props.className
    );

    return (
      <Component className={className} ref={ref} {...props}>
        {icon}
      </Component>
    );
  }
);
