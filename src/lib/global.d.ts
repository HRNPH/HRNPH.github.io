import * as PIXI from 'pixi.js';

declare global {
  interface Window {
    PIXI: typeof PIXI;
  }
}

declare module '@/lib/live2d/live2dcubismcore.min.js' {
  const content: any;
  export default content;
}