"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { num: "/01", title: "Brand Identity", desc: "Distinctive visual systems that communicate your unique value and position in the market." },
  { num: "/02", title: "Motion Design", desc: "Fluid animations and interactions that bring your brand to life across all touchpoints." },
  { num: "/03", title: "Digital Strategy", desc: "Data-driven approaches that align creativity with measurable business outcomes." },
  { num: "/04", title: "Web Experience", desc: "Immersive digital environments built with cutting-edge technology and obsessive detail." },
  { num: "/05", title: "Content Creation", desc: "Compelling visual stories and campaigns that captivate audiences across every platform." },
  { num: "/06", title: "Creative Direction", desc: "Strategic vision and artistic leadership to guide your brand through creative challenges." },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".benefit-item").forEach((item, i) => {
        gsap.fromTo(item,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: item, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="benefits" style={{ padding: "140px 0", background: "var(--bg-2)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "72px", paddingBottom: "36px", borderBottom: "1px solid var(--border)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "36px", height: "1px", background: "var(--gold)" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.35em", color: "var(--gold)", fontWeight: 600 }}>WHAT WE DO</span>
            </div>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--cream)" }}>
              Our expertise
            </h2>
          </div>
          <p style={{ fontSize: "14px", color: "var(--cream-dim)", maxWidth: "260px", lineHeight: 1.7, textAlign: "right", fontWeight: 300 }}>
            Six disciplines. One studio. Infinite possibilities.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {benefits.map((item, i) => (
            <div
              key={item.num}
              className="benefit-item"
              style={{
                padding: "36px",
                borderRight: i % 3 !== 2 ? "1px solid var(--border)" : "none",
                borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                transition: "background 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.04)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <span style={{ fontSize: "11px", fontWeight: 300, color: "var(--gold)", letterSpacing: "0.2em", display: "block", marginBottom: "20px" }}>{item.num}</span>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--cream)", marginBottom: "14px", letterSpacing: "-0.01em" }}>{item.title}</h3>
              <p style={{ fontSize: "13px", lineHeight: 1.8, color: "var(--cream-dim)", fontWeight: 300 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
