import {
  add,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  getWeek,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import { cn } from "~/utils";
import { eu } from "date-fns/locale";
import { useState } from "react";

type WeekCalendarProps = {
  className?: string;
  dayInnerClassName?: ((day: Date) => string) | string;
  dayOuterClassName?: ((day: Date) => string) | string;
  indicatorClassName?: string;
  monthsToShow?: 1 | 2;
  onWeekSelect?: (firstDayOfWeek: Date) => void;
  shouldShowIndicator?: (day: Date) => boolean;
  weekdaysClassName?: string;
  weekNumberClassName?: string;
  weekClassName?: ((week: Date[]) => string) | string;
};

function toUTC(date: Date) {
  return new Date(format(date, "yyyy-MM-dd"));
}

export function WeekCalendar({
  className,
  dayInnerClassName,
  dayOuterClassName,
  indicatorClassName,
  monthsToShow = 1,
  onWeekSelect,
  shouldShowIndicator,
  weekdaysClassName,
  weekNumberClassName,
  weekClassName,
}: WeekCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  const months = Array.from({ length: monthsToShow }, (_, i) => {
    const start = add(currentMonth, { months: i });

    const weeks = eachWeekOfInterval(
      {
        start: startOfMonth(start),
        end: endOfMonth(start),
      },
      { locale: eu }
    ).map(toUTC);

    return weeks.map((week) => {
      return eachDayOfInterval({
        start: startOfWeek(week, { locale: eu }),
        end: endOfWeek(week, { locale: eu }),
      }).map(toUTC);
    });
  });

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
          {Array.from({ length: monthsToShow }, (_, i) => {
            return add(currentMonth, { months: i });
          }).map((month) => (
            <h2 key={month.toDateString()}>{format(month, "MMMM yyyy")}</h2>
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
      <div className="grid grid-flow-col">
        {months.map((weeks, i) => (
          <div
            className="last:hidden only:grid sm:last:grid"
            key={`months-${i}`}
          >
            <div className={cn("grid w-full grid-cols-8", weekdaysClassName)}>
              <div></div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            {weeks.map((days, i) => (
              <div
                className={cn(
                  "grid w-full grid-cols-8",
                  getClassName(weekClassName, days)
                )}
                key={`weeks-${i}`}
                onClick={() => onWeekSelect && onWeekSelect(days[0])}
              >
                <div className={cn(weekNumberClassName)}>
                  {getWeek(days[0])}
                </div>
                {days.map((day) => (
                  <div
                    className={cn(
                      "relative",
                      colStartClasses[getDay(day)],
                      { "opacity-40": !isSameMonth(day, currentMonth) },
                      getClassName(dayOuterClassName, day)
                    )}
                    key={format(day, "yyyy-MM-dd")}
                  >
                    <time
                      className={getClassName(dayInnerClassName, day)}
                      dateTime={format(day, "yyyy-MM-dd")}
                    >
                      {format(day, "d")}
                    </time>
                    {!!shouldShowIndicator && shouldShowIndicator(day) && (
                      <span className={indicatorClassName} />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
  "col-start-8",
];

function getClassName<T>(
  prop: ((data: T) => string) | string | undefined,
  data: T
) {
  if (prop === undefined) return "";
  if (typeof prop === "string") return prop;
  else return prop(data);
}
