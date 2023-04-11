import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from "date-fns";

import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import type { ReactNode } from "react";
import { cn } from "~/utils";
import { useState } from "react";

type InjectedProps = {
  day: Date;
  className: string;
};

type CalendarProps = {
  children(props: InjectedProps): ReactNode;
  className?: string;
  monthsToShow?: 1 | 2;
};

function toUTC(date: Date) {
  return new Date(format(date, "yyyy-MM-dd"));
}

export function Calendar({
  children,
  className,
  monthsToShow = 1,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  const months = Array.from({ length: monthsToShow }, (_, i) => {
    const start = add(currentMonth, { months: i });

    return eachDayOfInterval({
      start,
      end: endOfMonth(start),
    });
  }).map((days) => days.map(toUTC));

  function previousMonth() {
    setCurrentMonth(startOfMonth(add(currentMonth, { months: -1 })));
  }

  function nextMonth() {
    setCurrentMonth(startOfMonth(add(currentMonth, { months: 1 })));
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Button
          size="square"
          type="button"
          onClick={previousMonth}
          variant="subtle"
        >
          <Icon.ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous month</span>
        </Button>
        <div className="flex flex-auto justify-around">
          {months.map((days, i) => (
            <h2
              className="text-sm last:hidden only:block sm:last:block"
              key={i}
            >
              {format(days[0], "MMMM yyyy")}
            </h2>
          ))}
        </div>
        <Button
          size="square"
          type="button"
          onClick={nextMonth}
          variant="subtle"
        >
          <Icon.ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      <div className="grid grid-flow-col gap-x-6">
        {months.map((days, i) => (
          <div className="last:hidden only:block sm:last:block" key={i}>
            <div className="mb-3 grid w-full grid-cols-7 text-center text-xs leading-6 text-gray-500">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div className="grid w-full grid-cols-7 place-items-center gap-y-2 text-center text-sm">
              {days.map((day, i) =>
                children({
                  className: cn(i === 0 && colStartClasses[getDay(day)]),
                  day,
                })
              )}
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
