import { useState, useRef, useCallback } from "react";
import { INDIAN_STANDARDS } from "./data/standards";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StandardsSearch from "./components/StandardsSearch";
import StandardDetail from "./components/StandardDetail";
import ComplianceCenter from "./components/ComplianceCenter";
import SavedReferences from "./components/SavedReferences";
import RegulatoryHelp from "./components/RegulatoryHelp";
import DesignCalculator from "./components/DesignCalculator";

export default function App() {
  const [currentPath, setCurrentPath] = useState("standards-search");
  const [selectedStandardId, setSelectedStandardId] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [showCalculator, setShowCalculator] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [user, setUser] = useState(null);

  const mainSearchInputRef = useRef(null);

  const handleNavigate = useCallback((path) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelectStandard = useCallback((id) => {
    setSelectedStandardId(id);
    setCurrentPath("standard-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSaveStandard = useCallback((id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  const handleSearchFocus = useCallback(() => {
    setCurrentPath("standards-search");
    setTimeout(() => mainSearchInputRef.current?.focus(), 100);
  }, []);

  const handleSignIn = useCallback(() => {
    setUser({ name: "Rishabh S.", email: "rishabh@example.com", role: "Structural Engineer" });
  }, []);

  const handleSignOut = useCallback(() => {
    setUser(null);
  }, []);

  const selectedStandard = selectedStandardId ? INDIAN_STANDARDS[selectedStandardId] : null;

  const renderContent = () => {
    switch (currentPath) {
      case "standard-detail":
        if (!selectedStandard) return null;
        return (
          <StandardDetail
            standard={selectedStandard}
            onBack={() => handleNavigate("standards-search")}
            onSave={() => handleSaveStandard(selectedStandard.id)}
            isSaved={savedIds.includes(selectedStandard.id)}
            onOpenCalculator={() => setShowCalculator(true)}
          />
        );
      case "compliance-center":
        return <ComplianceCenter />;
      case "saved-references":
        return (
          <SavedReferences
            savedIds={savedIds}
            onSelectStandard={handleSelectStandard}
            onRemoveStandard={(id) => setSavedIds((prev) => prev.filter((s) => s !== id))}
            onClearAll={() => setSavedIds([])}
          />
        );
      case "regulatory-help":
        return <RegulatoryHelp />;
      case "standards-search":
      default:
        return (
          <StandardsSearch
            onSelectStandard={handleSelectStandard}
            onSaveStandard={handleSaveStandard}
            savedIds={savedIds}
            mainSearchInputRef={mainSearchInputRef}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        user={user}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onSearchFocus={handleSearchFocus}
        savedCount={savedIds.length}
      />

      {/* Main content area */}
      <main className="flex-1 w-full">
        {renderContent()}
      </main>

      <Footer />

      {/* Calculator Modal */}
      {showCalculator && (
        <DesignCalculator onClose={() => setShowCalculator(false)} />
      )}
    </div>
  );
}
