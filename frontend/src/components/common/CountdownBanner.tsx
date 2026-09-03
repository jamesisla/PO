import React, { useState, useEffect } from 'react';
import { CountdownInfo } from '../../types';
import { api } from '../../services/api';
import { Calendar, ChevronRight, AlertTriangle, ShieldCheck, Flag } from 'lucide-react';

interface CountdownBannerProps {
  info?: CountdownInfo | null;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ info: propInfo }) => {
  const [showMilestones, setShowMilestones] = useState(false);
  const [info, setInfo] = useState<CountdownInfo | null>(propInfo || null);

  useEffect(() => {
    if (!propInfo) {
      api.getCountdown().then(setInfo).catch(console.error);
    } else {
      setInfo(propInfo);
    }
  }, [propInfo]);

  if (!info) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-lg">
      <div>
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
            <p className="text-xs text-slate-400 max-w-2xl">
              Plazo de gracia legal para adecuación integral de gobernanza, consentimiento, contratos con encargados y portal BARSOP.
            </p>
          </div>

          {/* Countdown Display */}
          <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 shrink-0">
            <div className="text-center px-3 py-1">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-amber-400">
                {info.daysRemaining}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Días</span>
            </div>
            <div className="text-xl font-mono text-slate-600">:</div>
            <div className="text-center px-3 py-1">
              <span className="block text-2xl sm:text-3xl font-black font-mono text-amber-400">
                {info.hoursRemaining}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Horas</span>
            </div>
          </div>
        </div>

        {/* Milestones Toggle */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2">
          <button
            onClick={() => setShowMilestones(!showMilestones)}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
          >
            <span>{showMilestones ? 'Ocultar cronograma de hitos' : 'Ver cronograma de hitos hacia la vigencia'}</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showMilestones ? 'rotate-90' : ''}`} />
          </button>
          <span className="text-[11px] text-slate-500">Multas máximas: Hasta 20.000 UTM o 4% de facturación anual</span>
        </div>

        {/* Milestones Accordion */}
        {showMilestones && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 animate-in fade-in duration-200">
            {info.milestones.map((ms, idx) => (
              <div
                key={ms.id}
                className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 ${
                  ms.status === 'completed'
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : ms.status === 'in_progress'
                    ? 'bg-amber-950/20 border-amber-500/30'
                    : 'bg-slate-950/40 border-slate-800/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-slate-400">Hito 0{idx + 1}</span>
                    <span className={ms.status === 'completed' ? 'text-emerald-400 font-bold' : ms.status === 'in_progress' ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                      {ms.targetDate}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">{ms.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{ms.description}</p>
                </div>
                <div className="pt-2 border-t border-slate-800/60 text-[10px] text-sky-400 font-medium">
                  {ms.recommendedAction}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
