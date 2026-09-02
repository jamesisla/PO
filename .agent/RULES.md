# 📋 PO — Reglas del Asistente & Convenciones

## 🛠️ Stack Tecnológico
* **Backend:** Go (Chi router, arquitectura limpia: handlers, services, repositories)
* **Frontend:** React 18+ (Vite + TypeScript + Tailwind CSS + Lucide Icons)
* **Base de Datos:** PostgreSQL 16+ (con pgvector / Full-Text Search para búsqueda inteligente)
* **Puertos Locales:**
  * Frontend: `http://localhost:5173`
  * Backend API: `http://localhost:8080`

---

## 📐 Convenciones de Código & Arquitectura
1. **Modularidad & Separación de Capas:**
   * Handlers/Controllers delgados, lógica de negocio en servicios/casos de uso, persistencia en repositorios.
2. **Validación Estricta:**
   * Tipado estricto en interfaces (TypeScript / Pydantic / Go Structs) tanto en entradas como salidas.
3. **Manejo de Errores:**
   * Respuestas HTTP con códigos de estado semánticos (400, 401, 403, 404, 422, 500) y mensajes útiles.

---

## 🚫 Restricciones Obligatorias (Anti-Entropía)
* ❌ **NO subas binarios compilados, ejecutables ni archivos `.db` al repositorio.**
* ❌ **NO realices refactorizaciones no solicitadas en módulos fuera del alcance de la tarea.**
* ❌ **NO agregues dependencias pesadas si una utilidad nativa es suficiente.**
* ❌ **NO dejes secretos, credenciales ni tokens hardcodeados en el código.**

---

## 🔄 Protocolo de Sesión de Desarrollo
1. **Al iniciar:** Leer `.agent/STATE.md` para recuperar el hilo de trabajo.
2. **Antes de codificar:** Presentar un plan conciso de 2-3 pasos.
3. **Al finalizar:** Actualizar `.agent/STATE.md` con los avances y los siguientes pasos.
