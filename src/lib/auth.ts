// lib/auth.ts
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "auth_user";

function getAuthSecret() {
    const value = process.env.AUTH_SECRET;
    if (!value) {
        throw new Error("AUTH_SECRET must be configured");
    }

    return new TextEncoder().encode(value);
}

export async function setUserCookie(userId: number, username: string) {
    const token = await new SignJWT({ userId, username })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(getAuthSecret());

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        path: "/",
        secure: true,
    });
}

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

export async function clearUserCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getUserFromCookie() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME)?.value;
    if (!cookie) return null;

    try {
        const { payload } = await jwtVerify(cookie, getAuthSecret());
        return {
            id: payload.userId as number,
            username: payload.username as string,
        };
    } catch {
        return null;
    }
}
