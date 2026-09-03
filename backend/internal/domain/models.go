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
	FormatPreference string `json:"formatPreference"`
}

// BarsopRequestResult output from BARSOP generator
type BarsopRequestResult struct {
	TrackingCode        string    `json:"trackingCode"`
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

// CitizenTrackedRequest represents a user request being tracked
type CitizenTrackedRequest struct {
	ID                 string `json:"id"`
	TrackingCode       string `json:"trackingCode"`
	RightType          string `json:"rightType"`
	ApplicantName      string `json:"applicantName"`
	ApplicantRut       string `json:"applicantRut"`
	ApplicantEmail     string `json:"applicantEmail"`
	ApplicantPhone     string `json:"applicantPhone"`
	RecipientCompany   string `json:"recipientCompany"`
	RequestDateStr     string `json:"requestDateStr"`
	DeadlineDateStr    string `json:"deadlineDateStr"`
	DaysRemaining      int    `json:"daysRemaining"`
	Status             string `json:"status"` // "En Plazo", "Riesgo Vencimiento", "Aceptada / Ejecutada", "Denegada con Causal Legal", "Prórroga Fundada", "Vencida (Expirada)", "Reclamada APDP"
	CanFileComplaint   bool   `json:"canFileComplaint"`
	LegalGroundNotes   string `json:"legalGroundNotes"`
	ResolvedDateStr    string `json:"resolvedDateStr"`
	ResolvedBy         string `json:"resolvedBy"`
}

type BarsopStatusUpdateRequest struct {
	Status           string `json:"status"` // "Aceptada / Ejecutada", "Denegada con Causal Legal", "Prórroga Fundada", "En Plazo"
	LegalGroundNotes string `json:"legalGroundNotes"`
	ResolvedBy       string `json:"resolvedBy"`
}

// ApdpComplaintInput input to file an APDP complaint
type ApdpComplaintInput struct {
	TrackingCode     string `json:"trackingCode"`
	ApplicantName    string `json:"applicantName"`
	ApplicantRUT     string `json:"applicantRut"`
	ApplicantEmail   string `json:"applicantEmail"`
	ApplicantPhone   string `json:"applicantPhone"`
	RespondentCompany string `json:"respondentCompany"`
	RightType        string `json:"rightType"`
	OriginalDateStr  string `json:"originalDateStr"`
	ComplaintReason  string `json:"complaintReason"` // "Silencio Administrativo (Superó 30 días)", "Rechazo Injustificado", "Respuesta Parcial o Insuficiente"
	SpecificFacts    string `json:"specificFacts"`
}

// ApdpComplaintResult result from APDP complaint generator
type ApdpComplaintResult struct {
	ComplaintCode     string   `json:"complaintCode"`
	ApplicantName     string   `json:"applicantName"`
	RespondentCompany string   `json:"respondentCompany"`
	FilingDateStr     string   `json:"filingDateStr"`
	DocumentText      string   `json:"documentText"`
	LegalArticles     []string `json:"legalArticles"`
	AgencySubmissionTips []string `json:"agencySubmissionTips"`
}

// DpaContract represents a data processing agreement with a third party vendor
type DpaContract struct {
	ID                     string `json:"id"`
	VendorName             string `json:"vendorName"`
	ServiceType            string `json:"serviceType"` // "Cloud Hosting", "CRM / ERP", "Call Center", "Soporte TI", "Pasarela de Pagos"
	DataCategories         string `json:"dataCategories"`
	HasSignedDpa           bool   `json:"hasSignedDpa"`
	SignatureDate          string `json:"signatureDate"`
	RiskLevel              string `json:"riskLevel"` // "Alto", "Medio", "Bajo"
	SecurityCertifications string `json:"securityCertifications"` // "ISO 27001", "SOC 2 Type II", "PCI-DSS"
	Notes                  string `json:"notes"`
}

// IncidentLog represents a security breach log entry under the 72-hour rule
type IncidentLog struct {
	ID                    string `json:"id"`
	IncidentCode          string `json:"incidentCode"`
	Title                 string `json:"title"`
	DiscoveryDateStr      string `json:"discoveryDateStr"`
	ThreatType            string `json:"threatType"` // "Ransomware / Cifrado no autorizado", "Exfiltración de base de datos", "Acceso no autorizado", "Pérdida de dispositivo"
	AffectedDataTypes     string `json:"affectedDataTypes"`
	EstimatedRecordsCount int    `json:"estimatedRecordsCount"`
	HighRiskForTitulars   bool   `json:"highRiskForTitulars"`
	HoursElapsed          int    `json:"hoursElapsed"`
	HoursRemaining72      int    `json:"hoursRemaining72"`
	Status                string `json:"status"` // "En Contención (0-12h)", "En Evaluación (12-36h)", "Reportado a la APDP (36-72h)", "Cerrado"
	MitigationSummary     string `json:"mitigationSummary"`
	AgencyNotificationDoc string `json:"agencyNotificationDoc"`
}

// RatActivity represents an activity in the Registro de Actividades de Tratamiento
type RatActivity struct {
	ID               string   `json:"id"`
	Name             string   `json:"name"`
	LawfulBasis      string   `json:"lawfulBasis"`
	OwnerDept        string   `json:"ownerDept"`
	DataCategories   []string `json:"dataCategories"`
	RetentionPeriod  string   `json:"retentionPeriod"`
	SecurityMeasures string   `json:"securityMeasures"`
	HasSensitiveData bool     `json:"hasSensitiveData"`
}

// GapQuestion represents a diagnostic maturity question
type GapQuestion struct {
	ID          string      `json:"id"`
	Category    string      `json:"category"`
	Question    string      `json:"question"`
	Description string      `json:"description"`
	Options     []GapOption `json:"options"`
}

// GapOption is an option in the gap assessment
type GapOption struct {
	ID             int     `json:"id"`
	Text           string  `json:"text"`
	Score          float64 `json:"score"`
	Recommendation string  `json:"recommendation"`
}

// GapSubmission represents user submitted answers
type GapSubmission struct {
	CompanyName      string         `json:"companyName"`
	OrganizationType string         `json:"organizationType"`
	Answers          map[string]int `json:"answers"`
}

// GapResult is the evaluated gap analysis report
type GapResult struct {
	CompanyName      string             `json:"companyName"`
	OrganizationType string             `json:"organizationType"`
	OverallScore     float64            `json:"overallScore"`
	MaturityLevel    string             `json:"maturityLevel"`
	CategoryScores   map[string]float64 `json:"categoryScores"`
	HighPriorityGaps []string           `json:"highPriorityGaps"`
	ActionPlan       []string           `json:"actionPlan"`
	CreatedAt        time.Time          `json:"createdAt"`
}

// InstitutionalStatus represents the live institutional progress for auditors & executives
type InstitutionalStatus struct {
	CompanyName                string        `json:"companyName"`
	LastUpdated                string        `json:"lastUpdated"`
	OverallInstitutionalScore  float64       `json:"overallInstitutionalScore"` // 0 to 100%
	MaturityLevel              string        `json:"maturityLevel"`
	AuditorRecommendedOpinion  string        `json:"auditorRecommendedOpinion"`
	
	// RAT Metrics
	RatTreatmentsCount         int           `json:"ratTreatmentsCount"`
	RatLicitudPercent          float64       `json:"ratLicitudPercent"`
	RatActivities              []RatActivity `json:"ratActivities"`

	// DPA Vendors Metrics
	DpaVendorsTotal            int           `json:"dpaVendorsTotal"`
	DpaSignedCount             int           `json:"dpaSignedCount"`
	DpaCompliancePercent       float64       `json:"dpaCompliancePercent"`
	DpaContracts               []DpaContract `json:"dpaContracts"`

	// BARSOP SLA Metrics
	BarsopTotalRequests        int           `json:"barsopTotalRequests"`
	BarsopResolvedCount        int           `json:"barsopResolvedCount"`
	BarsopPendingCount         int           `json:"barsopPendingCount"`
	BarsopOverdueCount         int           `json:"barsopOverdueCount"`
	BarsopAvgResponseDays      float64       `json:"barsopAvgResponseDays"`

	// 72h Incident Readiness Metrics
	IncidentsTotal             int           `json:"incidentsTotal"`
	Incidents72hCompliedPercent float64      `json:"incidents72hCompliedPercent"`
	Incidents                  []IncidentLog `json:"incidents"`

	// Key Audit Alerts
	KeyAuditAlerts             []string      `json:"keyAuditAlerts"`
}

// AuditControl represents a control check for compliance auditors
type AuditControl struct {
	ID               string `json:"id"`
	ControlCode      string `json:"controlCode"`
	Category         string `json:"category"`
	Title            string `json:"title"`
	Description      string `json:"description"`
	LegalArticle     string `json:"legalArticle"`
	RequiredEvidence string `json:"requiredEvidence"`
	RiskLevel        string `json:"riskLevel"`
	LiveEvidenceRef  string `json:"liveEvidenceRef"` // e.g. "RAT: 3 tratamientos activos", "DPA: 80% firmado"
	AutoEvaluated    bool   `json:"autoEvaluated"`
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
	FinalOpinion            string         `json:"finalOpinion"`
	Findings                []AuditFinding `json:"findings"`
	GeneralComments         string         `json:"generalComments"`
	AgenciaReportingAdvised bool           `json:"agenciaReportingAdvised"`
}

// SanctionRequest calculation input
type SanctionRequest struct {
	InfractionType    string  `json:"infractionType"`
	IsReoffending     bool    `json:"isReoffending"`
	AnnualTurnoverCLP float64 `json:"annualTurnoverCLP"`
	UTMValueCLP       float64 `json:"utmValueCLP"`
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
	Query          string        `json:"query"`
	DetectedIntent string        `json:"detectedIntent"`
	TargetAudience string        `json:"targetAudience"`
	Matches        []SearchMatch `json:"matches"`
	QuickAnswer    string        `json:"quickAnswer"`
	Suggestions    []string      `json:"suggestions"`
}
