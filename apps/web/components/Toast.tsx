"use client";

import type { HTMLAttributes, SVGProps } from "react";
import hotToast, { Toaster as HotToaster } from "react-hot-toast";

import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

export const Toaster = HotToaster;

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
}

export function Toast({ visible, className, ...props }: ToastProps) {
  return (
    <div
      className={cn(
        "min-h-16 mb-2 flex w-[350px] flex-col items-start gap-1 rounded-md bg-white px-6 py-4 shadow-lg",
        visible && "animate-in slide-in-from-bottom-5",
        className
      )}
      {...props}
    />
  );
}

interface ToastIconProps extends Partial<SVGProps<SVGSVGElement>> {
  name: keyof typeof Icon;
}

Toast.Icon = function ToastIcon({ name, className, ...props }: ToastIconProps) {
  const SelectedIcon = Icon[name];

  if (!SelectedIcon) {
    return null;
  }

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
      <SelectedIcon className={cn("h-10 w-10", className)} {...props} />
    </div>
  );
};

interface ToastTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

Toast.Title = function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <p className={cn("font-medium", className)} {...props} />;
};

interface ToastDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

Toast.Description = function ToastDescription({
  className,
  ...props
}: ToastDescriptionProps) {
  return <p className={cn("text-sm opacity-80", className)} {...props} />;
};

interface ToastOpts {
  title?: string;
  message: string;
  type?: "success" | "error" | "default";
  duration?: number;
}

export default function toast(opts: ToastOpts) {
  const { title, message, type = "default", duration = 3000 } = opts;

  // alert(message)

  return hotToast.custom(
    ({ visible }) => (
      <Toast
        visible={visible}
        className={cn({
          "bg-red-600 text-white": type === "error",
          "bg-black text-white": type === "success",
        })}
      >
        <Toast.Title>{title}</Toast.Title>
        {message && <Toast.Description>{message}</Toast.Description>}
      </Toast>
    ),
    { duration }
  );
}
