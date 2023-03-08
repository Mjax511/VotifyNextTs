import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {

  console.log('testing', req)
  // return NextResponse.redirect('/test')
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: ['/auth-check', '/test'],
  matcher: ['/test'],

}
