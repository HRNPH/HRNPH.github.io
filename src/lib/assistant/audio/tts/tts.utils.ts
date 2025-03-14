/// <reference types="@webgpu/types" />

export async function detectWebGPU() {
    try {
        const adapter = await navigator.gpu.requestAdapter();
        return !!adapter;
    } catch {
        console.warn("WebGPU not supported");
        return false;
    }
}
