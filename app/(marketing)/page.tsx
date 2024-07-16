import ClientSection from "@/components/landing/client-section";
import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/landing/hero-section";
import PricingSection from "@/components/landing/pricing-section";
import Particles from "@/components/magicui/particles";
import { SphereMask } from "@/components/magicui/sphere-mask";

export default async function Page() {
  return (
    <>
      <HeroSection />
      {/* <ClientSection />
      <SphereMask />
      <PricingSection />
      <CallToActionSection /> */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
    </>
  );
}


// import Heading from "./_components/heading";

// const MarketingPage = () => {
//     return (
//         <div className="min-h-full flex flex-col">
//             <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
//                 <Heading />
//             </div>
//         </div>
//     );
// }
 
// export default MarketingPage;