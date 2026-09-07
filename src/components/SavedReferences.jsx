import { useState } from "react";
import { BookMarked, Layers, ArrowRight, Trash2, BookmarkCheck } from "lucide-react";
import { INDIAN_STANDARDS } from "../data/standards";

export default function SavedReferences({
  savedIds,
  onSelectStandard,
  onRemoveStandard,
  onClearAll
}) {
  const [filterQuery, setFilterQuery] = useState("");

  const savedStandards = Object.values(INDIAN_STANDARDS).filter(
    (std) => savedIds.includes(std.id) && (
      std.code.toLowerCase().includes(filterQuery.toLowerCase()) ||
      std.title.toLowerCase().includes(filterQuery.toLowerCase())
    )
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <BookmarkCheck className="w-4 h-4" />
            </div>
            <h1 className="font-headline text-2xl font-black text-slate-800">Saved Specifications</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Quick-access bookshelf for critical structural code references</p>
        </div>
        {savedIds.length > 0 && (
          <button onClick={onClearAll} className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-red-400 hover:text-red-600 text-slate-500 font-bold text-xs transition-colors cursor-pointer">Clear All</button>
        )}
      </div>

      {savedIds.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <BookMarked className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="font-headline text-base font-bold text-slate-700">Your Bookshelf is Empty</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
            Save critical specifications from search results. They'll be pinned here for quick reference.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-2">
            <input type="text" placeholder="Filter saved specifications..." value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)} className="w-full bg-transparent text-xs text-slate-700 focus:outline-none" />
          </div>

          {savedStandards.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {savedStandards.map((std) => (
                <div key={std.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-amber-400 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0"><Layers className="w-5 h-5" /></div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-headline text-base font-extrabold text-slate-800">{std.code}</span>
                        <span className="bg-slate-100 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded">{std.dossier.techComm}</span>
                      </div>
                      <h3 className="text-xs font-semibold text-slate-600 truncate mt-0.5">{std.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button onClick={() => onRemoveStandard(std.id)} className="p-1.5 rounded bg-slate-100 border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                    <button onClick={() => onSelectStandard(std.id)} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer">
                      <span>Inspect Code</span><ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-slate-400"><p className="text-xs">No saved standards matched filter.</p></div>
          )}
        </div>
      )}
    </div>
  );
}
