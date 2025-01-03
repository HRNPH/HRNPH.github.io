import { ArrowRight } from "lucide-react";
import React from "react";

interface TextInputAreaProps {
  onSendMessage: (message: string) => void;
  className?: string;
}

export const TextInputArea: React.FC<TextInputAreaProps> = ({
  onSendMessage,
  className,
}) => {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className={`flex items-center p-4 ${className}`}>
      <input
        className="flex-grow rounded-lg bg-white p-2 text-gray-900 focus:outline-none"
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />
      <button
        className="ml-2 transform rounded-lg bg-gradient-to-r from-purple-400 to-blue-700 p-2 text-white transition-transform hover:scale-105 hover:cursor-pointer hover:from-purple-500 hover:to-blue-800 focus:outline-none"
        onClick={handleSend}
      >
        <ArrowRight />
      </button>
    </div>
  );
};
