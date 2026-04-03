"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const works = [
  { src: "/mystic_veil.png", title: "Ethereal Veil", category: "Cinematic Art", year: "2025", cols: 7, ratio: "4/5" },
  { src: "/ornate_mask.png", title: "Golden Masquerade", category: "Luxury Fashion", year: "2025", cols: 5, ratio: "4/3" },
  { src: "/crimson_mystique.png", title: "Crimson Aura", category: "Visual Storytelling", year: "2025", cols: 5, ratio: "1/1" },
  { src: "/emerald_silence.png", title: "Emerald Whisper", category: "Fine Art", year: "2024", cols: 7, ratio: "4/5" },
  { src: "/midnight_hood.png", title: "Nightshade", category: "Character Design", year: "2024", cols: 4, ratio: "4/3" },
  { src: "/silver_shadow.png", title: "Mercurial Flow", category: "Abstract Motion", year: "2025", cols: 8, ratio: "16/9" },
  { src: "/about.png", title: "Spatial Void", category: "Architectural Art", year: "2025", cols: 12, ratio: "2/1" },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // reveal from bottom with a slight stagger
      gsap.utils.toArray<HTMLElement>(".portfolio-card").forEach((card, i) => {
        gsap.fromTo(card,
          { clipPath: "inset(100% 0% 0% 0%)", y: 40, opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: { 
              trigger: card, 
              start: "top 92%", 
              toggleActions: "play none none none" 
            },
          }
        );

        // Inner image parallax (deep layer)
        const img = card.querySelector(".port-img") as HTMLElement;
        if (img) {
          gsap.fromTo(img,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: "none",
              scrollTrigger: { 
                trigger: card, 
                start: "top bottom", 
                end: "bottom top", 
                scrub: 1.2 
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" style={{ padding: "160px 0", background: "var(--bg)" }}>
      <div className="container">
        {/* Header section */}
        <div style={{ marginBottom: "100px", maxWidth: "800px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ width: "48px", height: "1px", background: "var(--gold)" }} />
            <span style={{ fontSize: "12px", letterSpacing: "0.4em", color: "var(--gold)", fontWeight: 700, textTransform: "uppercase" }}>Selected Works</span>
          </div>
          <h2 style={{ fontSize: "clamp(48px, 8vw, 90px)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--cream)", lineHeight: 0.95 }}>
            Cinematic <br />
            <span style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 400 }}>Portfolio</span>
          </h2>
        </div>

        {/* Masonry Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(12, 1fr)", 
          gap: "40px 32px",
          alignItems: "start"
        }}>
          {works.map((work, i) => (
            <div
              key={`${work.title}-${i}`}
              className="portfolio-card"
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                gridColumn: `span ${work.cols}`,
                aspectRatio: work.ratio,
                willChange: "clip-path, transform, opacity",
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector(".port-img") as HTMLElement;
                const overlay = e.currentTarget.querySelector(".port-overlay") as HTMLElement;
                const meta = e.currentTarget.querySelector(".port-meta") as HTMLElement;
                if (img) gsap.to(img, { scale: 1.08, duration: 1.2, ease: "power2.out" });
                if (overlay) overlay.style.opacity = "1";
                if (meta) meta.style.transform = "translateY(0)";
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector(".port-img") as HTMLElement;
                const overlay = e.currentTarget.querySelector(".port-overlay") as HTMLElement;
                const meta = e.currentTarget.querySelector(".port-meta") as HTMLElement;
                if (img) gsap.to(img, { scale: 1, duration: 1.2, ease: "power2.out" });
                if (overlay) overlay.style.opacity = "0";
                if (meta) meta.style.transform = "translateY(30px)";
              }}
            >
              <div className="port-img" style={{ position: "relative", width: "100%", height: "124%", top: "-12%", willChange: "transform" }}>
                <Image 
                  src={work.src} 
                  alt={work.title} 
                  fill 
                  sizes={`(max-width: 768px) 100vw, ${(work.cols/12)*100}vw`} 
                  style={{ objectFit: "cover" }} 
                />
              </div>
              
              {/* Refined Overlay */}
              <div className="port-overlay" style={{ 
                position: "absolute", 
                inset: 0, 
                background: "linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0) 70%)", 
                opacity: 0, 
                transition: "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "32px"
              }}>
                <div className="port-meta" style={{ 
                  transform: "translateY(30px)", 
                  transition: "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)" 
                }}>
                  <p style={{ fontSize: "11px", letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "8px", fontWeight: 700 }}>
                    {work.category} / {work.year}
                  </p>
                  <h3 style={{ fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 800, color: "var(--cream)", letterSpacing: "-0.02em" }}>
                    {work.title}
                  </h3>
                </div>
              </div>

              {/* Counter */}
              <div style={{ 
                position: "absolute", 
                top: "24px", 
                right: "24px", 
                fontSize: "12px", 
                fontWeight: 600,
                color: "var(--cream-dim)", 
                letterSpacing: "0.15em",
                mixBlendMode: "difference"
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 991px) {
          .portfolio-card {
            grid-column: span 12 !important;
            aspectRatio: 4/5 !important;
          }
        }
      `}</style>
    </section>
  );
}
