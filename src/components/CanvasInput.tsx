import React, { useRef, useEffect, useState } from "react";
import { useMLPStore } from "../stores/useMLPStore";

export const CanvasInput: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = 280;
  const cell = size / 8;
  const [isDrawing, setIsDrawing] = useState(false);
  const setPixels = useMLPStore((s) => s.setPixels);
  const pixels = useMLPStore((s) => s.pixels);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, size, size);
    }
  }, []);

  const draw = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(x, y, cell / 2.5, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const rect = canvasRef.current!.getBoundingClientRect();
    draw(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    draw(e.clientX - rect.left, e.clientY - rect.top);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      const imageData = ctx.getImageData(0, 0, size, size);
      const pixels: number[] = [];

      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          let sum = 0;
          let count = 0;
          for (let y = 0; y < cell; y++) {
            for (let x = 0; x < cell; x++) {
              const px = Math.floor(col * cell + x);
              const py = Math.floor(row * cell + y);
              const i = (py * size + px) * 4;
              const val = imageData.data[i];
              sum += 255 - val;
              count++;
            }
          }
          pixels.push(sum / count / 255);
        }
      }

      setPixels(pixels);
    }
  };

  const handleMouseUp = () => {
    finishDrawing();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const rect = canvasRef.current!.getBoundingClientRect();
    const touch = e.touches[0];
    if (touch) {
      draw(touch.clientX - rect.left, touch.clientY - rect.top);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const touch = e.touches[0];
    if (touch) {
      draw(touch.clientX - rect.left, touch.clientY - rect.top);
    }
  };

  const handleTouchEnd = () => {
    finishDrawing();
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, size, size);
      setPixels(Array(64).fill(0));
    }
  };

  const hasDrawing = pixels.some((p) => p > 0);

  return (
    <div className="flex flex-col justify-between">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="cursor-crosshair touch-none border border-gray-400"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
        {!hasDrawing && !isDrawing && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-gray-400 select-none">
            Crayonne un chiffre
          </div>
        )}
      </div>
      <button
        onClick={clearCanvas}
        className="flex-grow cursor-pointer border bg-gray-200 px-4 py-2 hover:bg-gray-300"
      >
        Effacer
      </button>
    </div>
  );
};
