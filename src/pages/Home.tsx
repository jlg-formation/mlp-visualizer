import { useState } from "react";
import { StepMetroBreadcrumb } from "../components/StepMetroBreadcrumb";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0); // 0 : aucune étape franchie
  const steps = [
    "Charger les données",
    "Séparer les données",
    "Définir le modèle",
    "Entrainer le modèle",
    "Tester le modèle",
  ];

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto">
        <StepMetroBreadcrumb steps={steps} currentStep={currentStep} />
        <div className="mt-6 flex gap-2 justify-center">
          {currentStep === 0 ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setCurrentStep(1)}
            >
              Getting Started
            </button>
          ) : (
            <>
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              >
                Précédent
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() =>
                  setCurrentStep((s) => Math.min(steps.length, s + 1))
                }
              >
                Suivant
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
