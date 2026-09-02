import React, { useState } from 'react';
import { ApdpComplaintInput, ApdpComplaintResult } from '../../types';
import { api } from '../../services/api';
import { X, Send, Copy, Download, CheckCircle2, AlertOctagon, Scale, FileText } from 'lucide-react';

interface ApdpComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrackingCode?: string;
  defaultCompany?: string;
  defaultRight?: string;
}

export const ApdpComplaintModal: React.FC<ApdpComplaintModalProps> = ({
  isOpen,
  onClose,
  defaultTrackingCode = '',
  defaultCompany = '',
  defaultRight = 'Acceso',
}) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<ApdpComplaintResult | null>(null);

  const [form, setForm] = useState<ApdpComplaintInput>({
    trackingCode: defaultTrackingCode,
    applicantName: '',
    applicantRut: '',
    applicantEmail: '',
    applicantPhone: '',
    respondentCompany: defaultCompany,
    rightType: defaultRight,
    originalDateStr: '2026-07-20',
    complaintReason: 'Silencio Administrativo (Superó el plazo legal de 30 días corridos sin respuesta)',
    specificFacts: 'Habiendo solicitado el derecho mediante canal oficial, transcurrieron más de 30 días sin recibir respuesta ni prórroga justificada.',
  });

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await api.generateApdpComplaint(form);
      setResult(res);
    } catch (e: any) {
      alert(e.message || 'Error al generar la reclamación');
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
      a.download = `Denuncia_APDP_${result.complaintCode}_${result.respondentCompany.replace(/\s+/g, '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Generador de Denuncia / Reclamo ante la APDP</h3>
              <p className="text-xs text-slate-400">Escrito formal por incumplimiento de plazos de 30 días o rechazo injustificado</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 flex-1 space-y-4">
          {!result ? (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl flex items-start gap-2">
                <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Fundamento Legal:</strong> Conforme al Art. 12 y 39 de la Ley, si el responsable no responde en 30 días corridos o deniega el derecho sin causal, incurre en <strong>infracción grave</strong> sancionable con multas de hasta 10.000 UTM.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Nombre Completo del Reclamante *</label>
                  <input
                    type="text"
                    value={form.applicantName}
                    onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                    placeholder="Ej. Camila Silva"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">RUT del Reclamante</label>
                  <input
                    type="text"
                    value={form.applicantRut}
                    onChange={(e) => setForm({ ...form, applicantRut: e.target.value })}
                    placeholder="Ej. 18.456.789-0"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={form.applicantEmail}
                    onChange={(e) => setForm({ ...form, applicantEmail: e.target.value })}
                    placeholder="tu.correo@ejemplo.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Teléfono Móvil</label>
                  <input
                    type="text"
                    value={form.applicantPhone}
                    onChange={(e) => setForm({ ...form, applicantPhone: e.target.value })}
                    placeholder="+56 9 1234 5678"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Empresa / Institución Denunciada *</label>
                  <input
                    type="text"
                    value={form.respondentCompany}
                    onChange={(e) => setForm({ ...form, respondentCompany: e.target.value })}
                    placeholder="Ej. Retail SpA"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Fecha de la Solicitud Inicial</label>
                  <input
                    type="date"
                    value={form.originalDateStr}
                    onChange={(e) => setForm({ ...form, originalDateStr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Motivo Principal del Reclamo</label>
                <select
                  value={form.complaintReason}
                  onChange={(e) => setForm({ ...form, complaintReason: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs"
                >
                  <option value="Silencio Administrativo (Superó el plazo legal de 30 días corridos sin respuesta)">
                    Silencio Administrativo (Superó los 30 días corridos sin respuesta)
                  </option>
                  <option value="Rechazo Injustificado o Denegación Ilegal">
                    Rechazo Injustificado o Denegación Ilegal
                  </option>
                  <option value="Respuesta Parcial, Engañosa o Incompleta">
                    Respuesta Parcial, Engañosa o Incompleta
                  </option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Relación de los Hechos</label>
                <textarea
                  rows={3}
                  value={form.specificFacts}
                  onChange={(e) => setForm({ ...form, specificFacts: e.target.value })}
                  placeholder="Detalla qué ocurrió..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-xs"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-rose-400 font-mono">
                    Código de Reclamación: {result.complaintCode}
                  </span>
                  <div className="text-xs text-white font-semibold mt-0.5">
                    Reclamación Formal lista para presentar ante la Agencia de Protección de Datos
                  </div>
                </div>
              </div>

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
                    className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-md text-[11px] font-semibold flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Descargar TXT</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Instrucciones de Presentación:</h4>
                <ul className="text-xs text-slate-300 space-y-1">
                  {result.agencySubmissionTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          {!result ? (
            <>
              <button onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold">
                Cancelar
              </button>
              <button
                disabled={loading}
                onClick={handleGenerate}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-600/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Generando...' : 'Generar Reclamo APDP'}</span>
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold ml-auto"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
