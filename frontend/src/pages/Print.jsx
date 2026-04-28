import React, { useState } from "react";
import { useCart } from "../context/CartContext";

function Print() {
  const { addToCart } = useCart();

  const [file, setFile] = useState(null);
  const [pages, setPages] = useState(0);
  const [copies, setCopies] = useState(1);
  const [color, setColor] = useState("bw");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const rate = color === "bw" ? 1 : 10;
  const total = pages * rate * copies;

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 2000);
  };

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

  return (
    <>
      
      <div className="pr-root">
        <div className="pr-card">
          <div className="pr-card-header">
            <h2>Print Document</h2>
            <p>Upload a PDF and configure your print settings</p>
          </div>

          <div className="pr-body">
            {/* FILE UPLOAD */}
            <div>
              <p className="pr-section-label">Document</p>
              {!file ? (
                <div className="pr-dropzone">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                  />
                  <div className="pr-dropzone-icon">📄</div>
                  <p className="pr-dropzone-text">
                    <strong>Click to upload</strong> your PDF
                  </p>
                  <p className="pr-dropzone-hint">PDF files only</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div className="pr-file-info">
                    <span className="pr-file-icon">📎</span>
                    <div style={{ minWidth: 0 }}>
                      <div className="pr-file-name">{file.name}</div>
                      <div className="pr-file-pages">
                        {loading ? "Reading…" : `${pages} page${pages !== 1 ? "s" : ""} detected`}
                      </div>
                    </div>
                  </div>
                  {/* Allow re-upload */}
                  <label style={{ fontSize: 12, color: "#6d5fc5", cursor: "pointer", letterSpacing: 0.2 }}>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                    Replace file
                  </label>
                </div>
              )}

              {loading && (
                <div className="pr-status-text pr-status-loading" style={{ marginTop: 10 }}>
                  <span className="pr-spinner" /> Reading PDF…
                </div>
              )}
            </div>

            <div className="pr-divider" />

            {/* PRINT SETTINGS */}
            <div>
              <p className="pr-section-label">Print Settings</p>
              <div className="pr-row">
                <div className="pr-field">
                  <label className="pr-label">Copies</label>
                  <input
                    className="pr-input"
                    type="number"
                    min="1"
                    value={copies}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") { setCopies(""); return; }
                      const num = Number(value);
                      if (num >= 1) setCopies(num);
                    }}
                    onBlur={() => {
                      if (!copies || copies < 1) setCopies(1);
                    }}
                  />
                </div>

                <div className="pr-field">
                  <label className="pr-label">Print Type</label>
                  <select
                    className="pr-select"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value="bw">Black & White</option>
                    <option value="color">Color</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pr-divider" />

            {/* PRICING */}
            <div className="pr-summary">
              <div className="pr-summary-left">
                <span className="pr-summary-label">Estimated Total</span>
                {pages > 0 && (
                  <span className="pr-summary-breakdown">
                    {pages} pg × ₹{rate} × {copies || 1} {copies !== 1 ? "copies" : "copy"}
                  </span>
                )}
              </div>
              <div className="pr-total">
                <span>₹</span>{total}
              </div>
            </div>

            {/* SUBMIT */}
            <button className="pr-btn" onClick={handleAdd}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* TOAST */}
        {toast.show && (
          <div className={`pr-toast ${toast.type}`}>
            {toast.message}
          </div>
        )}
      </div>
    </>
  );
}

export default Print;
