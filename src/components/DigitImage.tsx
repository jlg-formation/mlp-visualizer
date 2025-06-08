import { useEffect, useRef } from "react";

interface DigitImageProps {
  pixels: number[];
  size?: number;
}

export default function DigitImage({ pixels, size = 32 }: DigitImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.createImageData(8, 8);
    for (let i = 0; i < 64; i++) {
      const val = Math.round((1 - pixels[i]) * 255);
      const idx = i * 4;
      imgData.data[idx] = val;
      imgData.data[idx + 1] = val;
      imgData.data[idx + 2] = val;
      imgData.data[idx + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  }, [pixels]);

  return (
    <canvas
      ref={canvasRef}
      width={8}
      height={8}
      style={{ width: size, height: size, imageRendering: "pixelated" }}
    />
  );
}
