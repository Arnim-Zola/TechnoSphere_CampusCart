import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Keyframes injection (once) ─────────────────── */
const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

  @keyframes ip-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ip-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #07090f; }
`;

let injected = false;
function injectStyles() {
  if (injected || typeof document === "undefined") return;
  const tag = document.createElement("style");
  tag.textContent = KEYFRAMES;
  document.head.appendChild(tag);
  injected = true;
}

/* ─── Icons ───────────────────────────────────────── */
const BoxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L2 6v8l8 4 8-4V6L10 2z" stroke="#818cf8" strokeWidth="1.5"
      strokeLinejoin="round" />
    <path d="M2 6l8 4 8-4M10 10v10" stroke="#818cf8" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PrintIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="4" y="2" width="12" height="8" rx="1.5" stroke="#60a5fa" strokeWidth="1.5" />
    <path d="M4 10H2a1 1 0 00-1 1v5a1 1 0 001 1h16a1 1 0 001-1v-5a1 1 0 00-1-1h-2"
      stroke="#60a5fa" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="5" y="14" width="10" height="5" rx="1" stroke="#60a5fa" strokeWidth="1.5" />
    <circle cx="15" cy="12.5" r="1" fill="#60a5fa" />
  </svg>
);
const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2a6 6 0 00-6 6c0 3.5-1.5 5-1.5 5h15S16 11.5 16 8a6 6 0 00-6-6z"
      stroke="#a78bfa" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8.5 17a1.5 1.5 0 003 0" stroke="#a78bfa" strokeWidth="1.5"
      strokeLinecap="round" />
  </svg>
);
const ArrowRight = ({ color = "white" }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M3 7.5h9M8 4l4 3.5L8 11" stroke={color} strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LogoutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M6 2H3a1 1 0 00-1 1v9a1 1 0 001 1h3M10 10l3-2.5L10 5M13 7.5H6"
      stroke="#4a5c73" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Feature data (3 cards per spec) ────────────── */
const FEATURES = [
  {
    icon: <BoxIcon />,
    accent: "#818cf8",
    bg: "rgba(129,140,248,0.07)",
    border: "rgba(129,140,248,0.12)",
    name: "Easy Ordering",
    desc: "Browse categories and order in seconds — no queues, no last-minute rushes at the counter.",
  },
  {
    icon: <PrintIcon />,
    accent: "#60a5fa",
    bg: "rgba(96,165,250,0.07)",
    border: "rgba(96,165,250,0.12)",
    name: "Print Upload",
    desc: "Upload documents directly from your device and track your print job status in real time.",
  },
  {
    icon: <BellIcon />,
    accent: "#a78bfa",
    bg: "rgba(167,139,250,0.07)",
    border: "rgba(167,139,250,0.12)",
    name: "Real-time Updates",
    desc: "Get notified the moment your order is ready for pickup — zero guesswork, zero waiting.",
  },
];

/* ─── Main component ──────────────────────────────── */
const IntroPage = () => {
  injectStyles();
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

  // Scroll-triggered reveal — cards default to visible as fallback
  useEffect(() => {
    const cards = featRefs.current.filter(Boolean);
    cards.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, idx * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((el) => observer.observe(el));

    // Fallback: reveal everything after 800ms in case observer never fires
    const fallback = setTimeout(() => {
      cards.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div style={S.page}>
      {/* Subtle background grid */}
      <div style={S.bgGrid} />
      {/* Ambient glow behind hero */}
      <div style={S.bgGlow} />

      {/* ══ NAVBAR ══ */}
      <nav style={S.nav}>
        <div style={S.navInner}>
          {/* Logo */}
          <div style={S.navLogo}>
            <div style={S.navLogoMark}>CC</div>
            <span style={S.navLogoText}>CampusCart</span>
          </div>

          {/* Right side */}
          <div style={S.navRight}>
            <div style={S.userBadge}>
              <span style={S.userDot} />
              <span style={S.userLabel}>Student</span>
            </div>
            {/* Logout button — rendered only if logout handler exists */}
            <button
              style={S.logoutBtn}
              onClick={() => navigate("/")}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#1e2d45";
                e.currentTarget.style.color = "#6b80a0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#111926";
                e.currentTarget.style.color = "#3a4f68";
              }}
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={S.hero}>
        <div style={S.heroBadge}>
          <span style={S.heroBadgeDot} />
          <span style={S.heroBadgeText}>Campus Pre-Order Platform</span>
        </div>

        <h1 style={S.heroTitle}>
          Welcome to{" "}
          <span style={S.titleGrad}>CampusCart</span>
        </h1>

        <p style={S.heroSub}>
          Pre-order stationery and print services —<br />
          skip queues, save time.
        </p>

        <div style={S.heroCtas}>
          <button
            style={S.ctaPrimary}
            onClick={handleContinue}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 10px 36px rgba(79,70,229,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(79,70,229,0.2)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(0.98)";
            }}
          >
            Go to Dashboard
            <ArrowRight color="white" />
          </button>

          <button
            style={S.ctaGhost}
            onClick={handleContinue}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1e3050";
              e.currentTarget.style.color = "#7a9bc0";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#141e2e";
              e.currentTarget.style.color = "#4a5f7a";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Browse Categories
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={S.scrollHint}>
          <div style={S.scrollLine} />
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section style={S.featSection}>
        <div style={S.featHeader}>
          <p style={S.featEyebrow}>What's inside</p>
          <h2 style={S.featTitle}>Everything your campus needs</h2>
          <p style={S.featSub}>
            Designed to eliminate queues and make ordering effortless.
          </p>
        </div>

        <div style={S.featGrid}>
          {FEATURES.map(({ icon, accent, bg, border, name, desc }, i) => (
            <div
              key={name}
              data-index={i}
              ref={(el) => (featRefs.current[i] = el)}
              style={{
                ...S.featCard,
                transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 200ms ease, box-shadow 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = border;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#111926";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
              }}
            >
              <div style={{ ...S.featIconWrap, background: bg, border: `1px solid ${border}` }}>
                {icon}
              </div>
              <h3 style={{ ...S.featName, color: accent }}>{name}</h3>
              <p style={S.featDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FOOTER STRIP ══ */}
      <footer style={S.footer}>
        <span style={S.footerText}>© 2025 CampusCart · All rights reserved</span>
        <button
          style={S.footerCta}
          onClick={handleContinue}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#818cf8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#3a4f68";
          }}
        >
          Go to Dashboard →
        </button>
      </footer>
    </div>
  );
};

/* ─── Styles ───────────────────────────────────────── */
const anim = (name, dur, easing, delay) =>
  `${name} ${dur} ${easing} ${delay} both`;

const S = {
  page: {
    background: "#07090f",
    fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
    color: "#e8edf8",
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },

  /* Background */
  bgGrid: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
    `,
    backgroundSize: "48px 48px",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgGlow: {
    position: "fixed",
    top: "10%", left: "50%",
    transform: "translateX(-50%)",
    width: 700, height: 420,
    background: "radial-gradient(ellipse, rgba(79,70,229,0.09) 0%, transparent 68%)",
    pointerEvents: "none",
    zIndex: 0,
  },

  /* Navbar */
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(7,9,15,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid #0e1520",
    animation: anim("ip-fade", "0.4s", "ease", "0s"),
  },
  navInner: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "0 24px",
    height: 58,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  navLogoMark: {
    width: 32, height: 32,
    borderRadius: 8,
    background: "linear-gradient(135deg,#4f46e5,#3b82f6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px",
    flexShrink: 0,
  },
  navLogoText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#c8d5ec",
    letterSpacing: "-0.4px",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  userBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#0c1018",
    border: "1px solid #111926",
    borderRadius: 999,
    padding: "5px 12px 5px 9px",
  },
  userDot: {
    display: "inline-block",
    width: 6, height: 6,
    borderRadius: "50%",
    background: "#22c55e",
    flexShrink: 0,
    animation: "pulse-dot 2s ease-in-out infinite",
  },
  userLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#4a6080",
    letterSpacing: "0.2px",
  },
  logoutBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    background: "transparent",
    border: "1px solid #111926",
    borderRadius: 8,
    padding: "6px 12px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    color: "#3a4f68",
    cursor: "pointer",
    transition: "border-color 200ms ease, color 200ms ease",
  },

  /* Hero */
  hero: {
    minHeight: "calc(100vh - 58px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 24px 100px",
    position: "relative",
    zIndex: 1,
    textAlign: "center",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    background: "#0c1018",
    border: "1px solid #141e2e",
    borderRadius: 999,
    padding: "5px 14px 5px 9px",
    marginBottom: 36,
    animation: anim("ip-up", "0.55s", "cubic-bezier(0.22,1,0.36,1)", "0.05s"),
  },
  heroBadgeDot: {
    display: "inline-block",
    width: 7, height: 7,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#818cf8,#60a5fa)",
    flexShrink: 0,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: 500,
    color: "#3d5070",
    letterSpacing: "0.5px",
  },
  heroTitle: {
    fontSize: "clamp(44px, 9vw, 76px)",
    fontWeight: 800,
    letterSpacing: "-2.5px",
    lineHeight: 1.05,
    color: "#dde4f5",
    marginBottom: 22,
    animation: anim("ip-up", "0.6s", "cubic-bezier(0.22,1,0.36,1)", "0.15s"),
  },
  titleGrad: {
    background: "linear-gradient(120deg, #818cf8 20%, #60a5fa 80%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    fontSize: 17,
    fontWeight: 400,
    color: "#4a6080",
    lineHeight: 1.65,
    maxWidth: 400,
    marginBottom: 44,
    animation: anim("ip-up", "0.6s", "cubic-bezier(0.22,1,0.36,1)", "0.25s"),
  },
  heroCtas: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
    animation: anim("ip-up", "0.6s", "cubic-bezier(0.22,1,0.36,1)", "0.35s"),
  },
  ctaPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "linear-gradient(135deg,#4f46e5 0%,#3b82f6 100%)",
    border: "none",
    borderRadius: 12,
    padding: "14px 28px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    color: "#fff",
    cursor: "pointer",
    letterSpacing: "-0.1px",
    boxShadow: "0 4px 20px rgba(79,70,229,0.2)",
    transition: "transform 200ms cubic-bezier(0.22,1,0.36,1), box-shadow 200ms ease",
  },
  ctaGhost: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "transparent",
    border: "1px solid #141e2e",
    borderRadius: 12,
    padding: "14px 24px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    fontWeight: 600,
    color: "#4a5f7a",
    cursor: "pointer",
    transition: "border-color 200ms ease, color 200ms ease, background 200ms ease",
  },
  scrollHint: {
    position: "absolute",
    bottom: 32,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: anim("ip-fade", "0.5s", "ease", "1s"),
  },
  scrollLine: {
    width: 1,
    height: 48,
    background: "linear-gradient(to bottom, transparent, #1a2840)",
  },

  /* Features */
  featSection: {
    padding: "80px 24px 88px",
    maxWidth: 1000,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
    borderTop: "1px solid #0d1422",
  },
  featHeader: {
    textAlign: "center",
    marginBottom: 52,
  },
  featEyebrow: {
    fontSize: 11,
    fontWeight: 600,
    color: "#2a3d57",
    letterSpacing: "1.4px",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  featTitle: {
    fontSize: 30,
    fontWeight: 700,
    color: "#c5d2e8",
    letterSpacing: "-0.8px",
    marginBottom: 10,
  },
  featSub: {
    fontSize: 15,
    color: "#374d66",
    lineHeight: 1.6,
    maxWidth: 400,
    margin: "0 auto",
  },
  featGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
  },
  featCard: {
    background: "#0b0f18",
    border: "1px solid #111926",
    borderRadius: 16,
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    cursor: "default",
  },
  featIconWrap: {
    width: 44, height: 44,
    borderRadius: 11,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  featName: {
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: "-0.2px",
  },
  featDesc: {
    fontSize: 13.5,
    color: "#3f5470",
    lineHeight: 1.6,
    fontWeight: 400,
  },

  /* Footer */
  footer: {
    borderTop: "1px solid #0d1422",
    padding: "24px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 1000,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  footerText: {
    fontSize: 12,
    color: "#1e2d42",
    fontWeight: 400,
  },
  footerCta: {
    background: "transparent",
    border: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    color: "#3a4f68",
    cursor: "pointer",
    transition: "color 200ms ease",
    padding: 0,
  },
};

export default IntroPage;