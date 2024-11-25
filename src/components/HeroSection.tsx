"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import WaifuDisplayer from "./live2d/WaifuDisplayer";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate opacity and position for the Live2D model
  const waifuOpacity = Math.min(1, scrollY / 500); // Fully visible after 500px scroll
  const waifuTransform = Math.max(0, 1 - scrollY / 500); // Shrink as scroll increases

  return (
    <section className="relative w-full h-screen flex items-center bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Left Text Content */}
      <div className="container mx-auto flex flex-col justify-center space-y-6 px-6 md:w-1/2">
        <h1 className="text-5xl font-extrabold leading-tight text-gray-800 dark:text-gray-100">
          Hello, I’m <span className="text-blue-700">Guide</span>.
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A passionate{" "}
          <span className="font-medium text-gray-900 dark:text-gray-50">
            Developer
          </span>
          , building innovative web experiences and solving challenging problems
          with modern technologies.
        </p>
        <div className="flex space-x-4">
          <Button className="px-6 py-3 text-lg">My Work</Button>
          <Button variant="outline" className="px-6 py-3 text-lg">
            Contact Me
          </Button>
        </div>
      </div>
      {/* Right Photo Content */}
      <div className="relative h-full flex items-center justify-center">
        <div
          className="w-3/4 h-3/4 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 transition-transform duration-500"
          style={{
            transform: `scale(${waifuTransform})`,
            opacity: `${waifuOpacity < 0.5 ? 1 - waifuOpacity : 0}`,
          }}
        >
          <img
            src="/images/me/01.jpeg"
            alt="Your Portrait"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <WaifuDisplayer
            className={`absolute top-0 right-0 h-screen w-4/6 transition-opacity duration-500 ${
              waifuOpacity > 0.5 ? "visible" : "hidden"
            }`}
            modelOptions={{
              model: "/models/SakiUnit/02saki_unit.model3.json",
              position: {
                x: 0.5,
                y: 0.4,
              },
              scale: {
                x: 0.3,
                y: 0.3,
              },
              alpha: 0,
            }}
          />
        </div>
      </div>
    </section>
  );
}
