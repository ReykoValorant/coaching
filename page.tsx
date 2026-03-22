// src/app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import {
  Bebas_Neue,
  DM_Sans,
  JetBrains_Mono,
  Cormorant_Garamond,
} from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

/* ── Data ── */
const COACHES = [
  {
    name: "Bonkar",
    role: "Head Coach · NRG",
    tag: "BNK",
    color: "#00E5FF",
    course: "Teaches In-Game Leadership",
    lessons: 32,
    featured: true,
    image: "/coaches/NRG_bonkar.webp",
  },
  {
    name: "Boaster",
    role: "IGL · Fnatic",
    tag: "BST",
    color: "#FFB800",
    course: "Teaches Mid-Round Calling",
    lessons: 22,
    featured: true,
    image: "/coaches/Fnatic_Boaster.webp",
  },
  {
    name: "TenZ",
    role: "Duelist · Sentinels",
    tag: "TNZ",
    color: "#7B61FF",
    course: "Teaches Jett Mechanics",
    lessons: 24,
    featured: false,
    image: "/coaches/Tenz.webp",
  },
  {
    name: "Chronicle",
    role: "Flex · Team Vitality",
    tag: "CHR",
    color: "#FF2D78",
    course: "Teaches Versatile Play",
    lessons: 18,
    featured: false,
    image: "/coaches/Chronicle.webp",
  },
  {
    name: "Sacy",
    role: "Initiator · World Champion",
    tag: "SCY",
    color: "#3DDC84",
    course: "Teaches Initiator Mastery",
    lessons: 20,
    featured: false,
    image: "/coaches/sacy.webp",
  },
  {
    name: "Derke",
    role: "Duelist · Team Vitality",
    tag: "DRK",
    color: "#FF6B35",
    course: "Teaches Aim & Positioning",
    lessons: 28,
    featured: false,
    image: "/coaches/derke.webp",
  },
];

const FEATURES = [
  {
    icon: "play",
    title: "Cinematic Video Lessons",
    desc: "Over-the-shoulder gameplay breakdowns filmed in studio quality.",
  },
  {
    icon: "brain",
    title: "Pro Decision-Making",
    desc: "Understand the why behind every peek, rotate, and callout.",
  },
  {
    icon: "unlock",
    title: "Own It Forever",
    desc: "No subscriptions. Buy a course, keep it for life.",
  },
  {
    icon: "layers",
    title: "Agent & Map Specific",
    desc: "Deep-dives into lineups, setups, and strats per agent and map.",
  },
];

const NAV_LINKS = ["Courses", "Coaches"];

export default function HomePage() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  /* Cursor glow */
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    let raf = 0,
      mx = 0,
      my = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const tick = () => {
      cx += (mx - cx) * 0.045;
      cy += (my - cy) * 0.045;
      glow.style.transform = `translate(${cx - 350}px, ${cy - 350}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Scroll-based nav bg */
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        /* ── Design tokens ── */
        :root {
          --cyan: #00f3ff;
          --cyan-dim: #00b8c5;
          --pink: #FF2D78;
          --gold: #FFB800;
          --bg: #050505;
          --bg-elevated: #0A0A0F;
          --surface: rgba(255,255,255,0.035);
          --text: #EDEDF3;
          --text-dim: #A8A8B8;
          --muted: #52526A;
          --border: rgba(255,255,255,0.06);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body), system-ui, sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Cursor glow ── */
        .cursor-glow {
          position: fixed; top: 0; left: 0;
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,243,255,0.06) 0%, rgba(0,243,255,0.02) 30%, transparent 55%);
          pointer-events: none; z-index: 2; will-change: transform; filter: blur(10px);
        }

        /* ── Dot grid ── */
        .dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* ── Animations ── */
        @keyframes rise {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes glow-breathe {
          0%,100% { box-shadow: 0 0 14px rgba(0,243,255,0.2), 0 0 44px rgba(0,243,255,0.06); }
          50%     { box-shadow: 0 0 22px rgba(0,243,255,0.32), 0 0 60px rgba(0,243,255,0.1); }
        }
        @keyframes orb-drift-a {
          0%,100% { transform: translate(0,0) scale(1); }
          40%     { transform: translate(35px,-25px) scale(1.04); }
          70%     { transform: translate(-18px,20px) scale(0.96); }
        }
        @keyframes orb-drift-b {
          0%,100% { transform: translate(0,0) scale(1); }
          35%     { transform: translate(-25px,20px) scale(0.97); }
          65%     { transform: translate(20px,-25px) scale(1.03); }
        }
        .r1 { animation: rise 1s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .r2 { animation: rise 1s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .r3 { animation: rise 1s cubic-bezier(0.16,1,0.3,1) 0.36s both; }
        .r4 { animation: rise 1s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .r5 { animation: rise 1s cubic-bezier(0.16,1,0.3,1) 0.64s both; }

        /* ── Shared ── */
        .mono { font-family: var(--font-mono), monospace; }
        .section-pad { padding: 0 clamp(1.5rem, 5vw, 5rem); }

        /* ── Nav ── */
        .nav-link {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .nav-link:hover { color: var(--text-dim); }

        /* ── Buttons ── */
        .btn-primary {
          background: var(--cyan);
          color: #050505;
          border: none;
          font-family: var(--font-body), sans-serif;
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.95rem 2.8rem;
          border-radius: 2px;
          cursor: pointer;
          animation: glow-breathe 4s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 36px rgba(0,243,255,0.45), 0 0 90px rgba(0,243,255,0.15), 0 6px 28px rgba(0,0,0,0.4);
        }
        .btn-ghost {
          background: transparent;
          color: var(--text-dim);
          border: 1px solid rgba(255,255,255,0.09);
          font-family: var(--font-body), sans-serif;
          font-weight: 500;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.95rem 2.4rem;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
        }
        .btn-ghost:hover {
          color: var(--text);
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.025);
          transform: translateY(-2px);
        }
        .btn-sm {
          padding: 0.5rem 1.5rem;
          font-size: 0.62rem;
          animation: none;
          box-shadow: none;
        }

        /* ── Headline gradient ── */
        .headline-accent {
          background: linear-gradient(125deg, #00f3ff 0%, #0090FF 55%, #c850c0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Horizontal rules ── */
        .hr-glow {
          border: none; height: 1px;
          background: linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(0,243,255,0.08) 50%, rgba(255,255,255,0.05) 70%, transparent 95%);
        }

        /* ── Coach card ── */
        .coach-card {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
        }
        .coach-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.1);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .coach-card:hover .coach-overlay {
          opacity: 1;
        }
        .coach-card:hover .coach-play {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        .coach-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(2,2,2,0.97) 0%, rgba(5,5,5,0.75) 35%, rgba(5,5,5,0.25) 60%, transparent 80%);
          opacity: 1;
          transition: opacity 0.4s ease;
          z-index: 1;
        }
        .coach-play {
          position: absolute;
          top: 42%; left: 50%;
          transform: translate(-50%, -50%) scale(0.85);
          width: 52px; height: 52px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          z-index: 3;
        }

        /* ── Feature card ── */
        .feature-card {
          padding: 2rem 1.8rem;
          border: 1px solid var(--border);
          border-radius: 4px;
          background: rgba(255,255,255,0.015);
          transition: all 0.35s ease;
        }
        .feature-card:hover {
          border-color: rgba(0,243,255,0.15);
          background: rgba(0,243,255,0.02);
          transform: translateY(-3px);
        }

        /* ── Testimonial ── */
        .testimonial-border {
          background: linear-gradient(135deg, rgba(0,243,255,0.15), rgba(200,80,192,0.1));
          padding: 1px;
          border-radius: 6px;
        }

        /* ── Footer links ── */
        .footer-link {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.78rem;
          transition: color 0.25s;
        }
        .footer-link:hover { color: var(--text-dim); }

        /* ── Scroll-triggered section reveals ── */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div
        className={`${bebas.variable} ${dmSans.variable} ${jetbrains.variable} ${cormorant.variable}`}
      >
        {/* Cursor glow */}
        <div ref={glowRef} className="cursor-glow" />

        {/* ═══════════════ STICKY NAV ═══════════════ */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "0 clamp(1.5rem, 5vw, 5rem)",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background:
              scrollY > 40
                ? "rgba(5,5,5,0.85)"
                : "transparent",
            backdropFilter: scrollY > 40 ? "blur(24px) saturate(1.2)" : "none",
            borderBottom:
              scrollY > 40 ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
            transition: "background 0.4s, border-bottom 0.4s, backdrop-filter 0.4s",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              style={{
                width: "28px",
                height: "28px",
                background: "linear-gradient(135deg, #00f3ff, #c850c0)",
                clipPath:
                  "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                opacity: 0.9,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.3rem",
                letterSpacing: "0.14em",
                color: "var(--text)",
              }}
            >
              PROMETA
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <Link key={l} href={l === "Coaches" ? "/coaches" : l === "Courses" ? "/courses" : `#${l.toLowerCase()}`} className="nav-link">
                {l}
              </Link>
            ))}
          </div>

          <Link href="/courses" className="btn-primary btn-sm">
            Get Access
          </Link>
        </nav>

        {/* ═══════════════ SECTION 1 — HERO ═══════════════ */}
        <section
          className="relative flex flex-col items-center justify-center text-center overflow-hidden"
          style={{
            minHeight: "100vh",
            background: "var(--bg)",
            paddingTop: "72px",
          }}
        >
          {/* Bg layers */}
          <div className="absolute inset-0 dot-grid" />
          <div
            style={{
              position: "absolute",
              top: "-18%",
              right: "0",
              width: "900px",
              height: "900px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,243,255,0.05) 0%, rgba(0,243,255,0.012) 40%, transparent 58%)",
              filter: "blur(80px)",
              animation: "orb-drift-a 20s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-12%",
              left: "-8%",
              width: "650px",
              height: "650px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(200,80,192,0.035) 0%, transparent 55%)",
              filter: "blur(80px)",
              animation: "orb-drift-b 24s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />

          {/* Diagonal light */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: "20%",
              width: "1px",
              height: "100%",
              background:
                "linear-gradient(180deg, transparent, rgba(0,243,255,0.05) 30%, rgba(0,243,255,0.015) 60%, transparent)",
              transform: "rotate(8deg)",
              transformOrigin: "top center",
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <div
            className="relative z-10 flex flex-col items-center px-6"
            style={{ maxWidth: "900px" }}
          >
            {/* Eyebrow */}
            <div className="r2 flex items-center gap-3 mb-8">
              <div
                style={{
                  width: "28px",
                  height: "1px",
                  background: "rgba(0,243,255,0.3)",
                }}
              />
              <span
                className="mono"
                style={{
                  color: "var(--cyan)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  opacity: 0.75,
                }}
              >
                The Valorant Academy
              </span>
              <div
                style={{
                  width: "28px",
                  height: "1px",
                  background: "rgba(0,243,255,0.3)",
                }}
              />
            </div>

            {/* Headline */}
            <h1 className="r3">
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)",
                  letterSpacing: "0.1em",
                  lineHeight: "0.92",
                  color: "var(--text)",
                }}
              >
                LEARN FROM THE
              </span>
              <span
                className="headline-accent"
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3.2rem, 9vw, 8rem)",
                  letterSpacing: "0.14em",
                  lineHeight: "0.92",
                  marginTop: "0.06em",
                }}
              >
                BEST IN THE WORLD
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="r4"
              style={{
                fontFamily: "var(--font-serif), serif",
                fontSize: "clamp(1rem, 2vw, 1.22rem)",
                lineHeight: "1.9",
                color: "var(--text-dim)",
                fontWeight: "300",
                fontStyle: "italic",
                maxWidth: "520px",
                marginTop: "2rem",
              }}
            >
              Exclusive courses from the world&apos;s best Valorant
              professionals. The strategies behind the trophies - now yours.
            </p>

            {/* CTAs */}
            <div className="r5 flex flex-wrap items-center justify-center gap-4 mt-10">
              <Link href="/courses" className="btn-primary">
                Start Learning
              </Link>
              <button className="btn-ghost">
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.45rem",
                  }}
                >
                  ▶
                </span>
                Watch Trailer
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              opacity: 0.35,
              animation: "fade-in 2s ease 1.5s both",
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: "0.5rem",
                letterSpacing: "0.2em",
                color: "var(--muted)",
              }}
            >
              SCROLL
            </span>
            <div
              style={{
                width: "1px",
                height: "28px",
                background:
                  "linear-gradient(180deg, var(--muted), transparent)",
              }}
            />
          </div>
        </section>
