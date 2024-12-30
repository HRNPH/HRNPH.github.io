import React from "react";

interface VoiceInputProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onStartRecording,
  onStopRecording,
}) => {
  const [isRecording, setIsRecording] = React.useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
    setIsRecording(!isRecording);
  };

  return (
    <button
      className={`rounded-full p-4 ${
        isRecording ? "bg-red-500" : "bg-green-500"
      } text-white hover:opacity-80`}
      onClick={toggleRecording}
    >
      {isRecording ? "Stop" : "Record"}
    </button>
  );
};
