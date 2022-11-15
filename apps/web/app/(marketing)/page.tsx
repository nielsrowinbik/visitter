import { Icon } from "@/components/Icon";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/session";

// TODO: Extract elements to components
// TODO: Consider creating this page from a markdown file too

export default async function IndexPage() {
  const session = await getSession();

  return (
    <main className="prose prose-lg prose-zinc mt-56 space-y-56 text-center prose-p:font-medium prose-ul:font-medium dark:prose-invert sm:prose-xl md:prose-2xl">
      <section>
        <h1>The easiest way to run your vacation home</h1>
        <p>
          Look, we get it: your vacation home is something special. It&apos;s
          your prized possession. You don&apos;t want to just rent it out to{" "}
          <i>anyone</i>, and when you do, you want the <i>visitor</i> to take
          care of it, to <i>sit</i> on it, as it were.
        </p>
        <p>
          With <strong>Visitter</strong>, you control your vacation home&apos;s
          availability and who gets to see it. You are the one who logs bookings
          and determines what visitors (or, Visitters, as we like to call them)
          need to do to take care of your vacation home. Everything else,
          though, we&apos;ll sort out for you.
        </p>
        <div className="flex flex-col items-center justify-center space-y-3 md:flex-row md:items-start md:space-x-3 md:space-y-0">
          <div
            className={cn("flex flex-col items-center space-y-1", {
              hidden: !!session,
            })}
          >
            <Link
              className="inline-flex items-center space-x-1 rounded-full bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:ring-offset-0"
              href="/get-started"
            >
              Get started for free
            </Link>
            <div className="not-prose">
              <ul className="mt-1 flex space-x-3 text-xs md:text-sm">
                <li>No credit card</li>
                <li>No time limit</li>
              </ul>
            </div>
          </div>
          <Link
            className={cn(
              "inline-flex items-center space-x-1 rounded-full bg-transparent px-4 py-2 text-current no-underline hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:ring-offset-0",
              {
                hidden: !!session,
              }
            )}
            href="#how-it-works"
          >
            <Icon.ArrowDownCircle className="h-10 w-10" />
            <span className="font-medium">Learn how it works</span>
          </Link>
          <Link
            className={cn(
              "inline-flex items-center space-x-1 rounded-full bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:ring-offset-0",
              {
                hidden: !session,
              }
            )}
            href="/homes"
          >
            Go to the dashboard
          </Link>
        </div>
      </section>
      <section>
        <h2>Here&apos;s how it works</h2>
        <h3>Add your vacation home</h3>
        <p>
          After signing up, you&apos;ll create your first vacation home within
          Visitter. Add all the details you want, or do it later. You decide.
        </p>
        <h3>Add some bookings</h3>
        <p>
          It doesn&apos;t matter if you&apos;re actually renting out the home,
          using it yourself, or if it&apos;s not winter-proof: periods of
          unavailability are logged as bookings within Visitter.
        </p>
        <h3>Share availability (or not)</h3>
        <p>
          Turn on and off sharing your vacation home&apos;s availability with a
          simple click. Share with whoever you want, whenever you want.
        </p>
        <h3>More features coming soon</h3>
        <p>We&apos;re working on many more handy features. Stay tuned!</p>
      </section>
      <section>
        <h2>Pricing</h2>
        <p>
          We like to keep things simple, and that includes our pricing options.
        </p>
        <div className="mx-auto max-w-3xl space-y-2 text-left">
          <div className="rounded-tl-[6rem] bg-blue-50 px-16 py-10 text-blue-600">
            <h3 className="!mt-0 text-inherit">Free</h3>
            <div className="not-prose mb-6 font-medium">
              <ul>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-1 inline h-[1.25em] w-[1.25em]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>All current and future features</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-1 inline h-[1.25em] w-[1.25em]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Manage one vacation home</span>
                </li>
              </ul>
            </div>
            <Link
              className="inline-block rounded-3xl bg-blue-500 px-3 py-1 font-bold text-white no-underline hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:ring-offset-0"
              href="/get-started"
            >
              Get started
            </Link>
          </div>
          <div className="rounded-br-[6rem] bg-pink-50 px-20 py-10 text-pink-600">
            <h3 className="!mt-0 text-inherit">Coming soon</h3>
            <div className="not-prose mb-6 font-medium">
              <ul>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-1 inline h-[1.25em] w-[1.25em]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Everything in free</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="mr-1 inline h-[1.25em] w-[1.25em]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Unlimited vacation homes</span>
                </li>
              </ul>
            </div>
            <Link
              className="inline-block rounded-3xl bg-pink-500 px-3 py-1 font-bold text-white no-underline hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-500/40 focus:ring-offset-0"
              href="/get-started"
            >
              Express interest
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-xl text-center">
          <h2>Ready to take control of your vacation home?</h2>
          <p>
            <Link
              className={cn(
                "inline-flex items-center space-x-1 rounded-full bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:ring-offset-0",
                { hidden: !!session }
              )}
              href="/get-started"
            >
              Get started for free
            </Link>
            <Link
              className={cn(
                "inline-flex items-center space-x-1 rounded-full bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:ring-offset-0",
                {
                  hidden: !session,
                }
              )}
              href="/homes"
            >
              Go to the dashboard
            </Link>
          </p>
        </div>
      </section>
      <footer className="prose prose-lg prose-zinc text-center prose-p:font-medium prose-ul:font-medium dark:prose-invert sm:prose-xl md:prose-2xl">
        <div className="mx-auto max-w-xl pb-6 text-center">
          <h4>We hope you have a wonderful day!</h4>
          <p>
            Need help? We&apos;re opening a support e-mail address soon!
            {/* Email <a href="mailto:support@visitter.app">support@visitter.app</a> */}
          </p>
        </div>
      </footer>
    </main>
  );
}
