import React, { useState } from 'react';
import { Module } from '../../types';
import { BarsopWizard } from './BarsopWizard';
import { Shield, Lock, Trash2, Edit3, ArrowRightLeft, Eye, Clock, FileCheck, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface CitizenViewProps {
  modules: Module[];
  onSelectModule: (module: Module) => void;
}

export const CitizenView: React.FC<CitizenViewProps> = ({ modules, onSelectModule }) => {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [selectedRight, setSelectedRight] = useState('Acceso');

  const barsopItems = [
    { code: 'B', right: 'Bloqueo', icon: <Lock className="w-5 h-5 text-amber-400" />, desc: 'Suspender temporalmente el uso de tus datos mientras se aclara un error o litigio.' },
    { code: 'A', right: 'Acceso', icon: <Eye className="w-5 h-5 text-sky-400" />, desc: 'Saber qué datos tienen sobre ti, su origen, para qué los usan y a quién se los entregaron.' },
    { code: 'R', right: 'Rectificación', icon: <Edit3 className="w-5 h-5 text-indigo-400" />, desc: 'Actualizar o corregir información errónea, inexacta o desactualizada.' },
    { code: 'S', right: 'Supresión', icon: <Trash2 className="w-5 h-5 text-rose-400" />, desc: 'Exigir el borrado definitivo de tus datos de bases de datos y aplicaciones.' },
    { code: 'O', right: 'Oposición', icon: <Shield className="w-5 h-5 text-purple-400" />, desc: 'Negarte a que usen tus datos para telemarketing, publicidad o perfilamiento.' },
    { code: 'P', right: 'Portabilidad', icon: <ArrowRightLeft className="w-5 h-5 text-emerald-400" />, desc: 'Recibir tus datos en formato digital abierto (JSON/CSV) para llevarlos a otro servicio.' },
  ];

  const handleLaunchWizard = (right: string) => {
    setSelectedRight(right);
    setWizardOpen(true);
  };

  const level1 = modules.filter((m) => m.level === 1);
  const level2 = modules.filter((m) => m.level === 2);

  return (
    <div className="space-y-10">
      {/* Hero Citizen */}
      <div className="bg-gradient-to-br from-sky-950/60 via-slate-900 to-slate-950 border border-sky-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guía y Asistencia para el Ciudadano</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Conoce y Ejerce tus Derechos de Privacidad (BARSOP)
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            La nueva ley te otorga el control total sobre tu información personal. Todo trámite es <strong>100% gratuito</strong> y las organizaciones tienen la obligación legal de responder en un máximo de <strong>30 días corridos</strong>.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => handleLaunchWizard('Acceso')}
              className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>Generar Solicitud Formal BARSOP</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-amber-300 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Plazo perentorio de 30 días corridos</span>
            </div>
          </div>
        </div>
      </div>

      {/* BARSOP Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-extrabold text-white">Catálogo de Derechos BARSOP</h3>
            <p className="text-xs text-slate-400">Haz clic en cualquier derecho para redactar tu solicitud formal</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {barsopItems.map((b) => (
            <div
              key={b.code}
              className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-5 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-sky-500/5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    {b.icon}
                  </div>
                  <span className="text-xs font-mono font-black text-slate-600 group-hover:text-sky-400 transition-colors">
                    [{b.code}]
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{b.right}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleLaunchWizard(b.right)}
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  <span>Ejercer este derecho</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nivel 1 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-xs font-mono">Nivel 1</span>
              Fundamento & Conceptos
            </h4>
            <span className="text-[11px] text-slate-500">{level1.length} módulos</span>
          </div>

          <div className="space-y-2.5">
            {level1.map((mod) => (
              <div
                key={mod.id}
                onClick={() => onSelectModule(mod)}
                className="p-3.5 bg-slate-900/60 hover:bg-slate-800/70 border border-slate-800/80 hover:border-slate-700 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                    {mod.code} {mod.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{mod.summary}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Nivel 2 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-xs font-mono">Nivel 2</span>
              Derechos en Profundidad & Casos
            </h4>
            <span className="text-[11px] text-slate-500">{level2.length} módulos</span>
          </div>

          <div className="space-y-2.5">
            {level2.map((mod) => (
              <div
                key={mod.id}
                onClick={() => onSelectModule(mod)}
                className="p-3.5 bg-slate-900/60 hover:bg-slate-800/70 border border-slate-800/80 hover:border-slate-700 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                    {mod.code} {mod.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{mod.summary}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BARSOP Wizard Modal */}
      <BarsopWizard
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        defaultRight={selectedRight}
      />
    </div>
  );
};
