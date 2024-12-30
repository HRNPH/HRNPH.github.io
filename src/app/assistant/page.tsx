"use client";
import { type modelOptions } from "@/components/live2d/interface";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";

const WaifuLoader = dynamic(() => import("@/components/live2d/WaifuLoader"), {
  ssr: false,
});

export default function MyAssistant() {
  const [live2dInjected, setLive2dInjected] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  const onLive2dScriptLoad = () => {
    console.log("Live2D Cubism SDK Loaded");
    setLive2dInjected(true);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const resizeTarget = useMemo(() => containerRef.current, []);
  const modelsConfig = useMemo(
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
        alpha: 0,
      }) satisfies modelOptions,
    [], // Ensure the object is stable unless dependencies change
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return; // Skip if the container is not ready

    // Update dimensions when the container resizes
    const updateDimensions = () => {
      const { offsetWidth, offsetHeight } = container;
      setDimensions(
        ({ width, height }) =>
          width !== offsetWidth || height !== offsetHeight
            ? { width: offsetWidth, height: offsetHeight }
            : { width, height }, // Return the same object to avoid unnecessary updates
      );
    };

    // Initialize dimensions
    updateDimensions();

    // Observe changes in container size
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <Script
        src="sdk/live2dcubismcore.min.js" // Load Live2D Cubism SDK, Needed For WaifuLibs
        strategy="afterInteractive" // load before anything else
        onLoad={onLive2dScriptLoad}
      />
      <main>
        {/* Desktop View */}
        <div
          id="dekstop-view"
          className="bg-assistant-background-full hidden h-screen w-full bg-cover lg:block"
        >
          {live2dInjected ? (
            <div ref={containerRef}>
              <WaifuLoader
                className={`h-full w-full bg-transparent lg:block ${modelLoaded ? "" : "hidden"}`}
                resizeTo={resizeTarget || undefined}
                modelOptions={modelsConfig}
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
      {/* <div className="bg-assistant-background-full h-screen w-full bg-cover lg:hidden">
        <div className="flex h-full items-center justify-center"></div>
      </div> */}
    </>
  );
}
