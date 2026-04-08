import type { PremiumPromoPopupProps } from '@/components/PremiumPromoPopup'

export const popupPresets = {
  standard: {
    variant: 'a' as const,
    delay: 3000,
    dismissDuration: 7,
    maxDismissals: 3,
    heading: 'Level up your HR game',
    description: 'See how EmpManage can save you 20 hours a week on HR tasks.',
    primaryCta: 'Request Demo',
    secondaryCta: '30-Day Free Trial',
    accentColor: '#FCD34D',
    showEmail: true,
    showStats: true,
  } satisfies PremiumPromoPopupProps,

  aggressive: {
    variant: 'b' as const,
    delay: 1000,
    dismissDuration: 3,
    maxDismissals: 1,
    heading: 'Join 500+ Companies',
    description: 'Start your free 14-day trial today. No credit card required.',
    primaryCta: 'Start Free Trial',
    secondaryCta: 'Book a Demo',
    accentColor: '#3B82F6',
    showEmail: true,
    showStats: true,
  } satisfies PremiumPromoPopupProps,

  subtle: {
    variant: 'a' as const,
    delay: 5000,
    dismissDuration: 14,
    maxDismissals: 2,
    heading: 'Interested in learning more?',
    description: 'Schedule a 20-minute demo with our team.',
    primaryCta: 'Schedule Demo',
    secondaryCta: 'Maybe Later',
    accentColor: '#10B981',
    showEmail: false,
    showStats: false,
  } satisfies PremiumPromoPopupProps,
}
