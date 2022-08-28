import type { ElementType, ReactElement } from "react";
import type {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "./util/types";

import classNames from "classnames";
import { forwardRef } from "react";

type GroupProps<C extends ElementType> = PolymorphicComponentPropWithRef<C, {}>;

type GroupComponent = <C extends ElementType = "div">(
  props: GroupProps<C>
) => ReactElement | null;

// eslint-disable-next-line react/display-name
export const Group: GroupComponent = forwardRef(
  <C extends ElementType = "div">(
    { as, children, ...props }: GroupProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "div";
    const className = classNames("space-x-4", props.className);

    return (
      <Component className={className} ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);
