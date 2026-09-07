import { useState, useRef, useEffect } from "react";
import {
  Search, Upload, FileText, AlertTriangle,
  ArrowRight, Bookmark, Sparkles, FileSpreadsheet, Layers, Loader2,
  CheckCircle2, Gavel, Info, Download, ArrowUpRight
} from "lucide-react";
import { INDIAN_STANDARDS } from "../data/standards";

export default function StandardsSearch({
  onSelectStandard,
  onSaveStandard,
  savedIds,
  mainSearchInputRef,
  searchQuery,
  setSearchQuery
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [selectedSampleName, setSelectedSampleName] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const fileInputRef = useRef(null);

  const sampleFiles = [
    { name: "Structural Design Tender.pdf", type: "Tender Spec (14 Pages)", icon: FileText },
    { name: "Concrete Mix Proportions.png", type: "Batch Lab Sheet (1 Page)", icon: FileSpreadsheet },
    { name: "Foundation Reinforcement Drawing.jpg", type: "Structural Drawing", icon: Layers }
  ];

  const loadingSteps = [
    "Uploading document structure safely to secure sandbox...",
    "Scanning architectural grids & bounding text segments...",
    "Instantiating Gemini 3.8 Flash LLM context blocks...",
    "Cross-referencing civil clauses with BIS Gazette database v4.19...",
    "Formulating action compliance report..."
  ];

  useEffect(() => {
    let interval;
    if (analysisLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
      }, 1500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [analysisLoading]);

  const filteredStandards = Object.values(INDIAN_STANDARDS).filter((std) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      std.code.toLowerCase().includes(q) ||
      std.title.toLowerCase().includes(q) ||
      std.description.toLowerCase().includes(q) ||
      std.subtitle.toLowerCase().includes(q) ||
      std.category.toLowerCase().includes(q)
    );
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase().replace(/\s/g, "");
    const matched = Object.values(INDIAN_STANDARDS).find(
      (std) => std.code.toLowerCase().replace(/\s/g, "").includes(q)
    );
    if (matched) {
      onSelectStandard(matched.id);
    }
  };

  const executeAnalysis = async (fileName, fileContent, mimeType) => {
    setAnalysisLoading(true);
    setSelectedSampleName(fileName);
    setAnalysisResult(null);

    try {
      const response = await fetch("/api/analyze-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName, fileContent, mimeType }),
      });
      const resData = await response.json();

      if (resData.success) {
        setAnalysisResult({
          detectedStandards: resData.data.detectedStandards,
          summary: resData.data.summary,
          complianceAlerts: resData.data.complianceAlerts,
          isSimulated: resData.isSimulated,
        });
      } else {
        throw new Error(resData.error || "Analysis failed");
      }
    } catch {
      setAnalysisResult({
        detectedStandards: ["IS 456"],
        summary: "Analysis running in client-only mode. Successfully parsed document structure locally.",
        complianceAlerts: [
          "Connection issue: Ensure dev server is initialized and GEMINI_API_KEY is configured.",
          "Use pre-loaded sample documents for instant interactive simulations."
        ],
        isSimulated: true,
      });
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        executeAnalysis(file.name, base64, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        executeAnalysis(file.name, base64, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  // Primary featured standard for preview card (IS 456)
  const previewStandard = INDIAN_STANDARDS["is-456"] || Object.values(INDIAN_STANDARDS)[0];

  return (
    <div className="w-full relative overflow-hidden pb-12">
      {/* Background Soft Radial Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[42rem] h-[22rem] bg-gradient-to-b from-blue-100/50 via-indigo-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Hero Section Container */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-14 pb-4 flex flex-col items-center text-center">
        {/* Top Mirror Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold shadow-2xs mb-6 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8]"></span>
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
            BIS MANDATORY NATIONAL DATABASE MIRROR
          </span>
        </div>

        {/* Hero Title with stately Serif Font */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-[1.15] animate-fade-in-up">
          Know Your <span className="text-[#1d4ed8] font-serif font-black">Standards</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mb-8 font-normal leading-relaxed animate-fade-in-up">
          Find the right Indian Standard quickly and easily. High-precision discovery across civil, electrical, mechanical, and safety codes.
        </p>

        {/* Search Bar Container */}
        <div className="w-full max-w-2xl bg-white rounded-2xl p-1.5 sm:p-2 border border-slate-200 shadow-lg shadow-slate-100/80 transition-all focus-within:border-blue-500 focus-within:shadow-[0_0_0_4px_rgba(29,78,216,0.1)] animate-fade-in-up">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full">
            <div className="flex items-center gap-3 flex-1 w-full px-3 py-1.5">
              <Search className="text-[#1d4ed8] w-5 h-5 shrink-0" />
              <input
                ref={mainSearchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by IS number, standard name or keyword (e.g. IS 456, Concrete, Steel)"
                className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none min-w-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-slate-600 text-xs font-semibold px-1 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2 justify-center"
            >
              {/* Sliders/Search Icon */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              <span>Search Standards</span>
            </button>
          </form>
        </div>

        {/* Popular Benchmarks */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-slate-500 text-xs">
          <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mr-1">
            POPULAR BENCHMARKS :
          </span>
          {["IS 456", "IS 800", "IS 1893", "IS 13920"].map((code) => (
            <button
              key={code}
              onClick={() => {
                setSearchQuery(code);
                const matched = Object.values(INDIAN_STANDARDS).find(
                  (s) => s.code.toLowerCase().includes(code.toLowerCase())
                );
                if (matched) onSelectStandard(matched.id);
              }}
              className="px-3.5 py-1 rounded-full bg-white border border-slate-200 hover:border-blue-400 hover:text-[#1d4ed8] text-xs font-medium text-slate-600 shadow-2xs transition-colors cursor-pointer"
            >
              {code}
            </button>
          ))}
        </div>

        {/* OR Divider with Red Dot */}
        <div className="relative flex items-center justify-center w-full max-w-2xl my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-slate-200/80"></div>
          </div>
          <div className="relative z-10 px-3.5 py-0.5 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            <span>OR</span>
          </div>
        </div>

        {/* Drag & Drop File Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full max-w-2xl rounded-2xl bg-white border-2 border-dashed p-8 sm:p-9 flex flex-col items-center justify-center text-center cursor-pointer transition-all shadow-2xs ${
            isDragOver
              ? "border-[#1d4ed8] bg-blue-50/40"
              : "border-slate-300 hover:border-blue-400 hover:bg-slate-50/40"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
          />
          {/* Cloud Upload Icon in circle */}
          <div className="w-12 h-12 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#1d4ed8] mb-3.5 shadow-2xs">
            <Upload className="w-6 h-6 stroke-[1.8]" />
          </div>
          <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 mb-1">
            Upload PDF or Image
          </h2>
          <p className="text-xs text-slate-500 max-w-md mb-4 leading-relaxed font-normal">
            Drag & drop your engineering drawing, tender, or BoQ, or browse files to auto-extract referenced standards.
          </p>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">PDF</span>
            <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">JPG</span>
            <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">PNG</span>
            <span className="text-[10px] text-slate-400 font-medium ml-1">Max 40MB</span>
          </div>
        </div>

        {/* Preloaded Sample Files */}
        <div className="mt-4 w-full max-w-2xl text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            No files ready? Try a Preloaded Sample:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {sampleFiles.map((sample) => (
              <button
                key={sample.name}
                onClick={(e) => {
                  e.stopPropagation();
                  executeAnalysis(sample.name);
                }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedSampleName === sample.name
                    ? "bg-blue-50 border-blue-400 text-blue-700 shadow-xs"
                    : "bg-white border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-600"
                }`}
              >
                <sample.icon className="w-3.5 h-3.5 text-slate-400" />
                <span>{sample.name}</span>
                <span className="text-[9px] text-slate-400 font-normal">({sample.type})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {analysisLoading && (
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-slate-200 mt-6 p-8 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-10 h-10 text-[#1d4ed8] animate-spin mb-4" />
            <h3 className="text-slate-800 font-serif font-bold text-base mb-1">
              Cross-Referencing via Gemini AI
            </h3>
            <p className="text-xs text-[#1d4ed8] font-semibold animate-pulse tracking-wide max-w-md">
              {loadingSteps[loadingStep]}
            </p>
          </div>
        )}

        {/* Analysis Result */}
        {!analysisLoading && analysisResult && (
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-slate-200 mt-6 overflow-hidden text-left">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span className="text-xs font-bold uppercase tracking-wider">AI Standard Extraction Report</span>
              </div>
              {analysisResult.isSimulated && (
                <span className="bg-amber-400/20 text-amber-200 border border-amber-300/30 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Simulation Active
                </span>
              )}
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Document Summary</h4>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">{analysisResult.summary}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Detected Standards</h4>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.detectedStandards.map((code) => {
                    const matchedKey = Object.keys(INDIAN_STANDARDS).find(
                      (key) => INDIAN_STANDARDS[key].code.toLowerCase().includes(code.toLowerCase())
                    );
                    return (
                      <button
                        key={code}
                        onClick={() => matchedKey && onSelectStandard(matchedKey)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center gap-1 transition-all ${
                          matchedKey
                            ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 cursor-pointer"
                            : "bg-slate-50 text-slate-600 border border-slate-200 cursor-help"
                        }`}
                      >
                        <span>{code}</span>
                        {matchedKey && <ArrowRight className="w-3 h-3 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Compliance Alerts</h4>
                <div className="space-y-2">
                  {analysisResult.complianceAlerts.map((alert, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed text-justify">{alert}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Center Pill Button: Preview 90% Width Standards Results Output Card → */}
        <button
          onClick={() => onSelectStandard("is-456")}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:text-[#1d4ed8] text-xs font-semibold text-slate-700 my-7 cursor-pointer transition-all"
        >
          <span>Preview 90% Width Standards Results Output Card</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#1d4ed8]" />
        </button>
      </div>

      {/* Standards Results Cards Section (Matching Image 1 bottom output card) */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* If user is filtering or searching, show results list or featured preview */}
        {searchQuery ? (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Search Results ({filteredStandards.length})
            </h3>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              {filteredStandards.length} Standards Found
            </span>
          </div>
        ) : null}

        <div className="space-y-6">
          {(searchQuery ? filteredStandards : [previewStandard]).map((std) => {
            const isSaved = savedIds.includes(std.id);
            return (
              <div
                key={std.id}
                className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-100 overflow-hidden relative transition-all hover:shadow-2xl hover:border-slate-300"
              >
                {/* Top Blue Accent Bar */}
                <div className="h-1.5 w-full bg-[#1d4ed8]"></div>

                <div className="p-6 sm:p-8">
                  {/* Top Header Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      {/* Drafting Compass Icon in light blue rounded square */}
                      <div className="w-12 h-12 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center shrink-0 shadow-2xs">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="5" r="2" />
                          <path d="m3 21 8.02-14.26" />
                          <path d="m21 21-8.02-14.26" />
                          <path d="M6 16h12" />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h2
                            onClick={() => onSelectStandard(std.id)}
                            className="font-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-tight cursor-pointer hover:text-[#1d4ed8] transition-colors"
                          >
                            {std.code}
                          </h2>
                          {std.isQcoApplicable && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] text-[10px] font-bold uppercase tracking-wider">
                              MANDATORY BIS CODE
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                            ICS {std.category.split(" ")[1] || "91.100.30"}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-normal text-slate-600 mt-1 truncate">
                          {std.title}
                        </p>
                      </div>
                    </div>

                    {/* Top Action Buttons */}
                    <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
                      <button
                        onClick={() => onSaveStandard(std.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border cursor-pointer shadow-2xs ${
                          isSaved
                            ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-amber-500" : ""}`} />
                        <span>{isSaved ? "Saved" : "Save Reference"}</span>
                      </button>

                      <button
                        onClick={() => onSelectStandard(std.id)}
                        className="px-4 py-2 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>FULL PDF TEXT</span>
                      </button>
                    </div>
                  </div>

                  {/* 4 Metadata Columns Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                    {/* Card 1: Technical Committee */}
                    <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                        TECHNICAL COMMITTEE
                      </span>
                      <p className="text-xs font-bold text-slate-800 mt-1">
                        {std.dossier.techComm} ({std.dossier.techCommTitle})
                      </p>
                    </div>

                    {/* Card 2: Active Amendments */}
                    <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                        ACTIVE AMENDMENTS
                      </span>
                      <p className="text-xs font-bold text-slate-800 mt-1">
                        Amendment No. 1 to {std.activeAmendments.length}
                      </p>
                      <span className="text-[10px] text-slate-400 block">Incorporated</span>
                    </div>

                    {/* Card 3: Reaffirmation Status */}
                    <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                        REAFFIRMATION STATUS
                      </span>
                      <p className="text-xs font-bold text-[#1d4ed8] flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1d4ed8]" />
                        <span>{std.reaffirmation.split("(")[0].trim()}</span>
                      </p>
                    </div>

                    {/* Card 4: Gazette Linkage */}
                    <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                        GAZETTE LINKAGE
                      </span>
                      <p className="text-xs font-bold text-rose-600 flex items-center gap-1 mt-1">
                        <Gavel className="w-3.5 h-3.5 text-rose-600" />
                        <span>{std.gazetteStatus}</span>
                      </p>
                    </div>
                  </div>

                  {/* Scope Note Bottom Strip */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-[#1d4ed8] shrink-0" />
                      <span className="text-[11px] text-slate-600 leading-normal">
                        Applies to all concrete structures spanning commercial, residential, infrastructure, and heavy industrial domains across India.
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 shrink-0 font-medium">
                      <span>Pages: {std.dossier.volume.split(" ")[0]}</span>
                      <span className="hidden sm:inline">Language: English / Hindi</span>
                      <span>BIS ID: 0002456-01</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* If no search is active, show the remaining catalog standards below */}
        {!searchQuery && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Additional National Benchmark Standards
              </h3>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                3 More Standards Mirrored
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(INDIAN_STANDARDS)
                .filter((s) => s.id !== "is-456")
                .map((std) => (
                  <div
                    key={std.id}
                    onClick={() => onSelectStandard(std.id)}
                    className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#1d4ed8] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-serif font-bold text-base text-slate-900 group-hover:text-[#1d4ed8] transition-colors">
                          {std.code}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                          {std.category.split(" ")[1]}
                        </span>
                      </div>
                      <h4 className="text-xs font-medium text-slate-600 line-clamp-2 mb-3">
                        {std.title}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{std.dossier.volume}</span>
                      <span className="text-[#1d4ed8] font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Inspect <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
