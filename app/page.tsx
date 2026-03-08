import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import PrintingVerticals from "@/components/PrintingVerticals";
import { CardSwap as ProductsSection } from "@/components/Products";
import Services from "@/components/Services";
import UseCases from "@/components/UseCases";
import SuccessStories from "@/components/SuccessStories";
import AIAgents from "@/components/AIAgents";
import Footer from "@/components/Footer";
import GlobalHorizontalLayout, { HorizontalPanel as Panel } from "@/components/GlobalHorizontalScroll";

import Header, { SideNav } from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Fixed UI Shell (Branding, Nav, Socials) */}
      <Header />

      <GlobalHorizontalLayout>
        {/* Panel 1: Hero */}
        <Panel id="hero" className="relative lg:pl-32 bg-[#FAFAFA]">
          <SideNav />
          <Hero />
        </Panel>

        {/* Panel 2: Stats */}
        <Panel id="stats">
          <Stats />
        </Panel>

        {/* Panel 3: Testimonials Workspace (Blank for redesign) */}
        <Panel id="testimonials" className="bg-[#f6f6f4]">
          <Testimonials />
        </Panel>

        {/* Panel 4: Printing Verticals */}
        <Panel id="printing-verticals" className="bg-white lg:w-[600vw]">
          <PrintingVerticals />
        </Panel>

        {/* Panel 5: Product Card Swap (single viewport) */}
        <Panel id="products">
          <ProductsSection />
        </Panel>

        {/* Panel 6: Services */}
        <Panel id="services">
          <Services />
        </Panel>

        {/* Panel 7: Use Cases */}
        <Panel id="usecases">
          <UseCases />
        </Panel>

        {/* Panel 8: Success Stories */}
        <Panel id="success">
          <SuccessStories />
        </Panel>

        {/* Panel 9: AI Agents */}
        <Panel id="agents">
          <AIAgents />
        </Panel>
      </GlobalHorizontalLayout>

      {/* Footer stays vertical */}
      <Footer />
    </main>
  );
}
