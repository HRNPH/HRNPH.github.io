"use client";
// import { WaifuDisplayer } from "@/components/live2d/WaifuDisplayer";
import dynamic from "next/dynamic";

const WaifuDisplayer = dynamic(
  () => import("@/components/live2d/WaifuDisplayer"),
  { ssr: false }
);
export default function Home() {
  return (
    <div className="container">
      <WaifuDisplayer />
    </div>
  );
}
