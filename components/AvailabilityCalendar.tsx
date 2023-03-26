"use client";

import { Interval, isSameDay } from "date-fns";
import { cn, isWithinIntervals } from "@/lib/utils";

import { Calendar } from "@/components/Calendar";
import { format } from "date-fns";
import { some } from "lodash";

type AvailabilityCalendarProps = {
  bookings: Interval[];
};

export function AvailabilityCalendar({ bookings }: AvailabilityCalendarProps) {
  return (
    <Calendar
      className="max-w-3xl space-y-6"
      monthsToShow={2}
      showHistory={false}
    >
      {({ className, day, ...props }) => {
        const isWithinAnInterval = isWithinIntervals(day, bookings);
        const { isIntervalStart, isIntervalEnd } = isIntervalStartOrEnd(
          day,
          bookings
        );

        return (
          <div
            className={cn(className, "grid h-8 w-full place-content-center", {
              "bg-zinc-100 dark:bg-zinc-800": isWithinAnInterval,
              "bg-transparent from-[transparent_50%] to-[#f4f4f5_50%] dark:bg-transparent dark:to-[#27272a_50%]":
                isIntervalStart || isIntervalEnd,
              "rounded-l-full bg-gradient-to-r": isIntervalStart,
              "rounded-r-full bg-gradient-to-l": isIntervalEnd,
            })}
            key={format(day, "yyyy-MM-dd")}
            {...props}
          >
            <time
              className={cn("grid h-8 w-8 place-content-center", {
                "text-zinc-400 dark:text-zinc-600": isWithinAnInterval,
                "rounded-full bg-zinc-100 dark:bg-zinc-800":
                  isIntervalStart || isIntervalEnd,
              })}
              dateTime={format(day, "yyyy-MM-dd")}
            >
              {format(day, "d")}
            </time>
          </div>
        );
      }}
    </Calendar>
  );
}

function isIntervalStartOrEnd(date: Date | number, intervals: Interval[]) {
  const allStarts = intervals.map(({ start }) => start);
  const allEnds = intervals.map(({ end }) => end);

  return {
    isIntervalStart: some(allStarts, (start) => isSameDay(start, date)),
    isIntervalEnd: some(allEnds, (end) => isSameDay(end, date)),
  };
}
