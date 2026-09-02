import React, { useState, useEffect } from 'react';
import { GapQuestion, GapResult } from '../../types';
import { api } from '../../services/api';
import { X, CheckCircle2, AlertTriangle, ArrowRight, Award, ShieldAlert, FileText, RotateCcw } from 'lucide-react';

interface GapAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GapAnalysisModal: React.FC<GapAnalysisModalProps> = ({ isOpen, onClose }) => {
  const [questions, setQuestions] = useState<GapQuestion[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [orgType, setOrgType] = useState('pyme');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<GapResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      api.getGapQuestions().then((qs) => {
        setQuestions(qs);
        // Default answer selections
        const initial: Record<string, number> = {};
        qs.forEach((q) => {
          if (q.options.length > 0) initial[q.id] = q.options[0].id;
        });
        setAnswers(initial);
      }).catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      const res = await api.evaluateGap({
        companyName: companyName || 'Mi Organización',
        organizationType: orgType,
        answers,
      });
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Test de Autodiagnóstico & Gap Analysis</h3>
              <p className="text-xs text-slate-400">Evalúa el nivel de madurez y detecta brechas para la ley 2026</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 flex-1 space-y-6">
          {!result ? (
            <div className="space-y-6">
              {/* Org Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Nombre de la Organización</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ej. Mi Empresa SpA"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Tipo de Entidad</label>
                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="pyme">Pequeña / Mediana Empresa (PyME)</option>
                    <option value="large">Gran Empresa / Corporación</option>
                    <option value="health">Sector Salud / Clínicas / Laboratorios</option>
                    <option value="fintech">Fintech / Servicios Financieros</option>
                    <option value="public">Organismo del Sector Público</option>
                  </select>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-5">
                {questions.map((q, idx) => (
                  <div key={q.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-white leading-snug">
                        <span className="text-indigo-400 font-mono mr-1.5">{idx + 1}.</span>
                        {q.question}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 whitespace-nowrap">
                        {q.category}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt) => {
                        const selected = answers[q.id] === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setAnswers({ ...answers, [q.id]: opt.id })}
                            className={`p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                              selected
                                ? 'bg-indigo-500/10 border-indigo-500 text-white font-medium'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                            }`}
                          >
                            <span>{opt.text}</span>
                            <div
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                                selected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-700'
                              }`}
                            >
                              {selected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6">
              {/* Score Header */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Nivel de Conformidad Global
                </span>
                <div className="text-5xl font-black font-mono text-indigo-400">
                  {result.overallScore}%
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {result.maturityLevel}
                </div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Diagnóstico generado para <strong>{result.companyName}</strong>. Fecha límite de adecuación: 1 de Diciembre de 2026.
                </p>
              </div>

              {/* Category Scores */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Puntaje por Área Evaluada
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(result.categoryScores).map(([cat, score]) => (
                    <div key={cat} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-300">
                        <span>{cat}</span>
                        <span className="font-mono text-indigo-400">{score}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Plan */}
              {result.actionPlan && result.actionPlan.length > 0 && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Plan de Remediación Obligatorio (Antes de Dic 2026)
                  </h4>
                  <ul className="space-y-2">
                    {result.actionPlan.map((step, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-indigo-400 font-bold font-mono">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          {!result ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                disabled={loading}
                onClick={handleEvaluate}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
              >
                <span>{loading ? 'Calculando...' : 'Obtener Informe de Brechas'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reevaluar</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
              >
                Finalizar Diagnóstico
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
