import Link from "next/link";

export const ProductPageHeader = () => (
  <header className="py-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="relative z-50 flex justify-between">
        <div className="flex items-center md:gap-x-12">
          <Link href="/#" passHref shallow>
            <a aria-label="Home">
              <span>Visitter</span>
            </a>
          </Link>
          <div className="hidden md:flex md:gap-x-6">
            <Link href="/#features" passHref shallow>
              <a className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                Features
              </a>
            </Link>
            <Link href="/#testimonials" passHref shallow>
              <a className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                Testimonials
              </a>
            </Link>
            <Link href="/#pricing" passHref shallow>
              <a className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                Pricing
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-x-5 md:gap-x-8">
          <div className="hidden md:block">
            <Link href="/sign-in" passHref>
              <a className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                Sign in
              </a>
            </Link>
          </div>
          <Link href="/register" passHref>
            <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-teal-600 text-white hover:text-slate-100 hover:bg-teal-500 active:bg-teal-800 active:text-teal-100 focus-visible:outline-teal-600">
              <span>
                Get started <span className="hidden lg:inline">today</span>
              </span>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  </header>
);
