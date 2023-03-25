"use client";

import { Fragment, useState } from "react";
import { Interval, format, isBefore, isSameDay } from "date-fns";
import { Popover, Transition } from "@headlessui/react";
import { cn, formatDate, isWithinNullableInterval } from "@/lib/utils";

import { Calendar } from "@/components/Calendar";
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
  value?: Nullable<Interval>;
};

export function DateRangeInput({
  children,
  onStartDateChange,
  onEndDateChange,
  value = {
    start: null,
    end: null,
  },
}: RangeInputProps) {
  const [focus, setFocus] = useState<"startDate" | "endDate" | undefined>();
  const [range, setRange] = useState<Nullable<Interval>>(value);

  useDidMountEffect(() => {
    if (onStartDateChange) onStartDateChange(range.start);
  }, [range.start]);

  useDidMountEffect(() => {
    if (onEndDateChange) onEndDateChange(range.end);
  }, [range.end]);

  useDidMountEffect(() => {
    if (!isNull(range.end)) setFocus(undefined);
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
            ? formatDate(range.start, { includeMonth: true, includeYear: true })
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
            ? formatDate(range.end, { includeMonth: true, includeYear: true })
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
          <Calendar>
            {({ className, day }) => {
              const isRangeStart = isSameDay(day, range.start!);
              const isRangeEnd = isSameDay(day, range.end!);

              return (
                <div
                  aria-label={format(day, "d, EEEE, MMMM yyyy")}
                  className={cn(
                    className,
                    "grid h-8 w-full place-content-center",
                    {
                      "bg-zinc-100 dark:bg-zinc-800": isWithinNullableInterval(
                        day,
                        range
                      ),
                      "rounded-l-full bg-transparent bg-gradient-to-r from-[transparent_50%] to-[#f4f4f5_50%] dark:bg-transparent dark:to-[#27272a_50%]":
                        isRangeStart && !isNull(range.end),
                      "rounded-r-full bg-transparent bg-gradient-to-l from-[transparent_50%] to-[#f4f4f5_50%] dark:bg-transparent dark:to-[#27272a_50%]":
                        isRangeEnd,
                    }
                  )}
                  key={day.toString()}
                  onClick={() => {
                    setRange(setRangeForDay(day));
                  }}
                  role="button"
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
            }}
          </Calendar>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

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
