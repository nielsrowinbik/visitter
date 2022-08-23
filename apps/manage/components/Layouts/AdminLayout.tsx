import { Menu, Transition } from "@headlessui/react";

import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Users", href: "#", current: true },
  { name: "Help", href: "#", current: false },
];

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="min-h-full">
        <div className="flex flex-col flex-1">
          <div className="border-b">
            <div className="relative flex-shrink-0 flex h-16 bg-white">
              <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <button
                  type="button"
                  className="px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 "
                  onClick={() => true}
                >
                  Home
                </button>
                <div className="flex-1 flex"></div>
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-gray-100 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-2 lg:rounded-md lg:hover:bg-gray-50">
                        <UserIcon className="h-6 w-6 rounded-full" />
                        <span className="hidden  text-gray-700 text-sm font-medium lg:block">
                          <span className="sr-only">Open user menu for </span>
                          {/* {user.name ?? user.email} */}
                        </span>
                        <ChevronDownIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => signOut()}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            <div className="relative flex-shrink-0 flex h-16 bg-white">
              <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="flex flex-1 ">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          item.current
                            ? "border-b text-black"
                            : " hover:border-b  hover:border-gray-200 text-gray-600 ",
                          "group flex items-center px-2 py-2 text-sm leading-6 font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <main className="flex-1 pb-8">
            <div className="bg-white ">
              <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="pt-6 pb-2 md:flex md:items-center md:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          <h1 className="text-xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                            Admin
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
