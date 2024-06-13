import { NextResponse } from 'next/server'
import { NextApiRequest } from 'next';

const allowedIPs = ['122.209.142.173'];

export default function middleware(req: NextApiRequest) {

    const ip: string | string[] | undefined = req.headers['x-forwarded-for']
    console.log(ip)

    if (!allowedIPs.includes('122.209.142.173')) {
        return NextResponse.redirect(new URL('/error', req.url))
    } else {
        return NextResponse.next()
    }
}
export const config = {
    matcher: '/admin/:path*',
}
