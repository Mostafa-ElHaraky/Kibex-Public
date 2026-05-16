"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/home/HeroSection";
import BusinessProblemsSection from "../components/home/BusinessProblemsSection";
import SolutionsSection from "../components/home/SolutionsSection";
import ERPInfrastructureSection from "../components/home/ERPInfrastructureSection";
import HighloadSection from "../components/home/HighloadSection";
import EngineeringApproachSection from "../components/home/EngineeringApproachSection";
import ComparisonSection from "../components/home/ComparisonSection";
import ResultsSection from "../components/home/ResultsSection";
import ResearchHubSection from "../components/home/ResearchHubSection";
import TechArchitectureSection from "../components/home/TechArchitectureSection";
import DefinitionSection from "../components/home/DefinitionSection";
import FAQSection from "../components/home/FAQSection";
import FinalCTASection from "../components/home/FinalCTASection";

export default function HomePage() {
  return (
    <main className="bg-[#0A0A0B]">
      <Header />
      
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. BUSINESS PROBLEMS */}
      <BusinessProblemsSection />

      {/* 3. SOLUTIONS */}
      <SolutionsSection />

      {/* 4. ERP INFRASTRUCTURE */}
      <ERPInfrastructureSection />

      {/* 5. HIGHLOAD */}
      <HighloadSection />

      {/* 6. ENGINEERING APPROACH */}
      <EngineeringApproachSection />

      {/* 7. COMPARISON */}
      <ComparisonSection />

      {/* 8. CASES (RESULTS) */}
      <ResultsSection />

      {/* 9. RESEARCH HUB */}
      <ResearchHubSection />

      {/* 10. TECHNOLOGY ARCHITECTURE */}
      <TechArchitectureSection />

      {/* 11. DEFINITIONS (AEO/GEO) */}
      <DefinitionSection />

      {/* 12. FAQ */}
      <FAQSection />

      {/* 13. FINAL CTA */}
      <FinalCTASection />

      <Footer />
    </main>
  );
}
