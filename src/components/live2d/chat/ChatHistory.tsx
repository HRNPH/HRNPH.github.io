import React, { useState } from "react";
import { ChatMessage, InteractionMode } from "./chat.interface";
import { ChatCard } from "./chatcard/ChatCard";
import { TextInputArea } from "./textinput/TextInput";
import { VoiceInput } from "./voiceinput/VoiceInput";

export const ChatHistory: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mode, setMode] = useState<InteractionMode>(InteractionMode.Chat);

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleReceiveMessage = (message: string) => {
    const agentMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "agent",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, agentMessage]);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow overflow-y-auto bg-gray-900 p-4">
        {messages.map((message) => (
          <ChatCard key={message.id} message={message} />
        ))}
      </div>
      <div className="flex items-center bg-gray-800 p-4">
        <button
          className={`rounded-lg px-4 py-2 ${
            mode === InteractionMode.Chat ? "bg-blue-500" : "bg-gray-700"
          } text-white`}
          onClick={() =>
            setMode(
              mode === InteractionMode.Chat
                ? InteractionMode.Voice
                : InteractionMode.Chat,
            )
          }
        >
          {mode === InteractionMode.Chat ? "Switch to Voice" : "Switch to Chat"}
        </button>
        {mode === InteractionMode.Chat ? (
          <TextInputArea onSendMessage={handleSendMessage} />
        ) : (
          <VoiceInput
            onStartRecording={() =>
              handleReceiveMessage("Voice message received!")
            }
            onStopRecording={() => console.log("Recording stopped")}
          />
        )}
      </div>
    </div>
  );
};
