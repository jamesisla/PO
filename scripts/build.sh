#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

echo "🔨 Compilando PO (Frontend & Backend)..."

echo "📦 1/2 Compilando Frontend (React + Vite)..."
(cd "$DIR/frontend" && npm run build)

echo "📦 2/2 Compilando Backend (Go)..."
(cd "$DIR/backend" && go build -ldflags="-s -w" -o bin/server ./cmd/server)

echo "✅ Compilación completada con éxito."
echo "   - Frontend: frontend/dist/"
echo "   - Backend:  backend/bin/server"
