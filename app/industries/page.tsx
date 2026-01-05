"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/odyssey/navbar"
import { Footer } from "@/components/odyssey/footer"
import { IndustriesTabs } from "@/components/odyssey/industries-tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Banknote, Shield, Stethoscope, ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react"

type Spotlight = {
  industry: string
  challenge: string
  solution: string
  results: { label: string; value: string; color?: string }[]
  testimonial: { quote: string; author: string; role: string }
  image: { src: string; alt: string }
}

const heroIcons = [
  { Icon: Banknote, color: "#10B981", label: "Financial Services" },
  { Icon: Stethoscope, color: "#7C3AED", label: "Healthcare" },
  { Icon: ShoppingCart, color: "#2563EB", label: "Retail" },
  { Icon: Shield, color: "#F59E0B", label: "Defense & Security" },
]

const spotlightItems: Spotlight[] = [
  {
    industry: "Financial Services",
    challenge: "High fraud losses and manual review queues impacting approval rates.",
    solution:
      "Agentic fraud detection with graph features, real-time scoring, and human-in-the-loop investigation workflows.",
    results: [
      { label: "Chargeback reduction", value: "−38%", color: "#10B981" },
      { label: "Approval lift", value: "+6.2%", color: "#2563EB" },
      { label: "AHT reduction", value: "−42%", color: "#7C3AED" },
    ],
    testimonial: {
      quote: "Odyssey helped us cut fraud losses while increasing approvals—without compromising customer experience.",
      author: "VP Risk",
      role: "Top 10 Card Issuer",
    },
    image: {
      src: "/placeholder-2ilvh.png",
      alt: "Fraud detection graph visualization",
    },
  },
  {
    industry: "Healthcare",
    challenge: "Readmission rates and operational bottlenecks across care pathways.",
    solution:
      "Predictive diagnostics with risk stratification, agentic tasking for care coordinators, and SLA tracking.",
    results: [
      { label: "Readmissions", value: "−17%", color: "#10B981" },
      { label: "Throughput", value: "+24%", color: "#2563EB" },
      { label: "Time to action", value: "−31%", color: "#7C3AED" },
    ],
    testimonial: {
      quote: "The platform aligned clinicians and operations with trustworthy predictions and clear next steps.",
      author: "Clinical Ops Director",
      role: "Integrated Health Network",
    },
    image: {
      src: "/placeholder-6xbbk.png",
      alt: "Healthcare predictive analytics dashboard",
    },
  },
  {
    industry: "Retail",
    challenge: "Low personalization and inventory imbalances causing missed revenue.",
    solution: "Real-time recommendations, demand forecasting, and agent-led merchandising experiments.",
    results: [
      { label: "CVR lift", value: "+14%", color: "#10B981" },
      { label: "Stockouts", value: "−22%", color: "#2563EB" },
      { label: "Avg order value", value: "+9%", color: "#7C3AED" },
    ],
    testimonial: {
      quote: "Odyssey enabled a new level of personalization and operational efficiency in weeks, not months.",
      author: "Chief Digital Officer",
      role: "Global Retailer",
    },
    image: {
      src: "/retail-recommendation-engine-ui.png",
      alt: "Retail recommendation UI",
    },
  },
]

export default function IndustriesPage() {
  const [tab, setTab] = React.useState("financial")
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  React.useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % spotlightItems.length), 6000)
    return () => clearInterval(id)
  }, [paused])

  function prev() {
    setIndex((i) => (i - 1 + spotlightItems.length) % spotlightItems.length)
  }
  function next() {
    setIndex((i) => (i + 1) % spotlightItems.length)
  }

  return (
    <main className="bg-[#0F172A] text-white">
      <Navbar />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <motion.div
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#2563EB] blur-[110px] opacity-25"
          animate={{ y: [0, -10, 0], x: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">{"AI Solutions for Every Industry"}</h1>
              <p className="mt-3 text-white/80">{"Transforming businesses with tailored AI solutions"}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="bg-[#2563EB] hover:bg-[#1d4fd7]">
                  <Link href="/solutions">{"Explore Solutions"}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  <Link href="/contact">{"Contact Us"}</Link>
                </Button>
              </div>
            </div>
            <div aria-hidden="true">
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {heroIcons.map(({ Icon, color, label }, i) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className="rounded-lg p-2"
                      style={{ backgroundColor: `${color}22`, border: `1px solid ${color}44` }}
                    >
                      <Icon className="h-5 w-5" style={{ color }} />
                    </div>
                    <div className="text-sm text-white/80">{label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <IndustriesTabs />
      </Tabs>

      {/* Industry Spotlight Carousel */}
      <section
        className="mx-auto max-w-7xl px-4 pb-16"
        role="region"
        aria-roledescription="carousel"
        aria-label="Industry spotlight"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold md:text-4xl">{"Industry Spotlight"}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={prev}
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
              aria-label="Previous spotlight"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={next}
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
              aria-label="Next spotlight"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
              <div>
                <div className="text-sm text-white/60">{spotlightItems[index].industry}</div>
                <h3 className="mt-1 text-xl font-semibold">{"Challenge"}</h3>
                <p className="mt-1 text-white/80">{spotlightItems[index].challenge}</p>
                <h3 className="mt-4 text-xl font-semibold">{"Solution"}</h3>
                <p className="mt-1 text-white/80">{spotlightItems[index].solution}</p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {spotlightItems[index].results.map((r) => (
                    <Card key={r.label} className="rounded-xl border-white/10 bg-white/5 p-4 text-center">
                      <div className="text-2xl font-bold" style={{ color: r.color ?? "#10B981" }}>
                        {r.value}
                      </div>
                      <div className="text-xs text-white/70">{r.label}</div>
                    </Card>
                  ))}
                </div>

                <blockquote className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-white/90">
                    {"“"}
                    {spotlightItems[index].testimonial.quote}
                    {"”"}
                  </p>
                  <footer className="mt-2 text-xs text-white/60">
                    {"— "}
                    {spotlightItems[index].testimonial.author}
                    {", "}
                    {spotlightItems[index].testimonial.role}
                  </footer>
                </blockquote>
              </div>
              <div className="relative">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <Image
                    src={spotlightItems[index].image.src || "/placeholder.svg"}
                    alt={spotlightItems[index].image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <h2 className="text-3xl font-bold md:text-4xl">{"Our Technology in Action"}</h2>
        <p className="mt-2 max-w-3xl text-white/70">
          {"From data to decisions—production‑ready building blocks, integrated with your stack."}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <TechCard
            title="LLMs & Reasoning"
            desc="Multi‑model routing, evals, and guardrails for safe, cost‑effective outcomes."
            img="/llm-routing-diagram.png"
          />
          <TechCard
            title="Agentic Workflows"
            desc="Autonomous agents with tools, memory, and human‑in‑the‑loop approvals."
            img="/agent-workflow-graph.png"
          />
          <TechCard
            title="Data Foundry"
            desc="Pipelines, feature stores, and model lifecycle with observability."
            img="/data-pipeline-architecture.png"
          />
          <TechCard
            title="Integration Fabric"
            desc="APIs, events, and connectors to your CRM, core systems, and data lakes."
            img="/placeholder.svg?height=140&width=240"
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}

function TabBody({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <TabsContent value={value} className="focus:outline-none">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        {children}
      </motion.div>
    </TabsContent>
  )
}

function IndustryShowcase({
  title,
  bullets,
  img,
  alt,
}: {
  title: string
  bullets: string[]
  img: string
  alt: string
}) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="rounded-2xl border-white/10 bg-white/5 p-6 backdrop-blur">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <ul className="mt-3 grid list-disc gap-2 pl-5 text-slate-300">
          {bullets.map((b) => (
            <li key={b} className="text-sm">
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-4 text-sm text-blue-400 hover:text-blue-300">{"See success stories →"}</div>
      </Card>
      <Card className="overflow-hidden rounded-2xl border-white/10 bg-white/5 p-0 backdrop-blur">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={img || "/placeholder.svg"}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Card>
    </div>
  )
}

function TechCard({ title, desc, img }: { title: string; desc: string; img: string }) {
  return (
    <Card className="group overflow-hidden rounded-2xl border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="relative mb-4 h-28 w-full">
        <Image
          src={img || "/placeholder.svg"}
          alt={`${title} illustration`}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover opacity-90 transition group-hover:opacity-100"
        />
      </div>
      <div className="text-lg font-semibold text-white">{title}</div>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
    </Card>
  )
}
