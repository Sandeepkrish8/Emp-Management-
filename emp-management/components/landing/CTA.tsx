'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 bg-primary" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your HR?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join 500+ companies already managing their teams more efficiently with EmpManage.
          Start your free 14-day trial today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-50 shadow-md gap-2 font-semibold"
            >
              Get Started Free <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </Link>
          <a href="mailto:contact@empmanage.com">
            <Button
              size="lg"
              variant="outline"
              className="border-white/60 text-white hover:bg-white/10"
            >
              Schedule a Demo
            </Button>
          </a>
        </div>

        <p className="text-blue-100/80 mt-8 text-sm tracking-wide">
          &#10003; No credit card required &nbsp;&bull;&nbsp;
          &#10003; 14-day free trial &nbsp;&bull;&nbsp;
          &#10003; Cancel anytime
        </p>
      </div>
    </section>
  )
}
