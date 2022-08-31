import { InputHTMLAttributes, forwardRef } from "react";

import classNames from "classnames";

type Props = {
  id: string;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

// eslint-disable-next-line react/display-name
export const Input = forwardRef<any, Props>(({ id, label, ...props }, ref) => (
  <div className="block w-full max-w-md">
    <label htmlFor={id} className="mb-3 block font-medium text-gray-700">
      {label}
    </label>
    <input
      {...props}
      className={classNames(
        "w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500",
        props.className
      )}
      id={id}
      ref={ref}
    />
  </div>
));
