"use client";
import { useEffect, useRef } from "react";
import { Live2DModel, MotionPriority } from "pixi-live2d-display/cubism4";
import * as PIXI from "pixi.js";

Live2DModel.registerTicker(PIXI.Ticker);

type Dict<T> = { [key: string]: T };
export default function WaifuDisplayer(
  model: string,
  options?: Dict<string | number>
) {
  // Create canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const app = new PIXI.Application({
      view: document.getElementById("canvas") as HTMLCanvasElement,
      autoStart: true,
      resizeTo: window,
    });

    Live2DModel.from(
      // "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json"
      "/models/SakiUnit/02saki_unit.model3.json"
    ).then((model) => {
      app.stage.addChild(model);

      model.anchor.set(0.5, 0.5);
      model.position.set(window.innerWidth / 2, window.innerHeight / 2);
      model.scale.set(0.25, 0.25);
      //model.expression();
      model.motion("w-adult-blushed01", 0, MotionPriority.FORCE);
      model.on("hit", () => {
        console.info("hit");
        model.expression();
      });
    });
  }, []);
  return (
    <>
      <div>
        <canvas id="canvas" ref={canvasRef} />
      </div>
    </>
  );
}
