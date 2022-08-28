import { ChevronRightIcon } from "@heroicons/react/outline";
import type { User } from "@prisma/client";
import classNames from "classnames";
import { fetcher } from "@lib/fetch";
import useSWR from "swr";

const statusStyles = {
  true: "bg-green-100 text-green-800",
  false: "bg-gray-100 text-gray-800",
};

export const UsersList = () => {
  const { data: users } = useSWR<User[]>("/api/users", fetcher);

  return (
    <>
      {/* {/* Activity list (smallest breakpoint only) */}
      <div className=" sm:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 overflow-hidden  sm:hidden"
        >
          {users?.map((user) => {
            return (
              <li key={user.email}>
                <a className="block bg-white px-4 py-4 hover:bg-gray-50">
                  <span className="flex items-center space-x-4">
                    <span className="flex flex-1 space-x-2 truncate">
                      <span className="flex flex-col truncate text-sm text-gray-500">
                        <span className="truncate">{user.email}</span>
                        <span>{user.name}</span>
                        <span
                          className={classNames(
                            statusStyles[user.emailVerified ? "true" : "false"],
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                          )}
                        >
                          {user.emailVerified ? "Verified" : "Not Verified"}
                        </span>
                      </span>
                    </span>
                    <ChevronRightIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Activity table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle ">
              <table className="min-w-full">
                <thead className="rounded-md border">
                  <tr className="rounded-md border">
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email
                    </th>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Name
                    </th>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Role
                    </th>
                    <th className="hidden bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:block">
                      Status
                    </th>
                    <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Providers
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white ">
                  {users?.map((user) => (
                    <tr key={user.email} className="bg-white">
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div className="flex">
                          <a className="group inline-flex space-x-2 truncate text-sm">
                            <p className="truncate text-gray-500 group-hover:text-gray-900">
                              {user.email}
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                        {user.role}
                      </td>
                      <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                        <span
                          className={classNames(
                            statusStyles[user.emailVerified ? "true" : "false"],
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                          )}
                        >
                          {user.emailVerified ? "Verified" : "Not Verified"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                        {/* {user?.accounts && user?.accounts?.length > 0 ? (
                          user.accounts.map((account: any) => {
                            // TODO: Add account type
                            return <p>{account.provider}</p>;
                          })
                        ) : (
                          <p>credentials</p>
                        )} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
