import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server';

const allowedIPs = ['192.168.1.1'];

export default async function middleware(req: NextRequest) {

    const ip: any = req.headers.get('x-forwarded-for');
    console.log(ip)

    if (!allowedIPs.includes('192.168.1.1')) {
        return NextResponse.redirect(new URL('/error', req.url))
    } else {
        return NextResponse.next()
    }
}
export const config = {
    matcher: '/admin/:path*',
}
