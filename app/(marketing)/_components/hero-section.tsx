"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Spinner } from "@/components/spinner";

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <section
      id="hero"
      className="relative mx-auto mt-24 max-w-[80rem] px-6 pb-6 text-center md:px-8"
    >
      <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter text-transparent text-balance sm:text-5xl md:text-6xl lg:text-7xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        Study smarter,
        <br className="hidden md:block" />
        not harder
      </h1>
      <p className="mb-8 text-lg tracking-tight text-primary font-medium md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        Notology organizes your study materials, provides AI-powered insights tailored to your course, and understands your unique goals.
      </p>
      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] flex justify-center items-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {isAuthenticated ? (
              <Button asChild className="rounded-2xl">
                <Link href="/home">
                  Enter Notology
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button className="rounded-xl">
                  Get Notology!
                </Button>
              </SignInButton>
            )}
          </>
        )}
      </div>

      <div
        ref={ref}
        className="relative mt-[8rem] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] max-w-4xl mx-auto"
      >
        <div
          className={`rounded-xl border border-white/50 bg-white bg-opacity-[0.01] ${
            inView ? "before:animate-image-glow" : ""
          }`}
          style={
            {
              "--color-one": "#000000",
              "--color-two": "#EBEBE4",
            } as React.CSSProperties
          }
        >
          <BorderBeam
            size={200}
            duration={12}
            delay={11}
            colorFrom="var(--color-one)"
            colorTo="var(--color-two)"
          />
          <img
            src="/hero-dark.png"
            alt="Hero Image"
            className="hidden relative w-full h-auto rounded-[inherit] border object-contain dark:block"
          />
          <img
            src="/home-light.jpg"
            alt="Home Image"
            className="block relative w-full h-auto rounded-[inherit] border object-contain dark:hidden"
          />
        </div>
      </div>
    </section>
  );
}