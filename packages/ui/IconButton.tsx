import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  icon: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ icon, ...props }: Props) => (
  <button
    className="h-6 w-6 rounded-md bg-white p-px outline-none hover:bg-zinc-50"
    {...props}
  >
    {icon}
  </button>
);
