import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const normalizedRole = role === "admin" ? "admin" : "student";
    sessionStorage.setItem("role", normalizedRole);
    navigate("/intro");
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>

        {/* Brand mark */}
        <div style={styles.logoRow}>
          <div style={styles.logoMark}>CC</div>
          <span style={styles.logoText}>CampusCart</span>
        </div>

        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.sub}>Sign in to access your campus marketplace</p>

        <span style={styles.label}>Continue as</span>

        {/* Role selector — keeps original <select> hidden for form state */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.hiddenSelect}
          aria-label="Select role"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {/* Visual role cards */}
        <div style={styles.roleGrid}>
          {[
            { value: "student", name: "Student", desc: "Browse & purchase" },
            { value: "admin",   name: "Admin",   desc: "Manage platform"  },
          ].map(({ value, name, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => setRole(value)}
              style={{
                ...styles.roleBtn,
                ...(role === value ? styles.roleBtnActive : {}),
              }}
            >
              <RoleIcon role={value} active={role === value} />
              <span style={{ ...styles.roleName, ...(role === value ? styles.roleNameActive : {}) }}>
                {name}
              </span>
              <span style={{ ...styles.roleDesc, ...(role === value ? styles.roleDescActive : {}) }}>
                {desc}
              </span>
            </button>
          ))}
        </div>

        <button
          type="submit"
          style={styles.submitBtn}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "translateY(0)";   }}
          onMouseDown={e  => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Continue
        </button>

        <div style={styles.divider} />
        <p style={styles.footer}>Need help? <span style={styles.footerLink}>Contact support</span></p>
      </form>
    </div>
  );
};

/* ─── Tiny icon component ───────────────────────────── */
const RoleIcon = ({ role, active }) => {
  const stroke = active ? "#6366f1" : "#475569";
  return (
    <div style={{ width: 28, height: 28, borderRadius: 6,
      background: active ? "#1e1b4b" : "#131720",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background 180ms ease",
    }}>
      {role === "student" ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L14 5.5V7C14 10.5 11.5 13.5 8 14.5C4.5 13.5 2 10.5 2 7V5.5L8 2Z"
            stroke={stroke} strokeWidth="1.2" />
          <circle cx="8" cy="7" r="2" fill={stroke} />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="5" height="5" rx="1" stroke={stroke} strokeWidth="1.2" />
          <rect x="9" y="2" width="5" height="5" rx="1" stroke={stroke} strokeWidth="1.2" />
          <rect x="2" y="9" width="5" height="5" rx="1" stroke={stroke} strokeWidth="1.2" />
          <rect x="9" y="9" width="5" height="5" rx="1" stroke={stroke} strokeWidth="1.2" />
        </svg>
      )}
    </div>
  );
};

/* ─── Styles ─────────────────────────────────────────── */
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#080b12",
    fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
  },
  form: {
    background: "#0e1117",
    border: "1px solid #1e2535",
    borderRadius: 16,
    padding: "48px 44px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 400,
    boxSizing: "border-box",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 32,
  },
  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "-0.5px",
    flexShrink: 0,
  },
  logoText: {
    fontSize: 15,
    fontWeight: 600,
    color: "#e2e8f0",
    letterSpacing: "-0.2px",
  },
  heading: {
    margin: "0 0 6px",
    fontSize: 22,
    fontWeight: 600,
    color: "#f1f5f9",
    letterSpacing: "-0.5px",
    lineHeight: 1.2,
  },
  sub: {
    margin: "0 0 36px",
    fontSize: 14,
    color: "#4b5a72",
    lineHeight: 1.5,
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
    color: "#4b5a72",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  hiddenSelect: {
    display: "none",
  },
  roleGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 28,
  },
  roleBtn: {
    background: "#131720",
    border: "1px solid #1e2535",
    borderRadius: 10,
    padding: "14px 16px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    textAlign: "left",
    transition: "border-color 180ms ease, background 180ms ease",
  },
  roleBtnActive: {
    borderColor: "#4f46e5",
    background: "#13163a",
  },
  roleName: {
    fontSize: 13,
    fontWeight: 500,
    color: "#94a3b8",
    lineHeight: 1,
  },
  roleNameActive: {
    color: "#a5b4fc",
  },
  roleDesc: {
    fontSize: 11,
    color: "#334155",
    lineHeight: 1.3,
  },
  roleDescActive: {
    color: "#4338ca",
  },
  submitBtn: {
    width: "100%",
    padding: "13px 20px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "opacity 180ms ease, transform 180ms ease",
    letterSpacing: "0.1px",
  },
  divider: {
    height: 1,
    background: "#1e2535",
    margin: "24px 0",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#2d3a50",
    margin: 0,
  },
  footerLink: {
    color: "#4f46e5",
    cursor: "pointer",
  },
};

export default LoginPage;