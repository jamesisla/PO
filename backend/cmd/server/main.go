package main

import (
	"log"
	"net/http"
	"os"
	"po-backend/internal/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r := chi.NewRouter()

	// Middlewares
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// CORS configuration
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	h := handlers.NewAPIHandler()

	// Base routes
	r.Get("/health", h.HealthCheck)

	// API v1
	r.Route("/api/v1", func(api chi.Router) {
		api.Get("/countdown", h.GetCountdown)
		api.Get("/modules", h.GetModules)
		api.Get("/modules/{code}", h.GetModuleByCode)
		api.Get("/glossary", h.GetGlossary)
		api.Get("/search", h.Search)

		// Interactive Tools
		api.Post("/barsop/generate", h.GenerateBarsop)
		api.Get("/gap-analysis/questions", h.GetGapQuestions)
		api.Post("/gap-analysis/evaluate", h.EvaluateGap)
		api.Get("/audit/controls", h.GetAuditControls)
		api.Post("/audit/evaluate", h.EvaluateAudit)
		api.Post("/sanctions/calculate", h.CalculateSanctions)

		// Institutional Dashboard & Governance
		api.Get("/institution/status", h.GetInstitutionalStatus)
		api.Get("/institution/rat", h.GetRatActivities)
		api.Post("/institution/rat", h.AddRatActivity)
		api.Get("/institution/dpa", h.GetDpaContracts)
		api.Post("/institution/dpa", h.AddDpaContract)
		api.Put("/institution/dpa/{id}/toggle", h.ToggleDpaContract)
		api.Get("/institution/incidents", h.GetIncidents)
		api.Post("/institution/incidents", h.AddIncident)

		// Citizen Tracking & APDP Complaint
		api.Get("/citizen/requests", h.GetCitizenRequests)
		api.Put("/barsop/requests/{id}/status", h.UpdateBarsopStatus)
		api.Post("/citizen/complaint-apdp", h.GenerateApdpComplaint)
	})

	log.Printf("🚀 Servidor PO Backend iniciado en http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatalf("Error iniciando servidor: %v", err)
	}
}
