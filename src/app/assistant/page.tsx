"use client";
import {
  ChatCard,
  ChatMessage,
} from "@/components/live2d/chat/chatcard/ChatCard";
import { TextInputArea } from "@/components/live2d/chat/textinput/TextInput";
import { type modelOptions } from "@/components/live2d/interface";
import { Button } from "@/components/ui/button";
import { ChatEngine } from "@/lib/assistant/chat/ChatEngine";
import dynamic from "next/dynamic";
import Script from "next/script";
import { InternalModel, Live2DModel } from "pixi-live2d-display-lipsyncpatch";
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
  const [currentModel, setCurrentModel] =
    useState<Live2DModel<InternalModel> | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isFindingInfo, setIsFindingInfo] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize ChatEngine
  const chatClient = useMemo(() => new ChatEngine(), []);

  // Initialize chat with welcome message
  useEffect(() => {
    setChatMessages(chatClient.initChat("Hello! How can I help you today?"));
  }, [chatClient]);

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
    // Set expression for finding information
    await currentModel?.internalModel.motionManager.expressionManager?.restoreExpression();
    await currentModel?.internalModel.motionManager.expressionManager?.setExpression(
      "exp_14_hand_hold_document",
    );

    // Add user message to UI immediately for better UX
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: message,
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setIsFindingInfo(true);

    try {
      // Send to chatbot API and get updated messages
      const updatedMessages = await chatClient.sendChatMessage(message);
      setChatMessages(updatedMessages);

      console.log({
        state: "handleSubmitVoiceGeneration",
        updatedMessages: updatedMessages,
      });
      // Play audio response
      handleSubmitVoiceGeneration(
        updatedMessages[updatedMessages.length - 1].content,
      );
    } catch (error) {
      console.error({ error: error, message: "Error sending message" });
    } finally {
      setIsFindingInfo(false);
      // Reset Expression
      await currentModel?.internalModel.motionManager.expressionManager?.resetExpression();
    }
  };

  const handleResetChat = async () => {
    // Reset Expression
    await currentModel?.internalModel.motionManager.expressionManager?.resetExpression();

    // Reset chat history and get welcome message
    const resetMessages = chatClient.resetChat("Do you have any questions?");
    setChatMessages(resetMessages);
  };

  // -- TTS Engine --
  // Create a reference to the worker object.
  const worker = useRef<Worker | null>(null);
  const selectedSpeaker = "af_heart";
  // const [voices, setVoices] = useState([]); // List of available voices
  const [status, setStatus] = useState<
    "device" | "ready" | "error" | "loading" | "audio"
  >("loading");
  const [results, setResults] = useState<
    { text: string; src: string; blob: Blob }[]
  >([]);

  useEffect(() => {
    // Create the worker if it does not yet exist.
    worker.current ??= new Worker(
      new URL("@/lib/assistant/audio/tts/tts.worker", import.meta.url),
      {
        type: "module",
      },
    );

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e: MessageEvent) => {
      switch (e.data.status) {
        case "device":
          console.info(`Loading model (device="${e.data.device}")`);
          break;
        case "ready":
          setStatus("ready");
          // setVoices(e.data.voices);
          console.info(`Model loaded, Available voices: ${e.data.voices}`);
          break;
        case "error":
          console.error(e.data.data);
          break;
        case "audio":
          const { audio, text }: { audio: Blob; text: string } = e.data;
          console.info({
            state: "audio.received",
            audio: audio,
            text: text,
          });
          const audioUrl = URL.createObjectURL(audio);
          setResults((prev) => [
            { text: text, src: audioUrl, blob: audio },
            ...prev,
          ]);
          setStatus("ready");
          setIsSpeaking(false);
          break;
        default:
          console.warn("Unknown message received:", e.data);
      }
    };

    const onErrorReceived = (e: ErrorEvent) => {
      console.error("Worker error:", e);
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);
    worker.current.addEventListener("error", onErrorReceived);

    // Define a cleanup function for when the component is unmounted.
    return () => {
      worker.current?.removeEventListener("message", onMessageReceived);
      worker.current?.removeEventListener("error", onErrorReceived);
    };
  }, []);

  const handleSubmitVoiceGeneration = (text: string) => {
    if (!worker.current) {
      console.error({ error: "Worker not initialized" });
      return;
    }
    worker.current.postMessage({
      type: "generate",
      text: text.trim(),
      voice: selectedSpeaker,
    });
  };

  // speak on result
  useEffect(() => {
    async function speakText() {
      const isWillSpeak = currentModel && !isSpeaking && results.length > 0;
      console.log({
        state: "is.model.will.speak",
        currentModel: currentModel,
        isSpeaking: isSpeaking,
        results: results,
        isWillSpeak: isWillSpeak,
      });
      if (isWillSpeak) {
        setIsSpeaking(true);
        await currentModel.speak(results[0].src);
      }
    }

    speakText();
  }, [results, currentModel, isSpeaking]);

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
                  onClick={handleResetChat}
                >
                  Reset Chat
                </Button>
              </div>
            </section>
          </div>
          <div className="absolute bottom-0 right-0 p-4 text-xs text-white">
            <div>
              {/* Status */}
              <div className="mb-4">
                <span>Audio Engine Status: </span>
                <span className="font-bold">{status}</span>
              </div>
              {/* Speech Testing */}
              <Button
                onClick={async () => {
                  handleSubmitVoiceGeneration(
                    "Hello, this is a test message. my name is EVA and I am here to help you.",
                  );
                }}
              >
                Speech Testing
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
