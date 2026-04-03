"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    const content = contentRef.current;
    if (!logo || !content) return;

    gsap.fromTo(
      logo,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: logo,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      content,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const socials = [
    { label: "Instagram", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "Behance", href: "#" },
    { label: "LinkedIn", href: "#" },
  ];

  return (
    <footer
      ref={sectionRef}
      id="contact"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        paddingTop: "120px",
      }}
    >
      <div className="container">
        {/* CTA Section */}
        <div
          style={{
            textAlign: "center",
            paddingBottom: "100px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.4em",
              color: "var(--gold)",
              fontWeight: 600,
              marginBottom: "32px",
            }}
          >
            LET'S WORK TOGETHER
          </p>

          {/* Giant Logo */}
          <div ref={logoRef}>
            <h2
              style={{
                fontSize: "clamp(60px, 13vw, 180px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "transparent",
                WebkitTextStroke: "1px rgba(240,237,232,0.2)",
                marginBottom: "8px",
                userSelect: "none",
              }}
            >
              AQORIVE
            </h2>
            <h3
              style={{
                fontSize: "clamp(60px, 13vw, 180px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "var(--cream)",
                marginBottom: "48px",
              }}
            >
              AQORIVE
            </h3>
          </div>

          <p
            style={{
              fontSize: "16px",
              color: "var(--cream-dim)",
              fontWeight: 300,
              marginBottom: "40px",
              lineHeight: 1.7,
            }}
          >
            Ready to create something extraordinary?<br />
            Let's build it together.
          </p>

          <a
            href="mailto:hello@aqorive.com"
            id="footer-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.25em",
              color: "var(--bg)",
              background: "var(--cream)",
              padding: "20px 48px",
              textDecoration: "none",
              transition: "background 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--cream)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
            }}
          >
            SEND A MESSAGE ↗
          </a>
        </div>

        {/* Bottom bar */}
        <div
          ref={contentRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "40px 0",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: "var(--cream)",
                marginBottom: "6px",
              }}
            >
              AQORIVE
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "var(--cream-dim)",
                letterSpacing: "0.1em",
              }}
            >
              © {new Date().getFullYear()} AQORIVE. All rights reserved.
            </p>
          </div>

          <div style={{ display: "flex", gap: "32px" }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.15em",
                  color: "var(--cream-dim)",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "var(--cream-dim)")
                }
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
