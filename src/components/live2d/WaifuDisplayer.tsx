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
  const [resizeTarget, setResizeTarget] = useState<HTMLElement | null>(null);
  const [Initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setResizeTarget(containerRef.current);

      // Update resize target dynamically on window resize
      const handleResize = () => {
        setResizeTarget(containerRef.current);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
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
        {Initialized && resizeTarget ? (
          <WaifuLoader resizeTo={resizeTarget} modelOptions={modelOptions} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
