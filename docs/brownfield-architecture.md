# Odyssey AI Website Brownfield Architecture Document

## Introduction

This document captures the CURRENT STATE of the Odyssey AI website codebase, including technical debt, workarounds, and real-world patterns. It serves as a reference for AI agents working on enhancements.

### Document Scope

Comprehensive documentation of entire system - a Next.js-based enterprise AI solutions website built with v0.dev.

### Change Log

| Date   | Version | Description                 | Author    |
| ------ | ------- | --------------------------- | --------- |
| 2025-01-08 | 1.0     | Initial brownfield analysis | Winston (Architect) |

## Quick Reference - Key Files and Entry Points

### Critical Files for Understanding the System

- **Main Entry**: `app/page.tsx` (homepage with hero, solutions grid, industries tabs, footer)
- **Root Layout**: `app/layout.tsx` (global HTML structure with Inter font)
- **Configuration**: `next.config.mjs`, `tsconfig.json`, `components.json`
- **Core Business Logic**: `app/actions/submit-contact.ts` (contact form processing)
- **API Definitions**: `app/api/contact/route.ts`, `app/api/newsletter/route.ts`
- **Key Components**: `components/odyssey/hero.tsx`, `components/odyssey/contact-form.tsx`
- **Styling**: `app/globals.css` (Tailwind CSS with custom theme)
- **Package Dependencies**: `package.json` (modern React/Next.js stack)

## High Level Architecture

### Technical Summary

Odyssey AI is a modern enterprise website showcasing AI solutions, built as a Next.js 15 application with TypeScript, using the App Router pattern. The site features a marketing-focused design with interactive components, contact forms, and API endpoints for lead generation.

### Actual Tech Stack (from package.json)

| Category  | Technology | Version | Notes                      |
| --------- | ---------- | ------- | -------------------------- |
| Runtime   | Node.js    | Latest  | Next.js 15.2.8             |
| Framework | Next.js    | 15.2.8  | App Router, standalone mode |
| Frontend  | React      | 19      | Latest React with hooks    |
| Language  | TypeScript | 5       | Strict mode enabled        |
| Styling   | TailwindCSS | 4.1.9   | With custom animations     |
| UI Components | Radix UI | Latest | Comprehensive component library |
| Forms     | React Hook Form | Latest | With Zod validation        |
| Email     | Resend     | Latest | Contact form submissions   |
| Icons     | Lucide React | 0.454.0 | Icon library               |
| Package Manager | pnpm | Latest | Lockfile present           |

### Repository Structure Reality Check

- Type: Monorepo (single Next.js application)
- Package Manager: pnpm (pnpm-lock.yaml present)
- Notable: Built with v0.dev, automatic sync with deployed version
- Deployment: Vercel (standalone build mode configured)

## Source Tree and Module Organization

### Project Structure (Actual)

```text
odyssey-website-e4/
├── .bmad-core/              # BMAD framework configuration
├── .cursor/                 # Cursor IDE configuration
├── .github/                 # GitHub workflows
├── .windsurf/               # Windsurf workflows
├── app/                     # Next.js App Router
│   ├── actions/             # Server actions
│   ├── api/                 # API routes
│   ├── blog/                # Blog pages
│   ├── case-studies/        # Case study pages
│   ├── contact/             # Contact page
│   ├── industries/          # Industry-specific pages
│   ├── resources/           # Resources pages
│   ├── security/            # Security pages
│   ├── solutions/           # Solution pages (6 sub-pages)
│   ├── whitepapers/         # Whitepaper pages
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── odyssey/             # Custom Odyssey components
│   ├── theme-provider.tsx   # Theme context
│   └── ui/                  # shadcn/ui components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── public/                  # Static assets
├── styles/                  # Additional styles
├── next.config.mjs          # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── components.json           # shadcn/ui configuration
└── package.json             # Dependencies and scripts
```

### Key Modules and Their Purpose

- **Homepage Layout**: `app/page.tsx` - Main landing page with hero, solutions, industries
- **Contact Processing**: `app/api/contact/route.ts` - Handles contact form submissions with rate limiting
- **Newsletter**: `app/api/newsletter/route.ts` - Simple newsletter subscription endpoint
- **Contact Actions**: `app/actions/submit-contact.ts` - Server action for contact form
- **Hero Section**: `components/odyssey/hero.tsx` - Animated hero with typewriter effect
- **Contact Form**: `components/odyssey/contact-form.tsx` - Multi-step contact form
- **UI Components**: `components/ui/` - Reusable shadcn/ui components
- **Toast System**: `hooks/use-toast.ts` - Custom toast notification system

## Data Models and APIs

### Data Models

No formal data models - uses TypeScript interfaces for form data:

- **Contact Payload**: `app/actions/submit-contact.ts` - Contact form data structure
- **API Payload**: `app/api/contact/route.ts` - Contact API request structure

### API Specifications

- **Contact API**: `POST /api/contact` - Handles contact form submissions
  - Rate limiting: 3/minute, 10/hour per IP
  - Cloudflare Turnstile verification (optional)
  - Resend email integration (optional)
  - Honeypot spam protection
- **Newsletter API**: `POST /api/newsletter` - Simple newsletter subscription (logs only)

## Technical Debt and Known Issues

### Critical Technical Debt

1. **Newsletter API**: `app/api/newsletter/route.ts` - Only logs subscriptions, no actual integration
2. **Contact Action**: `app/actions/submit-contact.ts` - Simulates processing with timeout, no real CRM integration
3. **Build Configuration**: `next.config.mjs` - Ignores TypeScript and ESLint errors during builds
4. **Toast Duration**: `hooks/use-toast.ts` - Extremely long toast duration (1,000,000ms)
5. **Image Optimization**: Disabled in Next.js config (`unoptimized: true`)

### Workarounds and Gotchas

- **Environment Variables**: Contact API gracefully handles missing RESEND_API_KEY and TURNSTILE_SECRET
- **Build Errors**: TypeScript and ESLint errors are ignored during builds for faster deployment
- **Image Handling**: All images are unoptimized, may impact performance
- **Rate Limiting**: Simple in-memory rate limiting (not persistent across restarts)
- **Form Validation**: Client-side validation in contact form, server-side basic checks only

## Integration Points and External Dependencies

### External Services

| Service  | Purpose  | Integration Type | Key Files                      |
| -------- | -------- | ---------------- | ------------------------------ |
| Resend   | Email    | SDK              | `app/api/contact/route.ts`     |
| Cloudflare | Bot Protection | REST API | `app/api/contact/route.ts` (optional) |
| Vercel   | Hosting  | Built-in         | `next.config.mjs` (standalone) |

### Internal Integration Points

- **Component Communication**: Props drilling for form state and toast notifications
- **API Integration**: Contact form uses both server action and API route
- **Styling Integration**: Tailwind CSS with custom CSS variables for theming
- **Asset Management**: Images from external CDNs (placeholder.svg, blob.v0.dev)

## Development and Deployment

### Local Development Setup

1. Install dependencies: `pnpm install`
2. Start development server: `pnpm dev`
3. Build for production: `pnpm build`
4. Start production server: `pnpm start`

Known issues with setup:
- TypeScript errors ignored during builds
- No environment variable validation
- Image optimization disabled

### Build and Deployment Process

- **Build Command**: `pnpm build` (Next.js standalone mode)
- **Deployment**: Automatic via Vercel from v0.dev sync
- **Environments**: Single production deployment
- **CI/CD**: Automatic sync from v0.dev to GitHub to Vercel

## Testing Reality

### Current Test Coverage

- Unit Tests: None
- Integration Tests: None
- E2E Tests: None
- Manual Testing: Primary QA method via v0.dev interface

### Running Tests

No test framework configured. Would need to add:
- Jest/Vitest for unit tests
- Playwright/Cypress for E2E tests
- Testing Library for component tests

## Appendix - Useful Commands and Scripts

### Frequently Used Commands

```bash
pnpm dev         # Start development server on localhost:3000
pnpm build       # Production build (standalone mode)
pnpm start       # Start production server
pnpm lint        # Run ESLint (errors ignored during build)
```

### Environment Variables

Required for full functionality:
- `RESEND_API_KEY` - For contact form email sending
- `TURNSTILE_SECRET` - For Cloudflare bot protection

Optional (demo mode works without them):
- Contact form logs to console when RESEND_API_KEY missing
- Turnstile verification skipped when TURNSTILE_SECRET missing

### Debugging and Troubleshooting

- **Contact Submissions**: Check console logs when RESEND_API_KEY not configured
- **Build Issues**: TypeScript errors are ignored, check manually with `tsc --noEmit`
- **Performance**: Image optimization disabled - may need manual optimization
- **Rate Limiting**: In-memory only - resets on server restart

## Component Architecture Details

### shadcn/ui Integration

The project uses shadcn/ui components with custom configuration:
- Style: New York variant
- Base Color: Neutral
- CSS Variables: Enabled
- Icon Library: Lucide React
- Path Aliases: Configured for `@/` imports

### Custom Odyssey Components

All custom components are in `components/odyssey/`:
- Consistent naming convention (kebab-case)
- "use client" directive for client-side interactivity
- Framer Motion for animations
- Lucide React icons throughout

### State Management

- No global state management library
- Local component state with React hooks
- Server actions for form submissions
- Toast notifications via custom hook

## Performance Considerations

### Current Performance Characteristics

- **Bundle Size**: Large due to comprehensive Radix UI component library
- **Images**: Unoptimized, served from external CDNs
- **Animations**: Framer Motion for smooth interactions
- **CSS**: Tailwind with custom animations
- **Build Mode**: Standalone for optimal container deployment

### Optimization Opportunities

1. Enable image optimization in Next.js config
2. Implement code splitting for large components
3. Add proper error boundaries
4. Implement proper loading states
5. Add meta tags for SEO optimization

## Security Considerations

### Current Security Measures

- **Rate Limiting**: Basic in-memory rate limiting on contact API
- **Bot Protection**: Optional Cloudflare Turnstile integration
- **Input Sanitization**: HTML escaping in contact API
- **Honeypot**: Spam protection in contact forms

### Security Gaps

1. No CSRF protection
2. No comprehensive input validation
3. No security headers configured
4. Rate limiting not persistent
5. No audit logging

## Deployment Architecture

### Vercel Integration

- **Automatic Deployments**: Sync from v0.dev → GitHub → Vercel
- **Build Output**: Standalone mode for container compatibility
- **Edge Functions**: API routes deployed as edge functions
- **CDN**: Vercel's global CDN for static assets

### Infrastructure Dependencies

- **Email**: Resend (optional)
- **Bot Protection**: Cloudflare Turnstile (optional)
- **Hosting**: Vercel platform
- **DNS**: Managed through Vercel

## Development Workflow

### v0.dev Integration

This project is designed to work seamlessly with v0.dev:
1. Changes made in v0.dev are automatically pushed to this repository
2. Vercel deploys the latest version from the repository
3. Local development can continue alongside v0.dev changes
4. Git history tracks all v0.dev modifications

### Local Development

- **Hot Reload**: Next.js development server
- **TypeScript**: Strict mode enabled but build errors ignored
- **Styling**: Tailwind CSS with live reload
- **Components**: Hot module replacement for all components
