import React, { useState, useEffect } from 'react';
import { SanctionResult } from '../../types';
import { api } from '../../services/api';
import { Calculator, AlertTriangle, DollarSign, Scale, Info, ShieldAlert } from 'lucide-react';

export const SanctionsCalculator: React.FC = () => {
  const [infractionType, setInfractionType] = useState<'leve' | 'grave' | 'gravisima'>('grave');
  const [isReoffending, setIsReoffending] = useState(false);
  const [annualTurnover, setAnnualTurnover] = useState<string>('5000000000');
  const [utmValue, setUtmValue] = useState<string>('67000');
  const [result, setResult] = useState<SanctionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await api.calculateSanctions({
        infractionType,
        isReoffending,
        annualTurnoverCLP: parseFloat(annualTurnover) || 0,
        utmValueCLP: parseFloat(utmValue) || 67000,
      });
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [infractionType, isReoffending, annualTurnover, utmValue]);

  const formatCLP = (val: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Calculadora de Exposición a Sanciones APDP</h3>
            <p className="text-xs text-slate-400">Graduación en UTM y tope de 4% de facturación anual por reincidencia</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">Gravedad de la Infracción</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'leve', label: 'Leve', sub: 'Hasta 5.000 UTM' },
                { id: 'grave', label: 'Grave', sub: 'Hasta 10.000 UTM' },
                { id: 'gravisima', label: 'Gravísima', sub: 'Hasta 20.000 UTM / 4%' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setInfractionType(t.id as any)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    infractionType === t.id
                      ? 'bg-rose-500/10 border-rose-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs">{t.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{t.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-200">Reincidencia / Reiteración</div>
              <div className="text-[11px] text-slate-400">Aplica duplicación o cálculo porcentual sobre ingresos</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isReoffending}
                onChange={(e) => setIsReoffending(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Facturación Anual (CLP)</label>
              <input
                type="number"
                value={annualTurnover}
                onChange={(e) => setAnnualTurnover(e.target.value)}
                placeholder="5000000000"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Valor Estimado UTM (CLP)</label>
              <input
                type="number"
                value={utmValue}
                onChange={(e) => setUtmValue(e.target.value)}
                placeholder="67000"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>
        </div>

        {result && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Multa Máxima Aplicable
                </span>
                <span className="text-[11px] font-mono text-rose-400 font-bold">
                  {result.maxUtm.toLocaleString('es-CL')} UTM
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono tracking-tight">
                {formatCLP(result.calculatedFineCLP)}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{result.legalReference}</p>
            </div>

            <div className="space-y-2 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{result.explanation}</span>
              </div>
            </div>

            {result.turnoverCapPercent > 0 && result.isReoffending && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-xs">
                <strong>Nota de Agravamiento:</strong> Se consideró el 4% de la facturación declarada ({formatCLP(result.turnoverCapCLP)}) por reincidencia gravísima.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
