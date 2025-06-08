import { useEffect, useState } from "react";
import PaginatedImages from "../components/PaginatedImages";

interface ImageData {
  pixels: number[];
  label: number;
}

export default function Images() {
  const [trainImages, setTrainImages] = useState<ImageData[]>([]);
  const [valImages, setValImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        new URL("digits_8x8.json", import.meta.env.BASE_URL).toString(),
      );
      const data: ImageData[] = await res.json();
      const shuffled = data.sort(() => Math.random() - 0.5);
      const split = Math.floor(shuffled.length * 0.8);
      setTrainImages(shuffled.slice(0, split));
      setValImages(shuffled.slice(split));
    };
    void load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Images</h1>
      <section className="space-y-2">
        <h2 className="font-semibold">Images d'entraînement</h2>
        {trainImages.length > 0 && <PaginatedImages images={trainImages} />}
      </section>
      <section className="space-y-2">
        <h2 className="font-semibold">Images de validation</h2>
        {valImages.length > 0 && <PaginatedImages images={valImages} />}
      </section>
    </div>
  );
}
