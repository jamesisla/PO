import React, { useState, useEffect } from 'react';
import { NavigationMode, Module } from './types';
import { api } from './services/api';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { CountdownBanner } from './components/common/CountdownBanner';
import { SearchModal } from './components/common/SearchModal';
import { GlossaryDrawer } from './components/common/GlossaryDrawer';
import { ModuleDetailModal } from './components/common/ModuleDetailModal';
import { CitizenView } from './components/citizen/CitizenView';
import { CompanyView } from './components/company/CompanyView';
import { TechnicalView } from './components/technical/TechnicalView';
import { AuditorView } from './components/auditor/AuditorView';
import { BarsopWizard } from './components/citizen/BarsopWizard';
import { CompanyBarsopInboxModal } from './components/company/CompanyBarsopInboxModal';
import { GapAnalysisModal } from './components/company/GapAnalysisModal';
import { RatViewer } from './components/company/RatViewer';
import { DpaManagerModal } from './components/company/DpaManagerModal';
import { IncidentManagerModal } from './components/company/IncidentManagerModal';
import { BlueprintsModal } from './components/technical/BlueprintsModal';
import { AuditMatrixModal } from './components/auditor/AuditMatrixModal';

export const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<NavigationMode>('citizen');
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Modals & Drawers
  const [searchOpen, setSearchOpen] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  // Quick Tools Modals
  const [barsopWizardOpen, setBarsopWizardOpen] = useState(false);
  const [companyInboxOpen, setCompanyInboxOpen] = useState(false);
  const [gapOpen, setGapOpen] = useState(false);
  const [ratOpen, setRatOpen] = useState(false);
  const [dpaOpen, setDpaOpen] = useState(false);
  const [incidentsOpen, setIncidentsOpen] = useState(false);
  const [blueprintsOpen, setBlueprintsOpen] = useState(false);
  const [auditMatrixOpen, setAuditMatrixOpen] = useState(false);

  // Theme Effect
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Load Modules
  useEffect(() => {
    setLoading(true);
    api.getModules()
      .then(setModules)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Keyboard Shortcuts (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectModuleFromSearch = async (code: string) => {
    try {
      const mod = await api.getModuleByCode(code);
      setSelectedModule(mod);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Collapsible Sidebar */}
      <Sidebar
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenGlossary={() => setGlossaryOpen(true)}
        onOpenBarsopWizard={() => setBarsopWizardOpen(true)}
        onOpenCompanyInbox={() => setCompanyInboxOpen(true)}
        onOpenGap={() => setGapOpen(true)}
        onOpenRat={() => setRatOpen(true)}
        onOpenDpa={() => setDpaOpen(true)}
        onOpenIncidents={() => setIncidentsOpen(true)}
        onOpenBlueprints={() => setBlueprintsOpen(true)}
        onOpenAuditMatrix={() => setAuditMatrixOpen(true)}
      />

      {/* Main Container */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'pl-16' : 'pl-64'}`}>
        {/* Header */}
        <Header
          currentMode={currentMode}
          onSelectMode={setCurrentMode}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenGlossary={() => setGlossaryOpen(true)}
        />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {/* Countdown & Milestones */}
          <CountdownBanner />

          {/* Mode Dynamic Views */}
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-400">Cargando base normativa...</p>
            </div>
          ) : (
            <>
              {currentMode === 'citizen' && (
                <CitizenView modules={modules} onSelectModule={setSelectedModule} />
              )}
              {currentMode === 'company' && (
                <CompanyView modules={modules} onSelectModule={setSelectedModule} />
              )}
              {currentMode === 'technical' && (
                <TechnicalView modules={modules} onSelectModule={setSelectedModule} />
              )}
              {currentMode === 'auditor' && (
                <AuditorView modules={modules} onSelectModule={setSelectedModule} />
              )}
            </>
          )}
        </main>
      </div>

      {/* Common Modals & Drawers */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        currentMode={currentMode}
        onSelectModuleCode={handleSelectModuleFromSearch}
      />

      <GlossaryDrawer isOpen={glossaryOpen} onClose={() => setGlossaryOpen(false)} />

      <ModuleDetailModal module={selectedModule} onClose={() => setSelectedModule(null)} />

      {/* Direct Tool Launch Modals */}
      <BarsopWizard isOpen={barsopWizardOpen} onClose={() => setBarsopWizardOpen(false)} />
      <CompanyBarsopInboxModal isOpen={companyInboxOpen} onClose={() => setCompanyInboxOpen(false)} />
      <GapAnalysisModal isOpen={gapOpen} onClose={() => setGapOpen(false)} />
      <RatViewer isOpen={ratOpen} onClose={() => setRatOpen(false)} />
      <DpaManagerModal isOpen={dpaOpen} onClose={() => setDpaOpen(false)} />
      <IncidentManagerModal isOpen={incidentsOpen} onClose={() => setIncidentsOpen(false)} />
      <BlueprintsModal isOpen={blueprintsOpen} onClose={() => setBlueprintsOpen(false)} />
      <AuditMatrixModal isOpen={auditMatrixOpen} onClose={() => setAuditMatrixOpen(false)} />
    </div>
  );
};

export default App;
