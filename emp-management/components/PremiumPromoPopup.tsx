'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { X, ArrowRight } from 'lucide-react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export interface PremiumPromoPopupProps {
  variant?: 'a' | 'b'
  delay?: number
  dismissDuration?: number
  maxDismissals?: number
  isDemoMode?: boolean
  heading?: string
  description?: string
  primaryCta?: string
  secondaryCta?: string
  highlightText?: string
  imageUrl?: string
  imageAlt?: string
  useEmojiPlaceholder?: boolean
  onRequestDemo?: (email?: string) => void | Promise<void>
  onStartTrial?: (email?: string) => void | Promise<void>
  onClose?: () => void
  onPopupOpen?: () => void
  showEmail?: boolean
  emailLabel?: string
  emailPlaceholder?: string
  showStats?: boolean
  stats?: Array<{ value: string; label: string }>
  primaryButtonColor?: 'black' | 'teal' | 'blue'
  accentColor?: string
}

export default function PremiumPromoPopup({
  variant = 'a',
  delay = 5000,
  dismissDuration = 7,
  maxDismissals = 3,
  isDemoMode = false,
  heading = 'Level up your\nHR game',
  description = 'See how EmpManage can save you\n20 hours a week on HR tasks.',
  primaryCta = 'Request Demo',
  secondaryCta = '30-Day Free Trial',
  onRequestDemo,
  onStartTrial,
  onClose,
  onPopupOpen,
  showEmail = false,
  emailLabel = 'Work Email',
  emailPlaceholder = 'you@company.com',
  showStats = false,
  stats,
  primaryButtonColor = 'black',
  accentColor = '#FCD34D',
}: PremiumPromoPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const checkShouldShowPopup = (): boolean => {
    const storageKey = `emp_popup_${variant}_dismissed`
    const dismissedData = localStorage.getItem(storageKey)
    if (!dismissedData) return true
    try {
      const { count, lastDismissedAt } = JSON.parse(dismissedData)
      const now = Date.now()
      const dayInMs = dismissDuration * 24 * 60 * 60 * 1000
      if (count >= maxDismissals) {
        if (now - lastDismissedAt > dayInMs * 30) {
          localStorage.removeItem(storageKey)
          return true
        }
        return false
      }
      return now - lastDismissedAt > dayInMs
    } catch {
      localStorage.removeItem(storageKey)
      return true
    }
  }

  const updateDismissal = useCallback(() => {
    const storageKey = `emp_popup_${variant}_dismissed`
    const current = localStorage.getItem(storageKey)
    let count = 1
    if (current) {
      try {
        const { count: prevCount } = JSON.parse(current)
        count = prevCount + 1
      } catch {
        count = 1
      }
    }
    localStorage.setItem(
      storageKey,
      JSON.stringify({ count, lastDismissedAt: Date.now(), variant })
    )
  }, [variant])

  const validateEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const handleClose = useCallback(() => {
    setIsOpen(false)
    if (!isDemoMode) updateDismissal()
    onClose?.()
    if (previousActiveElement.current) {
      previousActiveElement.current.focus()
    }
  }, [isDemoMode, onClose, updateDismissal])

  const handleRequestDemo = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
      if (showEmail) {
        if (!email) { setEmailError('Email is required'); return }
        if (!validateEmail(email)) { setEmailError('Please enter a valid email'); return }
      }
      setIsLoading(true)
      try {
        if (onRequestDemo) {
          await onRequestDemo(email || undefined)
        } else {
          window.location.href = `/demo${email ? `?email=${encodeURIComponent(email)}` : ''}`
        }
        if (!isDemoMode) updateDismissal()
        setIsOpen(false)
      } catch (error) {
        console.error('Error:', error)
        setEmailError('Failed to process request.')
      } finally {
        setIsLoading(false)
      }
    },
    [showEmail, email, onRequestDemo, isDemoMode, updateDismissal]
  )

  const handleStartTrial = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
      if (showEmail) {
        if (!email) { setEmailError('Email is required'); return }
        if (!validateEmail(email)) { setEmailError('Please enter a valid email'); return }
      }
      setIsLoading(true)
      try {
        if (onStartTrial) {
          await onStartTrial(email || undefined)
        } else {
          window.location.href = `/signup${email ? `?email=${encodeURIComponent(email)}` : ''}`
        }
        if (!isDemoMode) updateDismissal()
        setIsOpen(false)
      } catch (error) {
        console.error('Error:', error)
        setEmailError('Failed to process request.')
      } finally {
        setIsLoading(false)
      }
    },
    [showEmail, email, onStartTrial, isDemoMode, updateDismissal]
  )

  // Show popup after delay
  useEffect(() => {
    if (isDemoMode) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        onPopupOpen?.()
      }, delay)
      return () => clearTimeout(timer)
    }

    const shouldShow = checkShouldShowPopup()
    if (shouldShow) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        onPopupOpen?.()
      }, delay)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, isDemoMode, variant])

  // Escape key + body scroll lock
  useEffect(() => {
    if (!isOpen) return
    previousActiveElement.current = document.activeElement as HTMLElement
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleClose])

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return
    const focusableElements = modalRef.current.querySelectorAll(
      'button, input, [tabindex]:not([tabindex="-1"])'
    )
    if (focusableElements.length === 0) return
    const firstEl = focusableElements[0] as HTMLElement
    const lastEl = focusableElements[focusableElements.length - 1] as HTMLElement
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === firstEl) { lastEl.focus(); e.preventDefault() }
      } else {
        if (document.activeElement === lastEl) { firstEl.focus(); e.preventDefault() }
      }
    }
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isOpen])

  if (!isOpen) return null

  const defaultStats = [
    { value: '500+', label: 'Companies' },
    { value: '4.9★', label: 'Rated' },
    { value: '14 days', label: 'Free trial' },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[9998]"
        onClick={handleClose}
        aria-hidden="true"
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        aria-describedby="popup-desc"
        ref={modalRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      >
        <div
          className="bg-white rounded-2xl w-full overflow-hidden relative"
          style={{
            maxWidth: '960px',
            minHeight: '420px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
            animation: 'popupSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 hover:text-gray-900"
          >
            <X size={24} strokeWidth={2.5} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* LEFT CONTENT — 3 columns */}
            <div className="md:col-span-3 p-10 md:p-12 flex flex-col justify-center">
              {/* Heading */}
              <h2
                id="popup-title"
                className="text-gray-900 leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800 }}
              >
                Level up your<br />HR game
              </h2>

              {/* Description */}
              <p
                id="popup-desc"
                className="text-gray-600 mb-8 leading-relaxed"
                style={{ fontSize: 'clamp(15px, 2vw, 18px)' }}
              >
                See how <span className="font-semibold text-gray-900">EmpManage</span> can save you<br />
                <span className="font-semibold text-gray-900">20 hours a week</span> on HR tasks.
              </p>

              {/* Email Input (optional) */}
              {showEmail && (
                <div className="mb-6 space-y-2">
                  <label htmlFor="popup-email" className="block text-sm font-semibold text-gray-900">
                    {emailLabel}
                  </label>
                  <input
                    id="popup-email"
                    type="email"
                    placeholder={emailPlaceholder}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError('') }}
                    disabled={isLoading}
                    className="w-full max-w-sm px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition text-gray-900 placeholder-gray-400"
                  />
                  {emailError && <p className="text-sm text-red-600 font-medium">{emailError}</p>}
                </div>
              )}

              {/* Buttons — side by side like the reference */}
              <div className="flex flex-wrap gap-3">
                {/* Primary: Black filled */}
                <button
                  onClick={handleRequestDemo}
                  disabled={isLoading}
                  className="px-7 py-3.5 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all duration-150 disabled:opacity-50 text-[15px] flex items-center gap-2"
                >
                  {isLoading ? 'Loading...' : primaryCta}
                </button>

                {/* Secondary: White with black border */}
                <button
                  onClick={handleStartTrial}
                  disabled={isLoading}
                  className="px-7 py-3.5 bg-white text-black font-bold border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-150 disabled:opacity-50 text-[15px]"
                >
                  {isLoading ? 'Loading...' : secondaryCta}
                </button>
              </div>

              {/* Stats (optional) */}
              {showStats && (
                <div className="flex gap-8 mt-8 pt-6 border-t border-gray-200">
                  {(stats || defaultStats).map((stat, i) => (
                    <div key={i}>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT IMAGE AREA — 2 columns */}
            <div className="hidden md:block md:col-span-2 relative overflow-hidden">
              {/* Golden/cream watercolor gradient background */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, ${accentColor}40 0%, ${accentColor}80 30%, ${accentColor}50 60%, #FEF3C7 100%)`,
                }}
              />

              {/* Subtle brushstroke overlay */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(ellipse at 30% 80%, ${accentColor} 0%, transparent 70%), radial-gradient(ellipse at 70% 20%, #FDE68A 0%, transparent 60%)`,
                }}
              />

              {/* Yellow circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: '260px',
                    height: '260px',
                    backgroundColor: accentColor,
                    boxShadow: `0 0 60px ${accentColor}80`,
                  }}
                >
                  {/* Person emoji */}
                  <span style={{ fontSize: '100px', lineHeight: 1 }}>👨‍💻</span>
                </div>
              </div>

              {/* Decorative corner shapes */}
              <div className="absolute bottom-8 right-8 w-16 h-16 border-2 border-white/40 rounded-md rotate-12" />
              <div className="absolute bottom-20 right-20 w-10 h-10 border-2 border-white/30 rounded-sm -rotate-6" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  )
}
