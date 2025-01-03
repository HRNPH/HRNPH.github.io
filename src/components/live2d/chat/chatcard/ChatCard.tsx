/* eslint-disable @next/next/no-img-element */
import React from "react";

export type ChatMessage = {
  id: string;
  type: "user" | "agent";
  content: string;
};

interface ChatCardProps {
  message: ChatMessage;
  className?: string;
}

export const ChatCard: React.FC<ChatCardProps> = ({ message, className }) => {
  const isUser = message.type === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 items-center ${className}`}
    >
      {!isUser && (
        <img
          src="/images/assistant/profile/eva.png"
          alt="Agent Profile"
          className="mr-2 h-10 w-10 rounded-md"
        />
      )}
      <div
        className={`max-w-xs rounded-lg p-4 ${
          isUser
            ? "bg-gradient-to-r from-blue-700 to-purple-700 text-white"
            : "bg-gradient-to-r from-purple-700 to-blue-700 text-white"
        }`}
      >
        <p>{message.content}</p>
      </div>
      {isUser && (
        <img
          src="/images/assistant/profile/user.jpeg"
          alt="User Profile"
          className="ml-2 h-10 w-10 rounded-md"
        />
      )}
    </div>
  );
};
