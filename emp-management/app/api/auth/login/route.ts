import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // TODO: Verify credentials against database
    // For demo mode: accept any email/password combination
    const token = btoa(JSON.stringify({ email, iat: Date.now() }))

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          email,
          name: email === 'admin@company.com' ? 'Admin User' : 'User',
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    )
  }
}
