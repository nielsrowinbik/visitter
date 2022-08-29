import type { ElementType, ReactElement } from "react";
import type {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "./util/types";

import classNames from "classnames";
import { forwardRef } from "react";

type ContainerProps<C extends ElementType> = PolymorphicComponentPropWithRef<
  C,
  {}
>;

type ContainerComponent = <C extends ElementType = "div">(
  props: ContainerProps<C>
) => ReactElement | null;

// eslint-disable-next-line react/display-name
export const Container: ContainerComponent = forwardRef(
  <C extends ElementType = "div">(
    { as, children, ...props }: ContainerProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "div";
    const className = classNames(
      "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
      props.className
    );

    return (
      <Component {...props} className={className} ref={ref}>
        {children}
      </Component>
    );
  }
);
