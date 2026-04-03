"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set starting states (prevent FOUC)
    gsap.set([topRef.current, botRef.current, yearRef.current, hintRef.current], { autoAlpha: 0 });
    gsap.set(navRef.current, { yPercent: -100, autoAlpha: 0 });
    gsap.set(imgWrapRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(innerRef.current, { scale: 1.15 });

    // ── Entrance timeline ──────────────────────────────────────────
    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: setupScrollParallax, // Setup scroll AFTER entrance finishes
    });

    tl
      .to(navRef.current, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" })
      .to(topRef.current, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5")
      .to(imgWrapRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" }, "-=0.7")
      .to(innerRef.current, { scale: 1, duration: 1.5, ease: "power2.out" }, "-=1.3")
      .to(botRef.current, { autoAlpha: 1, duration: 1, ease: "power3.out" }, "-=1.0")
      .to([yearRef.current, hintRef.current], { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" }, "-=0.6");

    // ── Scroll parallax — runs ONLY after entrance is done ─────────
    function setupScrollParallax() {
      const trigger = section;

      // Top text drifts UP
      gsap.fromTo(topRef.current,
        { y: 0 },
        {
          y: -90, ease: "none",
          scrollTrigger: { trigger, start: "top top", end: "bottom top", scrub: 1.5 },
        }
      );

      // Bottom text drifts DOWN
      gsap.fromTo(botRef.current,
        { y: 0 },
        {
          y: 90, ease: "none",
          scrollTrigger: { trigger, start: "top top", end: "bottom top", scrub: 1.5 },
        }
      );

      // Image inner — slowest (deepest layer)
      gsap.fromTo(innerRef.current,
        { y: 0 },
        {
          y: 60, ease: "none",
          scrollTrigger: { trigger, start: "top top", end: "bottom top", scrub: 2.5 },
        }
      );

      // Year fades and drifts up
      gsap.fromTo(yearRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0, y: -40, ease: "none",
          scrollTrigger: { trigger, start: "top top", end: "45% top", scrub: 1 },
        }
      );

      // Scroll hint fades
      gsap.fromTo(hintRef.current,
        { opacity: 1 },
        {
          opacity: 0, ease: "none",
          scrollTrigger: { trigger, start: "top top", end: "30% top", scrub: 1 },
        }
      );

      ScrollTrigger.refresh(true);
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 48px",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(20px)",
          background: "rgba(8,8,8,0.8)",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "0.32em", color: "var(--cream)" }}>
          AQORIVE
        </span>
        <div style={{ display: "flex", gap: "36px" }}>
          {["Work", "About", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{ fontSize: "12px", letterSpacing: "0.16em", color: "var(--cream-dim)", textDecoration: "none", transition: "color 0.25s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--cream)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--cream-dim)")}
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--bg)", background: "var(--cream)", padding: "11px 28px", textDecoration: "none", transition: "background 0.25s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--cream)")}
        >
          GET IN TOUCH
        </a>
      </nav>

      {/* ── Hero Section ── */}
      <section
        ref={sectionRef}
        id="hero"
        style={{ minHeight: "115vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 80px", background: "var(--bg)", position: "relative" }}
      >
        {/* TOP row: PARALLAX + Year */}
        <div
          ref={topRef}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "18px", willChange: "transform" }}
        >
          <h1 style={{ fontSize: "clamp(60px, 11.5vw, 170px)", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.03em", color: "var(--cream)", userSelect: "none" }}>
            PARALLAX
          </h1>
          <div ref={yearRef} style={{ textAlign: "right", paddingBottom: "10px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.35em", color: "var(--cream-dim)", marginBottom: "4px" }}>STUDIO</p>
            <p style={{ fontSize: "26px", fontWeight: 200, letterSpacing: "0.1em", color: "var(--cream)" }}>2025</p>
          </div>
        </div>

        {/* CENTER: Image */}
        <div
          ref={imgWrapRef}
          style={{ position: "relative", width: "min(660px, 100%)", margin: "0 auto", aspectRatio: "16/9", overflow: "hidden" }}
        >
          <div ref={innerRef} style={{ position: "relative", width: "100%", height: "115%", marginTop: "-7.5%", willChange: "transform" }}>
            <Image
              src="/hero.png"
              alt="AQORIVE Creative Studio"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 660px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* BOTTOM row: Hint + EFFECT */}
        <div
          ref={botRef}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "18px", willChange: "transform" }}
        >
          <p ref={hintRef} style={{ fontSize: "12px", letterSpacing: "0.3em", color: "var(--cream-dim)", marginTop: "16px" }}>↓ SCROLL</p>
          <h2 style={{ fontSize: "clamp(60px, 11.5vw, 170px)", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.03em", color: "var(--cream)", textAlign: "right", userSelect: "none" }}>
            EFFECT
          </h2>
        </div>
      </section>
    </>
  );
}
