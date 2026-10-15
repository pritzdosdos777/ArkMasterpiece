"use client";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
export function Reveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 1, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.div>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <Link className="wordmark" href="/" aria-label="Ark Masterpiece home">
        ark<span>MASTERPIECE</span>
      </Link>
      <button
        className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? "open" : ""} aria-label="Main navigation">
        {["Home", "About", "Services", "Portfolio", "Contact"].map((n) => (
          <Link
            onClick={() => setOpen(false)}
            href={n === "Home" ? "/" : "/" + n.toLowerCase()}
            key={n}
          >
            {n}
          </Link>
        ))}
        <Link
          onClick={() => setOpen(false)}
          className="nav-cta"
          href="/contact"
        >
          Let’s work together <ArrowUpRight size={15} />
        </Link>
      </nav>
    </header>
  );
}
export function Arrow() {
  return <ArrowUpRight size={18} aria-hidden="true" />;
}
