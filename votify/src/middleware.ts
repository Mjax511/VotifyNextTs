import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// Buffer is a dev-dependency polyfill.... need to check if it will work on build
const Buffer = require('buffer/').Buffer;

export async function middleware(req: NextRequest) {

  if (req.nextUrl.pathname.startsWith('/auth-check')) {
    const code = req.nextUrl.searchParams.get("code");

    //body must be encoded to -> application/x-www-form-urlencoded
    let data;
    if (code) {
      const endpoint = 'https://accounts.spotify.com/api/token';
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code")
      params.append("code", code)
      params.append("redirect_uri", "http://localhost:3000/auth-check")

      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
      );
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params,
      };
      const token_res = await fetch(endpoint, {
        ...requestOptions
      });

      data = await token_res.json();
      const access_token = data.access_token;
      const refresh_token = data.refresh_token;
      
      console.log(access_token, refresh_token)
      const res = NextResponse.next();
      res.cookies.set('sAT', access_token)
      res.cookies.set('sRT', refresh_token)

      console.log(req.cookies.getAll())
      console.log(res.cookies.getAll())
      // console.log('after request: ', token_res)
    } else {
      console.log('no authorization code')
    }

    return NextResponse.redirect(new URL('/test', req.url));
  } else if(req.nextUrl.pathname.startsWith('/log-cookies')){
    const res = NextResponse.next();
    res.cookies.set('test', 'log-cookie')
    res.cookies.set({name: 'test', value: 'log-cookie', path:'/log-cookie'})

    console.log(req.cookies.getAll())
    console.log(res.cookies.getAll())
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/auth-check', '/log-cookies'],

}
