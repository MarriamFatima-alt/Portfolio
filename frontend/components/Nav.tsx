
"use client";

import { useState } from "react";

const navLinks = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-[#0a0e14] border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        <a href="#top" className="font-bold">Marriam Fatima</a>
        <nav className="hidden md:flex gap-6">
          {navLinks.map(function (link) {
            return <a key={link.href} href={link.href}>{link.label}</a>;
          })}
        </nav>
        <button className="md:hidden p-2" aria-label="Toggle menu" aria-expanded={open} onClick={function () { setOpen(!open); }}>
          {open ? "close" : "menu"}
        </button>
      </div>
      {open ? (
        <nav className="md:hidden flex flex-col gap-4 px-6 pb-6">
          {navLinks.map(function (link) {
            return (
              <a key={link.href} href={link.href} onClick={function () { setOpen(false); }} className="py-2 text-lg">
                {link.label}
              </a>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
