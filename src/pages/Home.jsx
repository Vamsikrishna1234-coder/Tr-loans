import About from "../components/about";
import FeaturesSection from "../components/features";
import HeroSection from "../components/herosection";
import Lcategories from "../components/Lcategories";
import LoanHeroBanner from "../components/herobanner";
import HowItWorks from "../components/howitworks";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <Lcategories />
      <FeaturesSection />
      <LoanHeroBanner />
      <HowItWorks />
    </main>
  );
}
