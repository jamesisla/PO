#!/usr/bin/env bash
# ==============================================================================
# SCRIPT DE DESPLIEGUE ESTANDARIZADO — PO
# ==============================================================================
# Modos de uso:
#   1. Despliegue remoto desde tu PC local a OCI:
#      bash scripts/deploy.sh ubuntu@<IP_OCI> [amd64|arm64]
#
#   2. Despliegue local directo en el servidor OCI:
#      bash scripts/deploy.sh
# ==============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_HOST="${1:-}"
TARGET_ARCH="${2:-amd64}"

APP_NAME="po"
SERVICE_NAME="po"
REMOTE_DIR="/opt/apps/$APP_NAME"

GREEN="\033[0;32m"
BLUE="\033[0;34m"
YELLOW="\033[1;33m"
CYAN="\033[0;36m"
NC="\033[0m"

echo -e "${CYAN}======================================================${NC}"
echo -e "${CYAN}🚀 Despliegue de PO${NC}"
echo -e "${CYAN}======================================================${NC}"

if [ -n "$TARGET_HOST" ]; then
  echo -e "${BLUE}▶ Modo: Despliegue Remoto hacia ${TARGET_HOST}${NC}"
  # Compilar y transferir
  bash "$DIR/scripts/build.sh"
  ssh "$TARGET_HOST" "sudo mkdir -p $REMOTE_DIR/data && sudo chown -R \$USER:\$USER $REMOTE_DIR"
  rsync -avz "$DIR/bin/" "$TARGET_HOST:$REMOTE_DIR/"
  rsync -avz "$DIR/scripts/systemd/$SERVICE_NAME.service" "$TARGET_HOST:/tmp/$SERVICE_NAME.service"
  
  ssh "$TARGET_HOST" "
    chmod +x $REMOTE_DIR/*
    sudo mv /tmp/$SERVICE_NAME.service /etc/systemd/system/$SERVICE_NAME.service
    sudo systemctl daemon-reload
    sudo systemctl enable $SERVICE_NAME
    sudo systemctl restart $SERVICE_NAME
    sudo systemctl status $SERVICE_NAME --no-pager
  "
  echo -e "\n${GREEN}✅ Despliegue remoto de PO finalizado.${NC}"
else
  echo -e "${BLUE}▶ Modo: Despliegue Local en este servidor${NC}"
  bash "$DIR/scripts/build.sh"
  sudo systemctl restart "$SERVICE_NAME" || true
  echo -e "\n${GREEN}✅ Despliegue local finalizado.${NC}"
fi
