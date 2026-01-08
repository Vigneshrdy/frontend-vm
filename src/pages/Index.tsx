import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AudienceSection from "@/components/home/AudienceSection";
import VisionSection from "@/components/home/VisionSection";
import CTASection from "@/components/home/CTASection";
import LegalAIShowcase from "@/components/ui/legal-ai-showcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <LegalAIShowcase />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <AudienceSection />
        <VisionSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
