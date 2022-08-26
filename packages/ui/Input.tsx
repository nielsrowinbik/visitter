import { InputHTMLAttributes, forwardRef } from "react";

type Props = {
  id: string;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

// eslint-disable-next-line react/display-name
export const Input = forwardRef<any, Props>(({ id, label, ...props }, ref) => (
  <div className="max-w-md">
    <label htmlFor={id} className="mb-3 block text-left text-sm font-medium ">
      {label}
    </label>
    <input
      className="h-8 w-full rounded border bg-zinc-50 px-3 text-sm shadow-sm ring-zinc-400/20 ring-offset-0 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-zinc-800"
      id={id}
      {...props}
      ref={ref}
    />
  </div>
));
