"use client";
import { useEffect, useRef } from "react";
import { Live2DModel, MotionPriority } from "pixi-live2d-display/cubism4";
import * as PIXI from "pixi.js";
import { WaifuLoaderProps } from "./interface";
import { colorToNumber } from "@/lib/utils";

Live2DModel.registerTicker(PIXI.Ticker);

/**
 * Load live2d model on the screen, Offer low-level control.
 * @remarks
 * Use WaifuDisplayer instead for typical use cases.
 */
export default function WaifuLoader(props: WaifuLoaderProps) {
  const { id, className, resizeTo, modelOptions } = props;
  // Create canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizeToRef = useRef<HTMLElement | Window>(resizeTo ?? window);
  const { clientWidth, clientHeight } =
    resizeToRef.current instanceof HTMLElement
      ? resizeToRef.current
      : { clientWidth: window.innerWidth, clientHeight: window.innerHeight };

  const { anchorX, anchorY } = modelOptions?.position
    ? {
        anchorX: modelOptions.position.x,
        anchorY: modelOptions.position.y,
      }
    : {
        anchorX: 0.5,
        anchorY: 0.5,
      };

  const { scaleX, scaleY } = modelOptions?.scale
    ? {
        scaleX: modelOptions.scale.x,
        scaleY: modelOptions.scale.y,
      }
    : { scaleX: 0.1, scaleY: 0.1 };

  // Utils Function

  useEffect(() => {
    if (!resizeTo) return;
    const app = new PIXI.Application({
      view: document.getElementById("canvas") as HTMLCanvasElement,
      autoStart: true,
      resizeTo: resizeToRef.current,
    });

    Live2DModel.from(
      // "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json"
      "/models/SakiUnit/02saki_unit.model3.json"
    ).then((model) => {
      app.stage.addChild(model);

      model.anchor.set(anchorX, anchorY);
      model.position.set(clientWidth / 2, clientHeight / 2);
      model.scale.set(scaleX, scaleY);

      // Todo Add Option To Access model

      //model.expression();
      model.motion("w-adult-blushed01", 0, MotionPriority.FORCE);
      model.motion("face_lookdown_01", 0, MotionPriority.IDLE);
      model.on("hit", () => {
        console.info("hit");
        model.expression();
      });

      // Make Canvas Transparent
      app.renderer.backgroundAlpha = modelOptions?.alpha ?? 1;
      app.renderer.backgroundColor = modelOptions?.bgColor
        ? colorToNumber(modelOptions?.bgColor)
        : 0x000000;
    });
  }, [
    anchorX,
    anchorY,
    clientHeight,
    clientWidth,
    modelOptions?.alpha,
    modelOptions?.bgColor,
    resizeTo,
    scaleX,
    scaleY,
  ]);
  return (
    <section id={id} className={className}>
      <canvas id="canvas" ref={canvasRef} />
    </section>
  );
}
