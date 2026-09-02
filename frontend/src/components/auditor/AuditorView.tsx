import React, { useState } from 'react';
import { Module } from '../../types';
import { AuditMatrixModal } from './AuditMatrixModal';
import { ClipboardCheck, ShieldCheck, Scale, FileText, CheckCircle2, ChevronRight, Sparkles, AlertOctagon } from 'lucide-react';

interface AuditorViewProps {
  modules: Module[];
  onSelectModule: (module: Module) => void;
}

export const AuditorView: React.FC<AuditorViewProps> = ({ modules, onSelectModule }) => {
  const [matrixOpen, setMatrixOpen] = useState(false);

  return (
    <div className="space-y-10">
      {/* Hero Auditor */}
      <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Módulo de Auditoría de Cumplimiento & Evidencias</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Matriz de Control y Dictamen de Auditoría Legal
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Herramientas estandarizadas para auditores internos, oficiales de cumplimiento (DPD) e inspectores. Verifica el 100% de los controles obligatorios para la entrada en vigor del <strong>1 de Diciembre de 2026</strong>.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setMatrixOpen(true)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Ejecutar Matriz de Control de Auditoría</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Categories Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Trazabilidad de Bases de Licitud</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Verificación documental de consentimientos expresos, contratos y tests de ponderación de interés legítimo.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold">
            <Scale className="w-4 h-4" />
            <span>Auditoría de Encargados DPA</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Comprobación de cláusulas obligatorias de confidencialidad y destrucción de datos en el 100% de proveedores cloud.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
            <AlertOctagon className="w-4 h-4" />
            <span>Registro y SLA BARSOP (30 Días)</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Auditoría de tiempos de respuesta a titulares para evitar sanciones automáticas por silencio administrativo.
          </p>
        </div>
      </div>

      {/* Audit Matrix Modal */}
      <AuditMatrixModal isOpen={matrixOpen} onClose={() => setMatrixOpen(false)} />
    </div>
  );
};
