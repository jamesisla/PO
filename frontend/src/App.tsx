import React, { useState, useEffect } from 'react';
import { NavigationMode, Module, CountdownInfo } from './types';
import { api } from './services/api';
import { Header } from './components/common/Header';
import { CountdownBanner } from './components/common/CountdownBanner';
import { SearchModal } from './components/common/SearchModal';
import { ModuleDetailModal } from './components/common/ModuleDetailModal';
import { GlossaryDrawer } from './components/common/GlossaryDrawer';
import { CitizenView } from './components/citizen/CitizenView';
import { CompanyView } from './components/company/CompanyView';
import { TechnicalView } from './components/technical/TechnicalView';
import { AuditorView } from './components/auditor/AuditorView';

export function App() {
  const [currentMode, setCurrentMode] = useState<NavigationMode>('citizen');
  const [modules, setModules] = useState<Module[]>([]);
  const [countdown, setCountdown] = useState<CountdownInfo | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [mods, cd] = await Promise.all([
          api.getModules(),
          api.getCountdown(),
        ]);
        setModules(mods);
        setCountdown(cd);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectModuleByCode = async (code: string) => {
    try {
      const mod = await api.getModuleByCode(code);
      setSelectedModule(mod);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header with Unified Look & Feel */}
      <Header
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenGlossary={() => setGlossaryOpen(true)}
        daysRemaining={countdown?.daysRemaining || 820}
      />

      {/* Countdown to Dec 1, 2026 */}
      <CountdownBanner info={countdown} />

      {/* Main Mode View */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-500 text-sm">
            Cargando módulos y especificaciones de la ley...
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

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>PO — Plataforma de Protección de Datos Personales Chile 2026</span>
          <span>Entrada en vigencia: 1 de Diciembre de 2026</span>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectModule={handleSelectModuleByCode}
      />

      <ModuleDetailModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
      />

      <GlossaryDrawer
        isOpen={glossaryOpen}
        onClose={() => setGlossaryOpen(false)}
      />
    </div>
  );
}

export default App;
