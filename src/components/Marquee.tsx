"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Marquee() {
  const track1 = useRef<HTMLDivElement>(null);
  const track2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = track1.current;
    const t2 = track2.current;
    if (!t1 || !t2) return;

    gsap.to(t1, {
      x: "-50%",
      duration: 18,
      ease: "none",
      repeat: -1,
    });

    gsap.to(t2, {
      x: "50%",
      duration: 22,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const items = Array(6).fill("DISCUSS YOUR IDEAS ★");
  const items2 = Array(6).fill("CREATIVE STUDIO ★ AQORIVE");

  return (
    <div
      style={{
        background: "var(--bg-2)",
        padding: "32px 0",
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Row 1 */}
      <div style={{ overflow: "hidden", marginBottom: "16px" }}>
        <div
          ref={track1}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            width: "200%",
          }}
        >
          {items.concat(items).map((text, i) => (
            <span
              key={i}
              style={{
                fontSize: "clamp(14px, 2vw, 18px)",
                fontWeight: 300,
                letterSpacing: "0.3em",
                color: "var(--cream-dim)",
                padding: "0 32px",
                flexShrink: 0,
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 (reverse) */}
      <div style={{ overflow: "hidden" }}>
        <div
          ref={track2}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            width: "200%",
            transform: "translateX(-50%)",
          }}
        >
          {items2.concat(items2).map((text, i) => (
            <span
              key={i}
              style={{
                fontSize: "clamp(14px, 2vw, 18px)",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "var(--gold)",
                padding: "0 32px",
                flexShrink: 0,
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
