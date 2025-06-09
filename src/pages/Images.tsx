import PaginatedImages from "../components/PaginatedImages";
import { useImageStore } from "../stores/useImageStore";

export default function Images() {
  const trainImages = useImageStore((s) => s.trainImages);
  const valImages = useImageStore((s) => s.valImages);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-xl font-bold">
        Images ({trainImages.length + valImages.length})
      </h1>
      <section className="space-y-2">
        <h2 className="font-semibold">
          Images d'entraînement ({trainImages.length})
        </h2>
        {trainImages.length > 0 && <PaginatedImages images={trainImages} />}
      </section>
      <section className="space-y-2">
        <h2 className="font-semibold">
          Images de validation ({valImages.length})
        </h2>
        {valImages.length > 0 && <PaginatedImages images={valImages} />}
      </section>
    </div>
  );
}
