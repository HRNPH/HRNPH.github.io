"use client";

import WaifuDisplayer from "@/components/live2d/WaifuDisplayer";

export default function MyAssistant() {
  return (
    <div className="h-screen w-full">
      <WaifuDisplayer
        id="waifu"
        className="h-full w-full"
        modelOptions={{
          name: "EVA",
          model: "/models/EVA/EVA.model3.json",
          scale: { x: 0.075, y: 0.075 },
          position: { x: 0.5, y: 0.5 },
        }}
      />
    </div>
  );
}
