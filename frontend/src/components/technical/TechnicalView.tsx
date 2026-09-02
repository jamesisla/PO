import React, { useState } from 'react';
import { Module } from '../../types';
import { SanctionsCalculator } from './SanctionsCalculator';
import { Terminal, Shield, Lock, Cpu, Server, CheckSquare, ChevronRight, Layers } from 'lucide-react';

interface TechnicalViewProps {
  modules: Module[];
  onSelectModule: (module: Module) => void;
}

export const TechnicalView: React.FC<TechnicalViewProps> = ({ modules, onSelectModule }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<'pyme' | 'large' | 'health' | 'fintech' | 'public'>('pyme');

  const level5 = modules.filter((m) => m.level === 5);
  const transversal = modules.filter((m) => m.level === 0);

  const checklists = {
    pyme: [
      'Cifrado de backups y bases de datos en reposo (AES-256).',
      'Aviso de privacidad web actualizado con canal de correo para derechos.',
      'Contratos DPA firmados con proveedor de hosting y CRM.',
      'Doble factor de autenticación (MFA) habilitado en correos y accesos admin.',
    ],
    large: [
      'Designación y registro formal del Delegado de Protección de Datos (DPD).',
      'Registro de Actividades de Tratamiento (RAT) con sincronización continua.',
      'Evaluación de Impacto en Protección de Datos (EIPD) para algoritmos de IA.',
      'Monitoreo SIEM 24/7 con detección de anomalías para alerta en 72 horas.',
    ],
    health: [
      'Aislamiento estricto y cifrado en base de datos de fichas clínicas.',
      'Consentimiento expreso cualificado para tratamiento de datos de salud y biometría.',
      'Auditoría inmutable de cada consulta individual realizada por personal médico.',
      'Protocolo reforzado de respuesta a incidentes y desanonimización.',
    ],
    fintech: [
      'Cumplimiento de estándares duales CMF (Comisión para el Mercado Financiero) y APDP.',
      'Endpoints de portabilidad financiera y de datos en formato JSON estandarizado.',
      'Prevención de discriminación algorítmica en modelos de scoring crediticio.',
      'Cifrado de extremo a extremo en transacciones y tokens de pago.',
    ],
    public: [
      'Designación obligatoria e indelegable de Delegado de Protección de Datos.',
      'Coordinación entre Ley de Protección de Datos y Ley de Transparencia.',
      'Portal único de atención ciudadana con autenticación ClaveÚnica.',
      'Registro de transferencias interoperables entre órganos del Estado.',
    ],
  };

  return (
    <div className="space-y-10">
      {/* Hero Technical */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>Guía Técnica para Ingenieros, Arquitectos TI y Ciberseguridad</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Arquitectura de Datos, Cifrado, APIs y Sanciones
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Estándares operacionales requeridos: cifrado AES-256, TLS 1.3, gestión de consentimientos (CMP), automatización de SLAs de 30 días y calculadora de riesgo sancionatorio.
          </p>
        </div>
      </div>

      {/* Technical Architecture Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-2">
          <div className="p-2 bg-sky-500/10 text-sky-400 w-fit rounded-lg">
            <Lock className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white">Cifrado & Hashing</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            AES-256 en reposo, TLS 1.3 obligatorio en tránsito y contraseñas con Argon2id o bcrypt.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 w-fit rounded-lg">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white">Consent CMP</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Versionado de consentimientos con timestamp, IP y webhook de revocación en tiempo real.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-2">
          <div className="p-2 bg-purple-500/10 text-purple-400 w-fit rounded-lg">
            <Cpu className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white">Pipelines BARSOP</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Extracción automatizada de datos del usuario y trazabilidad de SLA de 30 días corridos.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-2">
          <div className="p-2 bg-rose-500/10 text-rose-400 w-fit rounded-lg">
            <Server className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white">SIEM & 72h Alert</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Detección de accesos anómalos a bases de datos y exportación de reportes a la APDP.
          </p>
        </div>
      </div>

      {/* Sanctions Calculator Section */}
      <SanctionsCalculator />

      {/* Sector Checklists */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-white">Checklists Técnicos por Tipo de Organización</h3>
            <p className="text-xs text-slate-400">Verificaciones de control según la naturaleza del negocio</p>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'pyme', label: 'PyMEs' },
              { id: 'large', label: 'Grandes Empresas' },
              { id: 'health', label: 'Salud' },
              { id: 'fintech', label: 'Fintech' },
              { id: 'public', label: 'Sector Público' },
            ].map((ind) => (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id as any)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  selectedIndustry === ind.id
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {ind.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {checklists[selectedIndustry].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-950/80 border border-slate-800/90 rounded-xl flex items-start gap-3"
            >
              <span className="text-sky-400 font-bold mt-0.5">✓</span>
              <span className="text-xs text-slate-300 leading-relaxed font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modules Grid Nivel 5 & Transversal */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-xs font-mono">Nivel 5 & Transversal</span>
            Módulos Técnicos y Régimen Sancionatorio
          </h4>
          <span className="text-[11px] text-slate-500">{level5.length + transversal.length} módulos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[...level5, ...transversal].map((mod) => (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              className="p-4 bg-slate-900/60 hover:bg-slate-800/70 border border-slate-800/80 hover:border-slate-700 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                  {mod.code === 'transversal' ? 'TRANSVERSAL' : mod.code} — {mod.title}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1">{mod.summary}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
