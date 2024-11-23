import { Color } from "@/types/colors";

// Shared Interfaces
export interface modelOptions {
    name?: string;
    scale?: { x: number; y: number };
    position?: { x: number; y: number };
    background?: string;
    alpha?: number;
    bgColor?: Color;
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