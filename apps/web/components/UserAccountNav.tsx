"use client";

import { Menu, Transition } from "@headlessui/react";

import { Fragment } from "react";
import type { HTMLAttributes } from "react";
import Link from "next/link";
import { User } from "next-auth";
import { UserAvatar } from "@/components/UserAvatar";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface UserAccountNavProps extends HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <UserAvatar user={{ name: user.name, image: user.image }} />
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
            {({ active }) => (
              <Link
                className={cn(
                  active ? "bg-zinc-100 dark:bg-zinc-800" : "",
                  "block px-4 py-2 text-sm hover:cursor-pointer"
                )}
                href="/account"
                passHref
              >
                Settings
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                className={cn(
                  active ? "bg-zinc-100 dark:bg-zinc-800" : "",
                  "block px-4 py-2 text-sm hover:cursor-pointer"
                )}
                onClick={() => signOut()}
              >
                Sign out
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
