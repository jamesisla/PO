import React, { useState } from 'react';
import { Database, Plus, CheckCircle, Tag, Clock, ShieldCheck, X } from 'lucide-react';

interface RatActivity {
  id: string;
  name: string;
  lawfulBasis: string;
  ownerDept: string;
  dataCategories: string[];
  retentionPeriod: string;
  securityMeasures: string;
}

interface RatViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RatViewer: React.FC<RatViewerProps> = ({ isOpen, onClose }) => {
  const [activities, setActivities] = useState<RatActivity[]>([
    {
      id: 'rat-1',
      name: 'Gestión de Nómina y Recursos Humanos',
      lawfulBasis: 'Ejecución de Contrato & Obligación Legal (Código del Trabajo)',
      ownerDept: 'Gerencia de Personas / RRHH',
      dataCategories: ['RUT', 'Nombre', 'Cuenta Bancaria', 'Domicilio', 'Previsión'],
      retentionPeriod: '5 años posteriores al término del vínculo laboral',
      securityMeasures: 'Cifrado AES-256 en reposo, MFA obligatorio, control RBAC',
    },
    {
      id: 'rat-2',
      name: 'Facturación y Cobranza Comercial',
      lawfulBasis: 'Obligación Legal Tributaria (SII) & Contrato',
      ownerDept: 'Administración y Finanzas',
      dataCategories: ['RUT', 'Razón Social / Nombre', 'Dirección Tributaria', 'Historial de Pagos'],
      retentionPeriod: '6 años según prescripción tributaria',
      securityMeasures: 'Servidor cifrado, backups diarios inmutables',
    },
    {
      id: 'rat-3',
      name: 'Marketing Digital y Boletín Informativo',
      lawfulBasis: 'Consentimiento Expreso del Titular (Revocable)',
      ownerDept: 'Marketing y Crecimiento',
      dataCategories: ['Email', 'Nombre', 'Preferencias de Compra'],
      retentionPeriod: 'Hasta la revocación del consentimiento',
      securityMeasures: 'CMP con log de revocación y tokenización de emails',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState<RatActivity>({
    id: '',
    name: '',
    lawfulBasis: 'Consentimiento Expreso',
    ownerDept: '',
    dataCategories: ['Email', 'Nombre'],
    retentionPeriod: '2 años',
    securityMeasures: 'Cifrado en reposo',
  });

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!newActivity.name || !newActivity.ownerDept) return;
    setActivities([
      ...activities,
      { ...newActivity, id: `rat-${Date.now()}` },
    ]);
    setShowAddForm(false);
    setNewActivity({
      id: '',
      name: '',
      lawfulBasis: 'Consentimiento Expreso',
      ownerDept: '',
      dataCategories: ['Email', 'Nombre'],
      retentionPeriod: '2 años',
      securityMeasures: 'Cifrado en reposo',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Registro de Actividades de Tratamiento (RAT)</h3>
              <p className="text-xs text-slate-400">Inventario oficial obligatorio conforme al Art. 19 de la Ley</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/30 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">
            Total de Tratamientos Registrados: <strong className="text-white">{activities.length}</strong>
          </span>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Tratamiento</span>
          </button>
        </div>

        {/* Content List */}
        <div className="overflow-y-auto p-5 space-y-4 flex-1">
          {showAddForm && (
            <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Nuevo Tratamiento</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Nombre de la Actividad *</label>
                  <input
                    type="text"
                    value={newActivity.name}
                    onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                    placeholder="Ej. Control de Acceso Físico y Videovigilancia"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Área / Departamento Custodio *</label>
                  <input
                    type="text"
                    value={newActivity.ownerDept}
                    onChange={(e) => setNewActivity({ ...newActivity, ownerDept: e.target.value })}
                    placeholder="Ej. Seguridad y Operaciones"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Base Legal de Licitud</label>
                  <select
                    value={newActivity.lawfulBasis}
                    onChange={(e) => setNewActivity({ ...newActivity, lawfulBasis: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  >
                    <option value="Consentimiento Expreso">Consentimiento Expreso</option>
                    <option value="Ejecución de Contrato">Ejecución de Contrato</option>
                    <option value="Obligación Legal">Obligación Legal</option>
                    <option value="Interés Legítimo Ponderado">Interés Legítimo Ponderado</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Plazo de Retención</label>
                  <input
                    type="text"
                    value={newActivity.retentionPeriod}
                    onChange={(e) => setNewActivity({ ...newActivity, retentionPeriod: e.target.value })}
                    placeholder="Ej. 30 días"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-xs bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAdd}
                  className="px-4 py-1.5 text-xs bg-emerald-500 font-bold text-white rounded-lg"
                >
                  Guardar en RAT
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {activities.map((act) => (
              <div
                key={act.id}
                className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    {act.name}
                  </h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                    {act.ownerDept}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-slate-300">
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Base Legal</span>
                    <span className="font-medium text-slate-200">{act.lawfulBasis}</span>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Plazo de Conservación</span>
                    <span className="font-medium text-slate-200">{act.retentionPeriod}</span>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 sm:col-span-2 lg:col-span-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Medidas de Seguridad</span>
                    <span className="font-medium text-slate-200">{act.securityMeasures}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Datos Tratados:</span>
                  {act.dataCategories.map((c, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">Formato compatible con requerimientos de la APDP</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold"
          >
            Cerrar RAT
          </button>
        </div>
      </div>
    </div>
  );
};
