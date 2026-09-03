import React from 'react';
import { NavigationMode } from '../../types';
import {
  User,
  Building2,
  Terminal,
  ShieldAlert,
  Search,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Shield,
  FileCheck,
  Inbox,
  Award,
  Database,
  ShieldCheck,
  AlertOctagon,
  ClipboardCheck,
  Calculator,
  Code2,
  Clock,
} from 'lucide-react';

interface SidebarProps {
  currentMode: NavigationMode;
  onSelectMode: (mode: NavigationMode) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenGlossary: () => void;
  onOpenBarsopWizard: () => void;
  onOpenCompanyInbox: () => void;
  onOpenGap: () => void;
  onOpenRat: () => void;
  onOpenDpa: () => void;
  onOpenIncidents: () => void;
  onOpenBlueprints: () => void;
  onOpenAuditMatrix: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentMode,
  onSelectMode,
  collapsed,
  onToggleCollapse,
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenGlossary,
  onOpenBarsopWizard,
  onOpenCompanyInbox,
  onOpenGap,
  onOpenRat,
  onOpenDpa,
  onOpenIncidents,
  onOpenBlueprints,
  onOpenAuditMatrix,
}) => {
  const modes: { id: NavigationMode; label: string; icon: React.ReactNode; color: string; badge: string }[] = [
    { id: 'citizen', label: 'Ciudadano', icon: <User className="w-4 h-4" />, color: 'sky', badge: 'BARSOP' },
    { id: 'company', label: 'Empresa', icon: <Building2 className="w-4 h-4" />, color: 'indigo', badge: 'Gobernanza' },
    { id: 'technical', label: 'Experto TI', icon: <Terminal className="w-4 h-4" />, color: 'purple', badge: 'Ciberseguridad' },
    { id: 'auditor', label: 'Auditor', icon: <ShieldAlert className="w-4 h-4" />, color: 'emerald', badge: 'Compliance' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col justify-between border-r transition-all duration-300 ${
        theme === 'dark' ? 'bg-slate-900/95 border-slate-800 text-slate-200' : 'bg-white/95 border-slate-200 text-slate-800'
      } ${collapsed ? 'w-16' : 'w-64'} backdrop-blur-md shadow-xl`}
    >
      {/* Top Brand */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="p-2 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-xl text-white shadow-md shadow-sky-500/20 shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          {!collapsed && (
            <div className="truncate">
              <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white block">PO · Privacidad</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block -mt-0.5">Ley Chile 2026</span>
            </div>
          )}
        </div>

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          title={collapsed ? 'Expandir barra' : 'Colapsar barra'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-4">
        {/* Modes Section */}
        <div>
          {!collapsed && (
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 block mb-1.5">
              Modos de la Plataforma
            </span>
          )}
          <nav className="space-y-1">
            {modes.map((m) => {
              const active = currentMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectMode(m.id)}
                  title={collapsed ? m.label : undefined}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? m.id === 'citizen'
                        ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-bold'
                        : m.id === 'company'
                        ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-bold'
                        : m.id === 'technical'
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <span className="shrink-0">{m.icon}</span>
                  {!collapsed && (
                    <div className="flex-1 text-left flex items-center justify-between">
                      <span>{m.label}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        {m.badge}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Tools */}
        <div>
          {!collapsed && (
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 block mb-1.5">
              Herramientas Rápidas
            </span>
          )}
          <div className="space-y-1 text-xs">
            <button
              onClick={onOpenBarsopWizard}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-sky-500 transition-colors"
              title={collapsed ? 'Generador BARSOP' : undefined}
            >
              <FileCheck className="w-4 h-4 text-sky-500 shrink-0" />
              {!collapsed && <span>🪄 Generador BARSOP</span>}
            </button>

            <button
              onClick={onOpenCompanyInbox}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-indigo-500 transition-colors"
              title={collapsed ? 'Bandeja Empresa BARSOP' : undefined}
            >
              <Inbox className="w-4 h-4 text-indigo-500 shrink-0" />
              {!collapsed && <span>📥 Bandeja Empresa BARSOP</span>}
            </button>

            <button
              onClick={onOpenGap}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-indigo-500 transition-colors"
              title={collapsed ? 'Gap Analysis' : undefined}
            >
              <Award className="w-4 h-4 text-indigo-400 shrink-0" />
              {!collapsed && <span>📊 Gap Analysis</span>}
            </button>

            <button
              onClick={onOpenRat}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-emerald-500 transition-colors"
              title={collapsed ? 'Inventario RAT' : undefined}
            >
              <Database className="w-4 h-4 text-emerald-400 shrink-0" />
              {!collapsed && <span>🗄️ Inventario RAT</span>}
            </button>

            <button
              onClick={onOpenDpa}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-sky-500 transition-colors"
              title={collapsed ? 'Gestor DPA' : undefined}
            >
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              {!collapsed && <span>🛡️ Gestor DPA</span>}
            </button>

            <button
              onClick={onOpenIncidents}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-rose-500 transition-colors"
              title={collapsed ? 'Libro Brechas 72h' : undefined}
            >
              <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
              {!collapsed && <span>🚨 Libro Brechas 72h</span>}
            </button>

            <button
              onClick={onOpenAuditMatrix}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-emerald-500 transition-colors"
              title={collapsed ? 'Matriz Auditor' : undefined}
            >
              <ClipboardCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              {!collapsed && <span>📜 Matriz Auditor</span>}
            </button>

            <button
              onClick={onOpenBlueprints}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-purple-500 transition-colors"
              title={collapsed ? 'Blueprints Cripto' : undefined}
            >
              <Code2 className="w-4 h-4 text-purple-400 shrink-0" />
              {!collapsed && <span>💻 Blueprints Código</span>}
            </button>
          </div>
        </div>

        {/* Search & Glossary */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors text-xs"
            title={collapsed ? 'Búsqueda Inteligente (⌘K)' : undefined}
          >
            <Search className="w-4 h-4 text-sky-500 shrink-0" />
            {!collapsed && <span>Búsqueda (⌘K)</span>}
          </button>

          <button
            onClick={onOpenGlossary}
            className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors text-xs"
            title={collapsed ? 'Glosario Legal' : undefined}
          >
            <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
            {!collapsed && <span>Glosario Legal</span>}
          </button>
        </div>
      </div>

      {/* Bottom Theme & Controls */}
      <div className="p-2.5 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button
          onClick={onToggleTheme}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
          title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400 shrink-0" /> : <Moon className="w-4 h-4 text-indigo-500 shrink-0" />}
          {!collapsed && <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>}
        </button>
      </div>
    </aside>
  );
};
