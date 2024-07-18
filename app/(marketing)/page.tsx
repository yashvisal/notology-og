import Particles from "@/components/magicui/particles";
import Heading from "./_components/heading";
import HeroSection from "./_components/hero-section";

export default async function Page() {
    return (
        <>
            <HeroSection />
            <Particles
                className="absolute inset-0 -z-10"
                quantity={50}
                ease={70}
                size={0.05}
                staticity={40}
                color={"#000000"}
            />
        </>
    );
}