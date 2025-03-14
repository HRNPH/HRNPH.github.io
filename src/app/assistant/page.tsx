"use client";

import dynamic from "next/dynamic";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChatCard,
  ChatMessage,
} from "@/components/live2d/chat/chatcard/ChatCard";
import { TextInputArea } from "@/components/live2d/chat/textinput/TextInput";
import { type modelOptions } from "@/components/live2d/interface";
import { Button } from "@/components/ui/button";
import { ChatEngine } from "@/lib/assistant/chat/ChatEngine";
import { InternalModel, Live2DModel } from "pixi-live2d-display-lipsyncpatch";

const WaifuLoader = dynamic(() => import("@/components/live2d/WaifuLoader"), {
  ssr: false,
});

/* -------------------------------------------------------------------------
  Custom Hook: useMediaQuery
------------------------------------------------------------------------- */
// Hook for detecting screen size changes.
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/* -------------------------------------------------------------------------
  Custom Hook: useTTSWorker
------------------------------------------------------------------------- */
// Encapsulates Text-to-Speech (TTS) worker logic.
function useTTSWorker(setIsSpeaking: (isSpeaking: boolean) => void) {
  const worker = useRef<Worker | null>(null);
  const [status, setStatus] = useState<
    "device" | "ready" | "error" | "loading" | "audio"
  >("loading");
  const [results, setResults] = useState<
    { text: string; src: string; blob: Blob }[]
  >([]);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("@/lib/assistant/audio/tts/tts.worker", import.meta.url),
        { type: "module" },
      );
    }

    const onMessageReceived = (e: MessageEvent) => {
      const { status: workerStatus } = e.data;
      switch (workerStatus) {
        case "device":
          console.info(`Loading model (device="${e.data.device}")`);
          break;
        case "ready":
          setStatus("ready");
          console.info(`Model loaded, Available voices: ${e.data.voices}`);
          break;
        case "error":
          console.error(e.data.data);
          setStatus("error");
          break;
        case "audio": {
          const { audio, text } = e.data as { audio: Blob; text: string };
          const audioUrl = URL.createObjectURL(audio);
          setResults((prev) => [{ text, src: audioUrl, blob: audio }, ...prev]);
          setStatus("ready");
          setIsSpeaking(false);
          break;
        }
        default:
          console.warn("Unknown message received:", e.data);
      }
    };

    const onErrorReceived = (e: ErrorEvent) => {
      console.error("Worker error:", e);
    };

    worker.current.addEventListener("message", onMessageReceived);
    worker.current.addEventListener("error", onErrorReceived);

    return () => {
      worker.current?.removeEventListener("message", onMessageReceived);
      worker.current?.removeEventListener("error", onErrorReceived);
    };
  }, [setIsSpeaking]);

  const generateVoice = useCallback((text: string, voice: string) => {
    if (!worker.current) {
      console.error("Worker not initialized");
      return;
    }
    worker.current.postMessage({
      type: "generate",
      text: text.trim(),
      voice,
    });
  }, []);

  return { status, results, generateVoice };
}

/* -------------------------------------------------------------------------
  Main Component: MyAssistant
------------------------------------------------------------------------- */
export default function MyAssistant() {
  // States for Live2D and Chat
  const [live2dInjected, setLive2dInjected] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [currentModel, setCurrentModel] =
    useState<Live2DModel<InternalModel> | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isFindingInfo, setIsFindingInfo] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Media query to detect desktop screens
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Initialize ChatEngine and set welcome message
  const chatClient = useMemo(() => new ChatEngine(), []);
  useEffect(() => {
    const initialMessages = chatClient.initChat(
      "Hello! How can I help you today?",
    );
    setChatMessages(initialMessages);
  }, [chatClient]);

  // Callback when the Live2D Cubism SDK script loads
  const onLive2dScriptLoad = () => {
    console.log("Live2D Cubism SDK Loaded");
    setLive2dInjected(true);
  };

  // Model options for Live2D
  const defaultModelOptions: modelOptions = useMemo(
    () => ({
      name: "EVA",
      model: "/models/EVA/EVA.model3.json",
      scale: { x: 0.05, y: 0.05 },
      position: { x: 0.25, y: 0.67 },
      OnLoad: async (model) => {
        console.log("Model Loaded");
        setModelLoaded(true);
        setCurrentModel(model);
      },
    }),
    [],
  );

  const modelsOption: modelOptions = useMemo(() => {
    if (isDesktop) {
      return { ...defaultModelOptions, alpha: 0 };
    }
    return {
      ...defaultModelOptions,
      scale: { x: 0.25, y: 0.25 },
      position: { x: 0.5, y: 0.65 },
    };
  }, [isDesktop, defaultModelOptions]);

  // TTS Worker hook for voice generation
  const { status, results, generateVoice } = useTTSWorker(setIsSpeaking);
  const selectedSpeaker = "af_heart";

  /* -----------------------------------------------------------------------
  Handlers for Chat and Voice Generation
  ----------------------------------------------------------------------- */
  const handleSendMessage = async (message: string) => {
    // Set expression for finding information
    await currentModel?.internalModel.motionManager.expressionManager?.restoreExpression();
    await currentModel?.internalModel.motionManager.expressionManager?.setExpression(
      "exp_14_hand_hold_document",
    );

    // Immediately add user message for better UX
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: message,
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setIsFindingInfo(true);

    try {
      const updatedMessages = await chatClient.sendChatMessage(message);
      setChatMessages(updatedMessages);
      // Play audio response
      handleSubmitVoiceGeneration(
        updatedMessages[updatedMessages.length - 1].content,
      );
    } catch (error) {
      console.error({ error, message: "Error sending message" });
    } finally {
      setIsFindingInfo(false);
      await currentModel?.internalModel.motionManager.expressionManager?.resetExpression();
    }
  };

  const handleResetChat = async () => {
    await currentModel?.internalModel.motionManager.expressionManager?.resetExpression();
    const resetMessages = chatClient.resetChat("Do you have any questions?");
    setChatMessages(resetMessages);
  };

  const handleSubmitVoiceGeneration = (text: string) => {
    generateVoice(text, selectedSpeaker);
  };

  // When a voice result is available, play it if conditions are met.
  useEffect(() => {
    const speakResponse = async () => {
      if (currentModel && !isSpeaking && results.length > 0) {
        setIsSpeaking(true);
        await currentModel.speak(results[0].src);
      }
    };
    speakResponse();
  }, [results, currentModel, isSpeaking]);

  /* -------------------------------------------------------------------------
  Render
  ------------------------------------------------------------------------- */
  return (
    <>
      <Script
        src="sdk/live2dcubismcore.min.js"
        strategy="afterInteractive"
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
                className="h-full w-full bg-transparent"
                modelOptions={modelsOption}
              />
              {!modelLoaded && (
                <div className="flex h-screen items-center justify-center bg-black bg-opacity-50">
                  <div className="text-2xl text-white">Calling For EVA...</div>
                </div>
              )}
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
                    className={
                      message.type === "agent" ? "items-end" : "items-start"
                    }
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
                  onSendMessage={handleSendMessage}
                  className="w-full"
                />
                <Button
                  className="bg-foreground text-background transition-all hover:scale-110"
                  onClick={handleResetChat}
                >
                  Reset Chat
                </Button>
              </div>
            </section>
          </div>
          <div className="absolute bottom-0 right-0 p-4 text-xs text-white">
            <div className="mb-4">
              <span>Audio Engine Status: </span>
              <span className="font-bold">{status}</span>
            </div>
            <Button
              onClick={() =>
                handleSubmitVoiceGeneration(
                  "Hello, this is a test message. my name is EVA and I am here to help you.",
                )
              }
            >
              Speech Testing
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
