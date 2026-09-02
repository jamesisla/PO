package services

import (
	"fmt"
	"math"
	"po-backend/internal/data"
	"po-backend/internal/domain"
	"strings"
	"time"
)

type ModuleService struct {
	modules []domain.Module
}

func NewModuleService() *ModuleService {
	return &ModuleService{
		modules: data.GetModules(),
	}
}

func (s *ModuleService) GetAll(targetMode string) []domain.Module {
	if targetMode == "" || targetMode == "all" {
		return s.modules
	}
	var filtered []domain.Module
	for _, m := range s.modules {
		if m.TargetMode == "all" || m.TargetMode == targetMode {
			filtered = append(filtered, m)
		}
	}
	return filtered
}

func (s *ModuleService) GetByCode(code string) (*domain.Module, error) {
	for _, m := range s.modules {
		if m.Code == code || m.ID == code {
			return &m, nil
		}
	}
	return nil, fmt.Errorf("modulo no encontrado con codigo %s", code)
}

type GlossaryService struct {
	terms []domain.GlossaryTerm
}

func NewGlossaryService() *GlossaryService {
	return &GlossaryService{
		terms: data.GetGlossaryTerms(),
	}
}

func (s *GlossaryService) GetAll(category string) []domain.GlossaryTerm {
	if category == "" || category == "all" {
		return s.terms
	}
	var filtered []domain.GlossaryTerm
	for _, t := range s.terms {
		if t.Category == category {
			filtered = append(filtered, t)
		}
	}
	return filtered
}

type BarsopService struct{}

func NewBarsopService() *BarsopService {
	return &BarsopService{}
}

func (s *BarsopService) Generate(input domain.BarsopRequestInput) (*domain.BarsopRequestResult, error) {
	if strings.TrimSpace(input.ApplicantName) == "" {
		return nil, fmt.Errorf("el nombre del solicitante es obligatorio")
	}
	if strings.TrimSpace(input.RecipientCompany) == "" {
		return nil, fmt.Errorf("la empresa u organizacion destinataria es obligatoria")
	}
	if strings.TrimSpace(input.RightType) == "" {
		input.RightType = "Acceso"
	}

	reqDate := time.Now()
	// Legal requirement: 30 calendar days
	deadline := reqDate.AddDate(0, 0, 30)

	var legalArt string
	var rightDesc string
	switch strings.ToLower(input.RightType) {
	case "bloqueo":
		legalArt = "Art. 11 de la Ley de Protección de Datos Personales"
		rightDesc = "la suspensión temporal y bloqueo del tratamiento de mis datos personales mientras se resuelven las aclaraciones pertinentes"
	case "rectificacion", "rectificación":
		legalArt = "Art. 7 de la Ley de Protección de Datos Personales"
		rightDesc = "la rectificación, actualización o complementación de mis datos personales inexactos o incompletos"
	case "supresion", "supresión", "borrado":
		legalArt = "Art. 8 de la Ley de Protección de Datos Personales"
		rightDesc = "la supresión, cancelación y eliminación definitiva de mis datos personales de sus registros y de los encargados con quienes se hayan compartido"
	case "oposicion", "oposición":
		legalArt = "Art. 9 de la Ley de Protección de Datos Personales"
		rightDesc = "la oposición formal al tratamiento de mis datos personales para fines específicos (prospección comercial, publicidad no solicitada o perfilamiento)"
	case "portabilidad":
		legalArt = "Art. 10 de la Ley de Protección de Datos Personales"
		rightDesc = "la entrega íntegra de mis datos personales en formato digital estructurado, interoperable y de lectura mecánica (JSON/CSV) para su portabilidad"
	default: // Acceso
		legalArt = "Art. 6 de la Ley de Protección de Datos Personales"
		rightDesc = "el acceso íntegro a mis datos personales, confirmación de tratamiento, finalidades, destinatarios y plazos de conservación"
	}

	doc := fmt.Sprintf(`SOLICITUD FORMAL DE EJERCICIO DE DERECHO DE %s
(Conforme a la Ley de Protección de Datos Personales de Chile - Art. 12)

FECHA DE EMISIÓN: %s
FECHA LÍMITE LEGAL DE RESPUESTA (30 DÍAS CORRIDOS): %s

A: Representante Legal / Delegado de Protección de Datos (DPD)
EMPRESA / RESPONSABLE: %s
CORREO DESTINATARIO: %s

DE:
TITULAR SOLICITANTE: %s
RUT: %s
CORREO ELECTRÓNICO: %s
TELÉFONO DE CONTACTO: %s

Por medio de la presente comunicación formal y en virtud de las facultades consagradas en el %s y en el Artículo 12 de la Ley de Protección de Datos Personales de Chile, vengo en solicitar formal y expresamente:

%s.

DETALLE Y ANTECEDENTES ESPECÍFICOS DE LA SOLICITUD:
%s

EVIDENCIAS O DOCUMENTOS DE RESPALDO ADJUNTOS:
%s

PREFERENCIA DE FORMATO DE ENTREGA:
%s

RECORDATORIO LEGAL Y PLAZO PERENTORIO:
Conforme al Artículo 12 de la ley, el responsable del tratamiento tiene la obligación legal e irrenunciable de dar respuesta fundada y gratuita a esta solicitud dentro del plazo perentorio de 30 DÍAS CORRIDOS contados desde su recepción.

En caso de negativa infundada o vencimiento del plazo sin respuesta (silencio administrativo), me reservo expresamente el derecho a interponer la correspondiente denuncia y reclamación ante la Agencia de Protección de Datos Personales (APDP), sin perjuicio de las acciones indemnizatorias y sanciones aplicables de hasta 20.000 UTM.

Atentamente,

__________________________________________
%s
RUT: %s
`,
		strings.ToUpper(input.RightType),
		reqDate.Format("02/01/2006"),
		deadline.Format("02/01/2006"),
		input.RecipientCompany,
		input.RecipientEmail,
		input.ApplicantName,
		input.ApplicantRUT,
		input.ApplicantEmail,
		input.ApplicantPhone,
		legalArt,
		strings.ToUpper(rightDesc),
		input.SpecificDetails,
		input.EvidenceDetails,
		input.FormatPreference,
		input.ApplicantName,
		input.ApplicantRUT,
	)

	return &domain.BarsopRequestResult{
		RightType:         input.RightType,
		ApplicantName:     input.ApplicantName,
		RecipientCompany:  input.RecipientCompany,
		RequestDate:       reqDate,
		RequestDateStr:    reqDate.Format("02/01/2006"),
		DeadlineDate:      deadline,
		DeadlineDateStr:   deadline.Format("02/01/2006"),
		StatutoryDays:     30,
		DocumentText:      doc,
		LegalBasisSummary: fmt.Sprintf("%s y Art. 12 (Procedimiento de tutela de derechos ante el responsable).", legalArt),
		NextStepsGuidelines: []string{
			"1. Envía este documento por el canal formal o correo oficial de privacidad de la empresa.",
			"2. Guarda el comprobante de envío con fecha y hora visible.",
			"3. Agenda un recordatorio para el día 30 (" + deadline.Format("02/01/2006") + ").",
			"4. Si no recibes respuesta o la rechazan sin fundamento, ingresa el reclamo en el portal de la Agencia de Protección de Datos.",
		},
	}, nil
}

type GapService struct {
	questions []domain.GapQuestion
}

func NewGapService() *GapService {
	return &GapService{
		questions: data.GetGapQuestions(),
	}
}

func (s *GapService) GetQuestions() []domain.GapQuestion {
	return s.questions
}

func (s *GapService) Evaluate(sub domain.GapSubmission) (*domain.GapResult, error) {
	if sub.CompanyName == "" {
		sub.CompanyName = "Organización Evaluada"
	}

	var totalScore float64
	var count float64
	catScores := make(map[string]float64)
	catCounts := make(map[string]float64)
	var highGaps []string
	var plan []string

	for _, q := range s.questions {
		chosenOptID, ok := sub.Answers[q.ID]
		score := 0.0
		var chosenRec string
		if ok {
			for _, opt := range q.Options {
				if opt.ID == chosenOptID {
					score = opt.Score
					chosenRec = opt.Recommendation
					break
				}
			}
		} else {
			// default to lowest score if unanswered
			score = 0.0
			if len(q.Options) > 0 {
				chosenRec = q.Options[0].Recommendation
			}
		}

		totalScore += score
		count++
		catScores[q.Category] += score
		catCounts[q.Category]++

		if score < 0.7 {
			highGaps = append(highGaps, fmt.Sprintf("[%s] %s: %s", q.Category, q.Question, chosenRec))
			plan = append(plan, chosenRec)
		}
	}

	overallPct := 0.0
	if count > 0 {
		overallPct = math.Round((totalScore/count)*1000) / 10
	}

	categoryPercentages := make(map[string]float64)
	for cat, sum := range catScores {
		c := catCounts[cat]
		if c > 0 {
			categoryPercentages[cat] = math.Round((sum/c)*1000) / 10
		}
	}

	var maturity string
	if overallPct >= 85 {
		maturity = "Avanzado / Conforme (Listo para Dic 2026)"
	} else if overallPct >= 60 {
		maturity = "En Desarrollo (Riesgo Moderado de Sanciones)"
	} else if overallPct >= 35 {
		maturity = "Inicial / Básico (Alto Riesgo Legal y Operativo)"
	} else {
		maturity = "Crítico / No Adecuado (Exposición Máxima a Multas APDP)"
	}

	return &domain.GapResult{
		CompanyName:      sub.CompanyName,
		OrganizationType: sub.OrganizationType,
		OverallScore:     overallPct,
		MaturityLevel:    maturity,
		CategoryScores:   categoryPercentages,
		HighPriorityGaps: highGaps,
		ActionPlan:       plan,
		CreatedAt:        time.Now(),
	}, nil
}

type AuditService struct {
	controls []domain.AuditControl
}

func NewAuditService() *AuditService {
	return &AuditService{
		controls: data.GetAuditControls(),
	}
}

func (s *AuditService) GetControls() []domain.AuditControl {
	return s.controls
}

func (s *AuditService) Evaluate(sub domain.AuditSubmission) (*domain.AuditReport, error) {
	if sub.CompanyName == "" {
		sub.CompanyName = "Entidad Auditada"
	}
	if sub.AuditorName == "" {
		sub.AuditorName = "Auditor de Cumplimiento"
	}

	total := len(s.controls)
	conforming := 0
	partial := 0
	nonConforming := 0
	notApp := 0
	var findings []domain.AuditFinding

	for _, ctrl := range s.controls {
		eval, exists := sub.Evaluations[ctrl.ID]
		status := "No Conforme"
		findingText := "Sin evidencia documental acreditada."
		if exists && eval.Status != "" {
			status = eval.Status
			if eval.Finding != "" {
				findingText = eval.Finding
			}
		}

		switch status {
		case "Conforme":
			conforming++
		case "Conforme con Salvedades":
			partial++
			findings = append(findings, domain.AuditFinding{
				ControlCode: ctrl.ControlCode,
				Category:    ctrl.Category,
				Title:       ctrl.Title,
				RiskLevel:   ctrl.RiskLevel,
				Status:      status,
				Finding:     findingText,
			})
		case "No Aplica":
			notApp++
		default: // No Conforme
			nonConforming++
			findings = append(findings, domain.AuditFinding{
				ControlCode: ctrl.ControlCode,
				Category:    ctrl.Category,
				Title:       ctrl.Title,
				RiskLevel:   ctrl.RiskLevel,
				Status:      status,
				Finding:     findingText,
			})
		}
	}

	evaluable := total - notApp
	complianceRate := 0.0
	if evaluable > 0 {
		effectiveScore := float64(conforming) + (float64(partial) * 0.5)
		complianceRate = math.Round((effectiveScore/float64(evaluable))*1000) / 10
	}

	var opinion string
	adviseAgencia := false
	if complianceRate >= 90 && nonConforming == 0 {
		opinion = "Conforme Sin Salvedades (Cumplimiento Integral Ley 2026)"
	} else if complianceRate >= 65 {
		opinion = "Conforme Con Salvedades (Requiere Plan de Remediación Obligatorio)"
	} else {
		opinion = "Opinión Adversa / No Conforme (Alto Riesgo Infraccional APDP)"
		adviseAgencia = true
	}

	return &domain.AuditReport{
		CompanyName:             sub.CompanyName,
		AuditorName:             sub.AuditorName,
		AuditorLicense:          sub.AuditorLicense,
		EvaluationDate:          time.Now().Format("02/01/2006"),
		TotalControls:           total,
		ConformingControls:      conforming,
		PartialControls:         partial,
		NonConformingControls:   nonConforming,
		NotApplicableControls:   notApp,
		ComplianceRate:          complianceRate,
		FinalOpinion:            opinion,
		Findings:                findings,
		GeneralComments:         sub.GeneralComments,
		AgenciaReportingAdvised: adviseAgencia,
	}, nil
}

type SanctionsService struct{}

func NewSanctionsService() *SanctionsService {
	return &SanctionsService{}
}

func (s *SanctionsService) Calculate(req domain.SanctionRequest) (*domain.SanctionResult, error) {
	utm := req.UTMValueCLP
	if utm <= 0 {
		utm = 67000.0 // Valor estimado de UTM
	}

	var maxUtm int
	var turnoverPct float64
	var explanation string
	var legalRef string

	switch strings.ToLower(req.InfractionType) {
	case "leve":
		maxUtm = 5000
		legalRef = "Art. 38 (Infracciones leves)"
		explanation = "Infracciones formales, como retrasos no justificados en entrega de avisos o desactualización de datos menores sin perjuicio grave."
		if req.IsReoffending {
			maxUtm = 10000
			explanation += " Por tratarse de reincidencia, la multa en UTM se duplica hasta 10.000 UTM."
		}
	case "grave":
		maxUtm = 10000
		legalRef = "Art. 39 (Infracciones graves)"
		explanation = "Tratamiento sin base de licitud válida, no atender derechos BARSOP en plazo de 30 días o no designar DPD siendo obligatorio."
		if req.IsReoffending {
			maxUtm = 20000
			explanation += " Por reincidencia comprobada, el tope de multa asciende al tramo gravísimo (20.000 UTM)."
		}
	case "gravisima", "gravísima":
		maxUtm = 20000
		turnoverPct = 0.04 // 4%
		legalRef = "Art. 40 y 41 (Infracciones gravísimas y sanciones agravadas)"
		explanation = "Tratamiento ilegítimo de datos sensibles a gran escala, encubrimiento deliberado de brechas de seguridad o desacato expreso a la Agencia."
		if req.IsReoffending {
			explanation += " En caso de REINCIDENCIA en infracciones gravísimas, la Agencia puede imponer una multa de hasta el 4% DE LOS INGRESOS ANUALES por ventas o servicios del infractor."
		}
	default:
		return nil, fmt.Errorf("tipo de infraccion invalido (use: leve, grave, gravisima)")
	}

	maxUtmCLP := float64(maxUtm) * utm
	var turnoverCapCLP float64
	var calcFine float64

	if req.IsReoffending && turnoverPct > 0 && req.AnnualTurnoverCLP > 0 {
		turnoverCapCLP = req.AnnualTurnoverCLP * turnoverPct
		// Applicable fine is the higher of UTM max or 4% revenue cap under aggravated sanctions
		if turnoverCapCLP > maxUtmCLP {
			calcFine = turnoverCapCLP
		} else {
			calcFine = maxUtmCLP
		}
	} else {
		calcFine = maxUtmCLP
	}

	return &domain.SanctionResult{
		InfractionType:     req.InfractionType,
		IsReoffending:      req.IsReoffending,
		MaxUTM:             maxUtm,
		MaxUTMCLP:          maxUtmCLP,
		TurnoverCapPercent: turnoverPct * 100,
		TurnoverCapCLP:     turnoverCapCLP,
		CalculatedFineCLP:  calcFine,
		Explanation:        explanation,
		LegalReference:     legalRef,
	}, nil
}

type SearchService struct {
	modules  []domain.Module
	glossary []domain.GlossaryTerm
}

func NewSearchService() *SearchService {
	return &SearchService{
		modules:  data.GetModules(),
		glossary: data.GetGlossaryTerms(),
	}
}

func (s *SearchService) Search(query string, modeFilter string) *domain.SearchResultResponse {
	qLower := strings.ToLower(strings.TrimSpace(query))
	if qLower == "" {
		return &domain.SearchResultResponse{
			Query:          "",
			DetectedIntent: "exploracion_general",
			TargetAudience: "all",
			Matches:        nil,
			QuickAnswer:    "Escribe una consulta en lenguaje natural (ej. '¿Cómo pido que borren mis datos?' o '¿Cuál es el plazo para avisar de una filtración?').",
			Suggestions: []string{
				"¿Cómo ejercer el derecho de supresión o borrado?",
				"¿Cuál es el plazo para notificar una brecha a la Agencia?",
				"¿Cuánto es la multa máxima por reincidencia?",
				"¿Cuándo es obligatorio nombrar a un Delegado de Protección de Datos (DPD)?",
				"¿Qué debe incluir un contrato DPA con un encargado?",
			},
		}
	}

	var detectedIntent string
	var targetAudience string
	var quickAnswer string

	// Intent detection via NLP keywords
	if strings.Contains(qLower, "borr") || strings.Contains(qLower, "elimin") || strings.Contains(qLower, "olvido") || strings.Contains(qLower, "supres") || strings.Contains(qLower, "barsop") || strings.Contains(qLower, "acceso") || strings.Contains(qLower, "portab") {
		detectedIntent = "ejercicio_derecho_barsop"
		targetAudience = "citizen"
		quickAnswer = "Tienes derecho a exigir la Supresión, Acceso, Rectificación u Oposición de tus datos de forma gratuita. La empresa tiene 30 días corridos para responder."
	} else if strings.Contains(qLower, "brecha") || strings.Contains(qLower, "fuga") || strings.Contains(qLower, "filtr") || strings.Contains(qLower, "72") || strings.Contains(qLower, "hackeo") {
		detectedIntent = "notificacion_brecha_seguridad"
		targetAudience = "company"
		quickAnswer = "Toda vulneración de seguridad que genere riesgo debe notificarse a la Agencia de Protección de Datos en un plazo máximo de 72 horas."
	} else if strings.Contains(qLower, "multa") || strings.Contains(qLower, "sancion") || strings.Contains(qLower, "sanción") || strings.Contains(qLower, "utm") || strings.Contains(qLower, "4%") {
		detectedIntent = "consulta_regimen_sancionatorio"
		targetAudience = "all"
		quickAnswer = "Las multas alcanzan hasta 20.000 UTM (~$1.340M CLP) o hasta el 4% de los ingresos anuales de la empresa en caso de reincidencia gravísima."
	} else if strings.Contains(qLower, "dpd") || strings.Contains(qLower, "dpo") || strings.Contains(qLower, "delegado") {
		detectedIntent = "designacion_dpd"
		targetAudience = "company"
		quickAnswer = "El Delegado de Protección de Datos es obligatorio para órganos públicos y empresas que realicen tratamiento masivo de datos o datos sensibles."
	} else if strings.Contains(qLower, "cifrad") || strings.Contains(qLower, "aes") || strings.Contains(qLower, "tls") || strings.Contains(qLower, "hash") || strings.Contains(qLower, "argon") {
		detectedIntent = "seguridad_tecnica"
		targetAudience = "technical"
		quickAnswer = "Se exige cifrado AES-256 en reposo, TLS 1.3 en tránsito, autenticación MFA y hashing seguro para contraseñas."
	} else if strings.Contains(qLower, "audit") || strings.Contains(qLower, "control") || strings.Contains(qLower, "evidencia") || strings.Contains(qLower, "dpa") {
		detectedIntent = "auditoria_cumplimiento"
		targetAudience = "auditor"
		quickAnswer = "La auditoría evalúa bases de licitud, trazabilidad BARSOP, contratos DPA con proveedores y medidas de seguridad técnicas."
	} else {
		detectedIntent = "consulta_general"
		targetAudience = "all"
		quickAnswer = "La Ley de Protección de Datos Personales entra en vigor el 1 de diciembre de 2026 y regula a entidades públicas y privadas."
	}

	var matches []domain.SearchMatch

	words := strings.Fields(qLower)

	for _, m := range s.modules {
		if modeFilter != "" && modeFilter != "all" && m.TargetMode != "all" && m.TargetMode != modeFilter {
			continue
		}

		mText := strings.ToLower(m.Title + " " + m.Summary + " " + m.ContentMarkdown + " " + strings.Join(m.KeyTakeaways, " "))
		score := 0.0

		for _, w := range words {
			if len(w) <= 2 {
				continue
			}
			if strings.Contains(strings.ToLower(m.Title), w) {
				score += 5.0
			}
			if strings.Contains(strings.ToLower(m.Summary), w) {
				score += 3.0
			}
			if strings.Contains(mText, w) {
				score += 1.0
			}
		}

		if score > 0 {
			var action string
			if m.Level == 2 {
				action = "Generar Solicitud BARSOP"
			} else if m.Level == 4 {
				action = "Realizar Gap Analysis"
			} else if m.Level == 0 {
				action = "Calcular Multas en UTM"
			} else {
				action = "Ver Módulo Completo"
			}

			matches = append(matches, domain.SearchMatch{
				ModuleCode:      m.Code,
				ModuleTitle:     m.Title,
				Level:           m.Level,
				TargetMode:      m.TargetMode,
				RelevanceScore:  score,
				MatchedSnippet:  m.Summary,
				DirectLink:      "/modules/" + m.Code,
				SuggestedAction: action,
			})
		}
	}

	return &domain.SearchResultResponse{
		Query:          query,
		DetectedIntent: detectedIntent,
		TargetAudience: targetAudience,
		Matches:        matches,
		QuickAnswer:    quickAnswer,
		Suggestions: []string{
			"¿Cómo redactar una solicitud de acceso?",
			"¿Qué exige el protocolo de 72 horas para incidentes?",
			"¿Cuáles son los controles de auditoría esenciales?",
			"Ver checklist para mi tipo de empresa",
		},
	}
}


type InstitutionalService struct {
	companyName     string
	ratActivities   []domain.RatActivity
	dpaContracts    []domain.DpaContract
	incidents       []domain.IncidentLog
	citizenRequests []domain.CitizenTrackedRequest
	gapScore        float64
	gapMaturity     string
}

func NewInstitutionalService() *InstitutionalService {
	return &InstitutionalService{
		companyName:     "Empresa Demo & Institución de Ejemplo",
		ratActivities:   data.GetInitialRatActivities(),
		dpaContracts:    data.GetInitialDpaContracts(),
		incidents:       data.GetInitialIncidentLogs(),
		citizenRequests: data.GetInitialTrackedRequests(),
		gapScore:        72.5,
		gapMaturity:     "En Desarrollo (Riesgo Moderado de Sanciones)",
	}
}

func (s *InstitutionalService) GetStatus() *domain.InstitutionalStatus {
	// 1. RAT calculations
	ratTotal := len(s.ratActivities)
	ratLicitudCount := 0
	for _, act := range s.ratActivities {
		if strings.TrimSpace(act.LawfulBasis) != "" {
			ratLicitudCount++
		}
	}
	ratLicitudPct := 0.0
	if ratTotal > 0 {
		ratLicitudPct = math.Round((float64(ratLicitudCount)/float64(ratTotal))*1000) / 10
	}

	// 2. DPA calculations
	dpaTotal := len(s.dpaContracts)
	dpaSigned := 0
	for _, d := range s.dpaContracts {
		if d.HasSignedDpa {
			dpaSigned++
		}
	}
	dpaPct := 0.0
	if dpaTotal > 0 {
		dpaPct = math.Round((float64(dpaSigned)/float64(dpaTotal))*1000) / 10
	}

	// 3. BARSOP SLA calculations
	barsopTotal := len(s.citizenRequests)
	barsopResolved := 0
	barsopPending := 0
	barsopOverdue := 0
	for _, req := range s.citizenRequests {
		if req.Status == "Respondida" {
			barsopResolved++
		} else if req.Status == "Vencida (Expirada)" {
			barsopOverdue++
		} else {
			barsopPending++
		}
	}

	// 4. Incidents calculation
	incTotal := len(s.incidents)
	incCompliedPct := 100.0
	for _, inc := range s.incidents {
		if inc.HoursElapsed > 72 && inc.Status != "Reportado a la APDP (36-72h)" && inc.Status != "Cerrado" {
			incCompliedPct = 50.0
		}
	}

	// 5. Overall Institutional Score
	// RAT: 25%, DPA: 25%, BARSOP: 25%, Gap: 25%
	barsopScore := 100.0
	if barsopTotal > 0 {
		barsopScore = math.Max(0, 100.0-(float64(barsopOverdue)*30.0))
	}
	overallScore := math.Round(((ratLicitudPct*0.25) + (dpaPct*0.25) + (barsopScore*0.25) + (s.gapScore*0.25))*10) / 10

	var opinion string
	var alerts []string

	if dpaSigned < dpaTotal {
		alerts = append(alerts, fmt.Sprintf("Existen %d de %d proveedores con acceso a datos sin contrato DPA firmado (Riesgo Art. 18)", dpaTotal-dpaSigned, dpaTotal))
	}
	if barsopOverdue > 0 {
		alerts = append(alerts, fmt.Sprintf("Hay %d solicitud(es) BARSOP con plazo de 30 días corridos vencido sin respuesta (Riesgo Infracción Grave Art. 12)", barsopOverdue))
	}
	if ratTotal < 5 {
		alerts = append(alerts, "El inventario RAT cuenta con pocos tratamientos registrados; se recomienda auditar áreas comercial y TI.")
	}

	if overallScore >= 85 && barsopOverdue == 0 && dpaSigned == dpaTotal {
		opinion = "Conforme Sin Salvedades (Listo para Entrada en Vigor 1 Dic 2026)"
	} else if overallScore >= 60 {
		opinion = "Conforme Con Salvedades (Requiere Plan de Remediación Inmediato)"
	} else {
		opinion = "Opinión Adversa / No Conforme (Alto Riesgo Sancionatorio APDP)"
	}

	return &domain.InstitutionalStatus{
		CompanyName:                s.companyName,
		LastUpdated:                time.Now().Format("02/01/2006 15:04"),
		OverallInstitutionalScore:  overallScore,
		MaturityLevel:              s.gapMaturity,
		AuditorRecommendedOpinion:  opinion,
		RatTreatmentsCount:         ratTotal,
		RatLicitudPercent:          ratLicitudPct,
		RatActivities:              s.ratActivities,
		DpaVendorsTotal:            dpaTotal,
		DpaSignedCount:             dpaSigned,
		DpaCompliancePercent:       dpaPct,
		DpaContracts:               s.dpaContracts,
		BarsopTotalRequests:        barsopTotal,
		BarsopResolvedCount:        barsopResolved,
		BarsopPendingCount:         barsopPending,
		BarsopOverdueCount:         barsopOverdue,
		BarsopAvgResponseDays:      14.5,
		IncidentsTotal:             incTotal,
		Incidents72hCompliedPercent: incCompliedPct,
		Incidents:                  s.incidents,
		KeyAuditAlerts:             alerts,
	}
}

func (s *InstitutionalService) GetRatActivities() []domain.RatActivity {
	return s.ratActivities
}

func (s *InstitutionalService) AddRatActivity(act domain.RatActivity) domain.RatActivity {
	if act.ID == "" {
		act.ID = fmt.Sprintf("rat-%d", time.Now().UnixNano())
	}
	s.ratActivities = append([]domain.RatActivity{act}, s.ratActivities...)
	return act
}

func (s *InstitutionalService) GetDpaContracts() []domain.DpaContract {
	return s.dpaContracts
}

func (s *InstitutionalService) AddDpaContract(dpa domain.DpaContract) domain.DpaContract {
	if dpa.ID == "" {
		dpa.ID = fmt.Sprintf("dpa-%d", time.Now().UnixNano())
	}
	s.dpaContracts = append([]domain.DpaContract{dpa}, s.dpaContracts...)
	return dpa
}

func (s *InstitutionalService) ToggleDpa(id string) (*domain.DpaContract, error) {
	for i := range s.dpaContracts {
		if s.dpaContracts[i].ID == id {
			s.dpaContracts[i].HasSignedDpa = !s.dpaContracts[i].HasSignedDpa
			if s.dpaContracts[i].HasSignedDpa {
				s.dpaContracts[i].SignatureDate = time.Now().Format("2006-01-02")
			} else {
				s.dpaContracts[i].SignatureDate = ""
			}
			return &s.dpaContracts[i], nil
		}
	}
	return nil, fmt.Errorf("contrato no encontrado")
}

func (s *InstitutionalService) GetIncidents() []domain.IncidentLog {
	return s.incidents
}

func (s *InstitutionalService) AddIncident(inc domain.IncidentLog) domain.IncidentLog {
	if inc.ID == "" {
		inc.ID = fmt.Sprintf("inc-%d", time.Now().UnixNano())
	}
	if inc.IncidentCode == "" {
		inc.IncidentCode = fmt.Sprintf("INC-2026-%03d", len(s.incidents)+1)
	}
	if inc.DiscoveryDateStr == "" {
		inc.DiscoveryDateStr = time.Now().Format("02/01/2006 15:04")
	}
	inc.HoursRemaining72 = 72 - inc.HoursElapsed
	if inc.HoursRemaining72 < 0 {
		inc.HoursRemaining72 = 0
	}

	doc := fmt.Sprintf(`FORMULARIO OFICIAL DE NOTIFICACIÓN DE VULNERACIÓN DE SEGURIDAD A LA AGENCIA
(Conforme al Artículo 16 de la Ley de Protección de Datos Personales de Chile - Plazo Máximo 72 Horas)

CÓDIGO DE INCIDENTE: %s
FECHA Y HORA DE DETECCIÓN: %s
RESPONSABLE DEL TRATAMIENTO: %s
TIPO DE AMENAZA / EVENTO: %s

1. NATURALEZA DE LA VULNERACIÓN:
%s

2. CATEGORÍAS DE DATOS Y REGISTROS AFECTADOS:
Tipos de datos: %s
Número estimado de personas afectadas: %d
¿Representa alto riesgo para los derechos de los titulares?: %v

3. MEDIDAS CORRECTIVAS Y DE CONTENCIÓN ADOPTADAS:
%s

4. PLAN DE COMUNICACIÓN A LOS TITULARES AFECTADOS:
En cumplimiento de la ley, si el riesgo es alto se notificará directamente a cada titular individualmente en un plazo no superior a 24 horas adicionales.

DECLARACIÓN DE DILIGENCIA:
Este informe preliminar se remite dentro del plazo legal perentorio de 72 horas contadas desde la toma de conocimiento del incidente.
`,
		inc.IncidentCode,
		inc.DiscoveryDateStr,
		s.companyName,
		inc.ThreatType,
		inc.Title,
		inc.AffectedDataTypes,
		inc.EstimatedRecordsCount,
		inc.HighRiskForTitulars,
		inc.MitigationSummary,
	)

	inc.AgencyNotificationDoc = doc
	s.incidents = append([]domain.IncidentLog{inc}, s.incidents...)
	return inc
}

func (s *InstitutionalService) GetCitizenRequests() []domain.CitizenTrackedRequest {
	return s.citizenRequests
}

func (s *InstitutionalService) AddCitizenRequest(req domain.CitizenTrackedRequest) domain.CitizenTrackedRequest {
	if req.ID == "" {
		req.ID = fmt.Sprintf("req-%d", time.Now().UnixNano())
	}
	if req.TrackingCode == "" {
		req.TrackingCode = fmt.Sprintf("BARSOP-2026-%04d", time.Now().Unix()%10000)
	}
	req.RequestDateStr = time.Now().Format("02/01/2006")
	deadline := time.Now().AddDate(0, 0, 30)
	req.DeadlineDateStr = deadline.Format("02/01/2006")
	req.DaysRemaining = 30
	req.Status = "En Plazo"
	req.CanFileComplaint = false

	s.citizenRequests = append([]domain.CitizenTrackedRequest{req}, s.citizenRequests...)
	return req
}

func (s *InstitutionalService) GenerateApdpComplaint(input domain.ApdpComplaintInput) (*domain.ApdpComplaintResult, error) {
	if input.ApplicantName == "" || input.RespondentCompany == "" {
		return nil, fmt.Errorf("nombre del reclamante y empresa son obligatorios")
	}

	complaintCode := fmt.Sprintf("REC-APDP-2026-%04d", time.Now().Unix()%10000)
	filingDate := time.Now().Format("02/01/2006")

	doc := fmt.Sprintf(`RECLAMACIÓN FORMAL ANTE LA AGENCIA DE PROTECCIÓN DE DATOS PERSONALES (APDP)
(Por Infracción al Artículo 12 de la Ley de Protección de Datos Personales de Chile - Tutela de Derechos BARSOP)

CÓDIGO DE INGRESO: %s
FECHA DE PRESENTACIÓN: %s

A: CONSEJO DIRECTIVO / DIRECCIÓN DE FISCALIZACIÓN
AGENCIA DE PROTECCIÓN DE DATOS PERSONALES DE CHILE

DE:
RECLAMANTE / TITULAR DE DATOS: %s
RUT: %s
CORREO ELECTRÓNICO: %s
TELÉFONO DE CONTACTO: %s

CONTRA:
ENTIDAD RECLAMADA (RESPONSABLE DEL TRATAMIENTO): %s
TIPO DE DERECHO VULNERADO: DERECHO DE %s
FECHA DE PRESENTACIÓN DE SOLICITUD PREVIA: %s

I. ANTECEDENTES Y CAUSAL DE LA RECLAMACIÓN:
Vengo en interponer formal reclamación administrativa en contra de la entidad reclamada individualizada, por la siguiente causal legal:
-> %s.

II. RELACIÓN CIRCUNSTANCIADA DE LOS HECHOS:
1. Con fecha %s, el suscrito ejerció formalmente su derecho de %s mediante canal oficial del responsable, constando el debido acuse de recibo.
2. Habiendo transcurrido íntegramente el plazo perentorio e improrrogable de 30 DÍAS CORRIDOS consagrado en el Artículo 12 de la ley, la entidad reclamada no emitió respuesta fundada alguna (configurando silencio administrativo ilícito) o denegó injustificadamente el ejercicio del derecho.
3. Detalle adicional de los hechos:
%s

III. PETITORIO LEGAL A LA AGENCIA:
Por tanto, en virtud de las facultades fiscalizadoras y sancionatorias conferidas a la Agencia en los Artículos 34 y siguientes de la Ley, solicito:
1. Declarar admisible la presente reclamación y ordenar a la entidad reclamada dar cumplimiento inmediato e íntegro a la solicitud de %s sin costo alguno.
2. Iniciar el correspondiente procedimiento sancionatorio en contra del infractor por la comisión de infracción grave, aplicando las multas de hasta 10.000 UTM (o 20.000 UTM / 4%% de ingresos en caso de reincidencia).

Firma del Reclamante:
_______________________________________
%s
RUT: %s
`,
		complaintCode,
		filingDate,
		input.ApplicantName,
		input.ApplicantRUT,
		input.ApplicantEmail,
		input.ApplicantPhone,
		input.RespondentCompany,
		strings.ToUpper(input.RightType),
		input.OriginalDateStr,
		input.ComplaintReason,
		input.OriginalDateStr,
		input.RightType,
		input.SpecificFacts,
		strings.ToUpper(input.RightType),
		input.ApplicantName,
		input.ApplicantRUT,
	)

	return &domain.ApdpComplaintResult{
		ComplaintCode:     complaintCode,
		ApplicantName:     input.ApplicantName,
		RespondentCompany: input.RespondentCompany,
		FilingDateStr:     filingDate,
		DocumentText:      doc,
		LegalArticles:     []string{"Art. 12 (Procedimiento de Tutela de Derechos)", "Art. 34 (Atribuciones de la Agencia)", "Art. 39 letra b) (Infracción Grave por falta de respuesta BARSOP)"},
		AgencySubmissionTips: []string{
			"1. Guarda una copia firmada en PDF o impresa de esta reclamación.",
			"2. Adjunta el comprobante con fecha de envío de tu solicitud original del día " + input.OriginalDateStr + ".",
			"3. Ingresa este escrito a través de la oficina virtual de la Agencia de Protección de Datos Personales.",
			"4. La Agencia notificará a la empresa otorgándole un plazo de 10 días para formular descargos.",
		},
	}, nil
}
