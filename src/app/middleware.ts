import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // Retrieve token from cookies
    const token = req.cookies.get('authToken');

    // Define paths that require authentication
    const protectedPaths = ['/select', '/edit', '/figma'];
    const currentPath = req.nextUrl.pathname;

    // Check if the route requires authentication
    if (protectedPaths.includes(currentPath)) {
        if (!token) {
            // If no token, redirect to home page
            const redirectUrl = new URL('/', req.url);
            return NextResponse.redirect(redirectUrl);
        }
    }

    // Allow access if token exists or path is not protected
    return NextResponse.next();
}

export const config = {
    matcher: ['/select', '/edit', '/figma'], // Define routes where this middleware applies
};
