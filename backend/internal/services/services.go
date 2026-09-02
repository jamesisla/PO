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
