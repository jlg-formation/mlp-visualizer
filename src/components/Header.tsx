import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);

  const links = (
    <>
      <Link to="/" className="hover:underline" onClick={close}>
        Accueil
      </Link>
      <Link to="/board" className="hover:underline" onClick={close}>
        Board
      </Link>
      <Link to="/images" className="hover:underline" onClick={close}>
        Images
      </Link>
      <Link to="/doc" className="hover:underline" onClick={close}>
        Documentation
      </Link>
      <Link to="/test" className="hover:underline" onClick={close}>
        Test
      </Link>
    </>
  );

  return (
    <nav className="bg-white p-4 font-medium text-blue-700 shadow">
      <div className="flex items-center justify-between">
        <div className="hidden gap-4 md:flex">{links}</div>
        <button className="md:hidden" onClick={toggle} aria-label="Toggle menu">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {open && (
        <div className="mt-2 flex flex-col gap-2 md:hidden">{links}</div>
      )}
    </nav>
  );
}
