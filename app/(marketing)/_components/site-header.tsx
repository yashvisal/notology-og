"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SiteHeader() {
  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b backdrop-blur-[12px]">
        <div className="container flex h-[3.5rem] items-center justify-between">
          <Link className="text-semibold flex items-center" href="/">
            Notology
          </Link>
          <div className="ml-auto flex h-full items-center">
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
          </div>
        </div>
      </header>
    </>
  );
}