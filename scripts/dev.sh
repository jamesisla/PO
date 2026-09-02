#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

echo "🚀 Iniciando PO (Plataforma de Protección de Datos Personales)..."

cleanup() {
    echo ""
    echo "🛑 Deteniendo servicios..."
    if [ -n "$BACKEND_PID" ]; then kill $BACKEND_PID 2>/dev/null || true; fi
    if [ -n "$FRONTEND_PID" ]; then kill $FRONTEND_PID 2>/dev/null || true; fi
    echo "✨ Servicios detenidos limpiamente."
}
trap cleanup SIGINT SIGTERM EXIT

# 1. Iniciar Backend Go
echo "⚙️  Iniciando Backend en http://localhost:8080..."
(cd "$DIR/backend" && go run ./cmd/server) &
BACKEND_PID=$!

# 2. Iniciar Frontend Vite
echo "💻 Iniciando Frontend en http://localhost:5173..."
(cd "$DIR/frontend" && npm run dev) &
FRONTEND_PID=$!

echo "✅ Servicios iniciados con éxito:"
echo "   - Frontend: http://localhost:5173"
echo "   - Backend:  http://localhost:8080 (Health: http://localhost:8080/health)"
echo "Presiona Ctrl+C para detener."

wait
