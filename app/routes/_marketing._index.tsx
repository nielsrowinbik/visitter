import Balancer from "react-wrap-balancer";
import { Icon } from "~/components/Icon";
import { Link } from "@remix-run/react";
import type { V2_MetaDescriptor } from "@remix-run/node";

export function meta(): V2_MetaDescriptor[] {
  return [{ title: "Visitter" }];
}

export default function Index() {
  return (
    <main className="space-y-24">
      <section className="prose prose-lg prose-zinc mt-36 dark:prose-invert md:prose-xl lg:prose-2xl prose-p:font-medium prose-p:text-[var(--tw-prose-headings)] md:max-w-lg lg:max-w-xl xl:max-w-2xl xl:prose-h1:text-7xl">
        <h1>
          <Balancer>The easiest way to run your vacation home</Balancer>
        </h1>
        <p>
          Visitter is a no-nonsense vacation home availability management tool
          focused on a fast and delightful user experience.
        </p>
        <div className="not-prose mt-16 flex gap-4 text-base">
          <button className="inline-flex items-center gap-3 rounded-full bg-zinc-100 px-7 py-4 font-semibold shadow-sm transition-colors dark:bg-zinc-800">
            <Icon.Play className="h-5 w-5" />
            Watch video
          </button>
          <Link
            className="inline-flex items-center gap-3 rounded-full bg-blue-500 px-7 py-4 font-semibold text-white shadow-sm transition-colors"
            to="/login"
          >
            Get started
          </Link>
        </div>
      </section>
      <section>
        <div className="shadow-huge flex aspect-video overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 lg:rounded-3xl">
          <video
            autoPlay
            className="m-0 h-full w-full"
            loop
            playsInline
          ></video>
        </div>
      </section>
      <section className="prose prose-zinc max-w-none dark:prose-invert lg:prose-lg prose-h2:!mt-0 prose-h2:mb-0 prose-h2:text-xl prose-h2:font-semibold last-of-type:prose-p:mb-0 md:prose-h2:w-2/3 md:prose-h2:text-2xl md:prose-p:w-2/3 lg:prose-h2:mb-3 lg:prose-h2:w-full lg:prose-h2:text-2xl lg:prose-p:w-full xl:prose-h2:text-3xl">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col rounded-2xl bg-zinc-100 dark:bg-zinc-800 lg:col-span-2 lg:flex-row lg:rounded-3xl">
            <div className="p-6 lg:p-12">
              <h2>Fast & delightful</h2>
              <p>
                Add a period of unavailability is as easy as one, two, three.
              </p>
            </div>
            <video
              autoPlay
              className="m-0 h-full flex-auto"
              loop
              playsInline
            ></video>
          </div>
          <div className="flex flex-col rounded-2xl bg-zinc-100 dark:bg-zinc-800 lg:rounded-3xl">
            <div className="p-6 lg:p-12">
              <h2>Share with whomever</h2>
              <p>
                Quickly and easily create links to share the availability of
                your vacation homes.
              </p>
            </div>
            <video
              autoPlay
              className="m-0 w-full flex-auto"
              loop
              playsInline
            ></video>
          </div>
          <div className="flex flex-col rounded-2xl bg-zinc-100 dark:bg-zinc-800 lg:rounded-3xl">
            <div className="p-6 lg:p-12">
              <h2>Booking requests</h2>
              <p>
                Receive booking <i>requests</i>, not bookings. Or not.
                You&apos;re in control.
              </p>
            </div>
            <video
              autoPlay
              className="m-0 w-full flex-auto"
              loop
              playsInline
            ></video>
          </div>
        </div>
      </section>
      {/* <section>
        <HomeRegisterForm />
      </section> */}
    </main>
  );
}
