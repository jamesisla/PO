package handlers

import (
	"encoding/json"
	"net/http"
	"po-backend/internal/data"
	"po-backend/internal/domain"
	"po-backend/internal/services"
	"time"

	"github.com/go-chi/chi/v5"
)

type APIHandler struct {
	modules       *services.ModuleService
	glossary      *services.GlossaryService
	barsop        *services.BarsopService
	gap           *services.GapService
	audit         *services.AuditService
	sanctions     *services.SanctionsService
	search        *services.SearchService
	institutional *services.InstitutionalService
}

func NewAPIHandler() *APIHandler {
	return &APIHandler{
		modules:       services.NewModuleService(),
		glossary:      services.NewGlossaryService(),
		barsop:        services.NewBarsopService(),
		gap:           services.NewGapService(),
		audit:         services.NewAuditService(),
		sanctions:     services.NewSanctionsService(),
		search:        services.NewSearchService(),
		institutional: services.NewInstitutionalService(),
	}
}

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}

func (h *APIHandler) HealthCheck(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]interface{}{
		"status":    "ok",
		"service":   "po-backend-api",
		"version":   "0.2.0",
		"timestamp": time.Now().UTC().Format(time.RFC3339),
	})
}

func (h *APIHandler) GetCountdown(w http.ResponseWriter, r *http.Request) {
	info := data.GetCountdownInfo()
	writeJSON(w, http.StatusOK, info)
}

func (h *APIHandler) GetModules(w http.ResponseWriter, r *http.Request) {
	mode := r.URL.Query().Get("mode")
	mods := h.modules.GetAll(mode)
	writeJSON(w, http.StatusOK, mods)
}

func (h *APIHandler) GetModuleByCode(w http.ResponseWriter, r *http.Request) {
	code := chi.URLParam(r, "code")
	mod, err := h.modules.GetByCode(code)
	if err != nil {
		writeError(w, http.StatusNotFound, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, mod)
}

func (h *APIHandler) GetGlossary(w http.ResponseWriter, r *http.Request) {
	category := r.URL.Query().Get("category")
	terms := h.glossary.GetAll(category)
	writeJSON(w, http.StatusOK, terms)
}

func (h *APIHandler) Search(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	mode := r.URL.Query().Get("mode")
	result := h.search.Search(query, mode)
	writeJSON(w, http.StatusOK, result)
}

func (h *APIHandler) GenerateBarsop(w http.ResponseWriter, r *http.Request) {
	var input domain.BarsopRequestInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		writeError(w, http.StatusBadRequest, "formato de peticion JSON invalido: "+err.Error())
		return
	}
	res, err := h.barsop.Generate(input)
	if err != nil {
		writeError(w, http.StatusUnprocessableEntity, err.Error())
		return
	}
	// Also auto-track in institutional service
	h.institutional.AddCitizenRequest(domain.CitizenTrackedRequest{
		ApplicantName:    input.ApplicantName,
		RecipientCompany: input.RecipientCompany,
		RightType:        input.RightType,
	})
	writeJSON(w, http.StatusOK, res)
}

func (h *APIHandler) GetGapQuestions(w http.ResponseWriter, r *http.Request) {
	questions := h.gap.GetQuestions()
	writeJSON(w, http.StatusOK, questions)
}

func (h *APIHandler) EvaluateGap(w http.ResponseWriter, r *http.Request) {
	var sub domain.GapSubmission
	if err := json.NewDecoder(r.Body).Decode(&sub); err != nil {
		writeError(w, http.StatusBadRequest, "formato JSON invalido: "+err.Error())
		return
	}
	res, err := h.gap.Evaluate(sub)
	if err != nil {
		writeError(w, http.StatusUnprocessableEntity, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, res)
}

func (h *APIHandler) GetAuditControls(w http.ResponseWriter, r *http.Request) {
	controls := h.audit.GetControls()
	writeJSON(w, http.StatusOK, controls)
}

func (h *APIHandler) EvaluateAudit(w http.ResponseWriter, r *http.Request) {
	var sub domain.AuditSubmission
	if err := json.NewDecoder(r.Body).Decode(&sub); err != nil {
		writeError(w, http.StatusBadRequest, "formato JSON invalido: "+err.Error())
		return
	}
	report, err := h.audit.Evaluate(sub)
	if err != nil {
		writeError(w, http.StatusUnprocessableEntity, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, report)
}

func (h *APIHandler) CalculateSanctions(w http.ResponseWriter, r *http.Request) {
	var req domain.SanctionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "formato JSON invalido: "+err.Error())
		return
	}
	res, err := h.sanctions.Calculate(req)
	if err != nil {
		writeError(w, http.StatusUnprocessableEntity, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, res)
}

// Institutional Dashboard & Governance Endpoints

func (h *APIHandler) GetInstitutionalStatus(w http.ResponseWriter, r *http.Request) {
	status := h.institutional.GetStatus()
	writeJSON(w, http.StatusOK, status)
}

func (h *APIHandler) GetRatActivities(w http.ResponseWriter, r *http.Request) {
	activities := h.institutional.GetRatActivities()
	writeJSON(w, http.StatusOK, activities)
}

func (h *APIHandler) AddRatActivity(w http.ResponseWriter, r *http.Request) {
	var act domain.RatActivity
	if err := json.NewDecoder(r.Body).Decode(&act); err != nil {
		writeError(w, http.StatusBadRequest, "formato JSON invalido: "+err.Error())
		return
	}
	created := h.institutional.AddRatActivity(act)
	writeJSON(w, http.StatusCreated, created)
}

func (h *APIHandler) GetDpaContracts(w http.ResponseWriter, r *http.Request) {
	contracts := h.institutional.GetDpaContracts()
	writeJSON(w, http.StatusOK, contracts)
}

func (h *APIHandler) AddDpaContract(w http.ResponseWriter, r *http.Request) {
	var dpa domain.DpaContract
	if err := json.NewDecoder(r.Body).Decode(&dpa); err != nil {
		writeError(w, http.StatusBadRequest, "formato JSON invalido: "+err.Error())
		return
	}
	created := h.institutional.AddDpaContract(dpa)
	writeJSON(w, http.StatusCreated, created)
}

func (h *APIHandler) ToggleDpaContract(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	updated, err := h.institutional.ToggleDpa(id)
	if err != nil {
		writeError(w, http.StatusNotFound, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, updated)
}

func (h *APIHandler) GetIncidents(w http.ResponseWriter, r *http.Request) {
	incidents := h.institutional.GetIncidents()
	writeJSON(w, http.StatusOK, incidents)
}

func (h *APIHandler) AddIncident(w http.ResponseWriter, r *http.Request) {
	var inc domain.IncidentLog
	if err := json.NewDecoder(r.Body).Decode(&inc); err != nil {
		writeError(w, http.StatusBadRequest, "formato JSON invalido: "+err.Error())
		return
	}
	created := h.institutional.AddIncident(inc)
	writeJSON(w, http.StatusCreated, created)
}

func (h *APIHandler) GetCitizenRequests(w http.ResponseWriter, r *http.Request) {
	requests := h.institutional.GetCitizenRequests()
	writeJSON(w, http.StatusOK, requests)
}

func (h *APIHandler) GenerateApdpComplaint(w http.ResponseWriter, r *http.Request) {
	var input domain.ApdpComplaintInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		writeError(w, http.StatusBadRequest, "formato JSON invalido: "+err.Error())
		return
	}
	res, err := h.institutional.GenerateApdpComplaint(input)
	if err != nil {
		writeError(w, http.StatusUnprocessableEntity, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, res)
}
