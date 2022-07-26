import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import type { ReactNode } from "react";

interface ToggleProps {
  checked: boolean;
  disabled?: boolean;
  description?: ReactNode;
  isSaving?: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

export const Toggle = ({
  checked,
  description,
  disabled,
  isSaving,
  label,
  onChange,
  ...props
}: ToggleProps) => {
  return (
    <div className="">
      <label className="mb-3 font-medium">{label}</label>
      <p className="mb-3 text-sm text-zinc-500">{description}</p>
      <div className="flex items-center space-x-5">
        {checked ? (
          <span className="flex items-center space-x-1 text-green-700">
            <Icon.Checkmark className="h-5 w-5" />
            <span>Enabled</span>
          </span>
        ) : (
          <span className="text-zinc-600">Not enabled</span>
        )}
        <Button
          disabled={isSaving || disabled}
          onClick={() => onChange(!checked)}
          variant={checked ? "danger" : "outline"}
          {...props}
        >
          {isSaving ? (
            <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {checked ? "Disable" : "Enable"}
        </Button>
      </div>
    </div>
  );
};
