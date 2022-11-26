"use client";

import { Menu, Transition } from "@headlessui/react";

import type { Booking } from "database";
import { BookingDeleteButton } from "@/components/BookingDeleteButton";
import { Button } from "./Button";
import { Fragment } from "react";
import type { HTMLAttributes } from "react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

interface BookingOperationsProps extends HTMLAttributes<HTMLDivElement> {
  bookingId: Booking["id"];
}

export function BookingOperations({ bookingId }: BookingOperationsProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>
        <Button square variant="subtle">
          <Icon.Dots className="h-4 w-4" />
        </Button>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-md bg-white py-1 text-zinc-900 shadow-lg ring-1 ring-zinc-400/20 focus:outline-none dark:bg-zinc-900 dark:text-white">
          {/* <Menu.Item>
            {({ active }) => (
              <div
                className={cn(
                  active ? "bg-zinc-100 dark:bg-zinc-800" : "",
                  "block px-4 py-2 text-sm hover:cursor-pointer"
                )}
              >
                Edit
              </div>
            )}
          </Menu.Item> */}
          <Menu.Item>
            {({ active }) => (
              <BookingDeleteButton
                className={cn({ "bg-zinc-100 dark:bg-zinc-800": active })}
                bookingId={bookingId}
              />
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
