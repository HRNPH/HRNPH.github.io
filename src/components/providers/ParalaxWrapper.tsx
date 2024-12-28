"use client";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

export const ParallaxWrapper = ({
  children,
  speed,
}: {
  children: React.ReactNode;
  speed: number;
}) => {
  return (
    <ParallaxProvider>
      <Parallax speed={speed}>{children}</Parallax>
    </ParallaxProvider>
  );
};
