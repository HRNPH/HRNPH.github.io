import { ArrowRight } from "lucide-react";
import React from "react";

interface TextInputAreaProps {
  onSendMessage: (message: string) => void;
}

export const TextInputArea: React.FC<TextInputAreaProps> = ({
  onSendMessage,
}) => {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex items-center bg-gray-800 p-4">
      <input
        className="flex-grow rounded-lg bg-gray-900 p-2 text-gray-200 focus:outline-none"
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="ml-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
        onClick={handleSend}
      >
        <ArrowRight />
      </button>
    </div>
  );
};
