import { NextRequest, NextResponse } from 'next/server'

interface AnalyticsEvent {
  event: string
  variant: 'a' | 'b'
  cta?: string
  email?: string
  reason?: string
  timestamp: string
  sessionId: string
  [key: string]: unknown
}

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json()

    if (!event.event) {
      return NextResponse.json({ error: 'Missing event name' }, { status: 400 })
    }

    console.log('[Analytics]', event.event, {
      variant: event.variant,
      cta: event.cta,
      email: event.email ? '***' : undefined,
    })

    // TODO: Send to analytics service (GA4, Mixpanel, PostHog, etc.)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to process event' }, { status: 500 })
  }
}
