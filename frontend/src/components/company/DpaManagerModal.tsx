import React, { useState, useEffect } from 'react';
import { DpaContract } from '../../types';
import { api } from '../../services/api';
import { X, ShieldCheck, Plus, CheckCircle, AlertTriangle, FileText, Check, ShieldAlert } from 'lucide-react';

interface DpaManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}

export const DpaManagerModal: React.FC<DpaManagerModalProps> = ({ isOpen, onClose, onUpdated }) => {
  const [contracts, setContracts] = useState<DpaContract[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newVendor, setNewVendor] = useState({
    vendorName: '',
    serviceType: 'Cloud Hosting & Base de Datos',
    dataCategories: 'Datos de clientes y usuarios',
    hasSignedDpa: false,
    riskLevel: 'Alto' as const,
    securityCertifications: 'ISO 27001',
    notes: '',
  });

  const loadContracts = () => {
    api.getDpaContracts().then(setContracts).catch(console.error);
  };

  useEffect(() => {
    if (isOpen) {
      loadContracts();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggle = async (id: string) => {
    try {
      await api.toggleDpa(id);
      loadContracts();
      if (onUpdated) onUpdated();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdd = async () => {
    if (!newVendor.vendorName) return;
    try {
      await api.addDpaContract(newVendor);
      setShowAdd(false);
      setNewVendor({
        vendorName: '',
        serviceType: 'Cloud Hosting & Base de Datos',
        dataCategories: 'Datos de clientes y usuarios',
        hasSignedDpa: false,
        riskLevel: 'Alto',
        securityCertifications: 'ISO 27001',
        notes: '',
      });
      loadContracts();
      if (onUpdated) onUpdated();
    } catch (e) {
      console.error(e);
    }
  };

  const signedCount = contracts.filter((c) => c.hasSignedDpa).length;
  const coveragePct = contracts.length > 0 ? Math.round((signedCount / contracts.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Gestor de Encargados y Contratos DPA</h3>
              <p className="text-xs text-slate-400">Obligaciones contractuales y supervisión de proveedores (Art. 18)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coverage Header */}
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-300">
              Cobertura de Contratos: <strong className="text-indigo-400 font-mono text-sm">{coveragePct}%</strong>
            </span>
            <span className="text-slate-400">({signedCount} de {contracts.length} proveedores firmados)</span>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Proveedor</span>
          </button>
        </div>

        {/* Content List */}
        <div className="overflow-y-auto p-5 space-y-4 flex-1">
          {showAdd && (
            <div className="p-4 bg-slate-950 border border-indigo-500/30 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Nuevo Proveedor / Encargado</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Nombre del Proveedor *</label>
                  <input
                    type="text"
                    value={newVendor.vendorName}
                    onChange={(e) => setNewVendor({ ...newVendor, vendorName: e.target.value })}
                    placeholder="Ej. Cloudflare / Datadog"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Tipo de Servicio</label>
                  <input
                    type="text"
                    value={newVendor.serviceType}
                    onChange={(e) => setNewVendor({ ...newVendor, serviceType: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Certificaciones de Seguridad</label>
                  <input
                    type="text"
                    value={newVendor.securityCertifications}
                    onChange={(e) => setNewVendor({ ...newVendor, securityCertifications: e.target.value })}
                    placeholder="ISO 27001, SOC 2"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Nivel de Riesgo Inherente</label>
                  <select
                    value={newVendor.riskLevel}
                    onChange={(e) => setNewVendor({ ...newVendor, riskLevel: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  >
                    <option value="Alto">Alto (Acceso directo a datos sensibles/masivos)</option>
                    <option value="Medio">Medio (Soporte o herramientas periféricas)</option>
                    <option value="Bajo">Bajo (Sin almacenamiento de datos)</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowAdd(false)} className="px-3 py-1 text-xs bg-slate-800 text-slate-300 rounded-lg">
                  Cancelar
                </button>
                <button onClick={handleAdd} className="px-4 py-1 text-xs bg-indigo-600 font-bold text-white rounded-lg">
                  Guardar Proveedor
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {contracts.map((c) => (
              <div
                key={c.id}
                className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white">{c.vendorName}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      c.riskLevel === 'Alto' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-900 text-slate-300 border border-slate-800'
                    }`}>
                      Riesgo {c.riskLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{c.serviceType} · Certificaciones: {c.securityCertifications}</p>
                  {c.notes && <p className="text-[11px] text-amber-300">{c.notes}</p>}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleToggle(c.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      c.hasSignedDpa
                        ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300'
                        : 'bg-rose-500/20 border border-rose-500 text-rose-300 hover:bg-rose-500/30'
                    }`}
                  >
                    {c.hasSignedDpa ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>DPA Firmado ({c.signatureDate})</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Pendiente de Firma</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">Exigencia legal obligatoria bajo apercibimiento de responsabilidad solidaria</span>
          <button onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold">
            Cerrar Gestor DPA
          </button>
        </div>
      </div>
    </div>
  );
};
