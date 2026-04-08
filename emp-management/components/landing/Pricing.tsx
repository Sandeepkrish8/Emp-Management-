'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for small teams',
    features: [
      'Up to 50 employees',
      'Basic attendance tracking',
      'Leave management',
      'Email support',
      'Basic reports',
    ],
    cta: 'Start Free Trial',
    ctaHref: '/login',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$79',
    period: '/month',
    description: 'For growing companies',
    features: [
      'Up to 500 employees',
      'Advanced analytics',
      'Performance reviews',
      'Custom workflows',
      'Priority support',
      'API access',
    ],
    cta: 'Start Free Trial',
    ctaHref: '/login',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For large organizations',
    features: [
      'Unlimited employees',
      'White-label solution',
      'Advanced security',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    ctaHref: 'mailto:contact@empmanage.com',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your organization
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border-2 bg-white overflow-hidden transition-shadow ${
                plan.popular
                  ? 'border-primary shadow-elevated ring-1 ring-primary/20 md:scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-dropdown'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="bg-primary text-white text-center py-2 text-sm font-semibold tracking-wide">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>

                <Link href={plan.ctaHref} className="block mb-8">
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className="text-success flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-10">
          All plans include a 14-day free trial. No credit card required.{' '}
          <a href="#" className="text-primary font-semibold hover:underline">View FAQ</a>
        </p>
      </div>
    </section>
  )
}
