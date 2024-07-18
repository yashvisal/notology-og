"use client";

import Link from "next/link";

export function SiteHeader() {
  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full translate-y-[-1rem] animate-fade-in opacity-0 bg-white border-b [--animation-delay:600ms]">
        <div className="container flex h-[3.5rem] px-18 items-center justify-between">
          <Link className="text-xl font-bold flex items-center" href="/">
            notology.
          </Link>
          {/* <div className="ml-auto flex h-full items-center">
            <Link className="mr-6 text-sm" href="/signin">
              Log in
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "mr-6 text-sm"
              )}
              href="/signup"
            >
              Sign up
            </Link>
          </div> */}
        </div>
      </header>
    </>
  );
}