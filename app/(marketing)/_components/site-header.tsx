"use client";

import Link from "next/link";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

export function SiteHeader() {
  const { isAuthenticated, isLoading} = useConvexAuth();

  return (
    <>
      <header className="fixed left-0 py-1 top-0 z-50 w-full translate-y-[-1rem] animate-fade-in opacity-0 bg-white border-b [--animation-delay:600ms]">
        <div className="container flex h-[3.5rem] items-center justify-between">
          <Link className="text-xl font-semibold flex items-center" href="/">
            notology.
          </Link>
          <div className="flex items-center justify-end w-full gap-x-2">
            {isLoading && (
              <Spinner />
            )}
            {!isAuthenticated && !isLoading && (
              <>
                <SignInButton mode="modal">
                  <Button
                    className="rounded-xl"
                    variant="ghost"
                    size="xs"
                  >
                    Log in
                  </Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button
                    className="rounded-xl"
                    size="xs"
                  >
                    Sign up
                  </Button>
                </SignInButton>
              </>
            )}
            {isAuthenticated && !isLoading && (
              <>
                {/* <Button
                  className="rounded-xl"
                  size="xs"
                  variant="outline"
                  asChild
                >
                  <Link href="/home">
                    Launch app
                  </Link>
                </Button> */}
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