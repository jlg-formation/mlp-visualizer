import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Doc from "./pages/Doc";
import Board from "./pages/Board";
import Images from "./pages/Images";
import Test from "./pages/Test";

export default function App() {
  return (
    <Router>
      <nav className="flex gap-4 bg-white p-4 font-medium text-blue-700 shadow">
        <Link to="/" className="hover:underline">
          Accueil
        </Link>
        <Link to="/board" className="hover:underline">
          Board
        </Link>
        <Link to="/images" className="hover:underline">
          Images
        </Link>
        <Link to="/doc" className="hover:underline">
          Documentation
        </Link>
        <Link to="/test" className="hover:underline">
          Test
        </Link>
      </nav>
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/images" element={<Images />} />
          <Route path="/doc" element={<Doc />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </main>
    </Router>
  );
}
