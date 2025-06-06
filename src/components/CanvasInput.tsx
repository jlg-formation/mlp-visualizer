import React, { useRef, useEffect, useState } from "react";

type Props = {
  onDrawEnd?: (pixels: number[]) => void;
};

export const CanvasInput: React.FC<Props> = ({ onDrawEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = 280; // canvas pixel size
  const cell = size / 8;
  const [isDrawing, setIsDrawing] = useState(false);

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

  const handleMouseUp = () => {
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
              const val = imageData.data[i]; // Red channel
              sum += 255 - val;
              count++;
            }
          }
          pixels.push(sum / count / 255); // normalize to 0..1
        }
      }

      onDrawEnd?.(pixels);
    }
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, size, size);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="border border-gray-400 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <button
        onClick={clearCanvas}
        className="mt-2 px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Effacer
      </button>
    </div>
  );
};
