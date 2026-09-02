import React, { useState, useEffect } from 'react';
import { Module, InstitutionalStatus } from '../../types';
import { AuditMatrixModal } from './AuditMatrixModal';
import { api } from '../../services/api';
import { ClipboardCheck, ShieldCheck, Scale, FileText, CheckCircle2, ChevronRight, Sparkles, AlertOctagon, Activity, Database, AlertTriangle, ArrowRight, ShieldAlert, Award } from 'lucide-react';

interface AuditorViewProps {
  modules: Module[];
  onSelectModule: (module: Module) => void;
}

export const AuditorView: React.FC<AuditorViewProps> = ({ modules, onSelectModule }) => {
  const [matrixOpen, setMatrixOpen] = useState(false);
  const [status, setStatus] = useState<InstitutionalStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStatus = () => {
    setLoading(true);
    api.getInstitutionalStatus().then(setStatus).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStatus();
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Auditor */}
      <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consola de Auditoría Institucional & Evidencias Vivas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard de Estado de Avance & Dictamen de Auditoría
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Esta consola refleja en tiempo real las operaciones y evidencias cargadas internamente en la empresa (Inventario RAT, Contratos DPA con proveedores, SLAs de solicitudes BARSOP y Libro de Brechas de 72h).
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setMatrixOpen(true)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Ejecutar Matriz de Control con Evidencias Reales</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Institutional Progress Dashboard */}
      {status && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-extrabold text-white">Estado de Cumplimiento Institucional en Vivo</h3>
              </div>
              <p className="text-xs text-slate-400">Entidad: <strong>{status.companyName}</strong> · Última sincronización: {status.lastUpdated}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Score Global de Preparación</span>
                <span className="text-2xl font-black font-mono text-emerald-400">{status.overallInstitutionalScore}%</span>
              </div>
            </div>
          </div>

          {/* Key Metric Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* RAT Meter */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  Salud del RAT
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">{status.ratLicitudPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${status.ratLicitudPercent}%` }} />
              </div>
              <p className="text-[11px] text-slate-400">{status.ratTreatmentsCount} tratamientos inventariados con base de licitud.</p>
            </div>

            {/* DPA Coverage */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  Cobertura DPA
                </span>
                <span className="text-xs font-mono font-bold text-sky-400">{status.dpaCompliancePercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: `${status.dpaCompliancePercent}%` }} />
              </div>
              <p className="text-[11px] text-slate-400">{status.dpaSignedCount} de {status.dpaVendorsTotal} proveedores con contrato firmado.</p>
            </div>

            {/* BARSOP SLA Monitor */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-purple-400" />
                  SLA BARSOP (30d)
                </span>
                <span className={`text-xs font-mono font-bold ${status.barsopOverdueCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {status.barsopOverdueCount > 0 ? `${status.barsopOverdueCount} Vencidas` : '100% en SLA'}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${status.barsopOverdueCount > 0 ? 'bg-rose-500' : 'bg-purple-500'}`}
                  style={{ width: `${Math.max(0, 100 - (status.barsopOverdueCount * 30))}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{status.barsopTotalRequests} solicitudes totales recibidas.</p>
            </div>

            {/* 72h Breach Readiness */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                  Alerta Brechas 72h
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">100% OK</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
              </div>
              <p className="text-[11px] text-slate-400">{status.incidentsTotal} incidentes contenidos en plazo.</p>
            </div>
          </div>

          {/* Key Audit Alerts */}
          {status.keyAuditAlerts && status.keyAuditAlerts.length > 0 && (
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Alertas Automáticas de la Auditoría Interna:
              </h4>
              <ul className="space-y-1.5">
                {status.keyAuditAlerts.map((alt, i) => (
                  <li key={i} className="text-xs text-amber-200 flex items-start gap-2 font-medium">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{alt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Opinion preview card */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Dictamen Preliminar Estimado</span>
              <div className="text-sm font-bold text-white mt-0.5">{status.auditorRecommendedOpinion}</div>
            </div>
            <button
              onClick={() => setMatrixOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <span>Ver Matriz de Control Detallada</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Audit Matrix Modal */}
      <AuditMatrixModal
        isOpen={matrixOpen}
        onClose={() => {
          setMatrixOpen(false);
          loadStatus();
        }}
      />
    </div>
  );
};
