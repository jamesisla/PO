import React from 'react';
import { NavigationMode } from '../../types';
import { Shield, Search, BookOpen, Clock, User, Building2, Terminal, ClipboardCheck } from 'lucide-react';

interface HeaderProps {
  currentMode: NavigationMode;
  onSelectMode: (mode: NavigationMode) => void;
  onOpenSearch: () => void;
  onOpenGlossary: () => void;
  daysRemaining?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  onOpenSearch,
  onOpenGlossary,
  daysRemaining = 89,
}) => {
  const modes: { id: NavigationMode; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'citizen', label: 'Ciudadano', icon: <User className="w-4 h-4" />, desc: 'Niveles 1 y 2 · Derechos BARSOP' },
    { id: 'company', label: 'Empresa', icon: <Building2 className="w-4 h-4" />, desc: 'Niveles 3 y 4 · Cumplimiento & RAT' },
    { id: 'technical', label: 'Experto / TI', icon: <Terminal className="w-4 h-4" />, desc: 'Nivel 5 · Cifrado & Sanciones' },
    { id: 'auditor', label: 'Auditor', icon: <ClipboardCheck className="w-4 h-4" />, desc: 'Matriz de Control & Dictámenes' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl shadow-lg shadow-sky-500/20 text-white flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">PO</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-semibold">
                  Ley Chile 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Protección & Obligaciones de Datos Personales</p>
            </div>
          </div>

          {/* Mode Selector */}
          <nav className="hidden md:flex items-center bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800/80">
            {modes.map((m) => {
              const active = currentMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectMode(m.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    active
                      ? m.id === 'citizen'
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                        : m.id === 'company'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : m.id === 'technical'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                        : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/50'
                  }`}
                  title={m.desc}
                >
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors group"
            >
              <Search className="w-3.5 h-3.5 text-sky-500 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Búsqueda</span>
              <kbd className="hidden lg:inline text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Glossary Button */}
            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
              title="Glosario de Términos Legales"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Glosario</span>
            </button>

            {/* Countdown Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-700 dark:text-amber-300 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>1 Dic 2026</span>
            </div>
          </div>
        </div>

        {/* Mobile Mode Selector */}
        <div className="flex md:hidden py-2 border-t border-slate-200 dark:border-slate-800/80 gap-1 overflow-x-auto">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectMode(m.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                currentMode === m.id
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {m.icon}
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
