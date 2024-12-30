"use client";
import { type modelOptions } from "@/components/live2d/interface";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";

const WaifuLoader = dynamic(() => import("@/components/live2d/WaifuLoader"), {
  ssr: false,
});

// Hook for detecting screen size
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query, matches]);

  return matches;
}

export default function MyAssistant() {
  const [live2dInjected, setLive2dInjected] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  const onLive2dScriptLoad = () => {
    console.log("Live2D Cubism SDK Loaded");
    setLive2dInjected(true);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)"); // Detect desktop screens

  // Eva Models Configuration
  const defaultModelOptions = useMemo(
    () =>
      ({
        name: "EVA",
        model: "/models/EVA/EVA.model3.json",
        scale: { x: 0.065, y: 0.065 },
        position: { x: 1.65, y: 0.37 },
        OnLoad: () => {
          console.log("Model Loaded");
          setModelLoaded(true);
        },
      }) satisfies modelOptions,
    [],
  );

  const modelsOption = useMemo(() => {
    if (isDesktop) {
      return {
        ...defaultModelOptions,
        alpha: 0,
      };
    } else {
      return {
        ...defaultModelOptions,
        scale: { x: 0.1, y: 0.1 },
        position: { x: 0.5, y: 0.37 },
      };
    }
  }, [isDesktop, defaultModelOptions]);

  return (
    <>
      <Script
        src="sdk/live2dcubismcore.min.js" // Load Live2D Cubism SDK, Needed For WaifuLibs
        strategy="afterInteractive" // load before anything else
        onLoad={onLive2dScriptLoad}
      />
      <main>
        <div
          id="assistant-view"
          className={`${isDesktop ? "bg-assistant-background-full" : "bg-assistant-background-fullmobile"} h-screen w-full bg-cover`}
        >
          {live2dInjected ? (
            <div ref={containerRef}>
              <WaifuLoader
                className={`h-full w-full bg-transparent ${modelLoaded ? "" : ""}`}
                resizeTo={containerRef.current || undefined}
                modelOptions={modelsOption}
              />
              <div
                className={`flex h-screen items-center justify-center bg-black bg-opacity-50 ${modelLoaded ? "hidden" : ""}`}
              >
                <div className="text-2xl text-white">Calling For EVA...</div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center bg-black bg-opacity-50">
              <div className="text-2xl text-white">Loading Cubism SDK...</div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
