import { Color } from "@/types/colors";
import { type Live2DModel, type InternalModel } from "pixi-live2d-display";

// Shared Interfaces
export interface modelOptions {
    name?: string;
    scale?: { x: number; y: number };
    position?: { x: number; y: number };
    background?: string;
    alpha?: number;
    bgColor?: Color;
    OnLoad?: (model: Live2DModel<InternalModel>) => void;
}

// Waifuloaders Interfaces
export interface WaifuLoaderProps {
    id?: string;
    className?: string;
    resizeTo?: HTMLElement | Window;
    modelOptions?: modelOptions;
}

// WaifuDisplayer Interfaces
export type WaifuDisplayerProps = Omit<WaifuLoaderProps, "resizeTo">;