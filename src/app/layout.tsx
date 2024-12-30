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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${mitrSans.variable}font-mitrSans bg-black antialiased`}
      >
        <ParallaxBackground>{children}</ParallaxBackground>
      </body>
    </html>
  );
}
