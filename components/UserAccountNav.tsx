"use client";

import { Menu, Transition } from "@headlessui/react";
import { SessionProvider, signOut, useSession } from "next-auth/react";

import { Fragment } from "react";
import Link from "next/link";
import { UserAvatar } from "@/components/UserAvatar";

export function UserAccountNav() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <SessionProvider>
          <UserAvatar />
        </SessionProvider>
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
        <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 text-zinc-900 shadow-lg ring-1 ring-zinc-400/20 focus:outline-none dark:bg-zinc-900 dark:text-white">
          <Menu.Item>
            <Link
              className="block px-4 py-2 text-sm hover:cursor-pointer ui-active:bg-zinc-100 dark:ui-active:bg-zinc-800"
              href="/account"
              passHref
            >
              Settings
            </Link>
          </Menu.Item>
          <Menu.Item>
            <div
              className="block px-4 py-2 text-sm hover:cursor-pointer ui-active:bg-zinc-100 dark:ui-active:bg-zinc-800"
              onClick={() => signOut()}
            >
              Sign out
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
