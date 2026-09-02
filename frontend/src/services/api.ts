import {
  CountdownInfo,
  Module,
  GlossaryTerm,
  SearchResultResponse,
  BarsopRequestInput,
  BarsopRequestResult,
  GapQuestion,
  GapSubmission,
  GapResult,
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
