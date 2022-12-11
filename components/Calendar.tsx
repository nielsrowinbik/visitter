"use client";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isWithinInterval,
  parse,
  parseISO,
  startOfDay,
  startOfToday,
} from "date-fns";

import { Icon } from "@/components/Icon";
import type { Interval } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CalendarProps {
  bookings?: Array<{
    startDate: string;
    endDate: string;
  }>;
  monthsToShow?: number;
  ranges?: Interval[];
}

export default function Calendar({
  monthsToShow = 1,
  ...props
}: CalendarProps) {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const months = Array.from({ length: monthsToShow }, (_, i) => {
    const start = add(firstDayCurrentMonth, { months: i });

    return eachDayOfInterval({
      start,
      end: endOfMonth(start),
    });
  });

  const bookings = props.bookings ? props.bookings.map(toInterval) : [];

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className="not-prose mx-auto max-w-md px-4 sm:px-7 md:max-w-4xl md:px-6">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <Icon.ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <Icon.ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-flow-row grid-cols-1 gap-16 md:grid-cols-2">
        {months.map((days) => (
          <div key={format(days[0], "MMMM yyyy")}>
            <h2 className="text-center font-semibold text-gray-900">
              {format(days[0], "MMMM yyyy")}
            </h2>
            <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-y-5 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={cn(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "peer mx-auto flex h-8 w-full items-center justify-center",
                    {
                      "rounded-full bg-red-500 font-medium text-white [&:has(+.bg-red-500)]:rounded-r-none [&+.bg-red-500]:rounded-l-none":
                        isWithinIntervals(day, bookings),
                    }
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const colStartClasses = [
  "",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];

function toInterval({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  return {
    start: startOfDay(parseISO(startDate)),
    end: startOfDay(parseISO(endDate)),
  };
}

function isWithinIntervals(date: Date | number, intervals: Interval[]) {
  return intervals.some((interval) => isWithinInterval(date, interval));
}
