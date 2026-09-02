import React from 'react';
import { Module } from '../../types';
import { X, BookOpen, CheckSquare, Shield, Tag, FileText } from 'lucide-react';

interface ModuleDetailModalProps {
  module: Module | null;
  onClose: () => void;
  onActionClick?: (actionName: string) => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  module,
  onClose,
  onActionClick,
}) => {
  if (!module) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-start justify-between bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {module.code === 'transversal' ? 'Nivel Transversal' : `Nivel ${module.level} · Módulo ${module.code}`}
              </span>
              <span className="text-xs text-slate-400 font-medium">{module.levelName}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              {module.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 text-slate-200 text-sm leading-relaxed">
          {/* Summary Box */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 text-slate-300">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Resumen Ejecutivo
            </h4>
            <p className="text-xs sm:text-sm">{module.summary}</p>
          </div>

          {/* Legal Articles */}
          {module.legalArticles && module.legalArticles.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                Artículos Legales de Referencia
              </h4>
              <div className="flex flex-wrap gap-2">
                {module.legalArticles.map((art, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-emerald-950/40 text-emerald-300 border border-emerald-500/20 font-medium"
                  >
                    {art}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Main Markdown Content */}
          <div className="prose prose-invert max-w-none text-xs sm:text-sm space-y-3">
            {module.contentMarkdown.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-slate-300 leading-relaxed whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Takeaways */}
          {module.keyTakeaways && module.keyTakeaways.length > 0 && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Aspectos Clave a Recordar
              </h4>
              <ul className="space-y-1.5">
                {module.keyTakeaways.map((item, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Checklist */}
          {module.actionChecklist && module.actionChecklist.length > 0 && (
            <div className="bg-sky-950/20 border border-sky-500/20 rounded-xl p-4">
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5" />
                Acciones Inmediatas Recomendadas
              </h4>
              <ul className="space-y-2">
                {module.actionChecklist.map((act, i) => (
                  <li key={i} className="text-xs text-slate-200 flex items-start gap-2 font-medium">
                    <span className="text-sky-400 font-bold">✓</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">PO Ley Chile 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-lg transition-colors"
          >
            Cerrar Módulo
          </button>
        </div>
      </div>
    </div>
  );
};
