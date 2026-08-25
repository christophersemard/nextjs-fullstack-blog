// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "auth_user";
const protectedRoutes = ["/admin"];

function getAuthSecret() {
    const value = process.env.AUTH_SECRET;
    if (!value) {
        throw new Error("AUTH_SECRET must be configured");
    }

    return new TextEncoder().encode(value);
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
        const url = request.nextUrl.clone();
        url.pathname = "/connexion";
        return NextResponse.redirect(url);
    }

    try {
        await jwtVerify(token, getAuthSecret());
        return NextResponse.next();
    } catch {
        const url = request.nextUrl.clone();
        url.pathname = "/connexion";
        return NextResponse.redirect(url);
    }
}
