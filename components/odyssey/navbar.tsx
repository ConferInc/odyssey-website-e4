"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, Globe } from "lucide-react"
import { OdysseyLogo } from "./logo"

const nav = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
]

export function Navbar({
  onOpenCalendly,
}: {
  onOpenCalendly?: () => void
}) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0F172A]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0F172A]/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="Go to homepage">
            <OdysseyLogo />
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {nav.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "text-white bg-white/10" : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Globe className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">EN</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-32">
              <DropdownMenuItem>EN</DropdownMenuItem>
              <DropdownMenuItem>DE</DropdownMenuItem>
              <DropdownMenuItem>FR</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={onOpenCalendly}
            className="hidden md:inline-flex bg-[#2563EB] hover:bg-[#1d4fd7] text-white shadow-md shadow-[#2563EB]/30"
          >
            {"Schedule Demo"}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0F172A] text-white border-white/10">
              <div className="mt-4">
                {nav.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                        active ? "text-white bg-white/10" : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                <Separator className="my-4 bg-white/10" />
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="text-sm font-medium text-white/80">Theme:</span>
                  <ThemeToggle />
                </div>
                <Button
                  onClick={onOpenCalendly}
                  className="w-full bg-[#2563EB] hover:bg-[#1d4fd7] text-white shadow-md shadow-[#2563EB]/30"
                >
                  {"Schedule Demo"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
