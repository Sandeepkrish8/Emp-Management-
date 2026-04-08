import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, company, password } = await request.json()

    if (!fullName || !email || !company || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // TODO: Check if user already exists
    // TODO: Hash password
    // TODO: Save to database

    const token = btoa(JSON.stringify({ email, iat: Date.now() }))

    return NextResponse.json(
      {
        success: true,
        token,
        user: { email, fullName, company },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'An error occurred during signup' },
      { status: 500 }
    )
  }
}
