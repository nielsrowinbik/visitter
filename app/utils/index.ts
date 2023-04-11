import { format, isSameMonth, isSameYear, isThisYear } from "date-fns";

import type { ClassValue } from "clsx";
import type { FormEvent } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function confirmSubmit(message: string) {
  return function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (!confirm(message)) {
      event.preventDefault();
    }
  };
}

export function formatDate(date: Date | number): string {
  return format(date, "MMMM d yyyy");
}

export function formatDateInterval(
  start: Date | number,
  end: Date | number
): string {
  const startFormat = ["MMMM", "d", !isSameYear(start, end) ? "yyyy" : ""].join(
    " "
  );
  const endFormat = [!isSameMonth(start, end) ? "MMMM" : "", "d", "yyyy"].join(
    " "
  );

  return `${format(start, startFormat)} - ${format(end, endFormat)}`;
}

export function toObject(formData: FormData): { [key: string]: unknown } {
  return Array.from(formData.entries()).reduce(
    (memo, [key, value]) => ({
      ...memo,
      [key]: value,
    }),
    {}
  );
}
