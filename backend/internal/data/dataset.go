package data

import (
	"po-backend/internal/domain"
	"time"
)

func GetInitialMilestones() []domain.Milestone {
	return []domain.Milestone{
		{
			ID:                "M1",
			Title:             "Auditoría y Mapeo Inicial de Tratamientos (RAT)",
			TargetDate:        "2026-03-31",
			Description:       "Identificar todas las bases de datos, flujos de datos y bases de licitud en la organización.",
			Status:            "pending",
			RecommendedAction: "Ejecutar inventario de sistemas y completar el módulo RAT.",
		},
		{
			ID:                "M2",
			Title:             "Nombramiento del Delegado de Protección de Datos (DPD)",
			TargetDate:        "2026-06-30",
			Description:       "Definir obligatoriedad y designar formalmente al DPD si corresponde.",
			Status:            "pending",
			RecommendedAction: "Evaluar perfil de DPD y formalizar dependencia jerárquica independiente.",
		},
		{
			ID:                "M3",
			Title:             "Actualización de Políticas y Contratos DPA con Proveedores",
			TargetDate:        "2026-09-30",
			Description:       "Modificar contratos de encargados de tratamiento e implementar avisos de privacidad.",
			Status:            "pending",
			RecommendedAction: "Revisar cláusulas de subencargados y actualizar términos web.",
		},
		{
			ID:                "M4",
			Title:             "Pruebas del Portal Ciudadano BARSOP y Protocolo de 72h",
			TargetDate:        "2026-11-15",
			Description:       "Simulacro de respuesta a solicitudes ciudadanas y test de respuesta a brechas.",
			Status:            "pending",
			RecommendedAction: "Capacitar equipos de atención al cliente y TI en SLA de 30 días y alerta 72h.",
		},
		{
			ID:                "M5",
			Title:             "Entrada en Vigor Oficial de la Ley",
			TargetDate:        "2026-12-01",
			Description:       "Plena vigencia legal y facultades fiscalizadoras y sancionatorias de la Agencia.",
			Status:            "pending",
			RecommendedAction: "Cumplimiento 100% obligatorio bajo apercibimiento de multas hasta 20.000 UTM.",
		},
	}
}

func GetModules() []domain.Module {
	return []domain.Module{
		{
			ID:         "mod-1-1",
			Level:      1,
			LevelName:  "Nivel 1 – Fundamento",
			Code:       "1.1",
			Title:      "Objeto y Ámbito de Aplicación",
			TargetMode: "all",
			Summary:    "Regulación de personas naturales, aplicación a entes públicos y privados, vigencia 1 de diciembre de 2026.",
			ContentMarkdown: "### Objeto y Ámbito de la Nueva Ley\n\nLa nueva ley regula de forma integral el tratamiento de datos personales de las personas naturales en Chile.\n\n* **Entrada en vigor:** 1 de diciembre de 2026.\n* **Titulares:** Personas naturales.\n* **Obligados:** Toda entidad pública o privada que trate datos.",
			LegalArticles: []string{"Art. 1", "Art. 2", "Art. Transitorio 1"},
			KeyTakeaways: []string{
				"Aplica tanto a entidades públicas como privadas.",
				"Entrada en vigencia: 1 de diciembre de 2026.",
				"Protege a personas naturales en todo tratamiento.",
			},
			ActionChecklist: []string{
				"Verificar si la organización trata datos de personas naturales.",
				"Identificar recolección de datos de residentes en Chile.",
				"Fijar cronograma hacia el 1 de diciembre de 2026.",
			},
		},
		{
			ID:         "mod-1-2",
			Level:      1,
			LevelName:  "Nivel 1 – Fundamento",
			Code:       "1.2",
			Title:      "Glosario de Términos Clave",
			TargetMode: "all",
			Summary:    "Definiciones legales: dato personal, dato sensible, responsable, encargado, titular, tratamiento y consentimiento.",
			ContentMarkdown: "### Glosario Fundamental\n\n* **Dato Personal:** Información vinculada a una persona identificada o identificable.\n* **Dato Sensible:** Datos de salud, biométricos, opiniones políticas, convicciones religiosas o vida sexual.\n* **Responsable:** Quien decide los fines y medios del tratamiento.\n* **Encargado:** Quien trata datos por cuenta del responsable.\n* **Consentimiento:** Manifestación de voluntad libre, específica, informada e inequívoca.",
			LegalArticles: []string{"Art. 3"},
			KeyTakeaways: []string{
				"Datos sensibles exigen consentimiento expreso o causal legal estricta.",
				"El responsable mantiene la responsabilidad final ante la Agencia.",
			},
			ActionChecklist: []string{
				"Clasificar bases de datos entre ordinarias y sensibles.",
				"Mapear roles de responsable y encargado.",
			},
		},
		{
			ID:         "mod-1-3",
			Level:      1,
			LevelName:  "Nivel 1 – Fundamento",
			Code:       "1.3",
			Title:      "Contexto y Principios Rectores",
			TargetMode: "all",
			Summary:    "Los 8 principios rectores: licitud, finalidad, proporcionalidad, calidad, responsabilidad, seguridad, transparencia y confidencialidad.",
			ContentMarkdown: "### 8 Principios Rectores Obligatorios\n\n1. **Licitud:** Tratamiento con base legal válida.\n2. **Finalidad:** Fines determinados, explícitos y legítimos.\n3. **Proporcionalidad (Minimización):** Solo datos estrictamente necesarios.\n4. **Calidad:** Datos exactos y actualizados.\n5. **Responsabilidad Proactiva (Accountability):** Acreditar cumplimiento documentalmente.\n6. **Seguridad:** Medidas técnicas y organizativas.\n7. **Transparencia:** Información clara al titular.\n8. **Confidencialidad:** Deber de secreto profesional permanente.",
			LegalArticles: []string{"Art. 4"},
			KeyTakeaways: []string{
				"Minimización: No recolectar datos innecesarios.",
				"Accountability: Es obligatorio contar con evidencia auditable.",
			},
			ActionChecklist: []string{
				"Auditar formularios web para eliminar campos excesivos.",
				"Capacitar al personal en deber de secreto.",
			},
		},
		{
			ID:         "mod-2-1",
			Level:      2,
			LevelName:  "Nivel 2 – Derechos de los Titulares",
			Code:       "2.1",
			Title:      "Catálogo de Derechos BARSOP",
			TargetMode: "citizen",
			Summary:    "Los seis derechos: Bloqueo, Acceso, Rectificación, Supresión, Oposición y Portabilidad.",
			ContentMarkdown: "### Derechos BARSOP\n\n* **[B] Bloqueo:** Suspensión temporal del uso de datos.\n* **[A] Acceso:** Conocer qué datos tienen y para qué los usan.\n* **[R] Rectificación:** Corregir datos erróneos o incompletos.\n* **[S] Supresión:** Solicitar el borrado de datos (derecho al olvido).\n* **[O] Oposición:** Negarse a tratamientos específicos (e.g. marketing).\n* **[P] Portabilidad:** Obtener datos en formato interoperable (JSON/CSV).",
			LegalArticles: []string{"Art. 5 al 11"},
			KeyTakeaways: []string{
				"El ejercicio de derechos es 100% gratuito para el titular.",
				"Las empresas tienen un plazo estricto de 30 días corridos para responder.",
			},
			ActionChecklist: []string{
				"Identificar el derecho a ejercer.",
				"Usar el generador interactivo de solicitudes BARSOP.",
			},
		},
		{
			ID:         "mod-2-2",
			Level:      2,
			LevelName:  "Nivel 2 – Derechos de los Titulares",
			Code:       "2.2",
			Title:      "Derecho de Acceso en Profundidad",
			TargetMode: "citizen",
			Summary:    "Información exigible: confirmación, origen, cesiones a terceros y períodos de conservación.",
			ContentMarkdown: "### Contenido del Derecho de Acceso\n\nEl titular puede exigir:\n1. Confirmación de tratamiento.\n2. Copia de sus datos personales.\n3. Origen de los datos.\n4. Destinatarios y cesiones a terceros.\n5. Período de conservación previsto.",
			LegalArticles: []string{"Art. 6"},
			KeyTakeaways: []string{
				"La respuesta de la empresa debe ser comprensible y sin omisiones.",
			},
			ActionChecklist: []string{
				"Solicitar copia íntegra de ficha o historial.",
			},
		},
		{
			ID:         "mod-2-3",
			Level:      2,
			LevelName:  "Nivel 2 – Derechos de los Titulares",
			Code:       "2.3",
			Title:      "Derecho de Portabilidad",
			TargetMode: "citizen",
			Summary:    "Derecho a recibir datos en formato estructurado (JSON, CSV) y transferirlos a otro proveedor.",
			ContentMarkdown: "### Portabilidad de Datos\n\nPermite transferir tus datos de un servicio a otro sin obstáculos.\n\n* Formato interoperable estructurado (JSON, CSV).\n* Transmisión directa entre responsables cuando sea técnicamente factible.",
			LegalArticles: []string{"Art. 10"},
			KeyTakeaways: []string{
				"Evita el secuestro de datos por parte de plataformas y proveedores.",
			},
			ActionChecklist: []string{
				"Solicitar archivo estructurado de datos personales.",
			},
		},
		{
			ID:         "mod-2-4",
			Level:      2,
			LevelName:  "Nivel 2 – Derechos de los Titulares",
			Code:       "2.4",
			Title:      "Ejercicio de Derechos & Plazos Legales",
			TargetMode: "citizen",
			Summary:    "Plazo legal de 30 días corridos, gratuidad, canales electrónicos y reclamo ante la Agencia.",
			ContentMarkdown: "### Plazos y Procedimiento BARSOP\n\n* **Plazo legal:** 30 días corridos.\n* **Gratuidad:** Sin costo alguno.\n* **Canal:** Medios electrónicos accesibles.\n* **Reclamo:** Si no responden en 30 días o rechazan sin motivo, se reclama ante la APDP.",
			LegalArticles: []string{"Art. 12"},
			KeyTakeaways: []string{
				"El plazo es de 30 días corridos (incluye fines de semana).",
			},
			ActionChecklist: []string{
				"Guardar comprobante con fecha de envío.",
			},
		},
		{
			ID:         "mod-2-5",
			Level:      2,
			LevelName:  "Nivel 2 – Derechos de los Titulares",
			Code:       "2.5",
			Title:      "Casos Prácticos Cotidianos",
			TargetMode: "citizen",
			Summary:    "Escenarios reales: supresión de cuentas en apps, oposición a telemarketing y rectificación crediticia.",
			ContentMarkdown: "### Casos Prácticos\n\n1. **Baja de App:** Exigir borrado definitivo de historial y datos de navegación.\n2. **Telemarketing:** Oposición inmediata a llamadas y correos publicitarios.\n3. **Deuda Aclarada:** Rectificación y bloqueo temporal de reportes comerciales.",
			LegalArticles: []string{"Art. 7, 8, 9"},
			KeyTakeaways: []string{
				"La oposición a fines publicitarios no requiere justificación.",
			},
			ActionChecklist: []string{
				"Seleccionar plantilla de solicitud personalizada.",
			},
		},
		{
			ID:         "mod-3-1",
			Level:      3,
			LevelName:  "Nivel 3 – Obligaciones Organizacionales",
			Code:       "3.1",
			Title:      "Principios de Tratamiento & Bases de Licitud",
			TargetMode: "company",
			Summary:    "Bases jurídicas: consentimiento, ejecución contractual, mandato legal o interés legítimo.",
			ContentMarkdown: "### Bases Legales de Licitud\n\nTodo tratamiento requiere una base legal:\n* Consentimiento libre e inequívoco.\n* Cumplimiento contractual.\n* Obligación legal.\n* Interés legítimo comprobado con test de ponderación.",
			LegalArticles: []string{"Art. 13"},
			KeyTakeaways: []string{
				"Se eliminan los consentimientos tácitos o por casillas premarcadas.",
			},
			ActionChecklist: []string{
				"Auditar base legal de cada sistema corporativo.",
			},
		},
		{
			ID:         "mod-3-2",
			Level:      3,
			LevelName:  "Nivel 3 – Obligaciones Organizacionales",
			Code:       "3.2",
			Title:      "Deber de Información (Transparencia)",
			TargetMode: "company",
			Summary:    "Avisos de privacidad claros en capas, explicando finalidades, cesiones y contacto del DPD.",
			ContentMarkdown: "### Deber de Información y Transparencia\n\n* Informar identidad del responsable y DPD.\n* Detallar finalidades y plazos de conservación.\n* Describir canales de ejercicio BARSOP.",
			LegalArticles: []string{"Art. 14"},
			KeyTakeaways: []string{
				"Redactar avisos por capas comprensibles para cualquier usuario.",
			},
			ActionChecklist: []string{
				"Actualizar términos y política web.",
			},
		},
		{
			ID:         "mod-3-3",
			Level:      3,
			LevelName:  "Nivel 3 – Obligaciones Organizacionales",
			Code:       "3.3",
			Title:      "Deber de Seguridad",
			TargetMode: "company",
			Summary:    "Medidas técnicas y organizativas: cifrado, control de accesos RBAC y auditorías.",
			ContentMarkdown: "### Medidas de Seguridad Exigibles\n\n* Cifrado en reposo y en tránsito.\n* Autenticación multifactor (MFA) para administradores.\n* Políticas de respaldo y contingencia probadas.",
			LegalArticles: []string{"Art. 15"},
			KeyTakeaways: []string{
				"La seguridad es una obligación legal continua y auditable.",
			},
			ActionChecklist: []string{
				"Implementar MFA y cifrado en bases de datos.",
			},
		},
		{
			ID:         "mod-3-4",
			Level:      3,
			LevelName:  "Nivel 3 – Obligaciones Organizacionales",
			Code:       "3.4",
			Title:      "Notificación de Brechas de Seguridad",
			TargetMode: "company",
			Summary:    "Reporte obligatorio a la Agencia dentro de un plazo máximo de 72 horas.",
			ContentMarkdown: "### Notificación de Brechas (72 Horas)\n\n* Notificar a la Agencia en un plazo máximo de 72 horas tras confirmarse el incidente.\n* Notificar a titulares si existe alto riesgo para sus derechos.\n* Registrar internamente todo incidente en el libro de brechas.",
			LegalArticles: []string{"Art. 16"},
			KeyTakeaways: []string{
				"Ocultar una brecha es infracción gravísima con multas máximas.",
			},
			ActionChecklist: []string{
				"Establecer comité de respuesta a incidentes 24/7.",
			},
		},
		{
			ID:         "mod-3-5",
			Level:      3,
			LevelName:  "Nivel 3 – Obligaciones Organizacionales",
			Code:       "3.5",
			Title:      "Responsabilidad Proactiva (Accountability)",
			TargetMode: "company",
			Summary:    "Acreditar cumplimiento mediante políticas, privacidad desde el diseño y evidencias.",
			ContentMarkdown: "### Principio de Accountability\n\n* Privacidad desde el Diseño (Privacy by Design).\n* Privacidad por Defecto (Privacy by Default).\n* Repositorio de evidencias de cumplimiento.",
			LegalArticles: []string{"Art. 17"},
			KeyTakeaways: []string{
				"La empresa debe demostrar documentalmente su cumplimiento.",
			},
			ActionChecklist: []string{
				"Estructurar repositorio de evidencias.",
			},
		},
		{
			ID:         "mod-3-6",
			Level:      3,
			LevelName:  "Nivel 3 – Obligaciones Organizacionales",
			Code:       "3.6",
			Title:      "Relación Responsable-Encargado (DPA)",
			TargetMode: "company",
			Summary:    "Contratos de tratamiento obligatorios con proveedores de software y servicios cloud.",
			ContentMarkdown: "### Acuerdos de Tratamiento DPA\n\n* Instrucciones documentadas de tratamiento.\n* Deber de confidencialidad y medidas técnicas de seguridad.\n* Prohibición de subcontratar sin autorización previa.\n* Destrucción o devolución de datos al finalizar el servicio.",
			LegalArticles: []string{"Art. 18"},
			KeyTakeaways: []string{
				"El responsable responde si contrata proveedores sin garantías suficientes.",
			},
			ActionChecklist: []string{
				"Firmar anexo DPA con todos los proveedores tecnológicos.",
			},
		},
		{
			ID:         "mod-4-1",
			Level:      4,
			LevelName:  "Nivel 4 – Gobernanza y Cumplimiento",
			Code:       "4.1",
			Title:      "Registro de Actividades de Tratamiento (RAT)",
			TargetMode: "company",
			Summary:    "Inventario obligatorio de bases de datos, finalidades, categorías y plazos de retención.",
			ContentMarkdown: "### Registro de Actividades de Tratamiento (RAT)\n\nInventario detallado de tratamientos con:\n* Finalidad y base jurídica.\n* Categorías de datos y titulares.\n* Destinatarios de transferencias.\n* Plazos de retención y medidas de seguridad.",
			LegalArticles: []string{"Art. 19"},
			KeyTakeaways: []string{
				"Documento fundamental requerido en cualquier fiscalización.",
			},
			ActionChecklist: []string{
				"Completar el inventario RAT en la plataforma.",
			},
		},
		{
			ID:         "mod-4-2",
			Level:      4,
			LevelName:  "Nivel 4 – Gobernanza y Cumplimiento",
			Code:       "4.2",
			Title:      "Análisis de Brechas (Gap Analysis)",
			TargetMode: "company",
			Summary:    "Diagnóstico del estado actual vs requerimientos legales para priorizar acciones.",
			ContentMarkdown: "### Metodología de Gap Analysis\n\n1. Evaluación de madurez en 5 ejes clave.\n2. Identificación de riesgos con exposición a sanciones.\n3. Plan de remediación con cronograma e hitos.",
			LegalArticles: []string{"Art. 20"},
			KeyTakeaways: []string{
				"Permite llegar al 1 de diciembre de 2026 sin contingencias.",
			},
			ActionChecklist: []string{
				"Ejecutar el test de autodiagnóstico integrado.",
			},
		},
		{
			ID:         "mod-4-3",
			Level:      4,
			LevelName:  "Nivel 4 – Gobernanza y Cumplimiento",
			Code:       "4.3",
			Title:      "Política Interna de Protección de Datos",
			TargetMode: "company",
			Summary:    "Normativa corporativa vinculante para colaboradores, roles y directrices de seguridad.",
			ContentMarkdown: "### Política Interna de Privacidad\n\n* Alcance y principios corporativos.\n* Roles, responsabilidades y custodios de datos.\n* Pautas de manejo seguro y confidencialidad.",
			LegalArticles: []string{"Art. 21"},
			KeyTakeaways: []string{
				"Debe ser aprobada por el directorio y firmada por los empleados.",
			},
			ActionChecklist: []string{
				"Descargar plantilla de política interna y socializarla.",
			},
		},
		{
			ID:         "mod-4-4",
			Level:      4,
			LevelName:  "Nivel 4 – Gobernanza y Cumplimiento",
			Code:       "4.4",
			Title:      "Designación del Delegado de Protección de Datos (DPD)",
			TargetMode: "company",
			Summary:    "Obligatoriedad en sector público, tratamiento masivo o datos sensibles, con perfil independiente.",
			ContentMarkdown: "### Delegado de Protección de Datos (DPD)\n\n* Obligatorio en sector público y tratamientos a gran escala o de datos sensibles.\n* Independencia funcional y reporte directo a la alta dirección.\n* Punto de enlace con la Agencia y los titulares.",
			LegalArticles: []string{"Art. 22 al 25"},
			KeyTakeaways: []string{
				"Puede ser interno o externo.",
			},
			ActionChecklist: []string{
				"Determinar obligatoriedad y formalizar nombramiento.",
			},
		},
		{
			ID:         "mod-4-5",
			Level:      4,
			LevelName:  "Nivel 4 – Gobernanza y Cumplimiento",
			Code:       "4.5",
			Title:      "Evaluación de Impacto en Protección de Datos (EIPD)",
			TargetMode: "company",
			Summary:    "Análisis preventivo obligatorio en tratamientos de alto riesgo (IA, biometría, perfilado).",
			ContentMarkdown: "### Evaluación de Impacto (EIPD / DPIA)\n\nObligatoria ante tratamientos de alto riesgo:\n* Perfilado algorítmico o Inteligencia Artificial.\n* Datos sensibles masivos.\n* Videovigilancia a gran escala.",
			LegalArticles: []string{"Art. 26"},
			KeyTakeaways: []string{
				"Debe realizarse antes del despliegue en producción.",
			},
			ActionChecklist: []string{
				"Completar matriz EIPD para nuevos proyectos.",
			},
		},
		{
			ID:         "mod-4-6",
			Level:      4,
			LevelName:  "Nivel 4 – Gobernanza y Cumplimiento",
			Code:       "4.6",
			Title:      "Gestión de Riesgos de Privacidad",
			TargetMode: "company",
			Summary:    "Matriz de probabilidad e impacto enfocada en el daño potencial para los titulares.",
			ContentMarkdown: "### Matriz de Riesgos de Privacidad\n\n* Evaluación del impacto sobre los derechos y libertades de las personas.\n* Planes de mitigación técnica y operacional.",
			LegalArticles: []string{"Art. 27"},
			KeyTakeaways: []string{
				"El riesgo se mide en función del daño al titular.",
			},
			ActionChecklist: []string{
				"Mapear los riesgos en la matriz de privacidad.",
			},
		},
		{
			ID:         "mod-4-7",
			Level:      4,
			LevelName:  "Nivel 4 – Gobernanza y Cumplimiento",
			Code:       "4.7",
			Title:      "Plan de Respuesta a Incidentes (Protocolo 72h)",
			TargetMode: "company",
			Summary:    "Fases de contención, evaluación, redacción y notificación formal a la Agencia.",
			ContentMarkdown: "### Fases del Protocolo de 72 Horas\n\n1. **Horas 0-12:** Contención técnica y preservación de evidencia forense.\n2. **Horas 12-36:** Evaluación de sensibilidad y riesgo para titulares.\n3. **Horas 36-60:** Preparación del informe de vulneración.\n4. **Horas 60-72:** Notificación formal a la Agencia.",
			LegalArticles: []string{"Art. 16, 28"},
			KeyTakeaways: []string{
				"Simulacros periódicos garantizan la respuesta en tiempo.",
			},
			ActionChecklist: []string{
				"Ejecutar simulacro de notificación de incidentes.",
			},
		},
		{
			ID:         "mod-5-1",
			Level:      5,
			LevelName:  "Nivel 5 – Aspectos Técnicos & Operativos",
			Code:       "5.1",
			Title:      "Arquitectura de Datos & Mapeo de Flujos",
			TargetMode: "technical",
			Summary:    "Mapeo de Data Lineage, segmentación de redes, subnets privadas y control de transferencias.",
			ContentMarkdown: "### Arquitectura de Datos Segura\n\n* Data Flow Diagrams (DFD) actualizados.\n* Aislamiento de bases de datos en redes privadas sin exposición pública.\n* Control de soberanía y transferencias transfronterizas.",
			LegalArticles: []string{"Art. 29"},
			KeyTakeaways: []string{
				"Proteger bases de datos mediante arquitecturas en capas seguras.",
			},
			ActionChecklist: []string{
				"Generar diagrama de flujo de datos técnicos.",
			},
		},
		{
			ID:         "mod-5-2",
			Level:      5,
			LevelName:  "Nivel 5 – Aspectos Técnicos & Operativos",
			Code:       "5.2",
			Title:      "Medidas de Seguridad Técnicas",
			TargetMode: "technical",
			Summary:    "Cifrado AES-256 en reposo, TLS 1.3 en tránsito, seudonimización y hashing Argon2id.",
			ContentMarkdown: "### Estándares Técnicos Obligatorios\n\n* Cifrado AES-256 en discos y almacenamiento de base de datos.\n* TLS 1.3 con suites modernas en APIs y microservicios.\n* Hashing robusto (Argon2 / bcrypt) y seudonimización de identificadores.\n* Logs inmutables de auditoría de accesos a datos personales.",
			LegalArticles: []string{"Art. 15, 30"},
			KeyTakeaways: []string{
				"Nunca registrar contraseñas ni datos sensibles en logs.",
			},
			ActionChecklist: []string{
				"Verificar cifrado en reposo y configuración TLS 1.3.",
			},
		},
		{
			ID:         "mod-5-3",
			Level:      5,
			LevelName:  "Nivel 5 – Aspectos Técnicos & Operativos",
			Code:       "5.3",
			Title:      "Gestión de Consentimientos (Consent Management)",
			TargetMode: "technical",
			Summary:    "Arquitectura para capturar, versionar, consultar y revocar consentimientos en tiempo real.",
			ContentMarkdown: "### Consent Management Platform (CMP)\n\n* Tabla de trazabilidad de consentimientos con timestamp, versión e IP.\n* Endpoint de revocación inmediata en un solo clic.\n* Sincronización en tiempo real con pipelines downstream.",
			LegalArticles: []string{"Art. 13"},
			KeyTakeaways: []string{
				"Revocar debe ser tan simple y accesible como otorgar el consentimiento.",
			},
			ActionChecklist: []string{
				"Diseñar tabla y API de consentimientos.",
			},
		},
		{
			ID:         "mod-5-4",
			Level:      5,
			LevelName:  "Nivel 5 – Aspectos Técnicos & Operativos",
			Code:       "5.4",
			Title:      "Portal Ciudadano (ARCO / BARSOP)",
			TargetMode: "technical",
			Summary:    "Autenticación segura, generación de ticket con hash de tiempo y SLA de 30 días.",
			ContentMarkdown: "### Especificación Técnica del Portal BARSOP\n\n* Autenticación robusta del titular.\n* Timestamp inalterable y cálculo automático de fecha límite (30 días corridos).\n* Descarga cifrada y segura de datos exportados.",
			LegalArticles: []string{"Art. 12"},
			KeyTakeaways: []string{
				"Validar identidad antes de entregar información personal.",
			},
			ActionChecklist: []string{
				"Desplegar portal de autoservicio para el ciudadano.",
			},
		},
		{
			ID:         "mod-5-5",
			Level:      5,
			LevelName:  "Nivel 5 – Aspectos Técnicos & Operativos",
			Code:       "5.5",
			Title:      "Automatización de Respuestas & SLAs",
			TargetMode: "technical",
			Summary:    "Pipelines distribuidos para extraer, rectificar o anonimizar datos en múltiples microservicios.",
			ContentMarkdown: "### Automatización de Flujos BARSOP\n\n* Eventos asíncronos (e.g. UserDeletionRequested) en message queues.\n* SLAs automatizados con alertas previas al vencimiento de 30 días.",
			LegalArticles: []string{"Art. 12, 31"},
			KeyTakeaways: []string{
				"Reducción de costos operativos y garantía de cumplimiento en plazo.",
			},
			ActionChecklist: []string{
				"Automatizar pipeline de extracción de datos del usuario.",
			},
		},
		{
			ID:         "mod-5-6",
			Level:      5,
			LevelName:  "Nivel 5 – Aspectos Técnicos & Operativos",
			Code:       "5.6",
			Title:      "Notificación Automática de Brechas",
			TargetMode: "technical",
			Summary:    "Sistemas SIEM, alertas de tráfico anómalo y generación automática de reportes.",
			ContentMarkdown: "### Detección y Alerta de Fugas\n\n* Detección de descargas masivas inusuales mediante SIEM.\n* Disparo de alertas críticas a guardia de seguridad y legal.",
			LegalArticles: []string{"Art. 16"},
			KeyTakeaways: []string{
				"La detección temprana es vital para cumplir con las 72 horas.",
			},
			ActionChecklist: []string{
				"Configurar alertas automáticas de anomalías de consultas en DB.",
			},
		},
		{
			ID:         "mod-5-7",
			Level:      5,
			LevelName:  "Nivel 5 – Aspectos Técnicos & Operativos",
			Code:       "5.7",
			Title:      "Integración con la Agencia de Protección de Datos",
			TargetMode: "technical",
			Summary:    "APIs de reporte, interoperabilidad y modelos JSON estandarizados de incidentes.",
			ContentMarkdown: "### Interoperabilidad con la APDP\n\n* Carga estructurada de informes de brechas.\n* Interfaz para registro de DPD y respuestas a fiscalizaciones electrónicas.",
			LegalArticles: []string{"Art. 32"},
			KeyTakeaways: []string{
				"Estandarizar formatos facilita la respuesta ante fiscalizaciones.",
			},
			ActionChecklist: []string{
				"Preparar esquema de reporte según estándar de la Agencia.",
			},
		},
		{
			ID:         "mod-5-8",
			Level:      5,
			LevelName:  "Nivel 5 – Aspectos Técnicos & Operativos",
			Code:       "5.8",
			Title:      "Checklists por Tipo de Organización",
			TargetMode: "technical",
			Summary:    "Verificaciones técnicas para PyMEs, Grandes Empresas, Sector Salud, Fintech y Sector Público.",
			ContentMarkdown: "### Listas de Verificación Técnicas por Sector\n\n* **PyMEs:** Backup cifrado, aviso web, DPA cloud.\n* **Grandes Empresas:** RAT automatizado, DPD oficial, EIPD y SIEM.\n* **Salud:** Cifrado cualificado de datos médicos, logs de auditoría estricta.\n* **Fintech:** Cumplimiento CMF + APDP, portabilidad financiera segura.\n* **Sector Público:** DPD mandatorio y coordinación con Ley de Transparencia.",
			LegalArticles: []string{"Art. 33"},
			KeyTakeaways: []string{
				"Las exigencias se adaptan al volumen y riesgo del sector.",
			},
			ActionChecklist: []string{
				"Ejecutar el checklist correspondiente al sector.",
			},
		},
		{
			ID:         "mod-0-transversal",
			Level:      0,
			LevelName:  "Nivel Transversal",
			Code:       "transversal",
			Title:      "Agencia de Protección de Datos & Régimen Sancionatorio",
			TargetMode: "all",
			Summary:    "Multas de hasta 20.000 UTM y hasta 4% de los ingresos anuales en reincidencia.",
			ContentMarkdown: "### Agencia y Régimen Sancionatorio\n\n* **Infracción Leve:** Hasta 5.000 UTM (~$335M CLP).\n* **Infracción Grave:** Hasta 10.000 UTM (~$670M CLP).\n* **Infracción Gravísima:** Hasta 20.000 UTM (~$1.340M CLP) o **hasta el 4% de ingresos anuales** en caso de reincidencia.",
			LegalArticles: []string{"Art. 34 al 45"},
			KeyTakeaways: []string{
				"Multas severas calculadas en UTM o porcentaje de facturación.",
				"Programas de cumplimiento y DPD actúan como atenuantes.",
			},
			ActionChecklist: []string{
				"Usar la calculadora de sanciones de la plataforma.",
			},
		},
	}
}

func GetGlossaryTerms() []domain.GlossaryTerm {
	return []domain.GlossaryTerm{
		{ID: "gloss-1", Term: "Dato Personal", Definition: "Cualquier información referida a una persona natural identificada o identificable.", LegalReference: "Art. 3 letra e)", Category: "conceptos"},
		{ID: "gloss-2", Term: "Dato Sensible", Definition: "Datos de salud, biométricos, opiniones políticas, convicciones religiosas o vida sexual.", LegalReference: "Art. 3 letra f)", Category: "conceptos"},
		{ID: "gloss-3", Term: "Responsable del Tratamiento", Definition: "Persona natural o jurídica que decide los fines y medios del tratamiento.", LegalReference: "Art. 3 letra j)", Category: "actores"},
		{ID: "gloss-4", Term: "Encargado del Tratamiento", Definition: "Persona natural o jurídica que trata datos por cuenta y encargo del responsable.", LegalReference: "Art. 3 letra k)", Category: "actores"},
		{ID: "gloss-5", Term: "Titular de Datos", Definition: "Persona natural a quien corresponden los datos personales.", LegalReference: "Art. 3 letra l)", Category: "actores"},
		{ID: "gloss-6", Term: "Delegado de Protección de Datos (DPD)", Definition: "Garante interno de cumplimiento y enlace con la Agencia y los titulares.", LegalReference: "Art. 22", Category: "actores"},
		{ID: "gloss-7", Term: "Consentimiento", Definition: "Manifestación de voluntad libre, específica, informada e inequívoca.", LegalReference: "Art. 3 letra a)", Category: "principios"},
		{ID: "gloss-8", Term: "Responsabilidad Proactiva (Accountability)", Definition: "Deber de acreditar y documentar el cumplimiento constante.", LegalReference: "Art. 4 letra e)", Category: "principios"},
		{ID: "gloss-9", Term: "Derechos BARSOP", Definition: "Bloqueo, Acceso, Rectificación, Supresión, Oposición y Portabilidad.", LegalReference: "Art. 5 al 11", Category: "derechos"},
		{ID: "gloss-10", Term: "Registro de Actividades de Tratamiento (RAT)", Definition: "Inventario documental obligatorio de tratamientos y bases de datos.", LegalReference: "Art. 19", Category: "conceptos"},
		{ID: "gloss-11", Term: "Evaluación de Impacto (EIPD / DPIA)", Definition: "Análisis preventivo en tratamientos de alto riesgo para los titulares.", LegalReference: "Art. 26", Category: "conceptos"},
		{ID: "gloss-12", Term: "Seudonimización", Definition: "Tratamiento que impide atribuir datos sin información adicional separada.", LegalReference: "Art. 3 letra p)", Category: "conceptos"},
	}
}

func GetAuditControls() []domain.AuditControl {
	return []domain.AuditControl{
		{ID: "ctrl-1", ControlCode: "CTRL-LIC-01", Category: "Licitud y Principios", Title: "Existencia de Base Legal de Licitud", Description: "Verificar que cada tratamiento cuente con base legal válida documentada.", LegalArticle: "Art. 4 y 13", RequiredEvidence: "Registro de consentimientos, contratos con cláusulas, informe de interés legítimo.", RiskLevel: "Alto"},
		{ID: "ctrl-2", ControlCode: "CTRL-BARSOP-01", Category: "Derechos BARSOP", Title: "Canal Electrónico y SLA de 30 Días", Description: "Comprobar canal gratuito y cumplimiento del plazo de 30 días corridos.", LegalArticle: "Art. 12", RequiredEvidence: "Portal BARSOP, log de tickets con fecha de respuesta.", RiskLevel: "Alto"},
		{ID: "ctrl-3", ControlCode: "CTRL-SEG-01", Category: "Seguridad y Brechas", Title: "Cifrado y Control de Accesos (MFA / RBAC)", Description: "Verificar cifrado AES-256 en reposo, TLS 1.3 y MFA para accesos con privilegios.", LegalArticle: "Art. 15", RequiredEvidence: "Configuración de DB cifrada, certificados TLS, matriz RBAC.", RiskLevel: "Alto"},
		{ID: "ctrl-4", ControlCode: "CTRL-BREACH-01", Category: "Seguridad y Brechas", Title: "Protocolo de Notificación de 72 Horas", Description: "Verificar procedimiento formal de respuesta y notificación a la Agencia en 72h.", LegalArticle: "Art. 16", RequiredEvidence: "Plan de respuesta a incidentes, registro de brechas, plantilla oficial.", RiskLevel: "Alto"},
		{ID: "ctrl-5", ControlCode: "CTRL-RAT-01", Category: "Gobernanza y DPD", Title: "Registro de Actividades de Tratamiento (RAT)", Description: "Inventario completo de tratamientos actualizado.", LegalArticle: "Art. 19", RequiredEvidence: "Documento RAT con finalidades, bases y categorías.", RiskLevel: "Medio"},
		{ID: "ctrl-6", ControlCode: "CTRL-DPD-01", Category: "Gobernanza y DPD", Title: "Designación y Publicación del DPD", Description: "Nombramiento formal del Delegado de Protección de Datos (si aplica).", LegalArticle: "Art. 22 al 24", RequiredEvidence: "Acta directiva, contrato DPD, publicación web.", RiskLevel: "Medio"},
		{ID: "ctrl-7", ControlCode: "CTRL-DPA-01", Category: "Encargados y DPA", Title: "Contratos de Tratamiento con Proveedores (DPA)", Description: "Contratos firmados con el 100% de proveedores con acceso a datos.", LegalArticle: "Art. 18", RequiredEvidence: "Inventario de proveedores, contratos DPA firmados.", RiskLevel: "Alto"},
		{ID: "ctrl-8", ControlCode: "CTRL-EIPD-01", Category: "Gobernanza y DPD", Title: "Evaluaciones de Impacto en Alto Riesgo", Description: "Comprobar que tratamientos de IA o biometría cuenten con EIPD previa.", LegalArticle: "Art. 26", RequiredEvidence: "Informes de EIPD firmados por el DPD y dirección.", RiskLevel: "Medio"},
	}
}

func GetGapQuestions() []domain.GapQuestion {
	return []domain.GapQuestion{
		{
			ID: "gap-1", Category: "Licitud y Consentimiento", Question: "¿Cuenta su organización con una base legal de licitud documentada para cada base de datos activa?", Description: "La ley prohíbe tratar datos sin justificación legal expresa.",
			Options: []domain.GapOption{
				{ID: 1, Text: "No tenemos identificadas las bases legales.", Score: 0.0, Recommendation: "Ejecutar inventario urgente y relevar bases de licitud."},
				{ID: 2, Text: "Solo consentimiento tácito o casillas pre-marcadas.", Score: 0.3, Recommendation: "Actualizar formularios para capturar consentimiento expreso e inequívoco."},
				{ID: 3, Text: "Tratamientos principales justificados, falta marketing.", Score: 0.7, Recommendation: "Completar análisis de ponderación de interés legítimo."},
				{ID: 4, Text: "100% con base legal documentada y consentimientos trazables.", Score: 1.0, Recommendation: "Mantener auditorías periódicas de trazabilidad."},
			},
		},
		{
			ID: "gap-2", Category: "Derechos BARSOP", Question: "¿Tienen habilitado un canal formal y protocolo para responder solicitudes ciudadanas en menos de 30 días?", Description: "Los ciudadanos tienen derecho a BARSOP de forma gratuita.",
			Options: []domain.GapOption{
				{ID: 1, Text: "No existe canal ni procedimiento para solicitudes.", Score: 0.0, Recommendation: "Habilitar canal electrónico obligatorio y asignar responsables de SLA."},
				{ID: 2, Text: "Canal por correo general sin control de plazo de 30 días.", Score: 0.4, Recommendation: "Implementar sistema de ticketing con alertas de vencimiento de 30 días."},
				{ID: 3, Text: "Formulario y protocolo activos; falta exportación portable (JSON/CSV).", Score: 0.7, Recommendation: "Desarrollar endpoint o script de exportación de portabilidad."},
				{ID: 4, Text: "Portal BARSOP integrado con validación de identidad y SLA automatizado.", Score: 1.0, Recommendation: "Monitorear satisfacción y tiempos medios de resolución."},
			},
		},
		{
			ID: "gap-3", Category: "Seguridad de la Información", Question: "¿Qué nivel de medidas técnicas de seguridad (cifrado, MFA, control de acceso) se encuentra implementado?", Description: "Medidas técnicas proporcionadas al riesgo del tratamiento.",
			Options: []domain.GapOption{
				{ID: 1, Text: "Sin cifrado de bases de datos ni MFA obligatorio.", Score: 0.0, Recommendation: "Habilitar cifrado AES-256 en reposo y MFA inmediato para administradores."},
				{ID: 2, Text: "Cifrado en tránsito (HTTPS) pero datos en texto plano en DB.", Score: 0.4, Recommendation: "Cifrar almacenamiento en reposo y seudonimizar datos sensibles."},
				{ID: 3, Text: "Cifrado integral activo; falta control de logs de consulta individual.", Score: 0.8, Recommendation: "Implementar auditoría inmutable de accesos a datos personales."},
				{ID: 4, Text: "Cifrado (AES-256/TLS 1.3), MFA obligatorio, RBAC y auditoría continua.", Score: 1.0, Recommendation: "Realizar pentesting semestral."},
			},
		},
		{
			ID: "gap-4", Category: "Gestión de Incidentes (72 Horas)", Question: "¿Cuenta la organización con un plan probado de respuesta a brechas con notificación a la Agencia en 72 horas?", Description: "Toda brecha debe evaluarse y reportarse a la Agencia en 72 horas.",
			Options: []domain.GapOption{
				{ID: 1, Text: "No existe plan ni procedimiento ante filtraciones.", Score: 0.0, Recommendation: "Diseñar comité de crisis y protocolo de notificación urgente."},
				{ID: 2, Text: "Plan de contingencia de TI sin plazos legales de 72h ni aviso a titulares.", Score: 0.4, Recommendation: "Incorporar el plazo legal de 72 horas y plantillas oficiales de la Agencia."},
				{ID: 3, Text: "Protocolo documentado pero sin simulacro práctico ejecutado.", Score: 0.7, Recommendation: "Ejecutar simulacro de brecha de seguridad antes de diciembre 2026."},
				{ID: 4, Text: "Protocolo 72h activo, equipo 24/7 y simulacros periódicos ejecutados.", Score: 1.0, Recommendation: "Mantener libro de incidentes al día."},
			},
		},
		{
			ID: "gap-5", Category: "Gobernanza y Proveedores (RAT / DPA)", Question: "¿Mantienen un Registro de Actividades de Tratamiento (RAT) y contratos DPA con proveedores externos?", Description: "Obligación de documentar flujos internos y regular contractualmente a encargados.",
			Options: []domain.GapOption{
				{ID: 1, Text: "Sin inventario de datos ni contratos DPA con proveedores.", Score: 0.0, Recommendation: "Completar el RAT y firmar anexos DPA con proveedores cloud/software."},
				{ID: 2, Text: "Inventario parcial sin auditar contratos con encargados.", Score: 0.4, Recommendation: "Revisar contratos de proveedores TI e incorporar cláusulas obligatorias."},
				{ID: 3, Text: "RAT completo y contratos DPA firmados; falta evaluar DPD.", Score: 0.8, Recommendation: "Evaluar designación formal de Delegado de Protección de Datos."},
				{ID: 4, Text: "Gobernanza completa: RAT automatizado, DPAs al 100%, DPD y políticas.", Score: 1.0, Recommendation: "Actualizar anualmente las revisiones de proveedores."},
			},
		},
	}
}

func GetCountdownInfo() domain.CountdownInfo {
	target := time.Date(2026, time.December, 1, 0, 0, 0, 0, time.UTC)
	now := time.Now().UTC()
	diff := target.Sub(now)

	days := int(diff.Hours() / 24)
	hours := int(diff.Hours()) % 24
	if days < 0 {
		days = 0
		hours = 0
	}

	return domain.CountdownInfo{
		TargetDate:          target,
		TargetDateFormatted: "1 de Diciembre de 2026",
		DaysRemaining:       days,
		HoursRemaining:      hours,
		Milestones:          GetInitialMilestones(),
		EnforcementNote:     "La nueva ley de protección de datos personales de Chile entra en vigencia total el 1 de diciembre de 2026. Todas las organizaciones públicas y privadas deben estar 100% adecuadas.",
	}
}
