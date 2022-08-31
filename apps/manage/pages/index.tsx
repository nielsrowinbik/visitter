import {
  ArrowCircleDownIcon,
  CheckIcon,
  PlayIcon,
} from "@heroicons/react/outline";

import { Container } from "ui";
import Link from "next/link";
import { Logo } from "@components/Logo";
import classNames from "classnames";
import { useSession } from "next-auth/react";

// TODO: Extract elements to components
// TODO: Improve logo placement

export const Page = () => {
  const { data } = useSession();
  const user = data?.user;

  return (
    <Container className="prose prose-lg max-w-5xl space-y-56 prose-p:font-medium prose-ul:font-medium sm:prose-xl md:prose-2xl">
      <nav>
        <div className="flex">
          <Logo />
        </div>
      </nav>
      <section>
        <div className="mx-auto max-w-3xl text-center">
          {/* <div> */}
          <h1 className="mb-0 mt-32 leading-tight">
            Your vacation home.
            <br />
            You&apos;re in control.
          </h1>
          <p>
            Look, we get it: your vacation home is something special. It&apos;s
            your prized possession. You don&apos;t want to just rent it out to{" "}
            <i>anyone</i>, and when you do, you want the <i>visitor</i> to take
            care of it, to <i>sit</i> on it, as it were.
          </p>
          <p>
            With <strong>Visitter</strong>, <i>you</i> control your vacation
            home&apos;s availability and who gets to see it. <i>You</i> are the
            one who logs bookings and determines what visitors (or, Visitters,
            as we like to call them) need to do to take care of your vacation
            home. Everything else, though, we&apos;ll sort out for you.
          </p>
          <div className="flex flex-col items-center justify-center space-y-3 md:flex-row md:items-start md:space-x-3 md:space-y-0">
            <div className="flex flex-col items-center space-y-1">
              <Link href={!!user ? "/dashboard" : "/get-started"}>
                <a className="inline-flex items-center space-x-1 rounded-full bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:ring-offset-0">
                  {!!user ? "Go to the dashboard" : "Get started for free"}
                </a>
              </Link>
              <div className="not-prose">
                <ul
                  className={classNames(
                    "mt-1 flex space-x-3 text-xs md:text-sm",
                    !!user && "hidden"
                  )}
                >
                  <li>No credit card</li>
                  <li>No time limit</li>
                </ul>
              </div>
            </div>
            <a
              className={classNames(
                "inline-flex items-center space-x-1 rounded-full bg-transparent px-4 py-2 text-current no-underline hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:ring-offset-0",
                !!user && "hidden"
              )}
              href="#how-it-works"
            >
              <ArrowCircleDownIcon className="h-[1.5em] w-[1.5em]" />
              <span className="font-medium">Learn how it works</span>
            </a>
          </div>
        </div>
        {/* </div> */}
      </section>
      <section id="how-it-works">
        <div className="mx-auto max-w-3xl text-center">
          <h2>Here&apos;s how it works</h2>
          {/* TODO: Shoot video, update link, duration below, and unhide */}
          <section className="hidden">
            <h3 className="text-5xl font-bold">Got a minute?</h3>
            <a
              className="inline-flex items-center space-x-1 rounded-full bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:ring-offset-0"
              href="https://youtu.be"
              target="blank"
            >
              <PlayIcon className="h-[1.5em] w-[1.5em]" />
              <span>Take the guided tour</span>
              <span className="text-white text-opacity-60">XXs</span>
            </a>
          </section>
          <section>
            <h3 className="text-5xl font-bold">Add your vacation home</h3>
            <p>
              After signing up, you&apos;ll create your first vacation home
              within Visitter. Add all the details you want, or do it later. You
              decide.
            </p>
          </section>
          <section>
            <h3 className="text-5xl font-bold">Log some bookings</h3>
            <p>
              It doesn&apos;t matter if you&apos;re actually renting out the
              home, using it yourself, or if it&apos;s not winter-proof: periods
              of unavailability are logged as bookings within Visitter.
            </p>
          </section>
          <section>
            <h3 className="text-5xl font-bold">Share availability (or not)</h3>
            <p>
              Turn on and off sharing your vacation home&apos;s availability
              with a simple click. Share with whoever you want, whenever you
              want.
            </p>
          </section>
          <section>
            <h3 className="text-5xl font-bold">More features coming soon</h3>
            <p>We&apos;re working on many more handy features. Stay tuned!</p>
          </section>
        </div>
      </section>
      <section id="pricing">
        <div className="mx-auto max-w-xl text-center">
          <h2>Pricing</h2>
          <p>
            We like to keep things simple, and that includes our pricing
            options.
          </p>
        </div>
        <div className="mx-auto max-w-3xl space-y-2">
          <div className="rounded-tl-[6rem] bg-blue-50 px-16 py-10 text-blue-600">
            <h3 className="!mt-0 text-inherit">Free</h3>
            <div className="not-prose mb-6 font-medium">
              <ul>
                <li className="flex items-center">
                  <CheckIcon className="mr-1 inline h-[1.25em] w-[1.25em]" />
                  <span>All current and future features</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-1 inline h-[1.25em] w-[1.25em]" />
                  <span>Manage one vacation home</span>
                </li>
              </ul>
            </div>
            <Link href="/get-started" passHref>
              <a className="inline-block rounded-3xl bg-blue-500 px-3 py-1 font-bold text-white no-underline hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:ring-offset-0">
                Get started
              </a>
            </Link>
          </div>
          <div className=" rounded-br-[6rem] bg-pink-50 px-20 py-10 text-pink-600">
            <h3 className="!mt-0 text-inherit">
              Coming soon
              {/* <span>&euro;19</span>
              <span className="text-base">/month</span> */}
            </h3>
            <div className="not-prose mb-6 font-medium">
              <ul>
                <li className="flex items-center">
                  <CheckIcon className="mr-1 inline h-[1.25em] w-[1.25em]" />
                  <span>Everything in free</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-1 inline h-[1.25em] w-[1.25em]" />
                  <span>Unlimited vacation homes</span>
                </li>
              </ul>
            </div>
            {/* TODO: Change link to somewhere where users can actually express interest */}
            <Link href="/get-started" passHref>
              <a className="inline-block rounded-3xl bg-pink-500 px-3 py-1 font-bold text-white no-underline hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-500/40 focus:ring-offset-0">
                Express interest
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section id="cta">
        <div className="mx-auto max-w-xl text-center">
          <h2>Ready to take control of your vacation home?</h2>
          <p>
            <Link href={!!user ? "/dashboard" : "/get-started"}>
              <a className="inline-flex items-center space-x-1 rounded-full bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:ring-offset-0">
                {!!user ? "Go to the dashboard" : "Get started for free"}
              </a>
            </Link>
          </p>
        </div>
      </section>
      <footer>
        <div className="mx-auto max-w-xl pb-6 text-center">
          <h4>We hope you have a wonderful day!</h4>
          <p>
            Need help? Email{" "}
            <a href="mailto:support@visitter.app">support@visitter.app</a>
          </p>
        </div>
      </footer>
    </Container>
  );
};

export default Page;
