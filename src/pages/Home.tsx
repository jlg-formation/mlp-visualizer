import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative flex w-full items-center justify-center bg-white">
      <img src="./accueil.png" alt="MLP Visualizer" className="h-[40em]" />
      <div className="absolute top-30 left-30">
        <Link
          to="board"
          className="rounded border px-4 py-2 text-xl hover:bg-gray-100"
        >
          {" "}
          See the Board &gt;
        </Link>
      </div>
    </div>
  );
}
