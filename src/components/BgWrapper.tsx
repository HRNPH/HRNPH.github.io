"use client";
import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

import { ReactNode } from "react";

const ParallaxBackground = ({ children }: { children: ReactNode }) => {
  return (
    <ParallaxProvider>
      <div className="relative min-h-screen bg-gray-900 text-gray-100">
        {/* Fixed gradient background */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 opacity-50" />

        {/* Animated parallax layers */}
        <Parallax speed={-10} className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent animate-pulse" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: "60px 60px",
            }}
          />
        </Parallax>

        {/* Content */}
        <div className="relative">{children}</div>
      </div>
    </ParallaxProvider>
  );
};

export default ParallaxBackground;
