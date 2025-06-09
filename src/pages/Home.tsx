import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-100">
      <img
        src="/accueil.png"
        alt="MLP Visualizer"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="flex flex-col items-center gap-4 rounded bg-white/70 p-6 text-center backdrop-blur-sm">
        <h1 className="text-3xl font-bold md:text-5xl">Visualiser et jouer</h1>
        <p className="text-lg md:text-2xl">
          avec un réseau de neurones type MLP.
        </p>
        <Link
          to="/board"
          className="rounded bg-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-700"
        >
          Demarrez
        </Link>
      </div>
    </div>
  );
}
