import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const basicAuth = request.headers.get("Authorization");

	if (basicAuth) {
		const [_, authValue] = basicAuth.split(" ");
		if (authValue !== undefined) {
			const [username, password] = atob(authValue).split(":");
			if (
				username === process.env.USER_NAME &&
				password === process.env.PASSWORD
			) {
				return NextResponse.next();
			}
		}
		return NextResponse.json(
			{
				error: "Invalid credentials",
			},
			{
				headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
				status: 401,
			},
		);
	}
	return NextResponse.json(
		{
			error: "Please enter credentials",
		},
		{
			headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
			status: 401,
		},
	);
}
