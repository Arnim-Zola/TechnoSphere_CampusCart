import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Icon components ─────────────────────────────── */
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8l3 3 7-7" stroke="#4f6a8a" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v4l3 2" stroke="#4f6a8a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="9" r="5.5" stroke="#4f6a8a" strokeWidth="1.3" />
  </svg>
);
const DocIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="2" width="10" height="12" rx="2" stroke="#4f6a8a" strokeWidth="1.3" />
    <path d="M6 6h4M6 9h3" stroke="#4f6a8a" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 12l3.5-4 3 2.5L12 5l2 2" stroke="#4f6a8a" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowIcon = ({ color = "white" }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ display: "block" }}>
    <path d="M3 7h8M7 4l4 3-4 3" stroke={color} strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FEATURES = [
  {
    icon: <CheckIcon />,
    name: "Fast Pre-Ordering",
    desc: "Reserve items in seconds — no waiting, no last-minute rushes at the counter.",
  },
  {
    icon: <ClockIcon />,
    name: "Queue Reduction",
    desc: "Staggered pickup slots cut peak-hour queues and keep things moving smoothly.",
  },
  {
    icon: <DocIcon />,
    name: "Easy Print Uploads",
    desc: "Upload print jobs directly from your device. No USB, no physical handoff needed.",
  },
  {
    icon: <ChartIcon />,
    name: "Smart Tracking",
    desc: "Know exactly when your order is ready — real-time status, zero guesswork.",
  },
];

/* ─── Main component ──────────────────────────────── */
const IntroPage = () => {
  const navigate = useNavigate();
  const featRefs = useRef([]);

  // ✅ Original business logic — completely untouched
  const handleContinue = () => {
    const role = sessionStorage.getItem("role");
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "student") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  // Scroll-triggered reveal for feature cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, idx * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    featRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={S.page}>
      {/* Background layers */}
      <div style={S.bgGrid} />

      {/* ══ HERO ══ */}
      <section style={S.hero}>
        <div style={S.heroGlow} />

        <div style={S.badge}>
          <span style={S.badgeDot} />
          <span style={S.badgeText}>Campus Pre-Order Platform</span>
        </div>

        <div style={S.logoMark}>CC</div>

        <h1 style={S.heroTitle}>
          <span style={S.titlePlain}>Campus</span>
          <span style={S.titleGrad}>Cart</span>
        </h1>

        <p style={S.heroSub}>
          Smart pre-order system for every campus need —{" "}
          fast, simple, and always in stock.
        </p>

        <button
          style={S.ctaPrimary}
          onClick={handleContinue}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(79,70,229,0.32)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Enter Dashboard
          <ArrowIcon color="white" />
        </button>

        <div style={S.scrollHint}>
          <span style={S.scrollLabel}>Scroll</span>
          <div style={S.scrollLine} />
        </div>
      </section>

      <hr style={S.sectionDivider} />

      {/* ══ FEATURES ══ */}
      <section style={S.featuresSection}>
        <p style={S.sectionLabel}>What's inside</p>
        <h2 style={S.sectionTitle}>Everything your campus needs</h2>
        <p style={S.sectionSub}>
          Designed to eliminate queues and make ordering effortless.
        </p>

        <div style={S.featGrid}>
          {FEATURES.map(({ icon, name, desc }, i) => (
            <div
              key={name}
              data-index={i}
              ref={(el) => (featRefs.current[i] = el)}
              style={S.featCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#1e2d45";
                e.currentTarget.style.background = "#0e1420";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#141d2b";
                e.currentTarget.style.background = "#0c1018";
              }}
            >
              <div style={S.featIconWrap}>{icon}</div>
              <div>
                <div style={S.featName}>{name}</div>
                <div style={S.featDesc}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={S.finalCta}>
        <span style={S.finalLabel}>Ready to get started?</span>
        <button
          style={S.ctaSecondary}
          onClick={handleContinue}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#2e4060";
            e.currentTarget.style.color = "#7a9bc0";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#1a2740";
            e.currentTarget.style.color = "#4f6a8a";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Enter Dashboard
          <ArrowIcon color="currentColor" />
        </button>
      </section>
    </div>
  );
};

/* ─── Styles ───────────────────────────────────────── */
const anim = (name, dur, easing, delay) =>
  `${name} ${dur} ${easing} ${delay} both`;

const S = {
  page: {
    background: "#070a10",
    fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
    color: "#f0f4ff",
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },
  bgGrid: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)
    `,
    backgroundSize: "52px 52px",
    pointerEvents: "none",
    zIndex: 0,
  },

  /* Hero */
  hero: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "5rem 2rem 5rem",
    position: "relative",
    zIndex: 1,
  },
  heroGlow: {
    position: "absolute",
    top: "42%", left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600, height: 340,
    background: "radial-gradient(ellipse, rgba(99,91,255,0.11) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    background: "#0d1118",
    border: "1px solid #1d2a3a",
    borderRadius: 999,
    padding: "5px 14px 5px 8px",
    marginBottom: 30,
    animation: anim("ip-up", "0.55s", "cubic-bezier(0.22,1,0.36,1)", "0.05s"),
  },
  badgeDot: {
    display: "inline-block",
    width: 7, height: 7,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#7c3aed,#3b82f6)",
    flexShrink: 0,
  },
  badgeText: { fontSize: 12, fontWeight: 500, color: "#4a5c73", letterSpacing: "0.5px" },
  logoMark: {
    width: 48, height: 48,
    borderRadius: 13,
    background: "linear-gradient(135deg,#7c3aed,#3b82f6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px",
    marginBottom: 26,
    animation: anim("ip-up", "0.55s", "cubic-bezier(0.22,1,0.36,1)", "0.1s"),
  },
  heroTitle: {
    fontSize: "clamp(56px, 11vw, 82px)",
    fontWeight: 800,
    letterSpacing: "-3px",
    lineHeight: 0.95,
    textAlign: "center",
    marginBottom: 20,
    animation: anim("ip-up", "0.55s", "cubic-bezier(0.22,1,0.36,1)", "0.18s"),
  },
  titlePlain: { color: "#eef2ff" },
  titleGrad: {
    background: "linear-gradient(135deg, #818cf8 30%, #60a5fa 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    fontSize: 16, fontWeight: 400,
    color: "#3a4f68", lineHeight: 1.7,
    textAlign: "center", maxWidth: 360,
    marginBottom: 38,
    animation: anim("ip-up", "0.55s", "cubic-bezier(0.22,1,0.36,1)", "0.26s"),
  },
  ctaPrimary: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "linear-gradient(135deg,#4f46e5,#3b82f6)",
    border: "none", borderRadius: 11,
    padding: "14px 34px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15, fontWeight: 600, color: "#fff",
    cursor: "pointer", letterSpacing: "0.1px",
    transition: "transform 200ms cubic-bezier(0.22,1,0.36,1), box-shadow 200ms ease",
    animation: anim("ip-up", "0.55s", "cubic-bezier(0.22,1,0.36,1)", "0.34s"),
  },
  scrollHint: {
    position: "absolute",
    bottom: 36, left: "50%", transform: "translateX(-50%)",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
    animation: anim("ip-up", "0.5s", "ease", "0.8s"),
  },
  scrollLabel: {
    fontSize: 11, fontWeight: 500,
    color: "#1e2d42", letterSpacing: "0.8px", textTransform: "uppercase",
  },
  scrollLine: {
    width: 1, height: 40,
    background: "linear-gradient(to bottom, transparent, #1e2d42)",
  },

  /* Divider */
  sectionDivider: { width: "100%", border: "none", borderTop: "1px solid #0f1923", position: "relative", zIndex: 1 },

  /* Features */
  featuresSection: {
    padding: "80px 2rem 72px",
    maxWidth: 840, margin: "0 auto",
    position: "relative", zIndex: 1,
  },
  sectionLabel: {
    textAlign: "center",
    fontSize: 11, fontWeight: 600,
    color: "#263348", letterSpacing: "1.2px",
    textTransform: "uppercase", marginBottom: 14,
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 28, fontWeight: 700,
    color: "#c7d4e8", letterSpacing: "-0.8px",
    marginBottom: 8,
  },
  sectionSub: {
    textAlign: "center",
    fontSize: 14, color: "#2d3f58",
    marginBottom: 48, lineHeight: 1.6,
  },
  featGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 14,
  },
  featCard: {
    background: "#0c1018",
    border: "1px solid #141d2b",
    borderRadius: 14,
    padding: "24px 22px",
    display: "flex", flexDirection: "column", gap: 12,
    opacity: 0,
    transform: "translateY(20px)",
    transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 200ms ease, background 200ms ease",
  },
  featIconWrap: {
    width: 36, height: 36,
    borderRadius: 9,
    background: "#101520",
    border: "1px solid #181f2e",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  featName: { fontSize: 14, fontWeight: 600, color: "#8fa3bf", letterSpacing: "-0.2px", marginBottom: 6 },
  featDesc: { fontSize: 13, color: "#1e2d3e", lineHeight: 1.55 },

  /* Final CTA */
  finalCta: {
    padding: "56px 2rem 72px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
    position: "relative", zIndex: 1,
    borderTop: "1px solid #0c1421",
  },
  finalLabel: { fontSize: 13, color: "#243040", fontWeight: 500 },
  ctaSecondary: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "transparent",
    border: "1px solid #1a2740",
    borderRadius: 11, padding: "13px 30px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14, fontWeight: 600, color: "#4f6a8a",
    cursor: "pointer", letterSpacing: "0.1px",
    transition: "border-color 200ms ease, color 200ms ease, transform 200ms ease",
  },
};

export default IntroPage;