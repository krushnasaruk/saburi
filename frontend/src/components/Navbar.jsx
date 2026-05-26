import React from "react";

export default function Navbar({ activeRoute }) {
  const links = [
    { path: "#/", label: "Home" },
    { path: "#/courses", label: "Courses" },
    { path: "#/classroom", label: "Virtual Class" },
    { path: "#/dashboard", label: "Dashboard" }
  ];

  return (
    <nav className="hidden md:flex items-center gap-6">
      {links.map((link) => {
        const isActive = activeRoute === link.path;
        return (
          <a
            key={link.path}
            href={link.path}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all hover:bg-saffron/10 hover:text-saffron ${
              isActive ? "text-saffron bg-saffron/5 font-bold" : "text-sienna/80 dark:text-cream/80"
            }`}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
