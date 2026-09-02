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
	modules   *services.ModuleService
	glossary  *services.GlossaryService
	barsop    *services.BarsopService
	gap       *services.GapService
	audit     *services.AuditService
	sanctions *services.SanctionsService
	search    *services.SearchService
}

func NewAPIHandler() *APIHandler {
	return &APIHandler{
		modules:   services.NewModuleService(),
		glossary:  services.NewGlossaryService(),
		barsop:    services.NewBarsopService(),
		gap:       services.NewGapService(),
		audit:     services.NewAuditService(),
		sanctions: services.NewSanctionsService(),
		search:    services.NewSearchService(),
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
		"version":   "0.1.0",
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
