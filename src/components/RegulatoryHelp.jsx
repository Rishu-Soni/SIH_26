import { useState } from "react";
import {
  LifeBuoy, ChevronRight, ChevronLeft, Send, AlertCircle, CheckCircle2, Clock
} from "lucide-react";

export default function RegulatoryHelp() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [ticketName, setTicketName] = useState("");
  const [ticketEmail, setTicketEmail] = useState("");
  const [ticketQuery, setTicketQuery] = useState("");
  const [ticketCategory, setTicketCategory] = useState("general");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const [activeTickets] = useState([
    { id: "TKT-4291", subject: "IS 456 Cl. 26 rebar spacing query", status: "In Review", time: "2 hrs ago" },
    { id: "TKT-3802", subject: "RMC licensee directory update request", status: "Resolved", time: "5 days ago" },
    { id: "TKT-3740", subject: "QCO applicability for IS 1893 Part 4", status: "Pending", time: "1 week ago" },
  ]);

  const slides = [
    {
      title: "Structural Beam Cross-Section",
      svg: (
        <svg viewBox="0 0 400 250" className="w-full h-48">
          <rect x="20" y="20" width="360" height="210" fill="none" stroke="#94a3b8" strokeWidth="1" />
          <rect x="100" y="50" width="200" height="160" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="8,4" />
          <text x="200" y="140" textAnchor="middle" className="text-xs fill-blue-600 font-bold" fontSize="12">BEAM SECTION 300×500</text>
          <line x1="100" y1="50" x2="100" y2="210" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4,2" />
          <line x1="300" y1="50" x2="300" y2="210" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4,2" />
          <circle cx="130" cy="190" r="8" fill="#2563eb" /><circle cx="170" cy="190" r="8" fill="#2563eb" /><circle cx="210" cy="190" r="8" fill="#2563eb" />
          <circle cx="250" cy="190" r="8" fill="#2563eb" /><circle cx="270" cy="190" r="6" fill="#dc2626" />
          <text x="200" y="230" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold" fontSize="10">IS 456 Cl.26 — Min. 4 bars in tension zone</text>
        </svg>
      ),
    },
    {
      title: "Seismic Hook Detailing (IS 13920)",
      svg: (
        <svg viewBox="0 0 400 250" className="w-full h-48">
          <rect x="30" y="30" width="340" height="190" fill="none" stroke="#94a3b8" strokeWidth="1" />
          <rect x="80" y="60" width="240" height="130" fill="none" stroke="#2563eb" strokeWidth="2" rx="4" />
          <path d="M 160 60 L 160 190 L 200 190 L 200 60" fill="none" stroke="#e11d48" strokeWidth="2.5" />
          <path d="M 200 60 Q 220 50 230 70" fill="none" stroke="#e11d48" strokeWidth="2.5" />
          <text x="250" y="80" className="text-[10px] fill-red-600 font-bold" fontSize="10">135° Hook</text>
          <text x="250" y="95" className="text-[9px] fill-slate-400" fontSize="9">10d Extension</text>
          <path d="M 100 60 L 100 190 L 140 190 L 140 60" fill="none" stroke="#16a34a" strokeWidth="2" />
          <text x="120" y="150" textAnchor="middle" className="text-[9px] fill-emerald-600 font-bold" fontSize="9">HOOP</text>
          <text x="200" y="240" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold" fontSize="10">IS 13920 Cl.7 — 135° mandatory in Zones III-V</text>
        </svg>
      ),
    },
    {
      title: "Column Confinement Zone",
      svg: (
        <svg viewBox="0 0 400 250" className="w-full h-48">
          <rect x="30" y="30" width="340" height="190" fill="none" stroke="#94a3b8" strokeWidth="1" />
          <rect x="160" y="40" width="80" height="190" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <line x1="160" y1="80" x2="240" y2="80" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4,2" />
          <line x1="160" y1="190" x2="240" y2="190" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4,2" />
          {[95, 110, 125, 140, 155, 170].map((y) => (
            <line key={y} x1="162" y1={y} x2="238" y2={y} stroke="#16a34a" strokeWidth="1" />
          ))}
          <text x="280" y="85" className="text-[9px] fill-red-600 font-bold" fontSize="9">lo = max(D, Ln/6, 450mm)</text>
          <text x="280" y="140" className="text-[10px] fill-emerald-600 font-bold" fontSize="10">Close-spaced hoops</text>
          <text x="200" y="245" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold" fontSize="10">IS 13920 Cl.7.4 — Special confining zone</text>
        </svg>
      ),
    },
  ];

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (ticketName && ticketEmail && ticketQuery) {
      setTicketSubmitted(true);
      setTimeout(() => setTicketSubmitted(false), 4000);
      setTicketName(""); setTicketEmail(""); setTicketQuery("");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-8">
      <div className="border-b border-slate-200 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <h1 className="font-headline text-2xl font-black text-slate-800">Regulatory Help & Engineering Desk</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">Interactive engineering blueprints, expert review submission, and active compliance ticket tracker</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Carousel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-headline text-base font-bold text-slate-800">Engineering Reference Blueprints</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold">{carouselIdx + 1} / {slides.length}</span>
              <button onClick={() => setCarouselIdx((prev) => (prev - 1 + slides.length) % slides.length)} className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => setCarouselIdx((prev) => (prev + 1) % slides.length)} className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="p-6 flex flex-col items-center">
            <div className="w-full bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center justify-center min-h-[220px]">
              {slides[carouselIdx].svg}
            </div>
            <h4 className="font-headline font-bold text-sm text-slate-800 mt-4">{slides[carouselIdx].title}</h4>
          </div>
        </div>

        {/* Ticket Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-headline text-base font-bold text-slate-800">Submit Expert Review Query</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Our structural engineering reviewers typically respond within 48 hrs</p>
          </div>
          <form onSubmit={handleSubmitTicket} className="p-5 space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
              <input type="text" value={ticketName} onChange={(e) => setTicketName(e.target.value)} placeholder="e.g. Rishabh Sharma" className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Work Email</label>
              <input type="email" value={ticketEmail} onChange={(e) => setTicketEmail(e.target.value)} placeholder="name@firm.com" className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Category</label>
              <select value={ticketCategory} onChange={(e) => setTicketCategory(e.target.value)} className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500">
                <option value="general">General Inquiry</option>
                <option value="is456">IS 456 — Concrete</option>
                <option value="is1893">IS 1893 — Seismic</option>
                <option value="is13920">IS 13920 — Ductile</option>
                <option value="is800">IS 800 — Steel</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Compliance Query</label>
              <textarea value={ticketQuery} onChange={(e) => setTicketQuery(e.target.value)} rows={3} placeholder="Describe the issue, clause reference, or confusion..." className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none" required />
            </div>
            <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              <Send className="w-3.5 h-3.5" /><span>Submit for Expert Review</span>
            </button>
            {ticketSubmitted && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Ticket submitted! Our team will respond within 48 hours.</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Active Tickets */}
      <div className="mt-8">
        <h3 className="font-headline text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <span>Active Compliance Tickets</span>
        </h3>
        <div className="space-y-2">
          {activeTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold border border-blue-200">{ticket.id}</span>
                <span className="text-xs font-semibold text-slate-700">{ticket.subject}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  ticket.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  ticket.status === "In Review" ? "bg-amber-50 text-amber-700 border-amber-200" :
                  "bg-slate-100 text-slate-600 border-slate-200"
                }`}>{ticket.status}</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{ticket.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
