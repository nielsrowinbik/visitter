"use client";

import {
  Toaster as HotToaster,
  toast as hotToast,
  resolveValue,
} from "react-hot-toast";

import type { Toast } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";

export function Toaster() {
  return (
    <HotToaster position="bottom-right">
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className={cn(
            "flex w-80 transform rounded p-4 shadow-lg",
            {
              "bg-white dark:bg-zinc-800": t.type === "blank",
            },
            { "bg-green-500 dark:bg-green-800": t.type === "success" },
            { "bg-red-500 dark:bg-red-800": t.type === "error" }
          )}
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <div className="section-text">{resolveValue(t.message, t)}</div>
        </Transition>
      )}
    </HotToaster>
  );
}

function renderToastContent(title: string, message: string) {
  return function renderToast(t: Toast) {
    return (
      <>
        <h4>{title}</h4>
        <p className="mb-0">{message}</p>
      </>
    );
  };
}

export function toast(title: string, message: string, duration = 3000) {
  return hotToast(renderToastContent(title, message), { duration });
}

toast.success = function successToast(
  title: string,
  message: string,
  duration = 3000
) {
  return hotToast.success(renderToastContent(title, message), { duration });
};

toast.error = function successToast(
  title: string,
  message: string,
  duration = 3000
) {
  return hotToast.error(renderToastContent(title, message), { duration });
};
