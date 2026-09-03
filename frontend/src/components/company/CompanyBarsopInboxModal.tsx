import React, { useState, useEffect } from 'react';
import { CitizenTrackedRequest } from '../../types';
import { api } from '../../services/api';
import { X, Inbox, CheckCircle2, XCircle, Clock, AlertTriangle, Scale, Check, ShieldCheck, Filter } from 'lucide-react';

interface CompanyBarsopInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}

export const CompanyBarsopInboxModal: React.FC<CompanyBarsopInboxModalProps> = ({ isOpen, onClose, onUpdated }) => {
  const [requests, setRequests] = useState<CitizenTrackedRequest[]>([]);
  const [selectedReq, setSelectedReq] = useState<CitizenTrackedRequest | null>(null);
  const [resolutionStatus, setResolutionStatus] = useState<string>('Aceptada / Ejecutada');
  const [legalNotes, setLegalNotes] = useState<string>('');
  const [resolvedBy, setResolvedBy] = useState<string>('Oficial de Cumplimiento / DPD');
  const [loading, setLoading] = useState(false);

  const loadRequests = () => {
    api.getCitizenRequests().then(setRequests).catch(console.error);
  };

  useEffect(() => {
    if (isOpen) {
      loadRequests();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleResolve = async () => {
    if (!selectedReq) return;
    setLoading(true);
    try {
      await api.updateBarsopStatus(selectedReq.id, {
        status: resolutionStatus,
        legalGroundNotes: legalNotes || `Resolución emitida bajo la Ley 21.719 - Estado: ${resolutionStatus}`,
        resolvedBy: resolvedBy || 'Oficial de Privacidad',
      });
      setSelectedReq(null);
      setLegalNotes('');
      loadRequests();
      if (onUpdated) onUpdated();
    } catch (e: any) {
      alert(e.message || 'Error actualizando estado de la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const pendingCount = requests.filter((r) => r.status === 'En Plazo' || r.status === 'Riesgo Vencimiento').length;
  const overdueCount = requests.filter((r) => r.status === 'Vencida (Expirada)').length;
  const resolvedCount = requests.filter((r) => r.status === 'Aceptada / Ejecutada' || r.status === 'Denegada con Causal Legal' || r.status === 'Respondida').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-xl">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Bandeja de Gestión de Solicitudes BARSOP (Portal Empresa)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tramitación de derechos ciudadanos con estados legales conforme a la Ley de Protección de Datos</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SLA Status Badges */}
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <Clock className="w-4 h-4 text-sky-500" />
              Pendientes en SLA: <strong className="font-mono text-sky-600 dark:text-sky-400">{pendingCount}</strong>
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Vencidas (Riesgo APDP): <strong className="font-mono text-rose-600 dark:text-rose-400">{overdueCount}</strong>
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Resueltas: <strong className="font-mono text-emerald-600 dark:text-emerald-400">{resolvedCount}</strong>
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Plazo Legal Perentorio: 30 Días Corridos</span>
        </div>

        {/* Main Area */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Solicitudes Recibidas ({requests.length})
              </h4>
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    onClick={() => {
                      setSelectedReq(req);
                      setResolutionStatus(req.status === 'Vencida (Expirada)' ? 'Aceptada / Ejecutada' : req.status);
                      setLegalNotes(req.legalGroundNotes || '');
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedReq?.id === req.id
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 ring-1 ring-indigo-500/50'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        {req.trackingCode}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        req.status === 'Aceptada / Ejecutada' || req.status === 'Respondida'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : req.status === 'Denegada con Causal Legal'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : req.status === 'Vencida (Expirada)'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                          : 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Derecho de {req.rightType} — <span className="font-normal text-slate-600 dark:text-slate-300">{req.applicantName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between mt-1">
                      <span>RUT: {req.applicantRut || 'No especificado'}</span>
                      <span>{req.daysRemaining > 0 ? `${req.daysRemaining} días restantes` : 'Plazo expirado'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail / Action Form */}
            <div className="p-4.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
              {selectedReq ? (
                <div className="space-y-4 text-xs">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 block">
                      Gestión de Ticket: {selectedReq.trackingCode}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                      Titular: {selectedReq.applicantName}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      Derecho Solicitado: <strong>{selectedReq.rightType}</strong> · Fecha Ingreso: {selectedReq.requestDateStr}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 dark:text-slate-300 block">
                      Resolución Jurídica de la Empresa (Conforme a la Ley) *
                    </label>
                    <select
                      value={resolutionStatus}
                      onChange={(e) => setResolutionStatus(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white font-medium"
                    >
                      <option value="Aceptada / Ejecutada">
                        ✅ Aceptada / Ejecutada (Cumplimiento íntegro sin costo)
                      </option>
                      <option value="Denegada con Causal Legal">
                        ❌ Denegada con Causal Legal (Fundamentación obligatoria Art. 14)
                      </option>
                      <option value="Prórroga Fundada">
                        ⏳ Prórroga Fundada (Por complejidad técnica - Máx 30 días)
                      </option>
                      <option value="En Plazo">
                        🔄 En Revisión / Trámite interno
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 dark:text-slate-300 block">
                      Fundamento Legal / Detalle de la Notificación al Titular *
                    </label>
                    <textarea
                      rows={4}
                      value={legalNotes}
                      onChange={(e) => setLegalNotes(e.target.value)}
                      placeholder="Ej. Se procedió a la eliminación irrevocable de los datos de contacto en las bases de datos de marketing. O: Se rechaza conforme al Art. 14 por obligación tributaria de conservación de facturas ante el SII por 6 años."
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 dark:text-slate-300 block">
                      Responsable que Emite la Resolución
                    </label>
                    <input
                      type="text"
                      value={resolvedBy}
                      onChange={(e) => setResolvedBy(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedReq(null)}
                      className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      disabled={loading}
                      onClick={handleResolve}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                    >
                      <Check className="w-4 h-4" />
                      <span>{loading ? 'Guardando...' : 'Aplicar Resolución Legal'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center space-y-2">
                  <Inbox className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Selecciona una solicitud de la lista para tramitarla, emitir respuesta o justificar causal legal de denegación.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">Toda resolución queda registrada para trazabilidad en la Matriz de Auditoría</span>
          <button onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold">
            Cerrar Bandeja
          </button>
        </div>
      </div>
    </div>
  );
};
