import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          "px-4 py-2 hover:underline md:px-0 md:py-0" +
          (isActive ? " font-bold underline" : "")
        }
        onClick={close}
      >
        Accueil
      </NavLink>
      <NavLink
        to="/images"
        className={({ isActive }) =>
          "px-4 py-2 hover:underline md:px-0 md:py-0" +
          (isActive ? " font-bold underline" : "")
        }
        onClick={close}
      >
        Images
      </NavLink>
      <NavLink
        to="/board"
        className={({ isActive }) =>
          "hidden px-4 py-2 hover:underline md:inline md:px-0 md:py-0" +
          (isActive ? " font-bold underline" : "")
        }
        onClick={close}
      >
        Board
      </NavLink>
      <NavLink
        to="/model"
        className="px-4 py-2 hover:underline md:px-0 md:py-0"
        onClick={close}
      >
        Modèle
      </NavLink>
      <NavLink
        to="/training"
        className={({ isActive }) =>
          "px-4 py-2 hover:underline md:px-0 md:py-0" +
          (isActive ? " font-bold underline" : "")
        }
        onClick={close}
      >
        Training
      </NavLink>

      <NavLink
        to="/test"
        className={({ isActive }) =>
          "px-4 py-2 hover:underline md:px-0 md:py-0" +
          (isActive ? " font-bold underline" : "")
        }
        onClick={close}
      >
        Test
      </NavLink>
      <NavLink
        to="/doc"
        className={({ isActive }) =>
          "px-4 py-2 hover:underline md:px-0 md:py-0" +
          (isActive ? " font-bold underline" : "")
        }
        onClick={close}
      >
        Documentation
      </NavLink>
    </>
  );

  return (
    <nav className="relative bg-white p-4 font-medium text-blue-700 shadow">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold md:hidden">MLP Visualizer</span>
        <div className="hidden gap-4 md:flex">{links}</div>
        <button className="md:hidden" onClick={toggle} aria-label="Toggle menu">
          <svg
            className="h-6 w-6 cursor-pointer"
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
        <div className="absolute top-full left-0 z-10 flex w-full flex-col gap-2 bg-white shadow-md md:hidden">
          {links}
        </div>
      )}
    </nav>
  );
}
