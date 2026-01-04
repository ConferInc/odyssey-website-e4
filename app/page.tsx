import { Hero } from "@/components/odyssey/hero"
import { Navbar } from "@/components/odyssey/navbar"
import { SolutionsGrid } from "@/components/odyssey/solutions-grid"
import { IndustriesTabs } from "@/components/odyssey/industries-tabs"
import { Footer } from "@/components/odyssey/footer"

export default function Page() {
  return (
    <main className="scroll-smooth">
      {/* Navbar with CTA in dialog within Hero */}
      {/* We keep Navbar simple here; Modal handled in Hero */}
      <Navbar />
      <Hero />
      <SolutionsGrid />
      <IndustriesTabs />
      <Footer />
    </main>
  )
}
