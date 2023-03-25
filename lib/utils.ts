import {
  addDays,
  format,
  getTime,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameYear,
  isThisYear,
  isWithinInterval,
} from "date-fns";
import { every, isNull, isUndefined, reduce, some, sortBy } from "lodash";

import type { ClassValue } from "clsx";
import type { Interval } from "date-fns";
import type { Nullable } from "types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_URL}${path}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function flattenIntervals(intervals: Interval[]): Interval[] {
  const sorted = sortBy(intervals, (o) => getTime(o.start));

  return reduce(
    sorted,
    // @ts-ignore
    (acc: Interval[], curr: Interval) => {
      if (acc.length === 0) return [curr];

      const prev = acc.pop();

      // Current range is completely inside previous:
      if (isBefore(curr.end, prev!.end) || isSameDay(curr.end, prev!.end)) {
        return [...acc, prev];
      }

      // Current range overlaps previous. Merges overlapping (<),
      // contiguous (==), and adjacent ranges:
      if (
        isBefore(curr.start, prev!.end) ||
        isSameDay(curr.start, prev!.end) ||
        isSameDay(curr.start, addDays(prev!.end, 1))
      ) {
        return [...acc, { start: prev?.start, end: curr.end }];
      }

      // Ranges do not overlap:

      return [...acc, prev, curr];
    },
    []
  );
}

type FormatOptions = {
  includeMonth?: boolean;
  includeYear?: boolean;
};

export function formatDate(
  input: Date | number,
  options: FormatOptions = {}
): string {
  const { includeMonth, includeYear } = options;

  const shouldIncludeMonth =
    includeMonth === true ||
    (isUndefined(includeMonth) && !isSameMonth(input, new Date()));
  const shouldIncludeYear =
    includeYear === true ||
    (isUndefined(includeYear) && !isSameYear(input, new Date()));

  const formatString = [
    shouldIncludeMonth ? "MMMM" : "",
    "d",
    shouldIncludeYear ? "yyyy" : "",
  ].join(" ");

  return format(input, formatString).replace(/\s(?=\s)/g, "");
}

export function formatNullableInterval(interval: Nullable<Interval>): string {
  const isFull = !some(interval, isNull);
  const { start, end } = interval;

  // Both ends of the interval defined, return a formatted string:
  if (isFull) {
    const formattedStart = formatDate(start!, {
      includeMonth: true,
      includeYear: !isSameYear(start!, end!),
    });
    const formattedEnd = formatDate(end!, {
      includeMonth: !isSameMonth(start!, end!),
      includeYear: true,
    });

    return [formattedStart, "-", formattedEnd]
      .join(" ")
      .replace(/\s(?=\s)/g, "");
  }

  // Only the start is defined, return a formatted string:
  if (!isNull(interval.start) && isNull(interval.end))
    return formatDate(interval.start, { includeMonth: true });

  // Return an empty string if none of the dates are defined or when only the end is:
  return "";
}

export function getClientOrigin() {
  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL;
  } else {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
}

function isNotThisYear(date: Date | number) {
  return !isThisYear(date);
}

export function isWithinIntervals(
  date: Date | number,
  intervals: Interval[]
): boolean {
  return intervals
    .map((interval) => isWithinInterval(date, interval))
    .some((val) => val === true);
}

export function isWithinNullableInterval(
  date: Date | number,
  interval: Nullable<Interval>
) {
  if (some(interval, isNull)) return false;
  return isWithinInterval(date, interval as Interval);
}
