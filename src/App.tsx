import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doc from "./pages/Doc";
import Board from "./pages/Board";
import Images from "./pages/Images";
import Test from "./pages/Test";
import Training from "./pages/Training";
import Model from "./pages/Model";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/images" element={<Images />} />
          <Route path="/doc" element={<Doc />} />
          <Route path="/test" element={<Test />} />
          <Route path="/model" element={<Model />} />
          <Route path="/training" element={<Training />} />
        </Routes>
      </main>
    </Router>
  );
}
