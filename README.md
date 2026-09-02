# 🛡️ PO — Plataforma de Protección de Datos Personales (Ley Chile 2026)

> Plataforma integral e interactiva para la comprensión, implementación y cumplimiento de la **Nueva Ley de Protección de Datos Personales de Chile** (Entrada en vigencia: **1 de diciembre de 2026**).

---

## 🎯 Modos de Navegación

* **👤 Modo Ciudadano (Niveles 1 y 2):** Fundamentos, derechos BARSOP (Bloqueo, Acceso, Rectificación, Supresión, Oposición, Portabilidad), plazos de 30 días, casos prácticos y generador asistido de cartas/solicitudes formales.
* **🏢 Modo Empresa (Niveles 3 y 4):** Obligaciones de los responsables/encargados, deber de seguridad, notificación de incidentes (72h), Registro de Actividades de Tratamiento (RAT), designación de DPD y análisis de brechas (Gap Analysis).
* **⚙️ Modo Experto / Técnico (Nivel 5 + Transversal):** Arquitectura de flujos de datos, cifrado, anonimización, APIs, checklists interactivos por industria y calculadora de sanciones (hasta 20.000 UTM y 4% de facturación anual).
* **🕵️ Modo Auditor / Compliance:** Matriz de control de cumplimiento, verificación de evidencias (licitud, DPAs, BARSOP, seguridad) y generador de Dictámenes de Auditoría.

---

## 📚 Estructura de Contenidos (5 Niveles)

1. **Nivel 1 – Fundamento:** Objeto, ámbito de aplicación, glosario interactivo y principios rectores.
2. **Nivel 2 – Derechos de los Titulares:** Catálogo BARSOP en profundidad, portabilidad, ejercicio y casos reales.
3. **Nivel 3 – Obligaciones Organizacionales:** Bases de licitud, deber de información, seguridad, reporte de brechas y accountability.
4. **Nivel 4 – Gobernanza y Cumplimiento:** RAT, Gap Analysis, políticas internas, DPD, evaluaciones de impacto (EIPD) y planes de respuesta.
5. **Nivel 5 – Aspectos Técnicos & Operativos:** Mapeo de flujos, seguridad técnica (AES-256, TLS 1.3), portal ciudadano ARCO, checklists para PyMEs, Salud, Fintech y Sector Público.
* **Transversal:** Agencia de Protección de Datos Personales & Régimen Sancionatorio.

---

## 🛠️ Stack Tecnológico

* **Backend:** Go (Chi Router, Clean Architecture: Handlers, Services, Repositories).
* **Frontend:** React + Vite + TypeScript + Tailwind CSS + Lucide Icons.
* **Base de Datos:** PostgreSQL con soporte para búsqueda full-text y semántica.

---

## ⚡ Inicio Rápido

Para iniciar backend y frontend en desarrollo:
```bash
bash scripts/dev.sh
```

Para compilar a producción:
```bash
bash scripts/build.sh
```

---

## 🤖 Memoria & Convenciones del Proyecto

* **[`.agent/RULES.md`](.agent/RULES.md)**: Reglas operativas, convenciones de código y restricciones.
* **[`.agent/ARCHITECTURE.md`](.agent/ARCHITECTURE.md)**: Topología, entidades de base de datos, contratos de API y diagramas de flujo.
* **[`.agent/STATE.md`](.agent/STATE.md)**: Estado vivo del sprint, backlog inmediato y bloqueos.
