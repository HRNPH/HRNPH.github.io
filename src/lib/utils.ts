import { Color } from "@/types/colors";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a Color type to a numeric representation.
 * For RGB/RGBA, the output is a 32-bit integer.
 * For HEX, the output is also a 32-bit integer.
 *
 * @param color - The color value as RGB, RGBA, or HEX.
 * @returns A numeric representation of the color.
 */
export function colorToNumber(color: Color): number {
  if (color.startsWith("rgb")) {
    // RGB or RGBA format
    const isRgba = color.startsWith("rgba");
    const matches = color.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);

    if (!matches) {
      throw new Error("Invalid RGB/RGBA color format");
    }

    const r = parseInt(matches[1], 10);
    const g = parseInt(matches[2], 10);
    const b = parseInt(matches[3], 10);
    const a = isRgba ? Math.round(parseFloat(matches[4]) * 255) : 255; // Alpha defaults to 255 if not present

    // Combine into a single 32-bit integer
    return (a << 24) | (r << 16) | (g << 8) | b;
  } else if (color.startsWith("#")) {
    // HEX format
    let hex = color.slice(1);
    if (hex.length === 3) {
      // Convert shorthand HEX (e.g., #abc) to full HEX (e.g., #aabbcc)
      hex = hex.split("").map((c) => c + c).join("");
    }

    if (hex.length === 6) {
      // Add alpha (fully opaque) for 6-character HEX
      hex += "ff";
    }

    if (hex.length !== 8) {
      throw new Error("Invalid HEX color format");
    }

    // Parse as a 32-bit integer
    return parseInt(hex, 16);
  } else {
    throw new Error("Unsupported color format");
  }
}