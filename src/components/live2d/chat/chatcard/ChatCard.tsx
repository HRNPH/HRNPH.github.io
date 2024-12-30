import React from "react";
import { ChatMessage } from "../chat.interface";

interface ChatCardProps {
  message: ChatMessage;
}

export const ChatCard: React.FC<ChatCardProps> = ({ message }) => {
  const isUser = message.type === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4 items-center`}
    >
      <div
        className={`max-w-xs rounded-lg p-4 ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-200"
        }`}
      >
        <p>{message.content}</p>
        <span className="mt-2 block text-xs text-gray-400">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};
