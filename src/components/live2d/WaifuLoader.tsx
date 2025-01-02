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
export default function WaifuLoader(
  props: Omit<WaifuLoaderProps, "live2dScriptInjections">,
) {
  const { id, className, resizeTo, modelOptions } = props;
  // Create canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizeToRef = useRef<HTMLElement | Window>(resizeTo ?? window);
  const { clientWidth, clientHeight } =
    resizeToRef.current instanceof HTMLElement
      ? resizeToRef.current
      : { clientWidth: window.innerWidth, clientHeight: window.innerHeight };

  const { positionX, positionY } = modelOptions?.position
    ? {
        positionX: modelOptions.position.x,
        positionY: modelOptions.position.y,
      }
    : {
        positionX: 0.5,
        positionY: 0.5,
      };

  const { scaleX, scaleY } = modelOptions?.scale
    ? {
        scaleX: modelOptions.scale.x,
        scaleY: modelOptions.scale.y,
      }
    : { scaleX: 0.1, scaleY: 0.1 };

  // Utils Function

  useEffect(() => {
    if (!resizeTo) {
      console.warn("No ResizeTo Element Provided, Using Window");
    }
    const app = new PIXI.Application({
      view: document.getElementById("canvas") as HTMLCanvasElement,
      autoStart: true,
      resizeTo: resizeToRef?.current ?? window,
      // Init with transparent background, Can override default settings
      backgroundAlpha: modelOptions?.alpha ?? 0,
      backgroundColor: modelOptions?.bgColor
        ? colorToNumber(modelOptions?.bgColor)
        : 0x000000,
    });

    Live2DModel.from(
      modelOptions?.model ??
        "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json",
    ).then((model) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      app.stage.addChild(model as any);

      // Positioning And Scaling
      model.anchor.set(0.5, 0.5); // Center Anchor (always)
      model.position.set(clientWidth * positionX, clientHeight * positionY);
      // Screen Size Normalization
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { baseXwidth, baseYwidth } = {
        // Macos 13 inch 1440 x 900 (base resolution)
        baseXwidth: 1440,
        baseYwidth: 900,
      }; // Normalized Scaling with the screen width
      model.scale.set(
        (clientWidth / baseXwidth) * scaleX,
        (clientWidth / baseXwidth) * scaleY,
      );

      //model.expression();
      model.motion("w-adult-blushed01", 0, MotionPriority.FORCE);
      model.motion("face_lookdown_01", 0, MotionPriority.IDLE);
      model.on("hit", () => {
        console.info("hit");
        model.expression();
      });

      // Make Canvas Transparent
      app.renderer.backgroundAlpha = modelOptions?.alpha ?? 0;
      app.renderer.backgroundColor = modelOptions?.bgColor
        ? colorToNumber(modelOptions?.bgColor)
        : 0x000000;
      modelOptions?.OnLoad?.(model);
    });
  }, [
    positionX,
    positionY,
    clientHeight,
    clientWidth,
    modelOptions,
    resizeTo,
    scaleX,
    scaleY,
  ]);
  return (
    <section id={id} className={className}>
      {/* Default transparent canvas */}
      <canvas
        id="canvas"
        ref={canvasRef}
        className="h-full w-full bg-transparent"
      />
    </section>
  );
}
