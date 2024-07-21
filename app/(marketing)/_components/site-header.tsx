"use client";

import Link from "next/link";
import { Spinner } from "@/components/spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

export function SiteHeader() {
  const { isAuthenticated, isLoading} = useConvexAuth();

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full translate-y-[-1rem] animate-fade-in opacity-0 bg-white border-b [--animation-delay:600ms]">
        <div className="container flex h-[3.5rem] px-18 items-center justify-between">
          <Link className="text-xl font-semibold flex items-center" href="/">
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
          <div className="justify-end w-full flex items-center gap-x-2">
                {isLoading && (
                    <Spinner />
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button className="rounded-xl" variant="ghost" size="sm">
                                Log in
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button className="rounded-xl" size="sm">
                                Sign up
                            </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button className="rounded-xl" variant="ghost" size="sm" asChild>
                            <Link href="/home">
                                Enter Notology
                            </Link>
                        </Button>
                        <UserButton 
                            afterSignOutUrl="/"
                        />
                    </>
                )}
            </div>
        </div>
      </header>
    </>
  );
}