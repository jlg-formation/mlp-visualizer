import { useNavigate } from "react-router-dom";

const MD_BREAKPOINT = 768;

export default function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    if (window.innerWidth < MD_BREAKPOINT) {
      navigate("/model");
    } else {
      navigate("/board");
    }
  };
  return (
    <div className="relative flex min-h-screen items-start justify-start overflow-hidden bg-gray-100">
      <img
        src="./accueil.png"
        alt="MLP Visualizer"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="flex flex-col items-start gap-4 rounded bg-white/70 p-6 text-center backdrop-blur-sm">
        <h1 className="text-3xl font-bold md:text-5xl">Visualiser et jouer</h1>
        <p className="text-lg md:text-2xl">
          avec un réseau de neurones type MLP.
        </p>
        <button
          onClick={handleStart}
          className="rounded bg-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-700"
        >
          Demarrez
        </button>
      </div>
    </div>
  );
}
