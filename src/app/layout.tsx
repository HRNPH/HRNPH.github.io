import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const mitrSans = localFont({
  src: "./fonts/Mitr-Regular.ttf",
  variable: "--font-mitr-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Hrnph",
  description: "Hirunkul Phimsiri's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="sdk/live2dcubismcore.min.js"
          strategy="afterInteractive" // load before anything else
        />
      </head>
      <body className={`${mitrSans.variable} font-mitrSans antialiased`}>
        {children}
      </body>
    </html>
  );
}
