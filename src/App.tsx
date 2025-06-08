import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Doc from "./pages/Doc";
import Board from "./pages/Board";

export default function App() {
  return (
    <Router>
      <nav className="bg-white shadow p-4 flex gap-4 text-blue-700 font-medium">
        <Link to="/" className="hover:underline">
          Accueil
        </Link>
        <Link to="/playground" className="hover:underline">
          Playground
        </Link>
        <Link to="/board" className="hover:underline">
          Board
        </Link>
        <Link to="/doc" className="hover:underline">
          Documentation
        </Link>
      </nav>
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/board" element={<Board />} />
          <Route path="/doc" element={<Doc />} />
        </Routes>
      </main>
    </Router>
  );
}
