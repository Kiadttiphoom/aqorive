"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Entrance animation
    gsap.fromTo(
      nav,
      { yPercent: -100, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // Scroll: add blur background when scrolled
    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.style.background = "rgba(5,5,5,0.85)";
        nav.style.backdropFilter = "blur(20px)";
        nav.style.borderBottom = "1px solid rgba(201,168,76,0.08)";
      } else {
        nav.style.background = "transparent";
        nav.style.backdropFilter = "none";
        nav.style.borderBottom = "none";
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 48px",
        background: "transparent",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease",
      }}
    >
      <span
        className="cinematic-text"
        style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.3em" }}
      >
        AQORIVE
      </span>

      <div style={{ display: "flex", gap: "40px" }}>
        {["Work", "About", "Services", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "var(--cream-dim)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream-dim)")}
          >
            {item}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.3em",
          color: "var(--bg)",
          background: "var(--gold)",
          padding: "12px 32px",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-light)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
      >
        CONTACT
      </a>
    </nav>
  );
}
