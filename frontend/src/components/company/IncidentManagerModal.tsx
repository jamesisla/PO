import React, { useState, useEffect } from 'react';
import { IncidentLog } from '../../types';
import { api } from '../../services/api';
import { X, AlertOctagon, Plus, Clock, FileText, Send, CheckCircle2 } from 'lucide-react';

interface IncidentManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}

export const IncidentManagerModal: React.FC<IncidentManagerModalProps> = ({ isOpen, onClose, onUpdated }) => {
  const [incidents, setIncidents] = useState<IncidentLog[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<IncidentLog | null>(null);

  const [newInc, setNewInc] = useState({
    title: '',
    threatType: 'Exfiltración de base de datos',
    affectedDataTypes: 'RUTs, nombres y teléfonos',
    estimatedRecordsCount: 50,
    highRiskForTitulars: true,
    hoursElapsed: 12,
    status: 'En Contención (0-12h)',
    mitigationSummary: 'Aislamiento de red, rotación de credenciales y respaldo seguro.',
  });

  const loadIncidents = () => {
    api.getIncidents().then(setIncidents).catch(console.error);
  };

  useEffect(() => {
    if (isOpen) {
      loadIncidents();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdd = async () => {
    if (!newInc.title) return;
    try {
      await api.addIncident(newInc);
      setShowAdd(false);
      loadIncidents();
      if (onUpdated) onUpdated();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Libro de Registro de Brechas & Protocolo 72 Horas</h3>
              <p className="text-xs text-slate-400">Contención, evaluación y reporte obligatorio a la APDP (Art. 16)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 72h Rule Card */}
        <div className="px-5 py-3 border-b border-slate-800 bg-rose-950/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-rose-300">
            <Clock className="w-4 h-4 text-rose-400" />
            <span><strong>Regla de las 72 Horas:</strong> Notificar a la Agencia por medios expeditos sin dilación indebida.</span>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Registrar Nuevo Incidente</span>
          </button>
        </div>

        {/* Content List */}
        <div className="overflow-y-auto p-5 space-y-4 flex-1">
          {showAdd && (
            <div className="p-4 bg-slate-950 border border-rose-500/30 rounded-xl space-y-3 text-xs">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Nuevo Reporte de Incidente</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Título del Incidente *</label>
                  <input
                    type="text"
                    value={newInc.title}
                    onChange={(e) => setNewInc({ ...newInc, title: e.target.value })}
                    placeholder="Ej. Acceso anómalo a tabla de clientes"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Tipo de Amenaza</label>
                  <select
                    value={newInc.threatType}
                    onChange={(e) => setNewInc({ ...newInc, threatType: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  >
                    <option value="Exfiltración de base de datos">Exfiltración de base de datos</option>
                    <option value="Ransomware / Cifrado no autorizado">Ransomware / Cifrado no autorizado</option>
                    <option value="Acceso no autorizado">Acceso no autorizado / Credencial comprometida</option>
                    <option value="Pérdida de dispositivo">Pérdida de dispositivo / Fuga accidental</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Registros Afectados (Estimado)</label>
                  <input
                    type="number"
                    value={newInc.estimatedRecordsCount}
                    onChange={(e) => setNewInc({ ...newInc, estimatedRecordsCount: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Horas Transcurridas desde Detección</label>
                  <input
                    type="number"
                    value={newInc.hoursElapsed}
                    onChange={(e) => setNewInc({ ...newInc, hoursElapsed: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Medidas de Mitigación Inmediatas</label>
                <textarea
                  rows={2}
                  value={newInc.mitigationSummary}
                  onChange={(e) => setNewInc({ ...newInc, mitigationSummary: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowAdd(false)} className="px-3 py-1 text-xs bg-slate-800 text-slate-300 rounded-lg">
                  Cancelar
                </button>
                <button onClick={handleAdd} className="px-4 py-1 text-xs bg-rose-600 font-bold text-white rounded-lg">
                  Registrar en Libro
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      {inc.incidentCode}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{inc.title}</h4>
                  </div>
                  <span className="text-[11px] font-bold text-amber-400 font-mono">
                    {inc.hoursRemaining72}h restantes para límite de 72h
                  </span>
                </div>

                <p className="text-xs text-slate-400">{inc.mitigationSummary}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-500">Detectado: {inc.discoveryDateStr}</span>
                  <button
                    onClick={() => setSelectedIncident(inc)}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Ver Formulario Oficial APDP</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Incident APDP Document Modal View */}
          {selectedIncident && (
            <div className="p-4 bg-slate-950 border border-sky-500/30 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Notificación Oficial a la Agencia — {selectedIncident.incidentCode}
                </h4>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Ocultar
                </button>
              </div>
              <textarea
                readOnly
                rows={8}
                value={selectedIncident.agencyNotificationDoc}
                className="w-full bg-slate-900 font-mono text-[11px] text-slate-300 border border-slate-800 rounded-lg p-3"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">Libro inmutable de vulneraciones de seguridad</span>
          <button onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
