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

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { error: text || `Error HTTP ${res.status}` };
  }
  if (!res.ok) {
    throw new Error(data.error || `Error ${res.status}: ${res.statusText}`);
  }
  return data as T;
}

export const api = {
  async getCountdown(): Promise<CountdownInfo> {
    const res = await fetch(`${BASE_URL}/countdown`);
    return handleResponse<CountdownInfo>(res);
  },

  async getModules(mode?: string): Promise<Module[]> {
    const url = mode ? `${BASE_URL}/modules?mode=${encodeURIComponent(mode)}` : `${BASE_URL}/modules`;
    const res = await fetch(url);
    return handleResponse<Module[]>(res);
  },

  async getModuleByCode(code: string): Promise<Module> {
    const res = await fetch(`${BASE_URL}/modules/${encodeURIComponent(code)}`);
    return handleResponse<Module>(res);
  },

  async getGlossary(category?: string): Promise<GlossaryTerm[]> {
    const url = category ? `${BASE_URL}/glossary?category=${encodeURIComponent(category)}` : `${BASE_URL}/glossary`;
    const res = await fetch(url);
    return handleResponse<GlossaryTerm[]>(res);
  },

  async search(query: string, mode?: string): Promise<SearchResultResponse> {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (mode) params.set('mode', mode);
    const res = await fetch(`${BASE_URL}/search?${params.toString()}`);
    return handleResponse<SearchResultResponse>(res);
  },

  async generateBarsop(input: BarsopRequestInput): Promise<BarsopRequestResult> {
    const res = await fetch(`${BASE_URL}/barsop/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    return handleResponse<BarsopRequestResult>(res);
  },

  async getCitizenRequests(): Promise<CitizenTrackedRequest[]> {
    const res = await fetch(`${BASE_URL}/citizen/requests`);
    return handleResponse<CitizenTrackedRequest[]>(res);
  },

  async updateBarsopStatus(id: string, update: { status: string; legalGroundNotes: string; resolvedBy: string }): Promise<CitizenTrackedRequest> {
    const res = await fetch(`${BASE_URL}/barsop/requests/${encodeURIComponent(id)}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update),
    });
    return handleResponse<CitizenTrackedRequest>(res);
  },

  async generateApdpComplaint(input: ApdpComplaintInput): Promise<ApdpComplaintResult> {
    const res = await fetch(`${BASE_URL}/citizen/complaint-apdp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    return handleResponse<ApdpComplaintResult>(res);
  },

  async getInstitutionalStatus(): Promise<InstitutionalStatus> {
    const res = await fetch(`${BASE_URL}/institution/status`);
    return handleResponse<InstitutionalStatus>(res);
  },

  async getRatActivities(): Promise<RatActivity[]> {
    const res = await fetch(`${BASE_URL}/institution/rat`);
    return handleResponse<RatActivity[]>(res);
  },

  async addRatActivity(act: Partial<RatActivity>): Promise<RatActivity> {
    const res = await fetch(`${BASE_URL}/institution/rat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(act),
    });
    return handleResponse<RatActivity>(res);
  },

  async getDpaContracts(): Promise<DpaContract[]> {
    const res = await fetch(`${BASE_URL}/institution/dpa`);
    return handleResponse<DpaContract[]>(res);
  },

  async addDpaContract(dpa: Partial<DpaContract>): Promise<DpaContract> {
    const res = await fetch(`${BASE_URL}/institution/dpa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dpa),
    });
    return handleResponse<DpaContract>(res);
  },

  async toggleDpa(id: string): Promise<DpaContract> {
    const res = await fetch(`${BASE_URL}/institution/dpa/${encodeURIComponent(id)}/toggle`, {
      method: 'PUT',
    });
    return handleResponse<DpaContract>(res);
  },

  async getIncidents(): Promise<IncidentLog[]> {
    const res = await fetch(`${BASE_URL}/institution/incidents`);
    return handleResponse<IncidentLog[]>(res);
  },

  async addIncident(inc: Partial<IncidentLog>): Promise<IncidentLog> {
    const res = await fetch(`${BASE_URL}/institution/incidents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inc),
    });
    return handleResponse<IncidentLog>(res);
  },

  async getGapQuestions(): Promise<GapQuestion[]> {
    const res = await fetch(`${BASE_URL}/gap-analysis/questions`);
    return handleResponse<GapQuestion[]>(res);
  },

  async evaluateGap(submission: GapSubmission): Promise<GapResult> {
    const res = await fetch(`${BASE_URL}/gap-analysis/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    return handleResponse<GapResult>(res);
  },

  async getAuditControls(): Promise<AuditControl[]> {
    const res = await fetch(`${BASE_URL}/audit/controls`);
    return handleResponse<AuditControl[]>(res);
  },

  async evaluateAudit(submission: AuditSubmission): Promise<AuditReport> {
    const res = await fetch(`${BASE_URL}/audit/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    return handleResponse<AuditReport>(res);
  },

  async calculateSanctions(req: SanctionRequest): Promise<SanctionResult> {
    const res = await fetch(`${BASE_URL}/sanctions/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    return handleResponse<SanctionResult>(res);
  },
};
