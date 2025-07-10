import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
	const { pathname } = request.nextUrl;

	const token = request.cookies.get("token");

	if (pathname.startsWith("/vendor") || pathname.startsWith("/dashboard")) {
		if (!token) {
			return NextResponse.redirect(new URL("/auth/login", request.url));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/vendor/:path*",
		"/dashboard/:path*"
	]
};
