'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs select-none">EMP</span>
              </div>
              <span className="text-white font-bold text-sm">EmpManage</span>
            </div>
            <p className="text-sm leading-relaxed">
              The modern platform for employee management and team productivity.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['#features', 'Features'],
                ['#pricing', 'Pricing'],
                ['#', 'Security'],
                ['#', 'API Docs'],
              ].map(([href, label]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['#', 'About'],
                ['#', 'Blog'],
                ['#', 'Careers'],
                ['#', 'Contact'],
              ].map(([href, label]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="flex-shrink-0" aria-hidden="true" />
                <a href="mailto:contact@empmanage.com" className="hover:text-white transition-colors">
                  contact@empmanage.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="flex-shrink-0" aria-hidden="true" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>123 Business St, Tech City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} EmpManage. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((label) => (
              <Link key={label} href="#" className="hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
