import { useState } from "react";
import DigitImage from "./DigitImage";

interface ImageData {
  pixels: number[];
  label: number;
}

interface Props {
  images: ImageData[];
}

export default function PaginatedImages({ images }: Props) {
  const pageSize = 20;
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(images.length / pageSize);

  const start = page * pageSize;
  const current = images.slice(start, start + pageSize);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-5 gap-2">
        {current.map((img, idx) => (
          <div key={start + idx} className="flex flex-col items-center">
            <DigitImage pixels={img.pixels} />
            <span className="text-sm">{img.label}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2">
        <button
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        >
          Précédent
        </button>
        <span>
          Page {page + 1} / {pageCount}
        </span>
        <button
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={page >= pageCount - 1}
          onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
