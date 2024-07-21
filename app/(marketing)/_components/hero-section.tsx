"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="hero"
      className="relative mx-auto mt-28 max-w-[80rem] px-6 pb-6 text-center md:px-8"
    >
      <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-5xl md:text-6xl lg:text-7xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        Study smarter,
        <br className="hidden md:block" />not harder
      </h1>
      <p className="mb-8 text-lg tracking-tight text-primary md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        Beautifully designed, animated components and templates built with
        <br className="hidden md:block" /> Tailwind CSS, React, and Framer
        Motion.
      </p>
      <Button className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
        Join the waitlist!
      </Button>

      <div
        ref={ref}
        className="relative mt-[8rem] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] max-w-4xl mx-auto"
      >
        <div
          className={`rounded-xl border border-white/50 bg-white bg-opacity-[0.01] ${
            inView ? "before:animate-image-glow" : ""
          }`}
          style={{
            "--color-one": "#000000",
            "--color-two": "#EBEBE4"
          } as React.CSSProperties}
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
