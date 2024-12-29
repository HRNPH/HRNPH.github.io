"use client";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { WaifuDisplayerProps } from "./interface";

const WaifuLoader = dynamic(() => import("@/components/live2d/WaifuLoader"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

/**
 * Display live2d model on the screen, with the ability to interact with it.
 */
export default function WaifuDisplayer(props: WaifuDisplayerProps) {
  const { id, className, modelOptions } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [Initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        if (containerRef.current) {
          const { offsetWidth, offsetHeight } = containerRef.current;
          setDimensions({ width: offsetWidth, height: offsetHeight });
        }
      };

      // Initial dimensions
      updateDimensions();

      // Use ResizeObserver to track size changes
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  const WaifuLoaded = () => {
    console.log("WaifuLibs loaded");
    setInitialized(true);
  };

  return (
    <>
      <Script
        src="sdk/live2dcubismcore.min.js" // Load Live2D Cubism SDK, Needed For WaifuLibs
        strategy="afterInteractive" // load before anything else
        onLoad={WaifuLoaded} // Initialize WaifuLibs after SDK is loaded
      />
      <div id={id} className={className} ref={containerRef}>
        {Initialized ? (
          <WaifuLoader
            resizeTo={containerRef.current || undefined}
            modelOptions={modelOptions}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
