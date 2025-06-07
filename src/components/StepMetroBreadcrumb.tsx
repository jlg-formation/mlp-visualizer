import React from "react";

export interface StepMetroBreadcrumbProps {
  steps: string[];
  currentStep: number; // 0-based index
  circleSize?: number; // diamètre en px (optionnel, défaut 40)
  itemWidth?: number; // largeur d'un item (optionnel, défaut 128)
}

export const StepMetroBreadcrumb: React.FC<StepMetroBreadcrumbProps> = ({
  steps,
  currentStep,
  circleSize = 40,
  itemWidth = 128,
}) => {
  // Calcul du padding pour la ligne centrale
  const linePadding = itemWidth / 2;

  return (
    <div className="relative w-full flex flex-col items-center px-2">
      {/* Ligne de métro */}
      <div
        className="absolute"
        style={{
          top: circleSize / 2 - 2, // centre vertical des cercles, -2 pour centrer sur la hauteur de la ligne
          left: linePadding,
          width: (steps.length - 1) * itemWidth,
          height: 4,
          background: "#d1d5db", // gray-300
          zIndex: 0,
        }}
      />
      {/* Les étapes */}
      <div className="flex w-full justify-start z-10">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center"
            style={{ minWidth: itemWidth, width: itemWidth }}
          >
            <div
              className={[
                "flex items-center justify-center rounded-full border-2 font-bold",
                idx < currentStep
                  ? "bg-green-500 border-green-500 text-white"
                  : idx === currentStep
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-gray-200 border-gray-300 text-gray-500",
              ].join(" ")}
              style={{
                width: circleSize,
                height: circleSize,
                fontSize: circleSize / 2,
                zIndex: 1,
              }}
            >
              {idx < currentStep ? "✓" : idx + 1}
            </div>
            <span className="flex items-center justify-center mt-2 text-sm font-semibold w-full break-words h-8 text-center p-4">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
