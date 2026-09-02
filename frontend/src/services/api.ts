import {
  CountdownInfo,
  Module,
  GlossaryTerm,
  SearchResultResponse,
  BarsopRequestInput,
  BarsopRequestResult,
  CitizenTrackedRequest,
  ApdpComplaintInput,
  ApdpComplaintResult,
  DpaContract,
  IncidentLog,
  RatActivity,
  GapQuestion,
  GapSubmission,
  GapResult,
  InstitutionalStatus,
  AuditControl,
  AuditSubmission,
  AuditReport,
  SanctionRequest,
  SanctionResult,
} from '../types';

const BASE_URL = '/api/v1';

export const api = {
  async getCountdown(): Promise<CountdownInfo> {
    const res = await fetch(`${BASE_URL}/countdown`);
    if (!res.ok) throw new Error('Error al obtener el contador');
    return res.json();
  },

  async getModules(mode?: string): Promise<Module[]> {
    const url = mode ? `${BASE_URL}/modules?mode=${encodeURIComponent(mode)}` : `${BASE_URL}/modules`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener los módulos');
    return res.json();
  },

  async getModuleByCode(code: string): Promise<Module> {
    const res = await fetch(`${BASE_URL}/modules/${encodeURIComponent(code)}`);
    if (!res.ok) throw new Error('Error al obtener el módulo');
    return res.json();
  },

  async getGlossary(category?: string): Promise<GlossaryTerm[]> {
    const url = category ? `${BASE_URL}/glossary?category=${encodeURIComponent(category)}` : `${BASE_URL}/glossary`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener el glosario');
    return res.json();
  },

  async search(query: string, mode?: string): Promise<SearchResultResponse> {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (mode) params.set('mode', mode);
    const res = await fetch(`${BASE_URL}/search?${params.toString()}`);
    if (!res.ok) throw new Error('Error al realizar la búsqueda');
    return res.json();
  },

  async generateBarsop(input: BarsopRequestInput): Promise<BarsopRequestResult> {
    const res = await fetch(`${BASE_URL}/barsop/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al generar la solicitud BARSOP');
    }
    return res.json();
  },

  async getCitizenRequests(): Promise<CitizenTrackedRequest[]> {
    const res = await fetch(`${BASE_URL}/citizen/requests`);
    if (!res.ok) throw new Error('Error al obtener solicitudes');
    return res.json();
  },

  async generateApdpComplaint(input: ApdpComplaintInput): Promise<ApdpComplaintResult> {
    const res = await fetch(`${BASE_URL}/citizen/complaint-apdp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al generar reclamación ante la APDP');
    }
    return res.json();
  },

  async getInstitutionalStatus(): Promise<InstitutionalStatus> {
    const res = await fetch(`${BASE_URL}/institution/status`);
    if (!res.ok) throw new Error('Error al obtener estado institucional');
    return res.json();
  },

  async getRatActivities(): Promise<RatActivity[]> {
    const res = await fetch(`${BASE_URL}/institution/rat`);
    if (!res.ok) throw new Error('Error al obtener actividades RAT');
    return res.json();
  },

  async addRatActivity(act: Partial<RatActivity>): Promise<RatActivity> {
    const res = await fetch(`${BASE_URL}/institution/rat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(act),
    });
    if (!res.ok) throw new Error('Error al guardar actividad RAT');
    return res.json();
  },

  async getDpaContracts(): Promise<DpaContract[]> {
    const res = await fetch(`${BASE_URL}/institution/dpa`);
    if (!res.ok) throw new Error('Error al obtener contratos DPA');
    return res.json();
  },

  async addDpaContract(dpa: Partial<DpaContract>): Promise<DpaContract> {
    const res = await fetch(`${BASE_URL}/institution/dpa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dpa),
    });
    if (!res.ok) throw new Error('Error al guardar contrato DPA');
    return res.json();
  },

  async toggleDpa(id: string): Promise<DpaContract> {
    const res = await fetch(`${BASE_URL}/institution/dpa/${encodeURIComponent(id)}/toggle`, {
      method: 'PUT',
    });
    if (!res.ok) throw new Error('Error al actualizar estado DPA');
    return res.json();
  },

  async getIncidents(): Promise<IncidentLog[]> {
    const res = await fetch(`${BASE_URL}/institution/incidents`);
    if (!res.ok) throw new Error('Error al obtener registro de incidentes');
    return res.json();
  },

  async addIncident(inc: Partial<IncidentLog>): Promise<IncidentLog> {
    const res = await fetch(`${BASE_URL}/institution/incidents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inc),
    });
    if (!res.ok) throw new Error('Error al registrar incidente');
    return res.json();
  },

  async getGapQuestions(): Promise<GapQuestion[]> {
    const res = await fetch(`${BASE_URL}/gap-analysis/questions`);
    if (!res.ok) throw new Error('Error al obtener preguntas de Gap Analysis');
    return res.json();
  },

  async evaluateGap(submission: GapSubmission): Promise<GapResult> {
    const res = await fetch(`${BASE_URL}/gap-analysis/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al evaluar el Gap Analysis');
    }
    return res.json();
  },

  async getAuditControls(): Promise<AuditControl[]> {
    const res = await fetch(`${BASE_URL}/audit/controls`);
    if (!res.ok) throw new Error('Error al obtener controles de auditoría');
    return res.json();
  },

  async evaluateAudit(submission: AuditSubmission): Promise<AuditReport> {
    const res = await fetch(`${BASE_URL}/audit/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al evaluar la auditoría');
    }
    return res.json();
  },

  async calculateSanctions(req: SanctionRequest): Promise<SanctionResult> {
    const res = await fetch(`${BASE_URL}/sanctions/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al calcular sanciones');
    }
    return res.json();
  },
};
