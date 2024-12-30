import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ParallaxBackground from "@/components/BgWrapper";

const mitrSans = localFont({
  src: "./fonts/Mitr-Regular.ttf",
  variable: "--font-mitr-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Hrnph",
  description: "Hirunkul Phimsiri's personal website",
  icons: ["/icon.jpeg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.jpeg" type="image/jpeg" sizes="32x32" />
      </head>
      <body
        className={`${mitrSans.variable}font-mitrSans bg-black antialiased`}
      >
        <ParallaxBackground>{children}</ParallaxBackground>
      </body>
    </html>
  );
}
