"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { num: "01", title: "Brand Strategy & Identity", desc: "Logo, guidelines, visual language" },
  { num: "02", title: "Motion & Animation", desc: "Video, UI animations, GSAP, WebGL" },
  { num: "03", title: "Web Design & Development", desc: "Next.js, Three.js, headless CMS" },
  { num: "04", title: "Art Direction", desc: "Campaign concept, photography, editorial" },
  { num: "05", title: "UX / Product Design", desc: "Research, wireframes, prototyping" },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".svc-row").forEach((row, i) => {
        gsap.fromTo(row,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.75, ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" style={{ padding: "140px 0", background: "var(--bg-2)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>

          {/* Sticky left */}
          <div style={{ position: "sticky", top: "120px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "36px", height: "1px", background: "var(--gold)" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.35em", color: "var(--gold)", fontWeight: 600 }}>SERVICES</span>
            </div>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--cream)", lineHeight: 1.1, marginBottom: "28px" }}>
              What we<br /><span style={{ color: "var(--gold)" }}>offer</span>
            </h2>
            <p style={{ fontSize: "14px", lineHeight: 1.85, color: "var(--cream-dim)", fontWeight: 300, maxWidth: "340px" }}>
              From initial concept through to final delivery, we provide a full spectrum of creative services.
            </p>
            <div style={{ marginTop: "44px" }}>
              <a
                href="#contact"
                style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--cream)", textDecoration: "none", border: "1px solid var(--border)", padding: "15px 30px", transition: "border-color 0.3s, color 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
              >
                START A PROJECT <span style={{ fontSize: "18px" }}>→</span>
              </a>
            </div>
          </div>

          {/* Service rows */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {services.map((svc) => (
              <div
                key={svc.num}
                className="svc-row"
                style={{ padding: "32px 0", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                onMouseEnter={(e) => {
                  const t = e.currentTarget;
                  (t.querySelector(".svc-num") as HTMLElement).style.color = "var(--gold)";
                  (t.querySelector(".svc-title") as HTMLElement).style.color = "var(--gold)";
                  (t.querySelector(".svc-arrow") as HTMLElement).style.transform = "translate(8px, -8px)";
                  (t.querySelector(".svc-arrow") as HTMLElement).style.color = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  const t = e.currentTarget;
                  (t.querySelector(".svc-num") as HTMLElement).style.color = "var(--cream-dim)";
                  (t.querySelector(".svc-title") as HTMLElement).style.color = "var(--cream)";
                  (t.querySelector(".svc-arrow") as HTMLElement).style.transform = "translate(0,0)";
                  (t.querySelector(".svc-arrow") as HTMLElement).style.color = "var(--cream-dim)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
                  <span className="svc-num" style={{ fontSize: "11px", color: "var(--cream-dim)", letterSpacing: "0.2em", fontWeight: 300, transition: "color 0.3s", minWidth: "22px" }}>{svc.num}</span>
                  <div>
                    <h3 className="svc-title" style={{ fontSize: "clamp(15px, 2vw, 20px)", fontWeight: 700, color: "var(--cream)", marginBottom: "3px", transition: "color 0.3s", letterSpacing: "-0.01em" }}>{svc.title}</h3>
                    <p style={{ fontSize: "12px", color: "var(--cream-dim)", letterSpacing: "0.08em", fontWeight: 300 }}>{svc.desc}</p>
                  </div>
                </div>
                <span className="svc-arrow" style={{ fontSize: "20px", color: "var(--cream-dim)", transition: "transform 0.3s, color 0.3s", flexShrink: 0 }}>↗</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
