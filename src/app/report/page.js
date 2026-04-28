"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { UploadCloud, FileText, Loader2, CheckCircle, FileUp, AlertCircle } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function ReportPage() {
  const { user, loading } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pagesDetected, setPagesDetected] = useState(0);
  const [copies, setCopies] = useState(1);
  const [colorType, setColorType] = useState("bw"); // 'bw' or 'color'
  const [softBinding, setSoftBinding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // Pricing in INR
  const PRICE_BW = 2.00; // ₹2 per page
  const PRICE_COLOR = 6.00; // ₹6 per page
  const BINDING_FEE = 15.00; // ₹15 flat fee for soft binding

  const unitPrice = colorType === "bw" ? PRICE_BW : PRICE_COLOR;
  const itemPrice = (pagesDetected * unitPrice) + (softBinding ? BINDING_FEE : 0);
  const totalPrice = itemPrice * copies;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const fileType = selectedFile.name.split('.').pop().toLowerCase();
    if (fileType !== "pdf" && fileType !== "docx") {
      setError("Only PDF and DOCX files are supported.");
      return;
    }

    setFile(selectedFile);
    setError("");
    setIsAnalyzing(true);
    setPagesDetected(0);
    setIsAdded(false);

    try {
      if (fileType === "pdf") {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();
        setPagesDetected(pageCount);
      } else if (fileType === "docx") {
        // Fallback for DOCX
        const estimatedPages = Math.max(1, Math.ceil(selectedFile.size / 5120));
        setPagesDetected(estimatedPages);
      }
    } catch (err) {
      console.error("Error analyzing file:", err);
      setError("Could not analyze file. Please manually enter page count.");
      setPagesDetected(1);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddToCart = () => {
    if (!file || pagesDetected <= 0 || copies <= 0) return;

    const printJobId = `print-${Date.now()}`;
    const product = {
      id: printJobId,
      name: `Print Report: ${file.name}`,
      category: "Print Services",
      price: itemPrice, // Base price for 1 copy
      description: `${pagesDetected} pages in ${colorType === "color" ? "Color" : "Black & White"}`,
      image: null,
      inStock: true,
      isCustomPrint: true,
      details: {
        fileName: file.name,
        pages: pagesDetected,
        color: colorType,
        binding: softBinding ? "Soft Binding" : "None"
      }
    };

    addToCart(product, copies);
    setIsAdded(true);
    
    setTimeout(() => {
      setIsAdded(false);
      setFile(null);
      setPagesDetected(0);
      setCopies(1);
      setColorType("bw");
      setSoftBinding(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Print Report Service
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Upload your PDF or DOCX file, configure your print settings, and we'll have it ready for you.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden transition-colors">
        <div className="p-8 sm:p-10">
          
          {/* File Upload Section */}
          <div 
            className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors ${
              file ? "border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10" : "border-gray-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <input
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            
            {!file ? (
              <div className="flex flex-col items-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4 transition-colors">
                  <UploadCloud size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Click to upload document</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Supports PDF and DOCX</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <FileText size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 break-all px-4">{file.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button 
                  onClick={() => {
                    setFile(null);
                    setPagesDetected(0);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                >
                  Remove file
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-6 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 border border-red-100 dark:border-red-900/50">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Configuration Section */}
          {file && !error && (
            <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-zinc-800 pb-4">Print Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  
                  {/* Pages Detected */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pages Detected
                    </label>
                    <div className="relative">
                      {isAnalyzing ? (
                        <div className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl flex items-center text-gray-500 dark:text-gray-400">
                          <Loader2 size={18} className="animate-spin mr-2" />
                          Analyzing document...
                        </div>
                      ) : (
                        <input
                          type="number"
                          value={pagesDetected}
                          onChange={(e) => setPagesDetected(Math.max(1, parseInt(e.target.value) || 0))}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-semibold"
                        />
                      )}
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">You can manually adjust this if the detection is incorrect.</p>
                    </div>
                  </div>

                  {/* Copies */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Number of Copies
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={copies}
                      onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-semibold"
                    />
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ink Color
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setColorType("bw")}
                        className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                          colorType === "bw"
                            ? "border-gray-900 dark:border-gray-100 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-md"
                            : "border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-zinc-600"
                        }`}
                      >
                        Black & White
                        <span className="block text-xs font-normal opacity-80 mt-1">₹{PRICE_BW.toFixed(2)}/page</span>
                      </button>
                      <button
                        onClick={() => setColorType("color")}
                        className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                          colorType === "color"
                            ? "border-blue-600 bg-blue-600 text-white shadow-md"
                            : "border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-zinc-600"
                        }`}
                      >
                        Color
                        <span className="block text-xs font-normal opacity-80 mt-1">₹{PRICE_COLOR.toFixed(2)}/page</span>
                      </button>
                    </div>
                  </div>

                  {/* Binding Option */}
                  <div className="pt-2">
                    <div className="flex items-center p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700 cursor-pointer" onClick={() => setSoftBinding(!softBinding)}>
                      <input
                        type="checkbox"
                        checked={softBinding}
                        onChange={(e) => setSoftBinding(e.target.checked)}
                        className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-zinc-700 dark:border-zinc-600 pointer-events-none"
                      />
                      <div className="ml-3 flex-1 flex justify-between items-center">
                        <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 cursor-pointer">
                          Soft Binding
                        </label>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-400">+₹{BINDING_FEE.toFixed(2)} / copy</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 flex flex-col justify-between transition-colors">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Cost Summary</h4>
                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
                      <li className="flex justify-between">
                        <span>Pages</span>
                        <span className="font-medium text-gray-900 dark:text-white">{pagesDetected}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Price per page</span>
                        <span className="font-medium text-gray-900 dark:text-white">₹{unitPrice.toFixed(2)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Cost per copy</span>
                        <span className="font-medium text-gray-900 dark:text-white">₹{itemPrice.toFixed(2)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Copies</span>
                        <span className="font-medium text-gray-900 dark:text-white">x {copies}</span>
                      </li>
                      {softBinding && (
                        <li className="flex justify-between text-indigo-600 dark:text-indigo-400">
                          <span>Soft Binding</span>
                          <span className="font-medium">Included (+₹{BINDING_FEE.toFixed(2)})</span>
                        </li>
                      )}
                    </ul>
                    <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
                      <div className="flex justify-between items-end">
                        <span className="text-base font-bold text-gray-900 dark:text-white">Total Price</span>
                        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                          ₹{totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={isAnalyzing || pagesDetected <= 0 || isAdded}
                    className="mt-8 w-full flex items-center justify-center py-4 px-4 rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isAdded ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle size={20} />
                        Added to Cart!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <FileUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                        Add Print Job to Cart
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
