"use client";

import { useState, useRef } from "react";
import FrequencyBasedLipSync from "@/lib/assistant/audio/LipSync";

export default function Lips() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const lipSync = new FrequencyBasedLipSync();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(recordedChunksRef.current, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        recordedChunksRef.current = []; // Clear recorded chunks
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone: ", error);
    }
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <div>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
      {audioURL && (
        <div className="mt-4">
          <audio
            controls
            src={audioURL}
            onPlay={(elem) => {
              elem.preventDefault();
              console.log("Playing audio...");
              // Lip sync analysis
              const audioContext = new (window.AudioContext ||
                window.AudioContext)();
              fetch(audioURL)
                .then((response) => response.arrayBuffer())
                .then((arrayBuffer) =>
                  audioContext.decodeAudioData(arrayBuffer),
                )
                .then((audioBuffer) => {
                  const float32Array = audioBuffer.getChannelData(0); // Get the first channel data
                  const result = lipSync.analyze(
                    float32Array,
                    audioContext.sampleRate,
                  );
                  console.info("Lip sync analysis result: ", result);
                })
                .catch((error) =>
                  console.error("Error decoding audio data: ", error),
                );
              console.log("Audio played");
            }}
          />
        </div>
      )}
    </main>
  );
}
