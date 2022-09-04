import type { InputHTMLAttributes, ReactNode } from "react";

import classNames from "classnames";
import { forwardRef } from "react";

// TODO: Require `id` if `label` is defined.

type Props = {
  id?: string;
  description?: string;
  label?: string;
  rightSection?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

// eslint-disable-next-line react/display-name
export const Input = forwardRef<any, Props>(
  ({ id, description, label, rightSection, ...props }, ref) => (
    <div className="block w-full max-w-md">
      {label && (
        <label htmlFor={id} className="font-medium">
          {label}
          {props.required && <span> *</span>}
        </label>
      )}
      {description && <p className="mb-0">{description}</p>}
      <div className="[&>:first-child]:rounded-l-md [&>:last-child]:rounded-r-md mt-2 flex rounded-md border border-zinc-200 bg-zinc-50">
        <input
          {...props}
          className={classNames(
            "h-9 w-full appearance-none border border-transparent bg-transparent p-3 placeholder-zinc-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-2",
            props.className
          )}
          id={id}
          ref={ref}
        />
        {rightSection}
      </div>
    </div>
  )
);
