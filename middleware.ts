import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if the path is a vendor route
	if (
		pathname.startsWith("/vendor/dashboard") ||
		pathname.startsWith("/vendor/profile")
	) {
		// Check for vendor authentication token
		const vendorToken = request.cookies.get("vat");

		if (!vendorToken) {
			return NextResponse.redirect(new URL("/vendor/login", request.url));
		}
	}

	// Check if the path is a user dashboard route
	if (
		pathname.startsWith("/dashboard") &&
		!pathname.startsWith("/vendor/dashboard")
	) {
		const userToken = request.cookies.get("uat");

		if (!userToken) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/vendor/dashboard/:path*",
		"/vendor/profile/:path*",
		"/dashboard/:path*"
	]
};
