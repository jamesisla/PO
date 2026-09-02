export type NavigationMode = 'citizen' | 'company' | 'technical' | 'auditor';

export interface Module {
  id: string;
  level: number;
  levelName: string;
  code: string;
  title: string;
  targetMode: 'citizen' | 'company' | 'technical' | 'auditor' | 'all';
  summary: string;
  contentMarkdown: string;
  legalArticles: string[];
  keyTakeaways: string[];
  actionChecklist: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  legalReference: string;
  category: 'conceptos' | 'actores' | 'principios' | 'derechos';
}

export interface Milestone {
  id: string;
  title: string;
  targetDate: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  recommendedAction: string;
}

export interface CountdownInfo {
  targetDate: string;
  targetDateFormatted: string;
  daysRemaining: number;
  hoursRemaining: number;
  milestones: Milestone[];
  enforcementNote: string;
}

export interface BarsopRequestInput {
  rightType: string;
  applicantName: string;
  applicantRut: string;
  applicantEmail: string;
  applicantPhone: string;
  recipientCompany: string;
  recipientEmail: string;
  specificDetails: string;
  evidenceDetails: string;
  formatPreference: string;
}

export interface BarsopRequestResult {
  rightType: string;
  applicantName: string;
  recipientCompany: string;
  requestDate: string;
  requestDateStr: string;
  deadlineDate: string;
  deadlineDateStr: string;
  statutoryDays: number;
  documentText: string;
  legalBasisSummary: string;
  nextStepsGuidelines: string[];
}

export interface GapOption {
  id: number;
  text: string;
  score: number;
  recommendation: string;
}

export interface GapQuestion {
  id: string;
  category: string;
  question: string;
  description: string;
  options: GapOption[];
}

export interface GapSubmission {
  companyName: string;
  organizationType: string;
  answers: Record<string, number>;
}

export interface GapResult {
  companyName: string;
  organizationType: string;
  overallScore: number;
  maturityLevel: string;
  categoryScores: Record<string, number>;
  highPriorityGaps: string[];
  actionPlan: string[];
  createdAt: string;
}

export interface AuditControl {
  id: string;
  controlCode: string;
  category: string;
  title: string;
  description: string;
  legalArticle: string;
  requiredEvidence: string;
  riskLevel: 'Alto' | 'Medio' | 'Bajo';
}

export interface AuditControlEvaluation {
  controlId: string;
  status: 'Conforme' | 'Conforme con Salvedades' | 'No Conforme' | 'No Aplica';
  evidenceNotes: string;
  finding: string;
}

export interface AuditSubmission {
  companyName: string;
  auditorName: string;
  auditorLicense: string;
  evaluations: Record<string, AuditControlEvaluation>;
  generalComments: string;
}

export interface AuditFinding {
  controlCode: string;
  category: string;
  title: string;
  riskLevel: string;
  status: string;
  finding: string;
}

export interface AuditReport {
  companyName: string;
  auditorName: string;
  auditorLicense: string;
  evaluationDate: string;
  totalControls: number;
  conformingControls: number;
  partialControls: number;
  nonConformingControls: number;
  notApplicableControls: number;
  complianceRate: number;
  finalOpinion: string;
  findings: AuditFinding[];
  generalComments: string;
  agenciaReportingAdvised: boolean;
}

export interface SanctionRequest {
  infractionType: 'leve' | 'grave' | 'gravisima';
  isReoffending: boolean;
  annualTurnoverCLP: number;
  utmValueCLP?: number;
}

export interface SanctionResult {
  infractionType: string;
  isReoffending: boolean;
  maxUtm: number;
  maxUtmCLP: number;
  turnoverCapPercent: number;
  turnoverCapCLP: number;
  calculatedFineCLP: number;
  explanation: string;
  legalReference: string;
}

export interface SearchMatch {
  moduleCode: string;
  moduleTitle: string;
  level: number;
  targetMode: string;
  relevanceScore: number;
  matchedSnippet: string;
  directLink: string;
  suggestedAction: string;
}

export interface SearchResultResponse {
  query: string;
  detectedIntent: string;
  targetAudience: string;
  matches: SearchMatch[];
  quickAnswer: string;
  suggestions: string[];
}
