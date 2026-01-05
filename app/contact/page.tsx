"use client"

import * as React from "react"
import Script from "next/script"
import { Navbar } from "@/components/odyssey/navbar"
import { Footer } from "@/components/odyssey/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Phone, Calendar, CheckCircle2, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

const schema = z.object({
  company: z.string().min(2, "Please enter your company name"),
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid business email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please describe your use case"),
  honeypot: z.string().max(0).optional(),
  turnstileToken: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const defaultValues: FormValues = {
  company: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  honeypot: "",
  turnstileToken: "",
}

export default function ContactPage() {
  constant { toast } = useToast()
  const [submitted, setSubmitted] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValues,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(values: FormValues) {
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitted(true)
        toast({ title: "Thanks! We'll respond within 24 hours." })
      } else {
        toast({ title: "Something went wrong. Please try again.", variant: "destructive" })
      }
    } catch (e) {
      toast({ title: "Network error. Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  // Optional Turnstile handling (renders only if NEXT_PUBLIC_TURNSTILE_SITE_KEY is present)
  React.useEffect(() => {
    if (!turnstileSiteKey) return
    // @ts-expect-error turnstile global injected by script
    if (typeof window !== "undefined" && window.turnstile && document.getElementById("cf-turnstile")) {
      // @ts-expect-error
      window.turnstile.render("#cf-turnstile", {
        sitekey: turnstileSiteKey,
        callback: (token: string) => {
          setValue("turnstileToken", token)
        },
      })
    }
  }, [turnstileSiteKey, setValue])

  return (
    <main className="bg-[#0F172A] text-white">
      <Navbar />
      {turnstileSiteKey ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer /> : null}

      <section className="relative overflow-hidden py-16">
        <motion.div
          className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-[#2563EB] blur-[100px] opacity-25"
          animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-[#7C3AED] blur-[120px] opacity-20"
          animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Left Section - 60% width (3 columns) */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white md:text-5xl">Get Started with Odyssey AI</h1>
              <p className="mt-4 text-xl text-[#E2E8F0]">
                Schedule a demo to see how our agentic AI platform transforms your business
              </p>
            </div>

            <Card className="rounded-2xl border-white/10 bg-white/5 p-8 backdrop-blur">
              {!submitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("honeypot")}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Field
                      label="Company Name"
                      error={errors.company?.message}
                      required
                      children={
                        <Input
                          {...register("company")}
                          placeholder="Acme Corporation"
                          aria-invalid={!!errors.company}
                          className="bg-white/5 border-white/20 text-white placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-[#2563EB]/20"
                        />
                      }
                    />
                    <Field
                      label="Your Name"
                      error={errors.name?.message}
                      required
                      children={
                        <Input
                          {...register("name")}
                          placeholder="John Smith"
                          aria-invalid={!!errors.name}
                          className="bg-white/5 border-white/20 text-white placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-[#2563EB]/20"
                        />
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Field
                      label="Business Email"
                      error={errors.email?.message}
                      required
                      children={
                        <Input
                          type="email"
                          {...register("email")}
                          placeholder="john@acme.com"
                          aria-invalid={!!errors.email}
                          className="bg-white/5 border-white/20 text-white placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-[#2563EB]/20"
                        />
                      }
                    />
                    <Field
                      label="Phone Number"
                      error={errors.phone?.message}
                      children={
                        <Input
                          type="tel"
                          {...register("phone")}
                          placeholder="+1 (805) 404-9173"
                          aria-invalid={!!errors.phone}
                          className="bg-white/5 border-white/20 text-white placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-[#2563EB]/20"
                        />
                      }
                    />
                  </div>

                  <Field
                    label="Message/Use Case"
                    error={errors.message?.message}
                    required
                    children={
                      <Textarea
                        {...register("message")}
                        placeholder="Tell us about your specific use case, goals, and how we can help transform your business with AI..."
                        aria-invalid={!!errors.message}
                        className="h-32 bg-white/5 border-white/20 text-white placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-[#2563EB]/20"
                      />
                    }
                  />

                  {turnstileSiteKey ? (
                    <div id="cf-turnstile" className="mt-4" aria-label="Turnstile challenge" />
                  ) : null}

                  <div className="flex items-center justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={loading || !isValid}
                      className="bg-[#2563EB] hover:bg-[#1d4fd7] disabled:opacity-60 px-8 py-3 text-lg font-semibold"
                    >
                      {loading ? "Scheduling..." : "Schedule Demo"}
                    </Button>
                  </div>

                  <p className="text-xs text-[#E2E8F0] mt-4">
                    By submitting this form, you agree to our processing of your information. We only use your data to
                    respond to your inquiry and will never share it with third parties.
                  </p>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-[#10B981]" />
                  <h3 className="mt-4 text-2xl font-semibold text-white">Demo Scheduled!</h3>
                  <p className="mt-2 max-w-md text-[#E2E8F0]">
                    Thanks for your interest in Odyssey AI. Our team will contact you within 24 hours to schedule your
                    personalized demo.
                  </p>
                  <a
                    href="https://calendly.com/your-calendly/30min"
                    className="mt-6 inline-flex items-center rounded-md bg-[#10B981] px-6 py-3 text-sm font-medium text-white hover:bg-[#0ea371]"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Direct Meeting
                  </a>
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information Card */}
            <Card className="rounded-2xl border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Talk to Our Team</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#2563EB]" />
                  <div>
                    <div className="text-sm text-[#E2E8F0]">Email</div>
                    <a href="mailto:solutions@odysseyts.com" className="text-white hover:text-[#2563EB]">
                      solutions@odysseyts.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#10B981]" />
                  <div>
                    <div className="text-sm text-[#E2E8F0]">Phone</div>
                    <a href="tel:+18054049173" className="text-white hover:text-[#10B981]">
                      +1 (805) 404-9173
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#7C3AED]" />
                  <div>
                    <div className="text-sm text-[#E2E8F0]">Office Hours</div>
                    <div className="text-white">Mon-Fri 9AM-6PM EST</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Direct Booking Section */}
            <Card className="rounded-2xl border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Or book directly</h3>
                <Calendar className="h-5 w-5 text-[#2563EB]" />
              </div>
              <Button asChild className="w-full bg-[#2563EB] hover:bg-[#1d4fd7]">
                <a href="https://calendly.com/your-calendly/30min" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  Open Calendar
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      </div>
      <div className="relative">
        {children}
        {error && (
          <div className="absolute -bottom-5 left-0 text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span>
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
