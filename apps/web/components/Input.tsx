import type { InputHTMLAttributes, ReactNode } from "react";

import { forwardRef } from "react";
import slugify from "slugify";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  errorText?: string;
  label?: string;
  rightSection?: ReactNode;
}

export const Input = forwardRef<any, InputProps>(function Input(
  { description, errorText, label, rightSection, ...props },
  ref
) {
  const id = props.id || (label && slugify(label, { lower: true }));

  return (
    <div className="block w-full max-w-md">
      {label && (
        <label className="mb-2 block font-semibold" htmlFor={id}>
          {label}
          {props.required && <span> *</span>}
        </label>
      )}
      {description && (
        <p className="mb-2 text-sm text-zinc-500">{description}</p>
      )}
      <div className="mt-2 flex rounded-md border border-zinc-400/20 [&>:first-child]:rounded-l-md [&>:last-child]:rounded-r-md">
        <input {...props} id={id} ref={ref} />
        {rightSection}
      </div>
      {errorText && <p className="mt-2 text-xs text-red-500">{errorText}</p>}
    </div>
  );
});
