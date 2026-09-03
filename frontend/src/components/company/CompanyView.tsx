import React, { useState } from 'react';
import { Module } from '../../types';
import { GapAnalysisModal } from './GapAnalysisModal';
import { RatViewer } from './RatViewer';
import { DpaManagerModal } from './DpaManagerModal';
import { IncidentManagerModal } from './IncidentManagerModal';
import { CompanyBarsopInboxModal } from './CompanyBarsopInboxModal';
import { Building2, Award, Database, AlertOctagon, UserCheck, ShieldCheck, ChevronRight, Sparkles, Shield, FileText, Inbox } from 'lucide-react';

interface CompanyViewProps {
  modules: Module[];
  onSelectModule: (module: Module) => void;
}

export const CompanyView: React.FC<CompanyViewProps> = ({ modules, onSelectModule }) => {
  const [gapModalOpen, setGapModalOpen] = useState(false);
  const [ratModalOpen, setRatModalOpen] = useState(false);
  const [dpaModalOpen, setDpaModalOpen] = useState(false);
  const [incidentModalOpen, setIncidentModalOpen] = useState(false);
  const [inboxModalOpen, setInboxModalOpen] = useState(false);

  const level3 = modules.filter((m) => m.level === 3);
  const level4 = modules.filter((m) => m.level === 4);

  return (
    <div className="space-y-10">
      {/* Hero Company */}
      <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gobernanza & Cumplimiento Empresarial</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Obligaciones, RAT, Proveedores DPA y Protocolo 72 Horas
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Consola integral para el Directorio, Oficiales de Cumplimiento (DPD) y Gerencias. Mantén al día el inventario de tratamientos, supervisa contratos con encargados y responde ante brechas de seguridad.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setInboxModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Inbox className="w-4 h-4" />
              <span>Bandeja BARSOP Entrante (Gestionar)</span>
            </button>
            <button
              onClick={() => setGapModalOpen(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Award className="w-4 h-4 text-indigo-400" />
              <span>Autodiagnóstico (Gap Analysis)</span>
            </button>
            <button
              onClick={() => setRatModalOpen(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Inventario RAT</span>
            </button>
            <button
              onClick={() => setDpaModalOpen(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Gestor Proveedores DPA</span>
            </button>
            <button
              onClick={() => setIncidentModalOpen(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            >
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>Libro de Brechas (72h)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setIncidentModalOpen(true)}
          className="bg-slate-900 border border-slate-800 hover:border-rose-500/40 rounded-xl p-4.5 space-y-2 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
              <AlertOctagon className="w-4 h-4" />
              <span>Protocolo de 72 Horas</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-rose-400 transition-colors" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Reporte formal a la Agencia dentro de 72h ante vulneraciones que entrañen riesgo para los titulares.
          </p>
        </div>

        <div
          onClick={() => setDpaModalOpen(true)}
          className="bg-slate-900 border border-slate-800 hover:border-sky-500/40 rounded-xl p-4.5 space-y-2 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Contratos DPA con Proveedores</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition-colors" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Supervisión contractual obligatoria para el 100% de proveedores tecnológicos con acceso a bases de datos.
          </p>
        </div>

        <div
          onClick={() => setRatModalOpen(true)}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4.5 space-y-2 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Database className="w-4 h-4" />
              <span>Registro RAT Obligatorio</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Inventario unificado de bases de datos, finalidades, plazos de conservación y bases de licitud.
          </p>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nivel 3 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono">Nivel 3</span>
              Obligaciones de las Organizaciones
            </h4>
            <span className="text-[11px] text-slate-500">{level3.length} módulos</span>
          </div>

          <div className="space-y-2.5">
            {level3.map((mod) => (
              <div
                key={mod.id}
                onClick={() => onSelectModule(mod)}
                className="p-3.5 bg-slate-900/60 hover:bg-slate-800/70 border border-slate-800/80 hover:border-slate-700 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {mod.code} {mod.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{mod.summary}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Nivel 4 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono">Nivel 4</span>
              Gobernanza, DPD y Evaluación de Impacto
            </h4>
            <span className="text-[11px] text-slate-500">{level4.length} módulos</span>
          </div>

          <div className="space-y-2.5">
            {level4.map((mod) => (
              <div
                key={mod.id}
                onClick={() => onSelectModule(mod)}
                className="p-3.5 bg-slate-900/60 hover:bg-slate-800/70 border border-slate-800/80 hover:border-slate-700 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {mod.code} {mod.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{mod.summary}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CompanyBarsopInboxModal isOpen={inboxModalOpen} onClose={() => setInboxModalOpen(false)} />
      <GapAnalysisModal isOpen={gapModalOpen} onClose={() => setGapModalOpen(false)} />
      <RatViewer isOpen={ratModalOpen} onClose={() => setRatModalOpen(false)} />
      <DpaManagerModal isOpen={dpaModalOpen} onClose={() => setDpaModalOpen(false)} />
      <IncidentManagerModal isOpen={incidentModalOpen} onClose={() => setIncidentModalOpen(false)} />
    </div>
  );
};
