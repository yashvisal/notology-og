import HeroSection from "./_components/hero-section";
import { GridPattern } from "@/components/magicui/animated-grid-pattern";

export default async function Page() {
  return (
    <>
      <div className="fixed inset-0 -z-10 blur-[7px]">
        <GridPattern
          maxOpacity={0.04}
          width={75}
          height={75}
          numSquares={100}
          duration={1}
          repeatDelay={1}
        />
      </div>
      <HeroSection />
      {/* <ClientSection />
      <SphereMask />
      <PricingSection />
      <CallToActionSection />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#000000"}
      /> */}
    </>
  );
}