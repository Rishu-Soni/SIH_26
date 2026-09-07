import { useState, useMemo } from "react";
import {
  ArrowLeft, Bookmark, Share2, Printer, Maximize2, GitMerge,
  ArrowUpRight, RefreshCw, FileCheck2, Fingerprint, Gavel, ShieldCheck,
  BookOpen, AlertTriangle, Building2, Check, Download, ExternalLink, Search,
  Lock, Settings, X, ChevronRight, Compass, Tag, ChevronDown, PlusCircle,
  CircleCheckBig, Info
} from "lucide-react";
import { INDIAN_STANDARDS } from "../data/standards";

export default function StandardDetail({
  standard,
  onBack,
  onSave,
  isSaved,
  onOpenCalculator
}) {
  const [activeInterlinkedCode, setActiveInterlinkedCode] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [showLicenseeDirectory, setShowLicenseeDirectory] = useState(false);
  const [licenseeSearchQuery, setLicenseeSearchQuery] = useState("");
  const [licenseeFilterState, setLicenseeFilterState] = useState("all");
  const [expandedWhyRef, setExpandedWhyRef] = useState(null);
  const [addedToTender, setAddedToTender] = useState(false);

  const isCodeOfPractice = standard.standardType === "code_of_practice";
  const isProduct = standard.standardType === "product";
  const pageCount = standard.dossier.volume;

  const mockLicensees = useMemo(() => [
    { id: "L001", name: "UltraTech Concrete Ltd (RMC)", plant: "Mumbai Central Batching Plant", state: "Maharashtra", license: "CM/L-1904322", status: "compliant" },
    { id: "L002", name: "L&T Ready Mix Concrete", plant: "Whitefield Cluster Block B", state: "Karnataka", license: "CM/L-8120392", status: "compliant" },
    { id: "L003", name: "Ambuja Cement Batching Hub", plant: "Okhla Industrial Phase III", state: "Delhi", license: "CM/L-4581902", status: "compliant" },
    { id: "L004", name: "ACC Concrete Corporation", plant: "Guindy Heavy Batching Yard", state: "Tamil Nadu", license: "CM/L-7241093", status: "compliant" },
    { id: "L005", name: "Tata BlueScope Steel Ltd", plant: "Jamshedpur Section Core", state: "Jharkhand", license: "CM/L-9021832", status: "compliant" },
    { id: "L006", name: "Penna Batching Concrete", plant: "Gachibowli Hub Yard", state: "Telangana", license: "CM/L-5612803", status: "pending" },
    { id: "L007", name: "JSW Steel Structural Core", plant: "Bellary Core Section A", state: "Karnataka", license: "CM/L-3419082", status: "compliant" },
    { id: "L008", name: "Nuvoco Vistas Batching Core", plant: "Howrah Mixing Yard II", state: "West Bengal", license: "CM/L-1120932", status: "pending" }
  ], []);

  const filteredLicensees = mockLicensees.filter((l) => {
    const q = licenseeSearchQuery.toLowerCase().trim();
    const matchSearch = l.name.toLowerCase().includes(q) || l.plant.toLowerCase().includes(q) || l.license.toLowerCase().includes(q);
    const matchState = licenseeFilterState === "all" || l.state.toLowerCase() === licenseeFilterState.toLowerCase();
    return matchSearch && matchState;
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `${standard.code} | Know Your Standards`, text: standard.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert(`Standard specification link copied to clipboard:\n${window.location.href}`);
    }
  };

  // Compute statutory compliance text based on standard type
  const statutoryComplianceText = isCodeOfPractice
    ? `Pursuant to Ministry of Commerce & Industry Quality Control Orders, all structural design projects must substantiate adherence to ${standard.code} via mill test certificates and third-party material verification. Failure constitutes non-compliance under the BIS Act, 2016.`
    : `Pursuant to Ministry of Commerce & Industry Quality Control Orders, all structural concrete construction projects must substantiate adherence to ${standard.code} via certified cube testing and third-party laboratory verification. Failure constitutes non-compliance under the BIS Act, 2016.`;

  // Validity badge styles
  const getValidityBadge = (validity) => {
    switch (validity) {
      case "Current":
        return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: "●" };
      case "Withdrawn":
        return { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200", icon: "●" };
      case "Under Revision":
        return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: "●" };
      default:
        return { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200", icon: "●" };
    }
  };

  return (
    <div className="w-full pb-16">
      {/* Query Breadcrumb Bar — Exactly Matching Image 2 */}
      <div className="w-full bg-white border-b border-slate-200/90 py-2.5 px-4 sm:px-6 lg:px-8 mb-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-slate-500 font-bold">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>QUERY:</span>
            </div>

            {/* Selected standard pill */}
            <div className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium flex items-center gap-1 shadow-2xs">
              <span className="text-[#1d4ed8] font-bold">{standard.code}</span>
              <span className="text-slate-400">— {standard.title.split("—")[0].trim()}</span>
            </div>

            {/* Matched Exactly Pill */}
            <div className="px-2.5 py-1 rounded-full bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] font-semibold text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8]"></span>
              <span>1 Result Matched Exactly</span>
            </div>

            {/* Filter Pill */}
            <div className="hidden sm:inline-flex px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 font-medium border border-slate-200 text-xs">
              Filter: Civil Engg ({standard.dossier.techComm})
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Gazette Mirror v4.19</span>
            </span>
            <button
              onClick={onBack}
              className="text-[#1d4ed8] hover:underline cursor-pointer font-semibold flex items-center gap-1"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
              <span>Refine Parameters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Card Container — Golden Ratio Proportions */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100/90 overflow-hidden">
          {/* Top Golden Ratio Accent Line */}
          <div className="h-1.5 w-full flex">
            <div className="w-[61.8%] h-full bg-[#1d4ed8]"></div>
            <div className="w-[38.2%] h-full bg-[#0a192f]"></div>
          </div>

          {/* Card Top Header Strip */}
          <div className="px-6 lg:px-8 py-4 bg-white border-b border-slate-100 flex flex-col gap-3">
            {/* Badges Row 1 */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <button
                  onClick={onBack}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer mr-1"
                  title="Back to standards search"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {/* Blue Code Badge */}
                <div className="flex items-center gap-1.5 bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] px-3 py-1.5 rounded-lg font-bold text-xs shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1d4ed8]" />
                  <span>{standard.code}</span>
                </div>

                {/* Match Score Badge */}
                {standard.matchScore && (
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold shadow-2xs">
                    <span className="text-emerald-700">{standard.matchScore}% Match</span>
                    <div className="w-14 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full match-score-fill"
                        style={{ width: `${standard.matchScore}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Reaffirmation Gray Badge */}
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 text-xs font-medium shadow-2xs">
                  <RefreshCw className="w-3 h-3 text-slate-400" />
                  <span className="uppercase tracking-wider text-[10px]">
                    {standard.reaffirmation.toUpperCase()}
                  </span>
                </div>

                {/* QCO Mandatory Rose Badge — only for product standards */}
                {standard.isQcoApplicable && (
                  <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-600 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-2xs">
                    <Gavel className="w-3.5 h-3.5 text-rose-600" />
                    <span>MANDATORY QUALITY CONTROL ORDER (QCO) APPLICABLE</span>
                  </div>
                )}

                {/* Regulatory Status — for code_of_practice standards (replaces QCO) */}
                {isCodeOfPractice && !standard.isQcoApplicable && standard.regulatoryStatus && (
                  <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>{standard.regulatoryStatus}</span>
                  </div>
                )}
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  onClick={onSave}
                  className={`p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ${
                    isSaved ? "text-amber-500" : "hover:text-[#1d4ed8]"
                  }`}
                  title={isSaved ? "Standard saved" : "Save standard reference"}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? "fill-amber-500" : ""}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg hover:bg-slate-100 hover:text-[#1d4ed8] transition-colors cursor-pointer"
                  title="Share specification"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-lg hover:bg-slate-100 hover:text-[#1d4ed8] transition-colors cursor-pointer"
                  title="Print dossier summary"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowPdfViewer(true)}
                  className="p-2 rounded-lg hover:bg-slate-100 hover:text-[#1d4ed8] transition-colors cursor-pointer"
                  title="Open full view"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Badges Row 2 */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 text-slate-600 text-xs bg-white border border-slate-200 px-3 py-1 rounded-lg font-medium shadow-2xs">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span>ICS {standard.category}</span>
              </div>
            </div>
          </div>

          {/* Golden Ratio 2-Column Split */}
          <div className="flex flex-col lg:flex-row w-full">
            {/* LEFT COLUMN: Technical Core (61.8%) */}
            <div className="w-full lg:w-[61.8%] p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200/80 bg-white flex flex-col justify-between">
              <div>
                {/* Standard Title & Framework Ref */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1d4ed8] block mb-1">
                    {standard.subtitle}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-2.5">
                    {standard.title}
                  </h1>
                  <div className="text-xs text-slate-500 flex items-center gap-2 leading-relaxed">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1d4ed8] shrink-0"></span>
                    <span>{standard.description}</span>
                  </div>
                </div>

                {/* Executive Summary & Scope Box — reads from data */}
                <div className="bg-[#eff6ff]/40 border border-[#bfdbfe]/80 rounded-xl p-5 relative pl-6 mb-7 shadow-2xs">
                  {/* Vertical Blue Left Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1d4ed8] rounded-l-xl"></div>
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="w-4 h-4 text-[#1d4ed8]" />
                    <h2 className="font-serif font-bold text-sm text-slate-900">
                      Executive Summary & Scope
                    </h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    {standard.executiveSummary}
                  </p>
                </div>

                {/* Mandatory Interlinked Indian Standards */}
                <div className="mb-7">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-slate-800 flex items-center gap-1.5">
                      <GitMerge className="w-3.5 h-3.5 text-[#1d4ed8]" />
                      <span>MANDATORY INTERLINKED INDIAN STANDARDS</span>
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {standard.interlinkedStandards.length} Core References
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {standard.interlinkedStandards.map((dep) => {
                      const vBadge = dep.validity ? getValidityBadge(dep.validity) : null;
                      return (
                        <div key={dep.code} className="flex flex-col">
                          <div
                            onClick={() => setActiveInterlinkedCode(activeInterlinkedCode === dep.code ? null : dep.code)}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${
                              activeInterlinkedCode === dep.code
                                ? "bg-[#eff6ff] border-blue-400 shadow-xs"
                                : "bg-slate-50/70 border-slate-200/80 hover:border-blue-300 hover:bg-white"
                            }`}
                          >
                            <div className="w-12 h-11 rounded-lg bg-[#eff6ff] text-[#1d4ed8] font-bold text-xs flex flex-col items-center justify-center shrink-0 border border-[#bfdbfe]/50 group-hover:bg-[#1d4ed8] group-hover:text-white transition-colors">
                              <span>{dep.code.split(" ")[0]}</span>
                              <span className="text-[9px] -mt-0.5">{dep.code.split(" ")[1]}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                                <p className="text-xs font-bold text-slate-900 truncate group-hover:text-[#1d4ed8] transition-colors">
                                  {dep.title}
                                </p>
                              </div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <p className="text-[10px] text-slate-500 font-normal truncate">
                                  {dep.description}
                                </p>
                                {/* Relationship label */}
                                {dep.relationship && (
                                  <span className="inline-flex px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 text-[9px] font-semibold whitespace-nowrap">
                                    {dep.relationship}
                                  </span>
                                )}
                                {/* Validity badge */}
                                {vBadge && (
                                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${vBadge.bg} ${vBadge.text} ${vBadge.border} border text-[9px] font-semibold whitespace-nowrap`}>
                                    <span className="text-[6px]">{vBadge.icon}</span>
                                    {dep.validity}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* "Why this reference?" expandable row */}
                          {dep.whyReferenced && (
                            <div className="mt-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedWhyRef(expandedWhyRef === dep.code ? null : dep.code);
                                }}
                                className="w-full flex items-center gap-1.5 px-3 py-1.5 text-[10px] text-slate-500 hover:text-[#1d4ed8] font-medium transition-colors cursor-pointer rounded-lg hover:bg-slate-50"
                              >
                                <ChevronDown className={`w-3 h-3 transition-transform ${expandedWhyRef === dep.code ? "rotate-180" : ""}`} />
                                <span>Why this reference?</span>
                              </button>
                              {expandedWhyRef === dep.code && (
                                <div className="px-3 pb-2 animate-expand-down">
                                  <p className="text-[10.5px] text-slate-600 leading-relaxed bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                                    {dep.whyReferenced}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {activeInterlinkedCode && (
                    <div className="mt-3 p-3.5 rounded-xl bg-blue-50/50 border border-blue-200 text-xs text-slate-600 leading-relaxed text-justify animate-fade-in-up">
                      <strong className="text-[#1d4ed8]">Regulatory Cross-Check Note on {activeInterlinkedCode}:</strong> Under the NBC national structural framework, verification against {activeInterlinkedCode} is a non-negotiable prerequisite. Independent testing certificates must accompany design approval alongside {standard.code}.
                    </div>
                  )}
                </div>

                {/* High-Frequency Field Clauses & Critical Tables */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-slate-800 block">
                      HIGH-FREQUENCY FIELD CLAUSES & CRITICAL TABLES
                    </span>
                    {/* Clause accent color legend */}
                    <div className="flex items-center gap-3 text-[9px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#1d4ed8]"></span>
                        Standard clause
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span>
                        Safety-critical
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {standard.clauses.map((cl) => {
                      const isCritical = cl.isDurability || cl.isSafetyCritical;
                      return (
                        <div
                          key={cl.clause}
                          onClick={onOpenCalculator}
                          className={`flex items-center justify-between p-3.5 rounded-xl bg-slate-50/60 hover:bg-white transition-all border border-slate-200 border-l-4 group cursor-pointer shadow-2xs ${
                            isCritical ? "border-l-rose-500" : "border-l-[#1d4ed8]"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span
                              className={`font-mono font-bold text-xs px-2.5 py-1 rounded ${
                                isCritical
                                  ? "bg-rose-50 text-rose-600 border border-rose-200"
                                  : "bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]"
                              }`}
                            >
                              {cl.clause}
                            </span>
                            <div>
                              <span className="text-xs font-bold text-slate-900 group-hover:text-[#1d4ed8] transition-colors block">
                                {cl.title}
                              </span>
                              <span className="text-slate-500 text-[11px] block mt-0.5 font-normal">
                                {cl.description}
                              </span>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#1d4ed8] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Active Amendments Strip — reads from data, uniform pill styling */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center flex-wrap gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-[#1d4ed8]" />
                  <span className="text-xs font-bold text-slate-800 mr-1">Active Amendments:</span>
                  {standard.activeAmendments.map((am) => (
                    <span
                      key={am}
                      className="px-2.5 py-0.5 bg-white border border-slate-200 rounded text-xs text-slate-600 font-mono shadow-2xs"
                      title={am}
                    >
                      {am}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setShowPdfViewer(true)}
                  className="text-xs text-[#1d4ed8] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>View Amendment Slips (PDF)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Regulatory Dossier (38.2%) */}
            <div className="w-full lg:w-[38.2%] bg-[#fafbfc] p-6 lg:p-7 flex flex-col justify-between space-y-5">
              <div>
                {/* Dossier Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1d4ed8] flex items-center gap-1.5">
                    <Settings className="w-3.5 h-3.5" />
                    <span>REGULATORY DOSSIER</span>
                  </span>
                  <span className="bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] text-[9.5px] px-2.5 py-0.5 rounded font-mono font-bold">
                    BIS CENTRAL REGISTER
                  </span>
                </div>

                {/* 2x2 Dossier Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-slate-400 text-[9px] block uppercase font-bold tracking-wider">
                      Technical Comm.
                    </span>
                    <span className="font-serif text-slate-900 text-sm font-bold block mt-0.5">
                      {standard.dossier.techComm}
                    </span>
                    <span className="text-slate-400 text-[10px] truncate block mt-0.5">
                      {standard.dossier.techCommTitle}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-slate-400 text-[9px] block uppercase font-bold tracking-wider">
                      Document Volume
                    </span>
                    <span className="font-serif text-slate-900 text-sm font-bold block mt-0.5">
                      {pageCount}
                    </span>
                    <span className="text-slate-400 text-[10px] block mt-0.5">
                      Comprehensive Spec
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-slate-400 text-[9px] block uppercase font-bold tracking-wider">
                      Gazette Ref
                    </span>
                    <span className="font-serif text-slate-900 text-sm font-bold block mt-0.5">
                      {standard.dossier.gazetteRef}
                    </span>
                    <span className="text-slate-400 text-[10px] block mt-0.5">
                      Central Govt Mirror
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-slate-400 text-[9px] block uppercase font-bold tracking-wider">
                      Watermarked Hash
                    </span>
                    <span className="font-mono text-[#1d4ed8] text-xs font-bold block mt-0.5">
                      {standard.dossier.hash}
                    </span>
                    <span className="text-slate-400 text-[10px] block mt-0.5">
                      Digitally Certified
                    </span>
                  </div>
                </div>

                {/* Statutory Compliance Mandate Box */}
                <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl mb-5 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                        STATUTORY COMPLIANCE MANDATE
                      </h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 text-justify">
                        {statutoryComplianceText}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Active RMC / Batching Licenses Box — ONLY for product standards */}
                {standard.isQcoApplicable && standard.rmcLicenses && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 mb-5 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {standard.rmcLicenses.title}
                      </span>
                      <span className="text-[#1d4ed8] font-bold text-xs">
                        {standard.rmcLicenses.value}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-[#1d4ed8] h-full" style={{ width: `${standard.rmcLicenses.compliantPct}%` }}></div>
                      <div className="bg-rose-500 h-full" style={{ width: `${standard.rmcLicenses.pendingPct}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between text-[10.5px] text-slate-600 mt-2.5 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#1d4ed8]"></span>
                        {standard.rmcLicenses.compliantPct}% Fully Compliant
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        {standard.rmcLicenses.pendingPct}% Renewal Pending
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons Stack */}
              <div className="space-y-2.5 pt-2">
                {/* Accept / Add to Tender — Primary action */}
                <button
                  onClick={() => setAddedToTender(!addedToTender)}
                  className={`w-full py-3 px-4 text-xs rounded-xl font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    addedToTender
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-[#0a192f] hover:bg-[#06101e] text-white"
                  }`}
                >
                  {addedToTender ? (
                    <>
                      <CircleCheckBig className="w-4 h-4" />
                      <span>Added to Tender Specification</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Accept & Add to Tender</span>
                    </>
                  )}
                </button>

                {/* View Official Watermarked PDF (Solid Blue — primary reference action) */}
                <button
                  onClick={() => setShowPdfViewer(true)}
                  className="w-full py-3 px-4 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs rounded-xl font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View Official Watermarked PDF ({pageCount})</span>
                </button>

                {/* Inspect Interactive Clauses (Secondary outline) */}
                <button
                  onClick={onOpenCalculator}
                  className="w-full py-3 px-4 bg-white hover:bg-[#eff6ff] border border-slate-200 text-slate-700 hover:text-[#1d4ed8] hover:border-[#1d4ed8] text-xs rounded-xl font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Inspect Interactive Clauses & Design Tables</span>
                </button>

                {/* Verify BIS ISI Mark — only for product standards */}
                {standard.isQcoApplicable && (
                  <button
                    onClick={() => setShowLicenseeDirectory(true)}
                    className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Verify BIS ISI Mark & Approved Licensees</span>
                  </button>
                )}

                {/* Download Companion Handbook (Text link style — demoted) */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const doc = standard.companionDoc || { label: "Download Companion Handbook", size: "N/A" };
                    alert(`Downloading ${doc.label} (${doc.size} official mirror)...`);
                  }}
                  className="w-full py-2 px-4 text-slate-500 hover:text-[#1d4ed8] text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{standard.companionDoc ? standard.companionDoc.label : "Download Companion Handbook"}</span>
                </a>

                {/* Sync Note */}
                <div className="pt-2 text-center">
                  <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                    <Lock className="w-3 h-3 text-[#1d4ed8]" />
                    <span>Verified against National Standards Repository. Last Synced Today at 04:00 UTC</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPdfViewer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="font-bold text-sm">{standard.code} — Official Watermarked Specification</h3>
                  <span className="text-[10px] text-slate-400">National Building Code of India Reference Copy (Mirror v4.19)</span>
                </div>
              </div>
              <button
                onClick={() => setShowPdfViewer(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Reader Simulation */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50 space-y-6">
              {/* Cover Page Representation */}
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#1d4ed8] mx-auto flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Indian Standard</span>
                  <h2 className="font-serif text-2xl font-black text-slate-900">{standard.code}</h2>
                  <p className="text-sm font-semibold text-slate-700">{standard.title}</p>
                </div>
                <div className="py-2 border-y border-slate-100 text-xs text-slate-500 flex justify-center gap-6">
                  <span>{standard.reaffirmation}</span>
                  <span>ICS {standard.category.split(" ")[1]}</span>
                  <span>{pageCount}</span>
                </div>
                <p className="text-xs text-slate-600 text-justify leading-relaxed bg-slate-50 p-4 rounded-lg">
                  {standard.executiveSummary}
                </p>
              </div>

              {/* Clause Previews */}
              <div className="max-w-2xl mx-auto space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Key Clauses Excerpt</h4>
                {standard.clauses.map((cl) => (
                  <div key={cl.clause} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-xs text-[#1d4ed8]">{cl.clause}</span>
                      <span className="text-xs font-bold text-slate-900">{cl.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{cl.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-400">Digital Certification: {standard.dossier.hash}</span>
              <button
                onClick={() => {
                  alert(`Preparing complete ${pageCount} watermarked PDF package for download...`);
                  setShowPdfViewer(false);
                }}
                className="px-4 py-2 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Watermarked PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Licensee Directory Modal — only accessible for product standards */}
      {showLicenseeDirectory && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 bg-[#0a192f] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="font-bold text-sm">BIS Approved Licensees & Product Registry</h3>
                  <span className="text-[10px] text-slate-400">{standard.code} Statutory Compliance Directory</span>
                </div>
              </div>
              <button
                onClick={() => setShowLicenseeDirectory(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={licenseeSearchQuery}
                  onChange={(e) => setLicenseeSearchQuery(e.target.value)}
                  placeholder="Filter by manufacturer, plant location or license number..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={licenseeFilterState}
                onChange={(e) => setLicenseeFilterState(e.target.value)}
                className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none"
              >
                <option value="all">All States</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Delhi">Delhi</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>

            {/* Licensees Table */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2.5">
                {filteredLicensees.length > 0 ? (
                  filteredLicensees.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs text-slate-900">{item.name}</h5>
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {item.license}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {item.plant} — <span className="font-medium text-slate-700">{item.state}</span>
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        {item.status === "compliant" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1d4ed8] border border-blue-200 text-[10px] font-semibold">
                            <Check className="w-3 h-3" /> Valid License
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-semibold">
                            <AlertTriangle className="w-3 h-3" /> Renewal Pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-xs text-slate-400">No licensees match current criteria.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
