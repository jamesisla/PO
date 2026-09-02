import React, { useState } from 'react';
import { Module } from '../../types';
import { GapAnalysisModal } from './GapAnalysisModal';
import { RatViewer } from './RatViewer';
import { Building2, Award, Database, AlertOctagon, UserCheck, ShieldCheck, ChevronRight, Sparkles, FileText } from 'lucide-react';

interface CompanyViewProps {
  modules: Module[];
  onSelectModule: (module: Module) => void;
}

export const CompanyView: React.FC<CompanyViewProps> = ({ modules, onSelectModule }) => {
  const [gapModalOpen, setGapModalOpen] = useState(false);
  const [ratModalOpen, setRatModalOpen] = useState(false);

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
            Obligaciones, RAT y Gestión de Riesgos para Organizaciones
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Implementa las medidas de responsabilidad proactiva (<em>Accountability</em>), inventario de tratamientos (RAT), contratos DPA con proveedores y protocolo de brechas de 72 horas.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setGapModalOpen(true)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>Realizar Gap Analysis (Autodiagnóstico)</span>
            </button>
            <button
              onClick={() => setRatModalOpen(true)}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Gestionar Inventario RAT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
            <AlertOctagon className="w-4 h-4" />
            <span>Protocolo de 72 Horas</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Obligación estricta de notificar a la Agencia ante vulneraciones de seguridad que representen riesgo para los titulares.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <UserCheck className="w-4 h-4" />
            <span>Delegado de Datos (DPD)</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Designación obligatoria en el sector público y organizaciones con tratamiento masivo o sistemático de datos personales.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Contratos DPA con Proveedores</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Todos los encargados de tratamiento (cloud, SaaS, soporte) deben firmar anexos de confidencialidad y no subcontratación.
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
      <GapAnalysisModal isOpen={gapModalOpen} onClose={() => setGapModalOpen(false)} />
      <RatViewer isOpen={ratModalOpen} onClose={() => setRatModalOpen(false)} />
    </div>
  );
};
