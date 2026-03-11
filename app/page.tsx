import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import PrintingVerticals from "@/components/PrintingVerticals";
import { CardSwap as ProductsSection } from "@/components/Products";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import GlobalHorizontalLayout, { HorizontalPanel as Panel } from "@/components/GlobalHorizontalScroll";

import Header, { SideNav } from "@/components/Header";

import Clients from "@/components/Clients";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Fixed UI Shell (Branding, Nav, Socials) */}
      <Header />

      <GlobalHorizontalLayout>
        {/* Panel 1: Hero */}
        <Panel id="hero" className="relative lg:pl-32 bg-[#FAFAFA] dark:bg-[#FAFAFA]">
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

        {/* Panel 4: Clients Logo Section */}
        <Panel id="clients" className="lg:w-[300vw]">
          <Clients />
        </Panel>

        {/* Panel 5: Printing Verticals */}
        <Panel id="printing-verticals" className="bg-white lg:w-[600vw]">
          <PrintingVerticals />
        </Panel>

        {/* Panel 5: Product Card Swap (single viewport) */}
        <Panel id="products">
          <ProductsSection />
        </Panel>

        {/* Panel 6: Team */}
        <Panel id="team" className="lg:w-[120vw]">
          <Team />
        </Panel>

        {/* Panel 7: Footer */}
        <Panel id="footer">
          <Footer />
        </Panel>
      </GlobalHorizontalLayout>
    </main>
  );
}
