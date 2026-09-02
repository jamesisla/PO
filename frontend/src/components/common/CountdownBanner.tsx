import React, { useState } from 'react';
import { CountdownInfo } from '../../types';
import { Calendar, ChevronRight, AlertTriangle, ShieldCheck, Flag } from 'lucide-react';

interface CountdownBannerProps {
  info: CountdownInfo | null;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ info }) => {
  const [showMilestones, setShowMilestones] = useState(false);

  if (!info) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Main Info */}
          <div className="space-y-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Vigencia Legal Obligatoria: 1 de Diciembre de 2026
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Cuenta Regresiva para la Nueva Ley de Datos Personales
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Toda organización pública o privada debe adecuar sus procesos antes de la fecha límite para evitar sanciones de hasta 20.000 UTM y el 4% de su facturación anual.
            </p>
          </div>

          {/* Countdown Cards */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center min-w-[72px] shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-sky-400 block font-mono">
                {info.daysRemaining}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Días</span>
            </div>
            <div className="text-slate-600 font-bold text-xl">:</div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center min-w-[72px] shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-sky-400 block font-mono">
                {info.hoursRemaining}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Horas</span>
            </div>
            <div className="text-slate-600 font-bold text-xl">:</div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center min-w-[72px] shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 block font-mono">
                100%
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Obligación</span>
            </div>

            <button
              onClick={() => setShowMilestones(!showMilestones)}
              className="ml-2 px-3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
            >
              <span>Hitos 2026</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showMilestones ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* Collapsible Milestones Roadmap */}
        {showMilestones && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-400" />
                Cronograma e Hitos Críticos de Cumplimiento
              </h2>
              <span className="text-xs text-slate-400">Ruta recomendada para evitar contingencias</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {info.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold text-sky-400">{m.targetDate}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                        Hito {idx + 1}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1 leading-tight">{m.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{m.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-900 text-[10px] text-amber-300 font-medium flex items-start gap-1">
                    <Flag className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                    <span>{m.recommendedAction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
