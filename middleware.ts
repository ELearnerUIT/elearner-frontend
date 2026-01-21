import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROOT_DOMAIN = process.env.ROOT_DOMAIN || "localhost:3000";

/**
 * Proxy configuration for subdomain-based routing
 *
 * This configuration maps different user roles to specific subdomains:
 * - admin.{domain} -> Admin routes (/admin/*)
 * - teacher.{domain} -> Instructor routes (/instructor/*)
 * - {domain} -> Public and Student routes
 *
 * Environment Variables:
 * - ROOT_DOMAIN: The base domain (e.g., "localhost:3000" or "elearner.com")
 *
 * To test locally:
 * 1. Add entries to your hosts file:
 *    - Windows: C:\Windows\System32\drivers\etc\hosts
 *    - Mac/Linux: /etc/hosts
 *
 *    127.0.0.1 admin.localhost
 *    127.0.0.1 teacher.localhost
 *
 * 2. Set ROOT_DOMAIN in .env.local:
 *    ROOT_DOMAIN=localhost:3000
 *
 * 3. Access different domains:
 *    - http://localhost:3000 - Public/Student
 *    - http://admin.localhost:3000 - Admin panel
 *    - http://teacher.localhost:3000 - Instructor panel
 *
 * Production:
 * - https://elearner.com - Public/Student
 * - https://admin.elearner.com - Admin panel
 * - https://teacher.elearner.com - Instructor panel
 */

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";

    let currentHost = "";

    const hostWithoutPort = hostname.split(":")[0];
    const rootDomainWithoutPort = ROOT_DOMAIN.split(":")[0];

    // Extract subdomain
    const hostParts = hostWithoutPort.split(".");

    // Check if it's a Vercel domain
    if (hostname.includes("vercel.app")) {
        // For vercel.app: admin.elearner-fe.vercel.app (4 parts = subdomain)
        // elearner-fe.vercel.app (3 parts = root)
        if (hostParts.length >= 4) {
            currentHost = hostParts[0];
        }
    } else if (hostname.includes("localhost")) {
        // For localhost: admin.localhost (2 parts = subdomain), localhost (1 part = root)
        if (hostParts.length >= 2) {
            currentHost = hostParts[0];
        }
    } else {
        // For custom domains like elearner.com
        // admin.elearner.com (3 parts = subdomain)
        // www.elearner.com or elearner.com (3 or 2 parts = root)
        const rootParts = rootDomainWithoutPort.split(".");

        // Only extract subdomain if we have MORE parts than the configured root domain
        // AND the hostname ends with the root domain
        if (
            hostParts.length > rootParts.length &&
            hostWithoutPort.endsWith(rootDomainWithoutPort)
        ) {
            // Check if it's actually a subdomain or just www
            const potentialSubdomain = hostParts[0];
            if (potentialSubdomain !== "www") {
                currentHost = potentialSubdomain;
            }
        }
    }

    // Handle admin subdomain
    if (currentHost === "admin") {
        return NextResponse.rewrite(
            new URL(`/admin${url.pathname}${url.search}`, req.url),
        );
    }

    // Handle teacher/instructor subdomain
    if (currentHost === "teacher") {
        return NextResponse.rewrite(
            new URL(`/teacher${url.pathname}${url.search}`, req.url),
        );
    }

    // No subdomain - public and student routes
    if (!currentHost) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|manifest.json).*)",
    ],
};

export const SUBDOMAIN_CONFIG = {
    admin: "admin",
    teacher: "teacher",
} as const;

export const SUBDOMAIN_ROUTE_MAP = {
    admin: "/admin",
    teacher: "/teacher",
} as const;

export type SubdomainConfig = typeof SUBDOMAIN_CONFIG;
export type SubdomainRouteMap = typeof SUBDOMAIN_ROUTE_MAP;
