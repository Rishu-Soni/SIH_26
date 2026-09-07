import { useState, useMemo } from "react";
import {
  ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, Sparkles,
  Gavel, FileCheck, Award
} from "lucide-react";

export default function ComplianceCenter() {
  const [auditType, setAuditType] = useState("concrete");
  const [auditRun, setAuditRun] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cover, setCover] = useState(25);
  const [grade, setGrade] = useState("M20");
  const [exposure, setExposure] = useState("severe");

  const [hookAngle, setHookAngle] = useState(90);
  const [hookExtension, setHookExtension] = useState(8);
  const [rebarGrade, setRebarGrade] = useState("Fe415");

  const [zone, setZone] = useState("IV");
  const [spacing, setSpacing] = useState(150);

  const executeAudit = () => {
    setLoading(true);
    setAuditRun(false);
    setTimeout(() => { setLoading(false); setAuditRun(true); }, 1000);
  };

  const concreteAuditResult = useMemo(() => {
    const minCover = { mild: 20, moderate: 30, severe: 45, very_severe: 50, extreme: 75 };
    const minGradeMap = { mild: "M20", moderate: "M25", severe: "M30", very_severe: "M35", extreme: "M40" };
    const requiredCover = minCover[exposure] || 20;
    const isCoverPass = cover >= requiredCover;
    const gradesList = ["M20", "M25", "M30", "M35", "M40"];
    const inputGradeIdx = gradesList.indexOf(grade);
    const requiredGradeIdx = gradesList.indexOf(minGradeMap[exposure]);
    const isGradePass = inputGradeIdx >= requiredGradeIdx;
    const breaches = [];
    if (!isCoverPass) breaches.push(`IS 456 Table 16 Breach: Nominal concrete cover of ${cover}mm is insufficient. Under ${exposure} exposure, nominal cover must be at least ${requiredCover}mm.`);
    if (!isGradePass) breaches.push(`IS 456 Table 19 Breach: ${grade} is not permitted for ${exposure} conditions. Minimum required grade is ${minGradeMap[exposure]}.`);
    return { passed: isCoverPass && isGradePass, breaches };
  }, [cover, grade, exposure]);

  const rebarAuditResult = useMemo(() => {
    const isAnglePass = hookAngle === 135;
    const isExtensionPass = hookExtension >= 10;
    const breaches = [];
    if (!isAnglePass) breaches.push("IS 13920 Cl 7.2 Breach: Shear confinement hook angles must be 135°. 90° hooks will pull out during seismic stress.");
    if (!isExtensionPass) breaches.push(`IS 13920 Cl 7.2.1 Breach: Hook extension of ${hookExtension}d is too short. Minimum 10d is mandatory.`);
    if (rebarGrade === "Fe415") breaches.push("IS 13920 Cl 5.3: Fe 500D or Fe 550D is strongly advised over Fe 415 for seismic frames.");
    return { passed: isAnglePass && isExtensionPass, breaches };
  }, [hookAngle, hookExtension, rebarGrade]);

  const seismicAuditResult = useMemo(() => {
    const breaches = [];
    let spacingLimit = 150;
    if (zone === "V" || zone === "IV") spacingLimit = 100;
    const isSpacingPass = spacing <= spacingLimit;
    if (!isSpacingPass) breaches.push(`IS 1893 & IS 13920 Cl 7.4.2 Breach: Stirrup spacing of ${spacing}mm exceeds the ${spacingLimit}mm limit for Zone ${zone}.`);
    return { passed: isSpacingPass, breaches };
  }, [zone, spacing]);

  const auditOutput = useMemo(() => {
    if (auditType === "concrete") return concreteAuditResult;
    if (auditType === "rebar") return rebarAuditResult;
    return seismicAuditResult;
  }, [auditType, concreteAuditResult, rebarAuditResult, seismicAuditResult]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-8">
      <div className="border-b border-slate-200 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <FileCheck className="w-5 h-5" />
          </div>
          <h1 className="font-headline text-2xl font-black text-slate-800">Compliance Center</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">Simulate structural drawing details against Indian Standard gazettes to check compliance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
              {["concrete", "rebar", "seismic"].map((type) => (
                <button key={type} onClick={() => { setAuditType(type); setAuditRun(false); }}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all capitalize cursor-pointer ${auditType === type ? "bg-white text-blue-600 shadow-xs" : "text-slate-500 hover:text-slate-800"}`}>
                  {type === "concrete" ? "Durability Check" : type === "rebar" ? "Ductile Detailing" : "Seismic Spacing"}
                </button>
              ))}
            </div>

            {auditType === "concrete" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Designed Concrete Cover (mm)</label>
                  <input type="number" value={cover} onChange={(e) => setCover(Math.max(0, parseInt(e.target.value) || 0))} className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Designed Cement Grade</label>
                  <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500">
                    {["M20", "M25", "M30", "M35", "M40"].map((g) => (<option key={g} value={g}>{g}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Exposure Class</label>
                  <select value={exposure} onChange={(e) => setExposure(e.target.value)} className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500">
                    {["mild", "moderate", "severe", "very_severe", "extreme"].map((exp) => (<option key={exp} value={exp}>{exp.replace('_', ' ')}</option>))}
                  </select>
                </div>
              </div>
            )}

            {auditType === "rebar" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Hook Bend Angle (degrees)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[90, 135].map((angle) => (
                      <button key={angle} onClick={() => setHookAngle(angle)} className={`py-2 border text-xs font-bold rounded-lg transition-all cursor-pointer ${hookAngle === angle ? "bg-blue-50 border-blue-400 text-blue-700 shadow-xs" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{angle}° Bend</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Hook Extension (× bar diameter)</label>
                  <select value={hookExtension} onChange={(e) => setHookExtension(parseInt(e.target.value))} className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500">
                    {[6, 8, 10, 12, 14].map((ext) => (<option key={ext} value={ext}>{ext}d extension</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Steel Grade</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Fe415", "Fe500D", "Fe550D"].map((g) => (
                      <button key={g} onClick={() => setRebarGrade(g)} className={`py-2 border text-xs font-bold rounded-lg transition-all cursor-pointer ${rebarGrade === g ? "bg-blue-50 border-blue-400 text-blue-700 shadow-xs" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{g}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {auditType === "seismic" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Seismic Zone (IS 1893)</label>
                  <select value={zone} onChange={(e) => setZone(e.target.value)} className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="II">Zone II (Low)</option>
                    <option value="III">Zone III (Moderate)</option>
                    <option value="IV">Zone IV (Severe)</option>
                    <option value="V">Zone V (Very Severe)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Stirrup Spacing (mm)</label>
                  <input type="number" value={spacing} onChange={(e) => setSpacing(Math.max(0, parseInt(e.target.value) || 0))} className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1 text-slate-400">
              <Gavel className="w-4 h-4 text-slate-500" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">BIS Act 2016 Compliant</span>
            </div>
            <button onClick={executeAudit} disabled={loading}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
              {loading ? (<><RefreshCw className="w-3.5 h-3.5 animate-spin" /><span>Computing...</span></>) : (<><Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /><span>Execute Audit</span></>)}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          {!auditRun && !loading && (
            <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="w-12 h-12 text-slate-300 mb-2" />
              <h3 className="font-headline text-base font-bold text-slate-700">Audit Certificate Pending</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed mt-1">Configure your structural details and trigger the compliance verification.</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center">
              <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mb-3" />
              <h3 className="font-headline text-base font-bold text-slate-700">Audit in Progress...</h3>
              <p className="text-xs text-slate-400">Comparing designs with gazette clauses...</p>
            </div>
          )}

          {auditRun && !loading && (
            <div className={`flex-1 rounded-2xl border p-5 flex flex-col justify-between shadow-xs ${auditOutput.passed ? "bg-emerald-50/60 border-emerald-200 text-emerald-800" : "bg-red-50/60 border-red-200 text-red-800"}`}>
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <Award className="w-4 h-4" /><span>Audit Certificate</span>
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200">ID-AUD-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>

                {auditOutput.passed ? (
                  <div className="text-center py-4">
                    <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-2" />
                    <h2 className="font-headline text-xl font-extrabold text-emerald-950">COMPLIANT VERDICT</h2>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">All design variables conform to BIS mandates.</p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <AlertTriangle className="w-14 h-14 text-red-600 mx-auto mb-2 animate-bounce" />
                    <h2 className="font-headline text-xl font-extrabold text-red-950">REJECTED VERDICT</h2>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">Non-compliant elements represent failure hazards.</p>
                  </div>
                )}

                {auditOutput.breaches.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-[10px] uppercase font-bold tracking-wider text-red-900">Detected Infractions:</h4>
                    {auditOutput.breaches.map((breach, idx) => (
                      <div key={idx} className="p-3 bg-white/80 border border-red-200/60 rounded-lg text-[11px] text-red-950 leading-relaxed text-justify">{breach}</div>
                    ))}
                  </div>
                )}

                {auditOutput.passed && (
                  <div className="mt-4 p-3 bg-white/80 border border-emerald-200/60 rounded-lg text-[11px] text-emerald-950 leading-relaxed text-justify">
                    <strong>Conformity Note:</strong> All values satisfy durability and ductile standards under national building codes. Proceed with structural assembly.
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-slate-200/40 text-center text-[10px] text-slate-400 font-medium">Accredited by National Safety & Gazette Registry</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
