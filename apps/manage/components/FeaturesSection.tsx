import Image from "next/image";
import { Tab } from "@headlessui/react";
import cn from "classnames";

const features = [
  {
    title: "Bookings and availability",
    description:
      "You enter bookings into the system, not the booker. This way, you stay in control of the availability of your vacation home.",
    image: "https://via.placeholder.com/208x179",
  },
  {
    title: "Sharing",
    description:
      "Details about your vacation home shouldn't have to be public. Share it with exactly who you want, when you want to.",
    image: "https://via.placeholder.com/208x179",
  },
  {
    title: "Notifications",
    description:
      "We'll send customised notifications to bookers based on their booking, but only if you want us to.",
    image: "https://via.placeholder.com/208x179",
  },
];

export const FeaturesSection = () => {
  return (
    <section
      aria-label="Features for managing your vacation home"
      className="relative overflow-hidden bg-teal-600 pt-20 pb-28 sm:py-32"
      id="features"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Everything you need to manage your vacation home.
          </h2>
          <p className="mt-6 text-lg tracking-tight text-teal-100">
            Managing your vacation home should not feel like work. We give you
            the right amount of control and take care of the rest.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
          <Tab.Group vertical>
            <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
              <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                {({ selectedIndex }) =>
                  features.map(({ description, title }, index) => (
                    <div
                      className={cn(
                        "group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6",
                        selectedIndex === index
                          ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10"
                          : "hover:bg-white/10 lg:hover:bg-white/5"
                      )}
                      key={title}
                    >
                      <h3>
                        <Tab
                          className={cn(
                            "font-display text-lg [&:not(:focus-visible)]:focus:outline-none lg:text-white",
                            selectedIndex === index
                              ? "text-teal-600"
                              : "text-teal-100 hover:text-white"
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl"></span>
                          {title}
                        </Tab>
                      </h3>
                      <p
                        className={cn(
                          "mt-2 hidden text-sm lg:block",
                          selectedIndex === index
                            ? "text-white"
                            : "text-teal-100 group-hover:text-white"
                        )}
                      >
                        {description}
                      </p>
                    </div>
                  ))
                }
              </Tab.List>
            </div>
            <Tab.Panels className="lg:col-span-7">
              {features.map(({ description, image, title }) => (
                <Tab.Panel key={title}>
                  <div className="relative sm:px-6 lg:hidden">
                    <div className="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl"></div>
                    <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                      {description}
                    </p>
                  </div>
                  <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-teal-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                    <Image
                      alt=""
                      className="w-full"
                      src={image}
                      width={2174}
                      height={1464}
                    />
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
};
