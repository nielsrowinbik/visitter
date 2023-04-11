import type { InputHTMLAttributes, ReactNode } from "react";

import ErrorMessage from "~/components/ErrorMessage";
import { cn } from "~/utils";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  error?: { _errors: string[] | undefined } | undefined;
  htmlFor: string;
  label: string;
  rightSection?: ReactNode;
}

export function FormField({
  description,
  error,
  htmlFor,
  label,
  rightSection,
  type = "text",
  ...props
}: FormFieldProps) {
  return (
    <div className="block w-full max-w-md">
      {label && (
        <label className="mb-2 block font-semibold" htmlFor={htmlFor}>
          {label}
          {props.required && <span> *</span>}
        </label>
      )}
      {description && (
        <p className="my-2 text-sm text-zinc-500">{description}</p>
      )}
      <div
        className={cn(
          "mt-2 flex rounded-md border border-zinc-400/20 [&>:first-child]:rounded-l-md [&>:last-child]:rounded-r-md",
          { "border-red-500": !!error }
        )}
      >
        <input {...props} id={htmlFor} name={htmlFor} type={type} />
        {rightSection}
      </div>
      <ErrorMessage error={error} onlyFirst />
    </div>
  );
}
