import HeroSection from "./_components/hero-section";
import { GridPattern } from "@/components/magicui/animated-grid-pattern";

export default async function Page() {
  return (
    <>
      <div className="fixed inset-0 -z-10 blur-[5px]">
        <GridPattern
          maxOpacity={0.05}
          width={65}
          height={65}
          numSquares={150}
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