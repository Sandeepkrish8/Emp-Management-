'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'HR Manager',
    company: 'Tech Solutions Inc',
    avatar: '👩‍💼',
    quote:
      'EmpManage has transformed how we manage our team. Attendance tracking is now automated and leave approvals are instant.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Operations Director',
    company: 'Global Corp',
    avatar: '👨‍💼',
    quote:
      'The performance review system is exactly what we needed. It provides valuable insights for development conversations.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'CEO',
    company: 'StartUp Hub',
    avatar: '👩‍🚀',
    quote:
      'Best investment for our growing team. The dashboards give us real-time visibility into our workforce metrics.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Teams Everywhere
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our customers have to say about EmpManage
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-dropdown transition-shadow flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">{t.avatar}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">
                    {t.role} &bull; {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
