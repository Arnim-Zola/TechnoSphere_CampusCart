import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";


const CategoryPage = () => {
  const { type: category } = useParams();
  const { addToCart } = useCart();

  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");
  const [categoryTotal, setCategoryTotal] = useState(0);

  const [penType, setPenType] = useState("");
  const [penColor, setPenColor] = useState("");
  const [pencilType, setPencilType] = useState("");
  const [mechSize, setMechSize] = useState("");
  const [markerType, setMarkerType] = useState("");
  const [wbColor, setWbColor] = useState("");
  const [notebookType, setNotebookType] = useState("");
  const [notebookSize, setNotebookSize] = useState("");
  const [pages, setPages] = useState("");
  const [spiralPages, setSpiralPages] = useState("");
  const [scaleSize, setScaleSize] = useState("");
  const [glueSize, setGlueSize] = useState("");
  const [staplerSize, setStaplerSize] = useState("");
  const [pinsSize, setPinsSize] = useState("");
  const [highlightMode, setHighlightMode] = useState("");
  const [highlightColor, setHighlightColor] = useState("");

  console.log("Size:", notebookSize);

  const categories = {
    writing: ["Pen", "Pencil", "Mechanical Pencil"],
    correction: ["Whitener", "Correction Tape", "Permanent Marker", "Whiteboard Marker", "Highlighter"],
    paper: ["Notebook", "Spiral Notebook", "Graph Book", "Loose Sheets", "Sticky Notes"],
    measuring: ["Scale", "Geometry Box", "Protractor", "Compass", "Divider"],
    office: ["Eraser", "Sharpener", "Glue Stick", "Stapler", "Staple Pins", "Brown Cover"]
  };

  const items = categories[category] || [];

  const changeQty = (item, value) => {
    if (/^\d*$/.test(value)) {
      setQuantities(p => ({ ...p, [item]: value }));
    }
  };

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const getItemPrice = (item) => {
    let price = 0;
    const qty = Number(quantities[item]) || 1;
    if (item === "Pen" && penType && penColor) price = 10;
    if (item === "Pencil" && pencilType) price = 10;
    if (item === "Mechanical Pencil" && mechSize) price = 50;
    if (item === "Permanent Marker" && markerType) price = markerType === "Bold" ? 18 : 10;
    if (item === "Whiteboard Marker" && wbColor) price = 25;
    if (item === "Whitener") price = 20;
    if (item === "Correction Tape") price = 30;
    if (item === "Notebook" && notebookSize && pages) {
      if (notebookSize === "Small") price = pages === "200" ? 40 : 20;
      if (notebookSize === "King") price = pages === "200" ? 60 : 30;
      if (notebookSize === "Long") {
        if (pages === "100") price = 40;
        else if (pages === "200") price = 60;
        else price = 130;
      }
    }
    if (item === "Spiral Notebook" && spiralPages) price = spiralPages === "100" ? 50 : spiralPages === "200" ? 100 : 150;
    if (item === "Graph Book") price = 40;
    if (item === "Loose Sheets") price = 1;
    if (item === "Sticky Notes") price = 40;
    if (item === "Scale" && scaleSize) price = scaleSize === "30 cm" ? 20 : 10;
    if (item === "Geometry Box") price = 180;
    if (item === "Protractor") price = 60;
    if (item === "Compass") price = 100;
    if (item === "Divider") price = 100;
    if (item === "Glue Stick" && glueSize) price = glueSize === "Big" ? 50 : 25;
    if (item === "Stapler" && staplerSize) price = staplerSize === "Big" ? 100 : 40;
    if (item === "Staple Pins" && pinsSize) price = pinsSize === "Big" ? 25 : 10;
    if (item === "Eraser") price = 5;
    if (item === "Sharpener") price = 5;
    if (item === "Brown Cover") price = 10;
    return price * qty;
  };

  const handleAdd = (item) => {
    const qty = Number(quantities[item]) || 1;
    let name = item;
    let price = 0;

    if (item === "Pen") {
      if (!penType || !penColor) return showMsg("Select pen type & color");
      name = `${penType} Pen (${penColor})`; price = 10;
    }
    if (item === "Pencil") {
      if (!pencilType) return showMsg("Select pencil type");
      name = `${pencilType} Pencil`; price = 10;
    }
    if (item === "Mechanical Pencil") {
      if (!mechSize) return showMsg("Select size");
      name = `Mechanical Pencil (${mechSize})`; price = 50;
    }
    if (item === "Permanent Marker") {
      if (!markerType) return showMsg("Select marker type");
      name = `Permanent Marker (${markerType})`;
      price = markerType === "Bold" ? 18 : 10;
    }
    if (item === "Whiteboard Marker") {
      if (!wbColor) return showMsg("Select color");
      name = `Whiteboard Marker (${wbColor})`; price = 25;
    }
    if (item === "Highlighter") {
      if (!highlightMode) return showMsg("Select option");
      if (highlightMode === "Single") {
        if (!highlightColor) return showMsg("Select color");
        name = `Highlighter (${highlightColor})`; price = 20;
      } else {
        name = "Highlighter Pack (5 Colors)"; price = 100;
      }
    }
    if (item === "Whitener") { name = "Whitener"; price = 20; }
    if (item === "Correction Tape") { name = "Correction Tape"; price = 30; }
    if (item === "Notebook") {
      if (!notebookType || !notebookSize || !pages) return showMsg("Complete notebook options");
      name = `${notebookSize} ${notebookType} Notebook (${pages} pages)`;
      if (notebookSize === "Small") { if (pages === "100") price = 20; else if (pages === "200") price = 40; }
      else if (notebookSize === "King") { if (pages === "100") price = 30; else if (pages === "200") price = 60; }
      else if (notebookSize === "Long") { if (pages === "100") price = 40; else if (pages === "200") price = 60; else if (pages === "300") price = 130; }
    }
    if (item === "Spiral Notebook") {
      if (!spiralPages) return showMsg("Select pages");
      name = `Spiral Notebook (${spiralPages} pages)`;
      price = spiralPages === "100" ? 50 : spiralPages === "200" ? 100 : 150;
    }
    if (item === "Graph Book") { name = "Graph Book"; price = 40; }
    if (item === "Sticky Notes") { name = "Sticky Notes"; price = 40; }
    if (item === "Loose Sheets") { name = "Loose Sheets"; price = 1; }
    if (item === "Scale") {
      if (!scaleSize) return showMsg("Select 15 cm or 30 cm");
      name = `${scaleSize} Scale`;
      price = scaleSize === "30 cm" ? 20 : 10;
    }
    if (item === "Geometry Box") price = 180;
    if (item === "Protractor") price = 60;
    if (item === "Compass") price = 100;
    if (item === "Divider") price = 100;
    if (item === "Glue Stick") {
      if (!glueSize) return showMsg("Select size");
      name = `Glue Stick (${glueSize})`;
      price = glueSize === "Big" ? 50 : 25;
    }
    if (item === "Stapler") {
      if (!staplerSize) return showMsg("Select stapler size");
      name = `Stapler (${staplerSize})`;
      price = staplerSize === "Big" ? 100 : 40;
    }
    if (item === "Staple Pins") {
      if (!pinsSize) return showMsg("Select pins size");
      name = `Staple Pins (${pinsSize})`;
      price = pinsSize === "Big" ? 25 : 10;
    }
    if (item === "Eraser") price = 5;
    if (item === "Sharpener") price = 5;
    if (item === "Brown Cover") price = 10;

    addToCart({ name, price, quantity: qty });
    setCategoryTotal(prev => prev + (price * qty));
    showMsg(`${name} added`);
  };

  const isErrorMsg = message === "Complete selection" ||
    message.startsWith("Select") ||
    message.startsWith("Complete");

  const noOptions = ["Whitener","Correction Tape","Graph Book","Loose Sheets",
    "Sticky Notes","Geometry Box","Protractor","Compass","Divider","Eraser","Sharpener","Brown Cover"];

  return (
    <>
      <style>{css}</style>
      <div className="sp-root">
        <div className="sp-inner">

          {/* HEADER */}
          <div className="sp-header">
            <p className="sp-eyebrow">Stationery</p>
            <h2 className="sp-title">{category}</h2>
            <p className="sp-subtitle">{items.length} item{items.length !== 1 ? "s" : ""} available</p>
          </div>

          {items.length === 0 && (
            <div className="sp-empty">No items found in this category.</div>
          )}

          {items.map(item => {
            const livePrice = getItemPrice(item);
            const qty = Number(quantities[item]) || 1;
            const hasOpts = !noOptions.includes(item);

            return (
              <div className="sp-card" key={item + category}>

                {/* CARD HEADER */}
                <div className="sp-card-head">
                  <div className="sp-card-head-left">
                    <div className="sp-item-dot" />
                    <span className="sp-item-name">{item}</span>
                  </div>
                  <span className={`sp-price-badge${livePrice === 0 ? " hidden" : ""}`}>
                    ₹{livePrice}
                  </span>
                </div>

                {/* CARD BODY */}
                <div className="sp-card-body">

                  {/* OPTIONS ZONE */}
                  {hasOpts && (
                    <div className="sp-options-zone">
                      <span className="sp-options-label">Configure</span>
                      <div className="sp-options-row">

                        {item === "Pen" && (<>
                          <select className="sp-select" onChange={(e) => setPenType(e.target.value)}>
                            <option value="">Pen Type</option>
                            <option>Ball</option>
                            <option>Gel</option>
                          </select>
                          <select className="sp-select" onChange={(e) => setPenColor(e.target.value)}>
                            <option value="">Ink Color</option>
                            <option>Blue</option>
                            <option>Black</option>
                            <option>Red</option>
                            <option>Green</option>
                          </select>
                        </>)}

                        {item === "Pencil" && (
                          <select className="sp-select" onChange={(e) => setPencilType(e.target.value)}>
                            <option value="">Grade</option>
                            <option>Normal</option>
                            <option>HB</option>
                            <option>2B</option>
                          </select>
                        )}

                        {item === "Mechanical Pencil" && (
                          <select className="sp-select" onChange={(e) => setMechSize(e.target.value)}>
                            <option value="">Lead Size</option>
                            <option>0.5 mm</option>
                            <option>0.7 mm</option>
                          </select>
                        )}

                        {item === "Permanent Marker" && (
                          <select className="sp-select" onChange={(e) => setMarkerType(e.target.value)}>
                            <option value="">Tip Type</option>
                            <option>Bullet</option>
                            <option>Bold</option>
                          </select>
                        )}

                        {item === "Whiteboard Marker" && (
                          <select className="sp-select" onChange={(e) => setWbColor(e.target.value)}>
                            <option value="">Color</option>
                            <option>Black</option>
                            <option>Blue</option>
                            <option>Red</option>
                            <option>Green</option>
                          </select>
                        )}

                        {item === "Highlighter" && (<>
                          <select className="sp-select" onChange={(e) => setHighlightMode(e.target.value)}>
                            <option value="">Option</option>
                            <option value="Single">Single</option>
                            <option value="Pack">Pack of 5</option>
                          </select>
                          {highlightMode === "Single" && (
                            <select className="sp-select sp-sub-anim" onChange={(e) => setHighlightColor(e.target.value)}>
                              <option value="">Color</option>
                              <option>Yellow</option>
                              <option>Pink</option>
                              <option>Green</option>
                              <option>Orange</option>
                              <option>Blue</option>
                            </select>
                          )}
                        </>)}

                        {item === "Notebook" && (<>
                          <select className="sp-select" value={notebookType} onChange={(e) => setNotebookType(e.target.value)}>
                            <option value="">Ruling</option>
                            <option value="Ruled">Ruled</option>
                            <option value="Unruled">Unruled</option>
                          </select>
                          <select className="sp-select" value={notebookSize} onChange={(e) => { setNotebookSize(e.target.value); setPages(""); }}>
                            <option value="">Size</option>
                            <option value="Small">Small</option>
                            <option value="King">King</option>
                            <option value="Long">Long</option>
                          </select>
                          <select className="sp-select" value={pages} onChange={(e) => setPages(e.target.value)} disabled={!notebookSize}>
                            <option value="">Pages</option>
                            {(notebookSize === "Small" || notebookSize === "King") && (<>
                              <option value="100">100</option>
                              <option value="200">200</option>
                            </>)}
                            {notebookSize === "Long" && (<>
                              <option value="100">100</option>
                              <option value="200">200</option>
                              <option value="300">300</option>
                            </>)}
                          </select>
                        </>)}

                        {item === "Spiral Notebook" && (
                          <select className="sp-select" onChange={(e) => setSpiralPages(e.target.value)}>
                            <option value="">Pages</option>
                            <option>100</option>
                            <option>200</option>
                            <option>300</option>
                          </select>
                        )}

                        {item === "Scale" && (
                          <select className="sp-select" onChange={(e) => setScaleSize(e.target.value)}>
                            <option value="">Length</option>
                            <option>15 cm</option>
                            <option>30 cm</option>
                          </select>
                        )}

                        {item === "Glue Stick" && (
                          <select className="sp-select" onChange={(e) => setGlueSize(e.target.value)}>
                            <option value="">Size</option>
                            <option>Small</option>
                            <option>Big</option>
                          </select>
                        )}

                        {item === "Stapler" && (
                          <select className="sp-select" onChange={(e) => setStaplerSize(e.target.value)}>
                            <option value="">Size</option>
                            <option>Small</option>
                            <option>Big</option>
                          </select>
                        )}

                        {item === "Staple Pins" && (
                          <select className="sp-select" onChange={(e) => setPinsSize(e.target.value)}>
                            <option value="">Size</option>
                            <option>Small</option>
                            <option>Big</option>
                          </select>
                        )}

                      </div>
                    </div>
                  )}

                  {/* INTERNAL DIVIDER */}
                  <div className="sp-card-divider" />

                  {/* ACTION ZONE */}
                  <div className="sp-action-zone">
                    <div className="sp-qty-group">
                      <span className="sp-qty-label">Qty</span>
                      <div className="sp-qty-stepper">
                        <button
                          className="sp-qty-btn"
                          onClick={() => changeQty(item, String(Math.max(1, qty - 1)))}
                          aria-label="Decrease quantity"
                        >−</button>
                        <div className="sp-qty-val">{qty}</div>
                        <button
                          className="sp-qty-btn"
                          onClick={() => changeQty(item, String(qty + 1))}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                    </div>

                    <button className="sp-add-btn" onClick={() => handleAdd(item)}>
                      Add to Cart
                    </button>
                  </div>

                </div>
              </div>
            );
          })}

          {/* TOTAL BAR */}
          <div className="sp-total-bar">
            <div className="sp-total-left">
              <span className="sp-total-label">Category Total</span>
              <span className="sp-total-desc">Items added this session</span>
            </div>
            <span className="sp-total-amount">
              <span className="sp-total-currency">₹</span>{categoryTotal}
            </span>
          </div>

        </div>

        {/* TOAST */}
        {message && (
          <div className={`sp-toast ${isErrorMsg ? "sp-toast-err" : "sp-toast-ok"}`}>
            {message}
          </div>
        )}
      </div>
    </>
  );
}

export default CategoryPage;