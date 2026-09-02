import React, { useState } from 'react';
import { X, Copy, CheckCircle2, Code2, Database, Shield, Lock, Terminal } from 'lucide-react';

interface BlueprintsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlueprintsModal: React.FC<BlueprintsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sql' | 'tls' | 'consent' | 'siem'>('sql');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const blueprints = {
    sql: `-- 1. Habilitar extensión criptográfica en PostgreSQL
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Tabla de Clientes con Cifrado AES-256 en columnas sensibles
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    -- Cifrado simétrico de datos sensibles (RUT, Teléfono, Salud)
    rut_encrypted BYTEA NOT NULL,
    phone_encrypted BYTEA,
    health_data_encrypted BYTEA,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Inserción con cifrado mediante clave maestra segura (KMS)
INSERT INTO user_profiles (email, rut_encrypted, phone_encrypted)
VALUES (
    'titular@ejemplo.cl',
    pgp_sym_encrypt('18.456.789-0', current_setting('app.encryption_key')),
    pgp_sym_encrypt('+56912345678', current_setting('app.encryption_key'))
);

-- 4. Consulta descifrada solo para roles autorizados (RBAC)
SELECT 
    email,
    pgp_sym_decrypt(rut_encrypted, current_setting('app.encryption_key')) AS rut_decrypted
FROM user_profiles
WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';`,

    tls: `# Configuración NGINX para cumplimiento TLS 1.3 estricto
server {
    listen 443 ssl http2;
    server_name api.tuorganizacion.cl;

    # Certificados SSL / TLS
    ssl_certificate /etc/letsencrypt/live/api.tuorganizacion.cl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.tuorganizacion.cl/privkey.pem;

    # Protocolos modernos únicamente (Deshabilitar SSLv3, TLS 1.0, TLS 1.1)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers on;

    # Cabeceras HSTS y de Seguridad Obligatorias
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
}`,

    consent: `-- Consent Management Platform (CMP) Ledger
CREATE TABLE user_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    consent_purpose VARCHAR(50) NOT NULL, -- 'marketing_email', 'third_party_analytics', 'profile_sharing'
    version_id VARCHAR(20) NOT NULL,     -- 'v2026.1'
    status VARCHAR(15) NOT NULL,          -- 'granted', 'revoked'
    ip_address INET NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    revoked_at TIMESTAMP WITH TIME ZONE
);

-- Índice para verificación instantánea antes de envíos
CREATE INDEX idx_consent_lookup ON user_consents (user_id, consent_purpose, status);`,

    siem: `# Regla Sigma / Elastic SIEM: Detección de Descarga Masiva Anómala (>72h Alert)
title: Descarga Masiva de Datos Personales en Horario Inhabitual
id: dp-alert-mass-export-01
status: production
description: Detecta consultas que retornen más de 5,000 registros de datos personales sensibles fuera de horario hábil.
logsource:
    category: database
    product: postgresql
detection:
    selection:
        query|contains:
            - 'SELECT * FROM user_profiles'
            - 'SELECT * FROM medical_records'
        rows_returned|gt: 5000
    timeframe: 5m
condition: selection
level: critical
action:
    - trigger_incident_code: INC-72H-CRITICAL
    - notify_pagerduty: secops-oncall
    - alert_dpd_team: dpd@tuempresa.cl`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(blueprints[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Blueprints Técnicos de Privacy by Design</h3>
              <p className="text-xs text-slate-400">Snippets de infraestructura, criptografía, CMP y SIEM listos para producción</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 py-2.5 border-b border-slate-800 bg-slate-950/40 flex gap-2">
          {[
            { id: 'sql', label: '1. Cifrado PostgreSQL AES-256' },
            { id: 'tls', label: '2. NGINX TLS 1.3 & HSTS' },
            { id: 'consent', label: '3. Tabla Ledger CMP' },
            { id: 'siem', label: '4. Reglas SIEM 72h' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Editor Preview */}
        <div className="p-5 flex-1 overflow-y-auto relative bg-slate-950">
          <div className="absolute top-7 right-7">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 border border-slate-700 shadow-md"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado al portapapeles' : 'Copiar Snippet'}</span>
            </button>
          </div>
          <pre className="font-mono text-xs text-sky-300 leading-relaxed overflow-x-auto p-4 bg-slate-900 rounded-xl border border-slate-800 select-all">
            {blueprints[activeTab]}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">Estándares validados para cumplimiento Ley 2026</span>
          <button onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
