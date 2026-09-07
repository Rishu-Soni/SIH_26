export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200/90 py-5">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2 max-w-2xl">
          <svg className="w-4 h-4 text-[#1d4ed8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <p className="text-[11px] text-slate-500 leading-normal">
            Official Bureau of Indian Standards (BIS) reference regulatory framework mirror. For official publication validation, verify against the Central Gazette of India.
          </p>
        </div>
        <p className="text-[11px] text-slate-400 font-medium shrink-0">
          © 2024 Know Your Standards Suite. High-Precision Telemetry.
        </p>
      </div>
    </footer>
  );
}
