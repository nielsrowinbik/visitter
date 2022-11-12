import { Fragment, forwardRef } from "react";
import { Menu, Transition } from "@headlessui/react";

import { ChevronDownIcon } from "@heroicons/react/outline";
import type { Home } from "@prisma/client";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { fetcher } from "@lib/fetch";
import { useRouter } from "next/router";
import useSWR from "swr";

// TODO: This should be a component
// eslint-disable-next-line react/display-name
const LinkItem = forwardRef<any, any>(({ children, href, ...props }, ref) => (
  <Link href={href} passHref>
    <a ref={ref} {...props}>
      {children}
    </a>
  </Link>
));

export const HomeSelector = () => {
  const { data: homes } = useSWR<Home[]>(`/api/homes`, fetcher);
  const { asPath } = useRouter();

  const currentHome = homes?.find(({ id }) => asPath.startsWith(`/${id}`));

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center rounded-md px-3 py-1 font-medium hover:bg-zinc-50">
          <h1>{currentHome?.name}</h1>
          <ChevronDownIcon className="ml-3 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 ">
            <Menu.Item>
              {({ active }) => (
                <LinkItem
                  className={`${
                    active && "bg-zinc-50"
                  } group flex w-full items-center rounded-md px-2 py-2`}
                  href={`/${currentHome?.id}/settings`}
                >
                  Home settings
                </LinkItem>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            {homes?.map(({ id, name }) => (
              <Menu.Item key={id}>
                {({ active }) => (
                  <LinkItem
                    className={`${
                      active && "bg-zinc-50"
                    } group flex w-full items-center rounded-md px-2 py-2`}
                    href={`/${id}`}
                  >
                    {name}
                  </LinkItem>
                )}
              </Menu.Item>
            ))}
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <LinkItem
                  className={`${
                    active && "bg-zinc-50"
                  } group flex w-full items-center rounded-md px-2 py-2`}
                  href="/homes"
                >
                  View all
                </LinkItem>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
