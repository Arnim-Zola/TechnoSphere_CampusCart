import React, { useState } from "react";
import { useCart } from "../context/CartContext";

/* ─── Design tokens ────────────────────────────────────────────────────── */
const T = {
  bg:        "#0f0f14",
  surface:   "#1a1a24",
  surfaceAlt:"#12121a",
  border:    "rgba(255,255,255,0.07)",
  borderHover:"rgba(124,106,247,0.45)",
  accent:    "#7c6af7",
  accentSoft:"#a89bf5",
  text:      "#e8e6f0",
  textMuted: "#6b6880",
  textSub:   "#9995b0",
  danger:    "#f87171",
  success:   "#34d399",
  font:      "'DM Sans', sans-serif",
};

/* ─── Styles ───────────────────────────────────────────────────────────── */
const S = {
  root: {
    minHeight: "100vh",
    background: T.bg,
    fontFamily: T.font,
    color: T.text,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "48px 20px 80px",
    boxSizing: "border-box",
  },

  /* Page title */
  pageTitle: {
    fontSize: "clamp(22px, 4vw, 32px)",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    background: `linear-gradient(120deg, ${T.text} 30%, ${T.accentSoft})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "6px",
  },
  pageSubtitle: {
    fontSize: "14px",
    color: T.textMuted,
    marginBottom: "36px",
    textAlign: "center",
  },

  /* Two-col wrapper */
  layout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "820px",
  },

  /* Card */
  card: {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: "16px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },

  sectionLabel: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: T.accent,
    marginBottom: "14px",
  },

  /* Drop zone */
  dropzone: (dragging) => ({
    border: `2px dashed ${dragging ? T.accent : "rgba(255,255,255,0.13)"}`,
    borderRadius: "12px",
    background: dragging ? "rgba(124,106,247,0.07)" : T.surfaceAlt,
    padding: "36px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
    position: "relative",
  }),
  dropzoneInput: {
    position: "absolute",
    inset: 0,
    opacity: 0,
    cursor: "pointer",
    width: "100%",
    height: "100%",
  },
  dropzoneIcon: {
    fontSize: "32px",
    lineHeight: 1,
  },
  dropzoneText: {
    fontSize: "14px",
    fontWeight: 600,
    color: T.textSub,
    textAlign: "center",
  },
  dropzoneHint: {
    fontSize: "12px",
    color: T.textMuted,
  },

  /* File info */
  fileChip: {
    background: T.surfaceAlt,
    border: `1px solid ${T.borderHover}`,
    borderRadius: "10px",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  fileIcon: { fontSize: "24px" },
  fileDetails: { flex: 1, minWidth: 0 },
  fileName: {
    fontSize: "13px",
    fontWeight: 600,
    color: T.text,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  fileMeta: {
    fontSize: "12px",
    color: T.accentSoft,
    marginTop: "3px",
  },
  replaceLink: {
    fontSize: "12px",
    color: T.accent,
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: T.font,
  },

  /* Loading */
  loadingRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: T.textMuted,
    marginTop: "10px",
  },

  /* Settings card rows */
  fieldLabel: {
    fontSize: "12px",
    fontWeight: 600,
    color: T.textSub,
    marginBottom: "10px",
    display: "block",
  },

  /* Stepper */
  stepper: {
    display: "inline-flex",
    alignItems: "center",
    background: T.surfaceAlt,
    border: `1px solid ${T.border}`,
    borderRadius: "9px",
    overflow: "hidden",
  },
  stepperBtn: {
    background: "transparent",
    border: "none",
    color: T.accentSoft,
    fontSize: "20px",
    fontWeight: 700,
    width: "40px",
    height: "40px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: T.font,
    transition: "background 0.15s",
    lineHeight: 1,
  },
  stepperVal: {
    fontSize: "15px",
    fontWeight: 700,
    color: T.text,
    minWidth: "40px",
    textAlign: "center",
    userSelect: "none",
  },

  /* Toggle */
  toggleGroup: {
    display: "inline-flex",
    background: T.surfaceAlt,
    border: `1px solid ${T.border}`,
    borderRadius: "9px",
    padding: "3px",
    gap: "3px",
  },
  toggleOption: (active) => ({
    padding: "8px 18px",
    borderRadius: "7px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    fontFamily: T.font,
    transition: "background 0.18s, color 0.18s",
    background: active ? `linear-gradient(135deg, ${T.accent}, #5b8af6)` : "transparent",
    color: active ? "#fff" : T.textMuted,
  }),

  divider: {
    height: "1px",
    background: T.border,
  },

  /* Summary */
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "18px 0 6px",
  },
  summaryLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: T.textSub,
  },
  summaryBreakdown: {
    fontSize: "11px",
    color: T.textMuted,
    marginTop: "4px",
  },
  totalAmount: {
    fontSize: "28px",
    fontWeight: 700,
    color: T.accentSoft,
    letterSpacing: "-0.02em",
  },
  totalRupee: {
    fontSize: "16px",
    fontWeight: 600,
    color: T.textMuted,
    verticalAlign: "super",
    marginRight: "2px",
  },

  /* Add to cart */
  addBtn: {
    background: `linear-gradient(135deg, ${T.accent}, #5b8af6)`,
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    padding: "14px",
    cursor: "pointer",
    fontFamily: T.font,
    letterSpacing: "0.02em",
    transition: "opacity 0.15s, transform 0.15s",
    width: "100%",
  },

  /* Rate pill */
  ratePill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(124,106,247,0.1)",
    border: "1px solid rgba(124,106,247,0.2)",
    borderRadius: "20px",
    padding: "5px 12px",
    fontSize: "12px",
    color: T.accentSoft,
    fontWeight: 500,
  },

  /* Spinner */
  spinner: {
    width: "14px",
    height: "14px",
    border: `2px solid ${T.border}`,
    borderTop: `2px solid ${T.accent}`,
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    flexShrink: 0,
  },

  /* Toast */
  toast: (type) => ({
    position: "fixed",
    bottom: "28px",
    left: "50%",
    transform: "translateX(-50%)",
    background: T.surface,
    border: `1px solid ${type === "error" ? "rgba(248,113,113,0.4)" : "rgba(52,211,153,0.4)"}`,
    borderRadius: "10px",
    padding: "12px 22px",
    fontSize: "13px",
    fontWeight: 600,
    color: type === "error" ? T.danger : T.success,
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    zIndex: 9999,
    whiteSpace: "nowrap",
    animation: "fadeSlideUp 0.25s ease",
  }),
};

/* ─── Helpers ──────────────────────────────────────────────────────────── */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ─── Component ────────────────────────────────────────────────────────── */
function Print() {
  const { addToCart } = useCart();

  const [file, setFile]     = useState(null);
  const [pages, setPages]   = useState(0);
  const [copies, setCopies] = useState(1);
  const [color, setColor]   = useState("bw");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const rate  = color === "bw" ? 1 : 10;
  const total = pages * rate * copies;

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 2000);
  };

  // ✅ UNCHANGED business logic
  const handleFileUpload = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      showToastMessage("Please upload a PDF file", "error");
      return;
    }

    setLoading(true);

    const reader = new FileReader();

    reader.onload = async function () {
      const typedArray = new Uint8Array(this.result);

      const pdf = await window.pdfjsLib.getDocument({
        data: typedArray,
      }).promise;

      setPages(pdf.numPages);
      setFile(selected);
      setLoading(false);
    };

    reader.readAsArrayBuffer(selected);
  };

  // Drag-and-drop wrappers — feed same handler
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const fakeEvent = { target: { files: e.dataTransfer.files } };
    handleFileUpload(fakeEvent);
  };

  // ✅ UNCHANGED business logic
  const handleAdd = () => {
    if (!file) {
      showToastMessage("Upload a PDF first", "error");
      return;
    }

    addToCart({
      name: `Print (${color === "bw" ? "B/W" : "Color"})`,
      pages,
      copies,
      price: pages * rate,
      quantity: copies,
      file,
    });

    showToastMessage("Added to cart ✓", "success");
  };

  // Hidden file input ref workaround for replace
  const triggerInput = () => document.getElementById("pr-file-input").click();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translate(-50%, 12px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        button:focus-visible { outline: 2px solid #7c6af7; outline-offset: 2px; }
        select option { background: #12121a; }
      `}</style>

      <div style={S.root}>
        {/* Page heading */}
        <h1 style={S.pageTitle}>Print Documents</h1>
        <p style={S.pageSubtitle}>Upload a PDF, configure your settings, and add to cart</p>

        <div style={S.layout}>

          {/* ── LEFT: Upload card ── */}
          <div style={S.card}>
            <div>
              <p style={S.sectionLabel}>Document</p>

              {!file ? (
                /* Drop zone */
                <div
                  style={S.dropzone(dragging)}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={triggerInput}
                >
                  <input
                    id="pr-file-input"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    style={S.dropzoneInput}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span style={S.dropzoneIcon}>📄</span>
                  <p style={S.dropzoneText}>
                    <strong>Click or drag</strong> to upload
                  </p>
                  <p style={S.dropzoneHint}>PDF files only</p>
                </div>
              ) : (
                /* File chip */
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={S.fileChip}>
                    <span style={S.fileIcon}>📎</span>
                    <div style={S.fileDetails}>
                      <div style={S.fileName}>{file.name}</div>
                      <div style={S.fileMeta}>
                        {loading
                          ? "Reading…"
                          : `${pages} page${pages !== 1 ? "s" : ""}  ·  ${formatBytes(file.size)}`}
                      </div>
                    </div>
                  </div>
                  <button style={S.replaceLink} onClick={triggerInput}>
                    Replace file
                  </button>
                  <input
                    id="pr-file-input"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </div>
              )}

              {loading && (
                <div style={S.loadingRow}>
                  <span style={S.spinner} />
                  Reading PDF…
                </div>
              )}
            </div>

            {/* File stats — shown after upload */}
            {file && !loading && (
              <>
                <div style={S.divider} />
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <p style={S.sectionLabel}>File Details</p>
                  {[
                    ["Pages", `${pages}`],
                    ["Type", "PDF"],
                    ["Size", formatBytes(file.size)],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "13px", color: T.textMuted }}>{label}</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: T.text }}>{val}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── RIGHT: Settings + Summary card ── */}
          <div style={S.card}>
            {/* Print settings */}
            <div>
              <p style={S.sectionLabel}>Print Settings</p>

              {/* Copies stepper */}
              <div style={{ marginBottom: "22px" }}>
                <label style={S.fieldLabel}>Copies</label>
                <div style={S.stepper}>
                  <button
                    style={S.stepperBtn}
                    onClick={() => { if (copies > 1) setCopies(copies - 1); }}
                  >−</button>
                  <span style={S.stepperVal}>{copies}</span>
                  <button
                    style={S.stepperBtn}
                    onClick={() => setCopies(copies + 1)}
                  >+</button>
                </div>
              </div>

              {/* Color toggle */}
              <div>
                <label style={S.fieldLabel}>Print Type</label>
                <div style={S.toggleGroup}>
                  <button
                    style={S.toggleOption(color === "bw")}
                    onClick={() => setColor("bw")}
                  >
                    B&amp;W
                  </button>
                  <button
                    style={S.toggleOption(color === "color")}
                    onClick={() => setColor("color")}
                  >
                    Color
                  </button>
                </div>
              </div>
            </div>

            <div style={S.divider} />

            {/* Rate info */}
            <div>
              <p style={S.sectionLabel}>Pricing</p>
              <span style={S.ratePill}>
                ₹{rate} per page · {color === "bw" ? "Black & White" : "Color"}
              </span>
            </div>

            <div style={S.divider} />

            {/* Summary */}
            <div>
              <p style={S.sectionLabel}>Summary</p>
              <div style={S.summaryRow}>
                <div>
                  <div style={S.summaryLabel}>Estimated Total</div>
                  {pages > 0 && (
                    <div style={S.summaryBreakdown}>
                      {pages} pg × ₹{rate} × {copies} {copies !== 1 ? "copies" : "copy"}
                    </div>
                  )}
                </div>
                <div style={S.totalAmount}>
                  <span style={S.totalRupee}>₹</span>
                  {total}
                </div>
              </div>
            </div>

            {/* Add to cart */}
            <button
              style={{
                ...S.addBtn,
                ...(btnHover ? { opacity: 0.88, transform: "scale(0.98)" } : {}),
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              onClick={handleAdd}
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div style={S.toast(toast.type)}>{toast.message}</div>
      )}
    </>
  );
}

export default Print;