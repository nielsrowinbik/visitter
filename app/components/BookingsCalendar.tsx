import {
  areIntervalsOverlapping,
  endOfWeek,
  isSameDay,
  isSameWeek,
  isToday,
  isWithinInterval,
  startOfToday,
  startOfWeek,
} from "date-fns";

import type { Booking } from "@prisma/client";
import { BookingsList } from "~/components/BookingsList";
import { WeekCalendar } from "~/components/WeekCalendar";
import { cn } from "~/utils";
import { eu } from "date-fns/locale";
import { useState } from "react";

type BookingsCalendarProps = {
  bookings: Booking[];
};

export function BookingsCalendar({ bookings }: BookingsCalendarProps) {
  const today = startOfToday();
  const [selectedWeek, setSelectedWeek] = useState(
    startOfWeek(today, { locale: eu })
  );

  const selectedWeekBookings = bookings.filter((booking) =>
    areIntervalsOverlapping(
      {
        start: startOfWeek(selectedWeek, { locale: eu }),
        end: endOfWeek(selectedWeek, { locale: eu }),
      },
      {
        start: booking.startDate,
        end: booking.endDate,
      }
    )
  );

  return (
    <div className="mb-10 space-y-6 lg:flex lg:space-y-0">
      <div className="flex-1 lg:mr-10">
        <BookingsList bookings={selectedWeekBookings} />
      </div>
      <div className="w-full lg:max-w-[32%]">
        <WeekCalendar
          className="text-sm"
          dayOuterClassName="grid place-items-center"
          dayInnerClassName={(day: Date) =>
            cn("w-8 h-8 rounded-full grid place-items-center", {
              "font-bold text-blue-500 bg-blue-300/20": isToday(day),
              "text-blue-500": isToday(day) && isSameWeek(day, selectedWeek),
            })
          }
          shouldShowIndicator={(day: Date) => isWithinIntervals(day, bookings)}
          indicatorClassName="absolute w-1 h-1 bg-red-500 rounded-full top-3/4"
          weekdaysClassName="text-xs text-zinc-500 text-center"
          weekNumberClassName="text-xs text-inherit text-center opacity-40 grid place-items-center h-8 w-8"
          weekClassName={(week) =>
            cn(
              "hover:cursor-pointer my-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md",
              {
                "bg-zinc-600 dark:bg-zinc-700 text-white pointer-events-none":
                  isSameDay(week[0], selectedWeek),
              }
            )
          }
          onWeekSelect={(day) => setSelectedWeek(day)}
        />
      </div>
    </div>
  );
}

function isWithinIntervals(date: Date | number, bookings: Booking[]): boolean {
  return bookings
    .map(({ startDate, endDate }) => ({ start: startDate, end: endDate }))
    .map((interval) => isWithinInterval(date, interval))
    .some((val) => val === true);
}
