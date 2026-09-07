import { useState, useMemo } from "react";
import { Check, AlertTriangle, Calculator, FileText } from "lucide-react";

export default function DesignCalculator({ onClose }) {
  const [activeTab, setActiveTab] = useState("durability");

  const [exposure, setExposure] = useState("moderate");
  const [elementType, setElementType] = useState("beam");
  const [userCover, setUserCover] = useState(30);

  const [barDia, setBarDia] = useState(16);
  const [steelGrade, setSteelGrade] = useState(500);
  const [concreteGrade, setConcreteGrade] = useState(25);
  const [barType, setBarType] = useState("deformed");

  const durabilityData = useMemo(() => {
    const data = {
      mild: { minCover: 20, minGrade: "M20", maxWc: 0.55, minCement: 300 },
      moderate: { minCover: 30, minGrade: "M25", maxWc: 0.50, minCement: 300 },
      severe: { minCover: 45, minGrade: "M30", maxWc: 0.45, minCement: 320 },
      very_severe: { minCover: 50, minGrade: "M35", maxWc: 0.45, minCement: 340 },
      extreme: { minCover: 75, minGrade: "M40", maxWc: 0.40, minCement: 360 },
    };
    return data[exposure];
  }, [exposure]);

  const adjustedMinCover = useMemo(() => {
    let base = durabilityData.minCover;
    if (elementType === "slab") return Math.max(15, base - 5);
    return base;
  }, [elementType, durabilityData]);

  const isCoverCompliant = userCover >= adjustedMinCover;

  const baseBondStress = useMemo(() => {
    const stress = { 20: 1.2, 25: 1.4, 30: 1.5, 35: 1.7, 40: 1.9 };
    return stress[concreteGrade] || 1.4;
  }, [concreteGrade]);

  const designBondStress = useMemo(() => {
    let val = baseBondStress;
    if (barType === "deformed") val *= 1.6;
    return parseFloat(val.toFixed(2));
  }, [baseBondStress, barType]);

  const developmentLength = useMemo(() => {
    const sigma_s = 0.87 * steelGrade;
    return Math.ceil((barDia * sigma_s) / (4 * designBondStress));
  }, [barDia, steelGrade, designBondStress]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center"><Calculator className="w-5 h-5" /></div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 font-headline">IS 456 Interactive Design Tables</h2>
              <p className="text-xs text-slate-500">Live computations verified against BIS criteria</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex bg-slate-100 p-1 m-4 rounded-xl">
          <button onClick={() => setActiveTab("durability")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "durability" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
            Concrete Cover & Durability (Table 16)
          </button>
          <button onClick={() => setActiveTab("rebar")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "rebar" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
            Tension Development Length (Cl. 26.2.1)
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === "durability" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Environmental Exposure (Cl. 8.2.2.1)</label>
                  <select value={exposure} onChange={(e) => setExposure(e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500">
                    <option value="mild">Mild (Standard conditions)</option>
                    <option value="moderate">Moderate (Sheltered from rain)</option>
                    <option value="severe">Severe (Marine coastal)</option>
                    <option value="very_severe">Very Severe (Sea water spray)</option>
                    <option value="extreme">Extreme (Tidal zones)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Structural Element Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["slab", "beam", "column", "foundation"].map((type) => (
                      <button key={type} onClick={() => setElementType(type)} className={`py-1.5 px-3 border text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${elementType === type ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-xs" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{type}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Designed Nominal Cover (mm)</label>
                  <span className="text-[10px] text-slate-400 block mb-2">User-defined dimension</span>
                  <input type="number" value={userCover} onChange={(e) => setUserCover(Math.max(0, parseInt(e.target.value) || 0))} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Durability Requirements</span>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200/60"><span className="text-xs text-slate-600 font-medium">Nominal Cover Target</span><span className="text-sm font-bold text-slate-800">{durabilityData.minCover} mm</span></div>
                    {elementType === "slab" && <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 text-emerald-600"><span className="text-xs font-medium">Cl. 26.4.2.1.1 reduction</span><span className="text-xs font-bold">-5 mm applied</span></div>}
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200/60"><span className="text-xs text-slate-600 font-medium">Min Concrete Grade</span><span className="text-sm font-bold text-slate-800">{durabilityData.minGrade}</span></div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200/60"><span className="text-xs text-slate-600 font-medium">Max Free W/C Ratio</span><span className="text-sm font-bold text-slate-800">{durabilityData.maxWc}</span></div>
                    <div className="flex justify-between items-center"><span className="text-xs text-slate-600 font-medium">Min Cement Content</span><span className="text-sm font-bold text-slate-800">{durabilityData.minCement} kg/m³</span></div>
                  </div>
                </div>
                <div className={`mt-6 p-3 rounded-lg flex items-start gap-3 border ${isCoverCompliant ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
                  {isCoverCompliant ? (
                    <><Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /><div><h4 className="text-xs font-bold uppercase tracking-wider">Cover is Compliant</h4><p className="text-[11px] leading-relaxed mt-0.5">Your nominal cover of {userCover}mm meets the minimum {adjustedMinCover}mm requirement.</p></div></>
                  ) : (
                    <><AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><div><h4 className="text-xs font-bold uppercase tracking-wider text-amber-700">Cover Non-Compliant</h4><p className="text-[11px] leading-relaxed mt-0.5 text-amber-700">IS 456 Table 16 requires at least {adjustedMinCover}mm for {exposure} exposure.</p></div></>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Main Bar Diameter (mm)</label>
                  <select value={barDia} onChange={(e) => setBarDia(parseInt(e.target.value))} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500">
                    {[8, 10, 12, 16, 20, 25, 32].map((dia) => (<option key={dia} value={dia}>{dia} mm</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Steel Grade</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[415, 500, 550].map((g) => (
                      <button key={g} onClick={() => setSteelGrade(g)} className={`py-1.5 border text-xs font-bold rounded-lg transition-all cursor-pointer ${steelGrade === g ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-xs" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Fe {g}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Concrete Grade (f_ck in MPa)</label>
                  <select value={concreteGrade} onChange={(e) => setConcreteGrade(parseInt(e.target.value))} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500">
                    <option value={20}>M20</option><option value={25}>M25</option><option value={30}>M30</option><option value={35}>M35</option><option value={40}>M40</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Bar Rib Pattern</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setBarType("deformed")} className={`py-1.5 px-3 border text-xs font-semibold rounded-lg transition-all cursor-pointer ${barType === "deformed" ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-xs" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Deformed / TMT (+60%)</button>
                    <button onClick={() => setBarType("plain")} className={`py-1.5 px-3 border text-xs font-semibold rounded-lg transition-all cursor-pointer ${barType === "plain" ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-xs" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Plain Mild Steel</button>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Anchorage Computations</span>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200/60"><span className="text-xs text-slate-600 font-medium">Concrete f_ck</span><span className="text-sm font-semibold text-slate-800">{concreteGrade} MPa</span></div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200/60"><span className="text-xs text-slate-600 font-medium">Rebar f_y</span><span className="text-sm font-semibold text-slate-800">{steelGrade} MPa</span></div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200/60"><span className="text-xs text-slate-600 font-medium">Design Bond Stress τ_bd</span><span className="text-sm font-bold text-indigo-600">{designBondStress} MPa</span></div>
                    <div className="flex justify-between items-center pt-2"><span className="text-xs text-slate-700 font-bold">L_d Formula</span><span className="text-xs font-mono font-semibold text-slate-500">L_d = (0.87·fy·d)/(4·τ_bd)</span></div>
                  </div>
                </div>
                <div className="mt-6 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-4 rounded-xl shadow-xs">
                  <span className="text-[10px] text-indigo-100 uppercase font-bold tracking-wider block">Calculated Development Length L_d</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold tracking-tight">{developmentLength}</span>
                    <span className="text-sm font-bold text-indigo-100">mm</span>
                  </div>
                  <p className="text-[11px] leading-relaxed mt-2 text-indigo-100/95">
                    Approximately <strong className="font-bold">{(developmentLength / barDia).toFixed(1)}×</strong> the bar diameter.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold">Gazette Mirror v4.19</span>
          </div>
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold shadow-xs transition-all cursor-pointer">Acknowledge & Close</button>
        </div>
      </div>
    </div>
  );
}
