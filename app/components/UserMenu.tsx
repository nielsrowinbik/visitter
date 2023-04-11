import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

import { Icon } from "./Icon";
import { Link } from "@remix-run/react";
import type { User } from "@prisma/client";

type UserMenuProps = {
  user: User;
};

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    if (open) {
      controls.start("open");
    }
  }, [controls, open]);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger className="h-8 w-8 rounded-full border border-transparent bg-zinc-100 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 dark:bg-zinc-700">
        <Avatar.Root className="h-full w-full rounded-full">
          <Avatar.Image
            className="h-full w-full rounded-full object-cover"
            src={user.image || undefined}
            alt={user.name!}
          />
          <Avatar.Fallback>
            <Icon.User className="mx-auto h-4 w-4" />
          </Avatar.Fallback>
        </Avatar.Root>
      </DropdownMenu.Trigger>

      <AnimatePresence>
        {open && (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content
              align="end"
              className="z-50 mt-2 w-48 origin-top-right overflow-hidden rounded bg-white py-1 text-left text-zinc-900 shadow dark:bg-zinc-900 dark:text-white"
              asChild
            >
              <motion.div
                initial="closed"
                animate={controls}
                exit="closed"
                variants={{
                  open: {
                    opacity: 1,
                    scale: 1,
                    transition: { ease: "easeOut", duration: 0.1 },
                  },
                  closed: {
                    opacity: 0,
                    scale: 0.9,
                    transition: { ease: "easeIn", duration: 0.075 },
                  },
                }}
              >
                <DropdownMenu.Item
                  asChild
                  className="block px-4 py-2 text-sm outline-none hover:cursor-pointer hover:bg-zinc-100 focus:bg-zinc-100 hover:dark:bg-zinc-800 focus:dark:bg-zinc-800"
                >
                  <Link to="/account">Settings</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  asChild
                  className="block px-4 py-2 text-sm outline-none hover:cursor-pointer hover:bg-zinc-100 focus:bg-zinc-100 hover:dark:bg-zinc-800 focus:dark:bg-zinc-800"
                >
                  <Link to="/logout">Sign out</Link>
                </DropdownMenu.Item>
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
}
