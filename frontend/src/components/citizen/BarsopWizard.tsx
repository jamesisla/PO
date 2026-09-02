import React, { useState } from 'react';
import { BarsopRequestInput, BarsopRequestResult } from '../../types';
import { api } from '../../services/api';
import { X, Send, Copy, Download, CheckCircle2, Shield, Calendar, AlertCircle } from 'lucide-react';

interface BarsopWizardProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRight?: string;
}

export const BarsopWizard: React.FC<BarsopWizardProps> = ({
  isOpen,
  onClose,
  defaultRight = 'Acceso',
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState<BarsopRequestInput>({
    rightType: defaultRight,
    applicantName: '',
    applicantRut: '',
    applicantEmail: '',
    applicantPhone: '',
    recipientCompany: '',
    recipientEmail: '',
    specificDetails: '',
    evidenceDetails: '',
    formatPreference: 'Digital (Correo electrónico)',
  });

  const [result, setResult] = useState<BarsopRequestResult | null>(null);

  if (!isOpen) return null;

  const rights = [
    { id: 'Acceso', label: 'Acceso', desc: 'Conocer qué datos tienen y cómo los usan.' },
    { id: 'Rectificacion', label: 'Rectificación', desc: 'Corregir datos inexactos o incompletos.' },
    { id: 'Supresion', label: 'Supresión (Borrado)', desc: 'Eliminar mis datos de forma definitiva.' },
    { id: 'Oposicion', label: 'Oposición', desc: 'Negarme al uso para publicidad o prospección.' },
    { id: 'Portabilidad', label: 'Portabilidad', desc: 'Recibir mis datos en archivo JSON o CSV.' },
    { id: 'Bloqueo', label: 'Bloqueo', desc: 'Suspender el uso mientras se resuelve una disputa.' },
  ];

  const handleGenerate = async () => {
    if (!form.applicantName || !form.recipientCompany) {
      setError('Por favor completa el nombre del titular y la empresa destinataria.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await api.generateBarsop(form);
      setResult(res);
      setStep(3);
    } catch (e: any) {
      setError(e.message || 'Error generando documento');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.documentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result.documentText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Solicitud_BARSOP_${result.rightType}_${result.recipientCompany.replace(/\s+/g, '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Generador de Solicitud BARSOP</h3>
              <p className="text-xs text-slate-400">Carta legal formal con plazo obligatorio de 30 días corridos</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Breadcrumb */}
        <div className="px-6 py-2.5 bg-slate-950/30 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <span className={`font-semibold ${step === 1 ? 'text-sky-400' : 'text-slate-500'}`}>1. Seleccionar Derecho</span>
          <span className="text-slate-700">→</span>
          <span className={`font-semibold ${step === 2 ? 'text-sky-400' : 'text-slate-500'}`}>2. Datos & Empresa</span>
          <span className="text-slate-700">→</span>
          <span className={`font-semibold ${step === 3 ? 'text-emerald-400' : 'text-slate-500'}`}>3. Carta Generada</span>
        </div>

        {/* Error message */}
        {error && (
          <div className="m-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Wizard Steps */}
        <div className="overflow-y-auto p-5 flex-1 space-y-4">
          {/* STEP 1: Right Selection */}
          {step === 1 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                ¿Qué derecho deseas ejercer ante la empresa?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {rights.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setForm({ ...form, rightType: r.id })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      form.rightType === r.id
                        ? 'bg-sky-500/10 border-sky-500 text-white shadow-md shadow-sky-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs mb-1 text-sky-400">{r.label}</div>
                    <div className="text-[11px] text-slate-400 leading-snug">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Input Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Nombre Completo del Titular *</label>
                  <input
                    type="text"
                    value={form.applicantName}
                    onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                    placeholder="Ej. Juan Pérez González"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">RUT del Titular</label>
                  <input
                    type="text"
                    value={form.applicantRut}
                    onChange={(e) => setForm({ ...form, applicantRut: e.target.value })}
                    placeholder="Ej. 12.345.678-9"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Correo Electrónico de Contacto</label>
                  <input
                    type="email"
                    value={form.applicantEmail}
                    onChange={(e) => setForm({ ...form, applicantEmail: e.target.value })}
                    placeholder="tu.correo@ejemplo.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Teléfono Móvil</label>
                  <input
                    type="text"
                    value={form.applicantPhone}
                    onChange={(e) => setForm({ ...form, applicantPhone: e.target.value })}
                    placeholder="+56 9 1234 5678"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Empresa / Institución Responsable *</label>
                  <input
                    type="text"
                    value={form.recipientCompany}
                    onChange={(e) => setForm({ ...form, recipientCompany: e.target.value })}
                    placeholder="Ej. Banco / App / Retail S.A."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Email del DPD o Privacidad (Opcional)</label>
                  <input
                    type="email"
                    value={form.recipientEmail}
                    onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })}
                    placeholder="privacidad@empresa.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Detalle o Motivo Específico</label>
                <textarea
                  rows={3}
                  value={form.specificDetails}
                  onChange={(e) => setForm({ ...form, specificDetails: e.target.value })}
                  placeholder="Explica brevemente qué datos deseas rectificar, borrar, consultar o de cuáles te opones..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Generated Result */}
          {step === 3 && result && (
            <div className="space-y-4">
              {/* Deadline card */}
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Plazo Legal Máximo de Respuesta (30 días corridos):
                  </div>
                  <div className="text-sm font-extrabold text-white font-mono mt-0.5">
                    {result.deadlineDateStr}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    Trámite 100% Gratuito
                  </span>
                </div>
              </div>

              {/* Document Preview */}
              <div className="relative">
                <textarea
                  readOnly
                  rows={12}
                  value={result.documentText}
                  className="w-full bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800 rounded-xl p-3.5 focus:outline-none leading-relaxed select-all"
                />
                <div className="absolute top-2 right-2 flex gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-[11px] font-semibold flex items-center gap-1 border border-slate-700"
                  >
                    {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-md text-[11px] font-semibold flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Descargar TXT</span>
                  </button>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Pasos Siguientes:</h4>
                <ul className="text-xs text-slate-300 space-y-1">
                  {result.nextStepsGuidelines.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          {step > 1 && step < 3 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
            >
              Atrás
            </button>
          ) : (
            <div />
          )}

          {step === 1 && (
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-bold"
            >
              Continuar
            </button>
          )}

          {step === 2 && (
            <button
              disabled={loading}
              onClick={handleGenerate}
              className="px-5 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{loading ? 'Generando...' : 'Generar Carta Formal'}</span>
            </button>
          )}

          {step === 3 && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold"
            >
              Finalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
