"use client";
import {
  ChatCard,
  ChatMessage,
} from "@/components/live2d/chat/chatcard/ChatCard";
import { TextInputArea } from "@/components/live2d/chat/textinput/TextInput";
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

// Mock function for message submission
async function submitMessage(message: string) {
  return new Promise<ChatMessage>((resolve) => {
    console.info("Message submitted:", message);
    setTimeout(() => {
      resolve({
        id: `${Date.now()}`,
        type: "agent",
        content: "Here is the information you requested.",
      });
    }, 2000);
  });
}

export default function MyAssistant() {
  const [live2dInjected, setLive2dInjected] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [currentModel, setCurrentModel] =
    useState<Live2DModel<InternalModel> | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "agent",
      content: "Hello! How can I help you today?",
    },
  ]);

  const [isFindingInfo, setIsFindingInfo] = useState(false);

  const onLive2dScriptLoad = () => {
    console.log("Live2D Cubism SDK Loaded");
    setLive2dInjected(true);
  };

  const isDesktop = useMediaQuery("(min-width: 1024px)"); // Detect desktop screens

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

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: `${Date.now()}`,
      type: "user",
      content: message,
    };
    await currentModel?.internalModel.motionManager.expressionManager?.restoreExpression();
    const r =
      await currentModel?.internalModel.motionManager.expressionManager?.setExpression(
        "exp_14_hand_hold_document",
      ); // Find information expression
    console.info(
      "Expression result",
      r,
      currentModel?.internalModel.motionManager.expressionManager?.expressions,
    );
    setChatMessages((prev) => [...prev, userMessage]);
    setIsFindingInfo(true);

    const response = await submitMessage(message);

    await currentModel?.speak("/audio/example.wav");
    setChatMessages((prev) => [...prev, response]);
    setIsFindingInfo(false);
    // Reset Expression
    await currentModel?.internalModel.motionManager.expressionManager?.resetExpression();
  };

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
          className={`${
            isDesktop
              ? "bg-assistant-background-full"
              : "bg-assistant-background-mobile"
          } h-screen w-full bg-cover`}
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
        </div>
        <div className="absolute left-0 top-0 flex h-full w-full justify-end bg-black bg-opacity-0">
          <div className="flex h-full w-2/5 flex-col items-end justify-center md:mr-36 lg:mr-60">
            <section
              id="chat-section"
              className="flex h-3/5 w-full flex-col items-center justify-end"
            >
              <div className="flex w-full flex-col">
                {chatMessages.map((message) => (
                  <ChatCard
                    key={message.id}
                    message={message}
                    className={`${message.type === "agent" ? "items-end" : "items-start"}`}
                  />
                ))}
                {isFindingInfo && (
                  <ChatCard
                    message={{
                      id: "loading",
                      type: "agent",
                      content: "Finding information...",
                    }}
                    className="items-end"
                  />
                )}
              </div>
              <div className="flex w-full items-center justify-center">
                <TextInputArea
                  className="w-full"
                  onSendMessage={handleSendMessage}
                />
                <Button
                  className="bg-foreground text-background transition-all hover:scale-110"
                  onClick={async () => {
                    // Reset Expression
                    await currentModel?.internalModel.motionManager.expressionManager?.resetExpression();
                    // Reset chat
                    setChatMessages([
                      {
                        id: "1",
                        type: "agent",
                        content: "Do you have any questions?",
                      },
                    ]);
                  }}
                >
                  Reset Chat
                </Button>
              </div>
            </section>
          </div>
          <div className="absolute bottom-0 right-0 p-4 text-xs text-white">
            <Button
              onClick={async () => {
                if (currentModel) {
                  console.info("Speaking...");
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
