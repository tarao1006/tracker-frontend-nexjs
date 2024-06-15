import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { css, cx } from "@/styled-system/css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
});

export const metadata: Metadata = {
	title: "Assets Transition",
	description: "Stock assets transition",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cx(
					`${geistSans.variable} ${geistMono.variable}`,
					css({
						backgroundColor: "black",
					}),
				)}
			>
				{children}
			</body>
		</html>
	);
}
