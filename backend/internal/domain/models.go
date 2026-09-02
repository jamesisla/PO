package domain

import "time"

// Module represents a level module or submodule in the learning/compliance hierarchy
type Module struct {
	ID              string   `json:"id"`
	Level           int      `json:"level"` // 1 to 5, 0 for Transversal
	LevelName       string   `json:"levelName"`
	Code            string   `json:"code"` // e.g. "1.1", "2.1", "transversal"
	Title           string   `json:"title"`
	TargetMode      string   `json:"targetMode"` // "citizen", "company", "technical", "auditor", "all"
	Summary         string   `json:"summary"`
	ContentMarkdown string   `json:"contentMarkdown"`
	LegalArticles   []string `json:"legalArticles"`
	KeyTakeaways    []string `json:"keyTakeaways"`
	ActionChecklist []string `json:"actionChecklist"`
}

// GlossaryTerm represents a key legal term
type GlossaryTerm struct {
	ID             string `json:"id"`
	Term           string `json:"term"`
	Definition     string `json:"definition"`
	LegalReference string `json:"legalReference"`
	Category       string `json:"category"` // "conceptos", "actores", "principios", "derechos"
}

// Milestone represents a key date milestone towards enforcement
type Milestone struct {
	ID                string `json:"id"`
	Title             string `json:"title"`
	TargetDate        string `json:"targetDate"`
	Description       string `json:"description"`
	Status            string `json:"status"` // "completed", "in_progress", "pending"
	RecommendedAction string `json:"recommendedAction"`
}

// CountdownInfo contains time remaining until enforcement date (Dec 1, 2026)
type CountdownInfo struct {
	TargetDate          time.Time   `json:"targetDate"`
	TargetDateFormatted string      `json:"targetDateFormatted"`
	DaysRemaining       int         `json:"daysRemaining"`
	HoursRemaining      int         `json:"hoursRemaining"`
	Milestones          []Milestone `json:"milestones"`
	EnforcementNote     string      `json:"enforcementNote"`
}

// BarsopRequestInput input for generating a formal BARSOP request
type BarsopRequestInput struct {
	RightType        string `json:"rightType"` // "Bloqueo", "Acceso", "Rectificacion", "Supresion", "Oposicion", "Portabilidad"
	ApplicantName    string `json:"applicantName"`
	ApplicantRUT     string `json:"applicantRut"`
	ApplicantEmail   string `json:"applicantEmail"`
	ApplicantPhone   string `json:"applicantPhone"`
	RecipientCompany string `json:"recipientCompany"`
	RecipientEmail   string `json:"recipientEmail"`
	SpecificDetails  string `json:"specificDetails"`
	EvidenceDetails  string `json:"evidenceDetails"`
	FormatPreference string `json:"formatPreference"` // "Digital", "Fisico", "JSON/CSV" (for portabilidad)
}

// BarsopRequestResult output from BARSOP generator
type BarsopRequestResult struct {
	RightType           string    `json:"rightType"`
	ApplicantName       string    `json:"applicantName"`
	RecipientCompany    string    `json:"recipientCompany"`
	RequestDate         time.Time `json:"requestDate"`
	RequestDateStr      string    `json:"requestDateStr"`
	DeadlineDate        time.Time `json:"deadlineDate"`
	DeadlineDateStr     string    `json:"deadlineDateStr"`
	StatutoryDays       int       `json:"statutoryDays"`
	DocumentText        string    `json:"documentText"`
	LegalBasisSummary   string    `json:"legalBasisSummary"`
	NextStepsGuidelines []string  `json:"nextStepsGuidelines"`
}

// GapQuestion represents a diagnostic maturity question
type GapQuestion struct {
	ID          string      `json:"id"`
	Category    string      `json:"category"` // "Gobernanza", "Licitud", "Seguridad", "Derechos BARSOP", "Incidentes"
	Question    string      `json:"question"`
	Description string      `json:"description"`
	Options     []GapOption `json:"options"`
}

// GapOption is an option in the gap assessment
type GapOption struct {
	ID             int     `json:"id"`
	Text           string  `json:"text"`
	Score          float64 `json:"score"` // 0.0 to 1.0
	Recommendation string  `json:"recommendation"`
}

// GapSubmission represents user submitted answers
type GapSubmission struct {
	CompanyName    string         `json:"companyName"`
	OrganizationType string       `json:"organizationType"` // "pyme", "large", "public", "health", "fintech"
	Answers        map[string]int `json:"answers"`          // questionID -> optionID
}

// GapResult is the evaluated gap analysis report
type GapResult struct {
	CompanyName      string             `json:"companyName"`
	OrganizationType string             `json:"organizationType"`
	OverallScore     float64            `json:"overallScore"` // 0 to 100%
	MaturityLevel    string             `json:"maturityLevel"` // "Inicial", "En Desarrollo", "Avanzado", "Conforme"
	CategoryScores   map[string]float64 `json:"categoryScores"`
	HighPriorityGaps []string           `json:"highPriorityGaps"`
	ActionPlan       []string           `json:"actionPlan"`
	CreatedAt        time.Time          `json:"createdAt"`
}

// AuditControl represents a control check for compliance auditors
type AuditControl struct {
	ID               string `json:"id"`
	ControlCode      string `json:"controlCode"` // e.g. "CTRL-LIC-01", "CTRL-SEG-02"
	Category         string `json:"category"`    // "Licitud y Principios", "Derechos BARSOP", "Seguridad y Brechas", "Gobernanza y DPD", "Encargados y DPA"
	Title            string `json:"title"`
	Description      string `json:"description"`
	LegalArticle     string `json:"legalArticle"`
	RequiredEvidence string `json:"requiredEvidence"`
	RiskLevel        string `json:"riskLevel"` // "Alto", "Medio", "Bajo"
}

// AuditControlEvaluation evaluation item by the auditor
type AuditControlEvaluation struct {
	ControlID     string `json:"controlId"`
	Status        string `json:"status"` // "Conforme", "Conforme con Salvedades", "No Conforme", "No Aplica"
	EvidenceNotes string `json:"evidenceNotes"`
	Finding       string `json:"finding"`
}

// AuditSubmission is the full audit data sent by the auditor
type AuditSubmission struct {
	CompanyName     string                            `json:"companyName"`
	AuditorName     string                            `json:"auditorName"`
	AuditorLicense  string                            `json:"auditorLicense"`
	Evaluations     map[string]AuditControlEvaluation `json:"evaluations"`
	GeneralComments string                            `json:"generalComments"`
}

// AuditFinding summarizes an issue found during audit
type AuditFinding struct {
	ControlCode string `json:"controlCode"`
	Category    string `json:"category"`
	Title       string `json:"title"`
	RiskLevel   string `json:"riskLevel"`
	Status      string `json:"status"`
	Finding     string `json:"finding"`
}

// AuditReport is the finalized compliance opinion report
type AuditReport struct {
	CompanyName             string         `json:"companyName"`
	AuditorName             string         `json:"auditorName"`
	AuditorLicense          string         `json:"auditorLicense"`
	EvaluationDate          string         `json:"evaluationDate"`
	TotalControls           int            `json:"totalControls"`
	ConformingControls      int            `json:"conformingControls"`
	PartialControls         int            `json:"partialControls"`
	NonConformingControls   int            `json:"nonConformingControls"`
	NotApplicableControls   int            `json:"notApplicableControls"`
	ComplianceRate          float64        `json:"complianceRate"`
	FinalOpinion            string         `json:"finalOpinion"` // "Conforme Sin Salvedades", "Conforme Con Salvedades", "Opinión Adversa / No Conforme"
	Findings                []AuditFinding `json:"findings"`
	GeneralComments         string         `json:"generalComments"`
	AgenciaReportingAdvised bool           `json:"agenciaReportingAdvised"`
}

// SanctionRequest calculation input
type SanctionRequest struct {
	InfractionType    string  `json:"infractionType"` // "leve", "grave", "gravisima"
	IsReoffending     bool    `json:"isReoffending"`
	AnnualTurnoverCLP float64 `json:"annualTurnoverCLP"`
	UTMValueCLP       float64 `json:"utmValueCLP"` // default ~67,000 CLP
}

// SanctionResult calculation output
type SanctionResult struct {
	InfractionType     string  `json:"infractionType"`
	IsReoffending      bool    `json:"isReoffending"`
	MaxUTM             int     `json:"maxUtm"`
	MaxUTMCLP          float64 `json:"maxUtmCLP"`
	TurnoverCapPercent float64 `json:"turnoverCapPercent"`
	TurnoverCapCLP     float64 `json:"turnoverCapCLP"`
	CalculatedFineCLP  float64 `json:"calculatedFineCLP"`
	Explanation        string  `json:"explanation"`
	LegalReference     string  `json:"legalReference"`
}

// SearchMatch represents an intelligent search result item
type SearchMatch struct {
	ModuleCode      string  `json:"moduleCode"`
	ModuleTitle     string  `json:"moduleTitle"`
	Level           int     `json:"level"`
	TargetMode      string  `json:"targetMode"`
	RelevanceScore  float64 `json:"relevanceScore"`
	MatchedSnippet  string  `json:"matchedSnippet"`
	DirectLink      string  `json:"directLink"`
	SuggestedAction string  `json:"suggestedAction"`
}

// SearchResultResponse response from intelligent search engine
type SearchResultResponse struct {
	Query           string        `json:"query"`
	DetectedIntent  string        `json:"detectedIntent"`
	TargetAudience  string        `json:"targetAudience"` // "citizen", "company", "technical", "auditor"
	Matches         []SearchMatch `json:"matches"`
	QuickAnswer     string        `json:"quickAnswer"`
	Suggestions     []string      `json:"suggestions"`
}
