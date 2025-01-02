"use client";
import { type modelOptions } from "@/components/live2d/interface";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Script from "next/script";
import { InternalModel, Live2DModel } from "pixi-live2d-display-lipsyncpatch";
import { useEffect, useMemo, useState } from "react";

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
  const [currentModel, setCurrentModel] =
    useState<Live2DModel<InternalModel> | null>(null);

  const onLive2dScriptLoad = () => {
    console.log("Live2D Cubism SDK Loaded");
    setLive2dInjected(true);
  };

  const isDesktop = useMediaQuery("(min-width: 1024px)"); // Detect desktop screens

  // Eva Models Configuration
  const defaultModelOptions = useMemo(
    () =>
      ({
        name: "EVA",
        model: "/models/EVA/EVA.model3.json",
        scale: { x: 0.05, y: 0.05 },
        position: { x: 0.25, y: 0.67 },
        OnLoad: async (model) => {
          console.log("Model Loaded");
          setModelLoaded(true);
          await model.expression(13);
          setCurrentModel(model);
        },
      }) satisfies modelOptions,
    [],
  );

  const modelsOption: modelOptions = useMemo(() => {
    const options: modelOptions = { ...defaultModelOptions };
    if (isDesktop) {
      options.alpha = 0;
    } else {
      options.scale = { x: 0.25, y: 0.25 };
      options.position = { x: 0.5, y: 0.65 };
    }
    return options;
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
          className={`${isDesktop ? "bg-assistant-background-full" : "bg-assistant-background-mobile"} h-screen w-full bg-cover`}
        >
          {live2dInjected ? (
            <div>
              <WaifuLoader
                className={`h-full w-full bg-transparent ${modelLoaded ? "" : ""}`}
                // resizeTo={containerRef.current || undefined}
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
          <div className="absolute bottom-0 right-0 p-4 text-xs text-white">
            <Button
              onClick={async () => {
                if (currentModel) {
                  console.info("Speaking...");
                  // currentModel.expression(13);
                  currentModel.speak("/audio/example.wav");
                }
              }}
            >
              Speech Testing
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
