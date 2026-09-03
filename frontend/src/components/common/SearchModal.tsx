import React, { useState, useEffect } from 'react';
import { SearchResultResponse, Module } from '../../types';
import { api } from '../../services/api';
import { Search, X, Sparkles, ArrowRight, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule?: (moduleCode: string) => void;
  onSelectModuleCode?: (moduleCode: string) => void;
  currentMode?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectModule,
  onSelectModuleCode,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResultResponse | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResult(null);
      return;
    }
    // load initial suggestions
    performSearch('');
  }, [isOpen]);

  const performSearch = async (q: string) => {
    setLoading(true);
    try {
      const res = await api.search(q);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch(query);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/50">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              performSearch(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Pregunta en lenguaje natural (ej. '¿Cómo pido que borren mis datos?' o '¿Plazo de brechas?')..."
            className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder-slate-500 font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                performSearch('');
              }}
              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-semibold px-2.5 border border-slate-800"
          >
            Esc
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {/* Quick AI Answer */}
          {result?.quickAnswer && (
            <div className="bg-gradient-to-r from-sky-950/40 to-slate-900 border border-sky-500/20 rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-sky-400">
                <Sparkles className="w-4 h-4" />
                <span>Respuesta Rápida Asistida</span>
                {result.detectedIntent && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20 ml-auto font-mono">
                    Intención: {result.detectedIntent}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {result.quickAnswer}
              </p>
            </div>
          )}

          {/* Matches List */}
          {result?.matches && result.matches.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Módulos Coincidentes ({result.matches.length})
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {result.matches.map((m) => (
                  <div
                    key={m.moduleCode}
                    onClick={() => {
                      if (onSelectModuleCode) onSelectModuleCode(m.moduleCode);
                      else if (onSelectModule) onSelectModule(m.moduleCode);
                      onClose();
                    }}
                    className="p-3 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-sky-500/40 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          {m.moduleCode === 'transversal' ? 'TRANSVERSAL' : `Nivel ${m.level} · Módulo ${m.moduleCode}`}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                          {m.moduleTitle}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{m.matchedSnippet}</p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 text-xs font-semibold text-sky-400 group-hover:translate-x-0.5 transition-transform">
                      <span>{m.suggestedAction}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : query ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No se encontraron coincidencias exactas para "{query}". Prueba con otra pregunta.
            </div>
          ) : null}

          {/* Suggestions */}
          {result?.suggestions && result.suggestions.length > 0 && (
            <div className="pt-2 border-t border-slate-800/60">
              <h4 className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
                Preguntas y Consultas Frecuentes:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {result.suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(sug);
                      performSearch(sug);
                    }}
                    className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 transition-colors text-left"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
