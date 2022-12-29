"use client";

import { Fragment, useState } from "react";
import {
  Interval,
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isSameDay,
  parse,
  startOfToday,
} from "date-fns";
import { Popover, Transition } from "@headlessui/react";
import { cn, formatDate, isWithinNullableInterval } from "@/lib/utils";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import type { InputProps } from "@/components/Input";
import type { Nullable } from "types";
import { isNull } from "lodash";
import useDidMountEffect from "@/hooks/use-did-mount-effect";

type InjectedProps = {
  startDateProps: InputProps;
  endDateProps: InputProps;
};

export type DateChangeCallBack = (newDate: Date | number | null) => void;

type RangeInputProps = {
  children(props: InjectedProps): JSX.Element;
  onStartDateChange?: DateChangeCallBack;
  onEndDateChange?: DateChangeCallBack;
};

export function RangeInput({
  children,
  onStartDateChange,
  onEndDateChange,
}: RangeInputProps) {
  const [focus, setFocus] = useState<"startDate" | "endDate" | undefined>();
  const [range, setRange] = useState<Nullable<Interval>>({
    start: null,
    end: null,
  });

  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  useDidMountEffect(() => {
    if (onStartDateChange) onStartDateChange(range.start);
  }, [range.start]);

  useDidMountEffect(() => {
    if (onEndDateChange) onEndDateChange(range.end);
  }, [range.end]);

  return (
    <Popover className="relative">
      {children({
        startDateProps: {
          label: "Start date",
          onFocus: function onStartDateFocus() {
            return setFocus("startDate");
          },
          required: true,
          readOnly: true,
          type: "text",
          value: !isNull(range.start)
            ? formatDate(range.start, { includeMonth: true })
            : "",
        },
        endDateProps: {
          label: "End date",
          onFocus: function onEndDateFocus() {
            return setFocus("endDate");
          },
          readOnly: true,
          required: true,
          type: "text",
          value: !isNull(range.end)
            ? formatDate(range.end, { includeMonth: true })
            : "",
        },
      })}

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={!!focus}
      >
        <Popover.Panel
          className="absolute left-0 z-50 mt-2 w-full origin-top rounded-md bg-white py-1 text-zinc-900 shadow-lg ring-1 ring-zinc-400/20 focus:outline-none dark:bg-zinc-900 dark:text-white"
          static
        >
          <div className="space-y-3 px-3 pt-3 pb-2">
            <div className="flex items-center justify-between">
              <button type="button" onClick={previousMonth}>
                <span className="sr-only">Previous month</span>
                <Icon.ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-sm">{format(days[0], "MMMM yyyy")}</h2>
              <button type="button" onClick={nextMonth}>
                <span className="sr-only">Next month</span>
                <Icon.ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mx-auto grid w-56 grid-cols-[repeat(7,minmax(0,min-content))] text-center text-xs leading-6 text-gray-500">
              <div className="h-8 w-8">M</div>
              <div className="h-8 w-8">T</div>
              <div className="h-8 w-8">W</div>
              <div className="h-8 w-8">T</div>
              <div className="h-8 w-8">F</div>
              <div className="h-8 w-8">S</div>
              <div className="h-8 w-8">S</div>
            </div>
            <div className="mx-auto grid w-56 grid-cols-[repeat(7,minmax(0,min-content))] place-items-center gap-y-2 text-center text-sm">
              {days.map((day, dayIdx) => {
                const isRangeStart = isSameDay(day, range.start!);
                const isRangeEnd = isSameDay(day, range.end!);

                return (
                  <div
                    className={cn(
                      "flex h-8 w-8 justify-center",
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      {
                        "bg-zinc-100 dark:bg-zinc-800":
                          isWithinNullableInterval(day, range),
                        "rounded-l-full": isRangeStart,
                        "rounded-r-full": isRangeEnd,
                      }
                    )}
                    key={day.toString()}
                    onClick={() => {
                      setRange(setRangeForDay(day));
                    }}
                  >
                    <time
                      className={cn(
                        "grid h-8 w-8 cursor-pointer place-content-center rounded-full border-2 border-transparent hover:border-black hover:dark:border-white",
                        {
                          "bg-zinc-800 text-white dark:bg-white dark:text-black":
                            isRangeStart || isRangeEnd,
                        }
                      )}
                      dateTime={format(day, "yyyy-MM-dd")}
                    >
                      {format(day, "d")}
                    </time>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end">
              <Button
                compact
                onClick={() => setFocus(undefined)}
                type="button"
                variant="outline"
              >
                Done
              </Button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
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

function setRangeForDay(day: Date | number) {
  return function setRangeHandler({ start, end }: Nullable<Interval>) {
    // Setting start date:
    if ((isNull(start) && isNull(end)) || (!isNull(start) && !isNull(end))) {
      // Set the start date, keep the (null) end date:
      return {
        start: day,
        end: null,
      };
    }

    // Handle setting end date to before or on start date by flipping them:
    if (isSameDay(day, start!) || isBefore(day, start!)) {
      return {
        start: day,
        end: start,
      };
    }

    // Keep the start date, set the end date:
    return {
      start,
      end: day,
    };
  };
}
