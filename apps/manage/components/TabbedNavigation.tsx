import type { PropsWithChildren, ReactNode } from "react";

import Link from "next/link";
import type { LinkProps } from "next/link";
import cn from "classnames";
import { isString } from "lodash";
import { useRouter } from "next/router";

type NavigationItemProps = {
  exact?: boolean;
} & LinkProps;

const NavigationItem = ({
  children,
  exact,
  ...props
}: PropsWithChildren<NavigationItemProps>) => {
  const { asPath } = useRouter();
  const isActive = exact
    ? asPath === props.href
    : isString(props.href) && asPath.startsWith(props.href);

  return (
    <Link passHref {...props}>
      <a
        className={cn(
          "whitespace-nowrap border-b pb-4 pt-2 leading-none transition sm:px-4",
          isActive
            ? "border-blue-500 font-semibold"
            : "border-transparent hover:border-gray-400 dark:hover:border-gray-600"
        )}
      >
        {children}
      </a>
    </Link>
  );
};

type Props = {
  items?: {
    exact?: boolean;
    href: LinkProps["href"];
    label: ReactNode;
  }[];
};

export const TabbedNavigation = ({ items }: Props) => (
  <div className="-mb-px flex space-x-3 overflow-x-auto sm:space-x-0">
    {items?.map(({ exact, href, label }) => (
      <NavigationItem exact={exact} href={href}>
        {label}
      </NavigationItem>
    ))}
  </div>
);
