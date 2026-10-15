"use client";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";
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
  const pathname = usePathname();
  return (
    <header>
      <Brand />
      <button
        className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id="main-navigation"
        className={open ? "open" : ""}
        aria-label="Main navigation"
      >
        {["Home", "Services", "Portfolio", "About", "Contact"].map((n) => (
          <Link
            onClick={() => setOpen(false)}
            href={n === "Home" ? "/" : "/" + n.toLowerCase()}
            aria-current={
              pathname === (n === "Home" ? "/" : "/" + n.toLowerCase())
                ? "page"
                : undefined
            }
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
          Book a consultation <ArrowUpRight size={15} />
        </Link>
      </nav>
    </header>
  );
}
export function Arrow() {
  return <ArrowUpRight size={18} aria-hidden="true" />;
}
