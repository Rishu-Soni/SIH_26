import { Search, User, Bookmark } from "lucide-react";

export default function Navbar({
  currentPath,
  onNavigate,
  user,
  onSignIn,
  onSignOut,
  onSearchFocus,
  savedCount
}) {
  const navLinks = [
    { label: "Standards", path: "standards-search" },
    { label: "Resources", path: "saved-references" },
    { label: "BIS Gazette", path: "compliance-center" },
    { label: "About", path: "regulatory-help" },
    { label: "Help", path: "regulatory-help" },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-white border-b border-slate-200/80">
      <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate("standards-search")}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-95 cursor-pointer text-left shrink-0"
        >
          {/* Isometric BIS Standard Cube Icon */}
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1d4ed8] text-white shadow-xs">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
              <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <span className="font-serif font-bold text-[17px] text-slate-900 tracking-tight hidden sm:block">
            Know Your Standards
          </span>
        </button>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => onNavigate(link.path)}
              className={`text-sm transition-colors cursor-pointer ${
                currentPath === link.path
                  ? "text-[#1d4ed8] font-semibold"
                  : "font-normal text-slate-600 hover:text-slate-900"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Section Controls */}
        <div className="flex items-center gap-3">
          {/* BIS Mandate Compliant Pill */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8]"></span>
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              BIS MANDATE COMPLIANT
            </span>
          </div>

          {/* Saved Count Badge if any */}
          {savedCount > 0 && (
            <button
              onClick={() => onNavigate("saved-references")}
              className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold flex items-center gap-1 hover:bg-amber-100 transition-colors cursor-pointer"
              title="Saved specifications"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{savedCount}</span>
            </button>
          )}

          {/* Search text shortcut */}
          <button
            onClick={onSearchFocus}
            className="text-xs font-medium text-slate-600 hover:text-[#1d4ed8] transition-colors px-1 flex items-center gap-1.5 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search</span>
          </button>

          {/* Sign In Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-800 leading-tight">{user.name}</span>
                <span className="text-[10px] text-slate-400">{user.role}</span>
              </div>
              <button
                onClick={onSignOut}
                className="w-8 h-8 rounded-full bg-[#1d4ed8] flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:opacity-90 transition-opacity shadow-xs"
                title="Sign Out"
              >
                RS
              </button>
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="px-4 py-1.5 rounded-md text-xs font-semibold text-[#1d4ed8] border border-[#2563eb] hover:bg-[#eff6ff] cursor-pointer transition-colors"
            >
              Sign In
            </button>
          )}

          {/* User circle avatar */}
          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
