"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import { Banknote, Stethoscope, Shield, ShoppingCart } from "lucide-react"

function BeforeAfter({ beforeSrc, afterSrc }: { beforeSrc: string; afterSrc: string }) {
  const [pos, setPos] = React.useState(50)
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
      <div className="relative h-64 w-full">
        <img
          src={beforeSrc || "/placeholder.svg"}
          alt="Before"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={afterSrc || "/placeholder.svg"} alt="After" className="h-full w-full object-cover" />
        </div>
        <input
          aria-label="Before after slider"
          className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2"
          type="range"
          value={pos}
          onChange={(e) => setPos(Number.parseInt(e.target.value))}
        />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: "-20% 0px" })
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 1200
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration)
      setCount(Math.round(value * (0.5 - 0.5 * Math.cos(Math.PI * t)))) // easeInOut
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <div ref={ref} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-white">
      <div className="text-3xl font-bold">{count.toLocaleString()}</div>
      <div className="text-xs text-white/70">{label}</div>
    </div>
  )
}

function LogoMarquee() {
  const logos = ["AcmeBank", "HelixHealth", "AegisDefense", "NovaRetail", "PioneerFS", "QuantumPay"]
  return (
    <div className="relative overflow-hidden">
      <div className="animate-[marquee_25s_linear_infinite] flex min-w-max gap-8">
        {logos.concat(logos).map((name, idx) => (
          <div
            key={name + idx}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80"
          >
            {name}
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  )
}

function IndustryPanel({
  title,
  points,
  metrics,
}: {
  title: string
  points: string[]
  metrics: {
    cvrLift: number
    ahtReduction: number
    npsIncrease: number
    labels: [string, string, string]
  }
}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="rounded-2xl border-white/10 bg-white/5 p-4 text-white backdrop-blur">
        <div className="mb-3 text-sm text-white/70">{"Before → After"}</div>
        <BeforeAfter beforeSrc="/before-dashboard-static.png" afterSrc="/personalized-dashboard-state.png" />
      </Card>
      <div className="grid gap-4">
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur"
          whileHover={{ y: -3 }}
        >
          <div className="text-xl font-semibold">{title}</div>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/80">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </motion.div>
        <div className="grid grid-cols-3 gap-3">
          <Stat label={metrics.labels[0]} value={metrics.cvrLift} />
          <Stat label={metrics.labels[1]} value={metrics.ahtReduction} />
          <Stat label={metrics.labels[2]} value={metrics.npsIncrease} />
        </div>
      </div>
    </div>
  )
}

export function IndustriesTabs() {
  return (
    <section className="bg-[#0F172A] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{"Industry Use Cases"}</h2>
        </div>
        <p className="mt-2 max-w-3xl text-white/70">
          {"Ship value quickly with prebuilt patterns for regulated industries. Explore examples below."}
        </p>

        <Tabs defaultValue="retail" className="mt-8">
          <TabsList className="bg-white/5 text-white">
            <TabsTrigger value="retail" className="data-[state=active]:bg-[#2563EB]">
              <ShoppingCart className="mr-2 h-4 w-4" />
              {"Retail"}
            </TabsTrigger>
            <TabsTrigger value="healthcare" className="data-[state=active]:bg-[#2563EB]">
              <Stethoscope className="mr-2 h-4 w-4" />
              {"Healthcare"}
            </TabsTrigger>
            <TabsTrigger value="defense" className="data-[state=active]:bg-[#2563EB]">
              <Shield className="mr-2 h-4 w-4" />
              {"Defense"}
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-[#2563EB]">
              <Banknote className="mr-2 h-4 w-4" />
              {"Financial Services"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="retail">
            <IndustryPanel
              title="AI-powered personalization"
              points={["Dynamic offers", "Real-time recommendations", "Intent detection"]}
              metrics={{
                cvrLift: 23,
                ahtReduction: 54,
                npsIncrease: 18,
                labels: ["Lift in Conversion Rate", "Average Handle Time reduction", "Net Promoter Score increase"],
              }}
            />
          </TabsContent>
          <TabsContent value="healthcare">
            <IndustryPanel
              title="Predictive analytics"
              points={["Risk stratification", "Care pathway optimization", "Resource forecasting"]}
              metrics={{
                cvrLift: 17,
                ahtReduction: 42,
                npsIncrease: 21,
                labels: ["Readmission rate reduction", "Clinician time saved", "Resource utilization improvement"],
              }}
            />
          </TabsContent>
          <TabsContent value="defense">
            <IndustryPanel
              title="Secure AI solutions"
              points={["On-prem deployment", "Air-gapped workflows", "Granular RBAC & audit"]}
              metrics={{
                cvrLift: 11,
                ahtReduction: 38,
                npsIncrease: 14,
                labels: [
                  "Incident response time reduction",
                  "Operational system uptime",
                  "Audit & compliance coverage",
                ],
              }}
            />
          </TabsContent>
          <TabsContent value="financial">
            <IndustryPanel
              title="Decisioning & automation"
              points={["KYC/KYB automation", "Fraud detection", "Loan underwriting"]}
              metrics={{
                cvrLift: 19,
                ahtReduction: 47,
                npsIncrease: 26,
                labels: [
                  "Decision throughput increase",
                  "Fraud detection efficiency",
                  "Compliance automation coverage",
                ],
              }}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-10">
          <LogoMarquee />
        </div>
      </div>
    </section>
  )
}
