import React, { useState, useEffect } from 'react';
import { AuditControl, AuditReport, AuditControlEvaluation } from '../../types';
import { api } from '../../services/api';
import { X, ClipboardCheck, AlertCircle, FileCheck, CheckCircle2, RotateCcw, ShieldAlert, Award } from 'lucide-react';

interface AuditMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditMatrixModal: React.FC<AuditMatrixModalProps> = ({ isOpen, onClose }) => {
  const [controls, setControls] = useState<AuditControl[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [auditorName, setAuditorName] = useState('');
  const [auditorLicense, setAuditorLicense] = useState('');
  const [evaluations, setEvaluations] = useState<Record<string, AuditControlEvaluation>>({});
  const [report, setReport] = useState<AuditReport | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      api.getAuditControls().then((ctrls) => {
        setControls(ctrls);
        const initial: Record<string, AuditControlEvaluation> = {};
        ctrls.forEach((c) => {
          initial[c.id] = {
            controlId: c.id,
            status: 'Conforme',
            evidenceNotes: '',
            finding: '',
          };
        });
        setEvaluations(initial);
      }).catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      const res = await api.evaluateAudit({
        companyName: companyName || 'Entidad Auditada',
        auditorName: auditorName || 'Auditor Líder',
        auditorLicense: auditorLicense || 'AUD-2026-CHILE',
        evaluations,
        generalComments: 'Auditoría integral de preparación para la Ley de Protección de Datos 2026.',
      });
      setReport(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Matriz de Control y Dictamen de Auditoría</h3>
              <p className="text-xs text-slate-400">Verificación de evidencias, bases de licitud, DPAs y cumplimiento 2026</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 flex-1 space-y-6">
          {!report ? (
            <div className="space-y-6">
              {/* Audit Header Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Entidad Auditada *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Empresa / Institución"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Nombre del Auditor *</label>
                  <input
                    type="text"
                    value={auditorName}
                    onChange={(e) => setAuditorName(e.target.value)}
                    placeholder="Auditor Líder / DPD"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Registro / Licencia</label>
                  <input
                    type="text"
                    value={auditorLicense}
                    onChange={(e) => setAuditorLicense(e.target.value)}
                    placeholder="AUD-2026-CHL"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Controls List */}
              <div className="space-y-4">
                {controls.map((ctrl) => {
                  const curr = evaluations[ctrl.id] || { status: 'Conforme', evidenceNotes: '', finding: '' };
                  return (
                    <div
                      key={ctrl.id}
                      className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-sky-400 border border-sky-500/20">
                            {ctrl.controlCode}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white">{ctrl.title}</h4>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          ctrl.riskLevel === 'Alto' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          Riesgo {ctrl.riskLevel}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">{ctrl.description}</p>

                      <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Evidencia Requerida:</span>
                        <span>{ctrl.requiredEvidence}</span>
                      </div>

                      {/* Status Selector */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        {[
                          { id: 'Conforme', label: 'Conforme', color: 'emerald' },
                          { id: 'Conforme con Salvedades', label: 'Salvedades', color: 'amber' },
                          { id: 'No Conforme', label: 'No Conforme', color: 'rose' },
                          { id: 'No Aplica', label: 'No Aplica', color: 'slate' },
                        ].map((st) => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() =>
                              setEvaluations({
                                ...evaluations,
                                [ctrl.id]: { ...curr, status: st.id as any },
                              })
                            }
                            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                              curr.status === st.id
                                ? st.id === 'Conforme'
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                  : st.id === 'No Conforme'
                                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                                  : 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {st.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Audit Report Result */
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Dictamen Final de Auditoría
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  {report.finalOpinion}
                </div>
                <div className="text-2xl font-mono font-bold text-emerald-400">
                  {report.complianceRate}% de Conformidad
                </div>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80 max-w-md mx-auto">
                  <span>Conformes: <strong className="text-emerald-400">{report.conformingControls}</strong></span>
                  <span>Salvedades: <strong className="text-amber-400">{report.partialControls}</strong></span>
                  <span>No Conformes: <strong className="text-rose-400">{report.nonConformingControls}</strong></span>
                </div>
              </div>

              {/* Findings Summary */}
              {report.findings && report.findings.length > 0 && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Hallazgos y No Conformidades Registradas
                  </h4>
                  <div className="space-y-2">
                    {report.findings.map((f, i) => (
                      <div key={i} className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white font-mono">{f.controlCode} — {f.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                            {f.status}
                          </span>
                        </div>
                        <p className="text-slate-400">{f.finding}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          {!report ? (
            <>
              <button onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold">
                Cancelar
              </button>
              <button
                disabled={loading}
                onClick={handleEvaluate}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>{loading ? 'Evaluando...' : 'Emitir Dictamen de Auditoría'}</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={handleReset} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reevaluar</span>
              </button>
              <button onClick={onClose} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold">
                Finalizar Auditoría
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
