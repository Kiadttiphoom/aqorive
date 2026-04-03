"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const innerImgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image clip-path reveal on scroll
      gsap.fromTo(imageRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: imageRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Image parallax — inner image moves slower
      gsap.fromTo(innerImgRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 2 },
        }
      );

      // Staggered content reveal
      const tl = gsap.timeline({
        scrollTrigger: { trigger: labelRef.current, start: "top 82%", toggleActions: "play none none none" },
      });
      tl.fromTo(labelRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
        .fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.3")
        .fromTo(contentRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .fromTo(Array.from(statsRef.current?.children ?? []), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }, "-=0.3");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" style={{ padding: "140px 0", background: "var(--bg)", overflow: "hidden" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

        {/* Image with clip-path */}
        <div ref={imageRef} style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", willChange: "clip-path" }}>
          <div ref={innerImgRef} style={{ position: "relative", width: "100%", height: "115%", top: "-7.5%", willChange: "transform" }}>
            <Image src="/about.png" alt="About AQORIVE" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 50%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "28px", left: "28px", background: "rgba(201,168,76,0.15)", border: "1px solid var(--gold)", padding: "10px 18px", backdropFilter: "blur(10px)" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.3em", color: "var(--gold)", fontWeight: 600 }}>EST. 2025</p>
          </div>
        </div>

        {/* Content */}
        <div>
          <div ref={labelRef} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <div style={{ width: "36px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.35em", color: "var(--gold)", fontWeight: 600 }}>ABOUT US</span>
          </div>

          <h2 ref={headingRef} style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--cream)", marginBottom: "24px" }}>
            We craft<br /><span style={{ color: "var(--gold)" }}>experiences</span><br />that last.
          </h2>

          <div ref={contentRef}>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "var(--cream-dim)", fontWeight: 300, marginBottom: "16px" }}>
              AQORIVE is a creative studio that transforms ideas into bold, unforgettable digital experiences. We work at the intersection of art, technology, and strategy.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "var(--cream-dim)", fontWeight: 300 }}>
              Every project is an opportunity to push boundaries and redefine what's possible for brands that demand excellence.
            </p>
          </div>

          <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px", marginTop: "52px", paddingTop: "36px", borderTop: "1px solid var(--border)" }}>
            {[{ num: "120+", label: "Projects" }, { num: "8+", label: "Years" }, { num: "40+", label: "Clients" }].map((stat) => (
              <div key={stat.label}>
                <p style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "var(--cream)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "6px" }}>{stat.num}</p>
                <p style={{ fontSize: "11px", letterSpacing: "0.25em", color: "var(--cream-dim)", fontWeight: 400 }}>{stat.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
