import {
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Button } from "./Button";

type Props = {
  id: string;
  checked: boolean;
  disabled?: boolean;
  description?: ReactNode;
  label: string;
  onChange: (checked: boolean) => void;
} & HTMLAttributes<HTMLButtonElement>;

export const Toggle = ({
  checked,
  description,
  id,
  label,
  onChange,
  ...props
}: Props) => {
  const onClick = useCallback(() => {
    onChange(!checked);
  }, [checked, onChange]);

  return (
    <div className="">
      <label className="font-medium">{label}</label>
      <p>{description}</p>
      <div className="mb-[1.25em] mt-2 flex items-center space-x-5">
        {checked ? (
          <span className="flex items-center space-x-1 text-green-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span>Enabled</span>
          </span>
        ) : (
          <span className="text-zinc-600">Not enabled</span>
        )}
        <Button
          onClick={onClick}
          variant={checked ? "danger" : "outline"}
          {...props}
        >
          {checked ? "Disable" : "Enable"}
        </Button>
      </div>
    </div>
  );
};
