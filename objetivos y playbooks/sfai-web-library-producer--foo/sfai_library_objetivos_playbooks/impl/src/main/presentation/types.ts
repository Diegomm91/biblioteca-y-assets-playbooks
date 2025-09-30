export interface Campaign {
  id: string;
  title: string;
  description: string;
  status: 'Borrador' | 'Activa' | 'Pausada' | 'Archivada';
  activities: CampaignActivity[];
  assets: CampaignAsset[];
  budget: CampaignBudget;
  calendar: CampaignCalendar;
  metadata: CampaignMetadata;
  landingPage?: LandingPageConfig;
  integrations?: CampaignIntegration[];
  // Otros campos de campaña
}

export interface CampaignActivity {
  id: string;
  name: string;
  template_activity_id?: string; // Para idempotencia
  // Otros campos de actividad
}

export interface CampaignAsset {
  id: string;
  type: 'image' | 'copy_preset' | 'video';
  url?: string; // URL del asset si existe
  placeholder?: boolean; // Indica si es un placeholder por asset faltante
  // Otros campos de asset
}

export interface CampaignBudget {
  amount: number;
  currency: string;
  pacing: 'daily' | 'monthly' | 'total';
  // Otros campos de presupuesto
}

export interface CampaignCalendar {
  startDate: string; // ISO Date string
  endDate: string; // ISO Date string
  // Otros campos de calendario
}

export interface CampaignMetadata {
  utm: string;
  tags: string[];
  // Otros metadatos
}

export interface LandingPageConfig {
  fields: LandingPageField[];
  consentCheckbox: boolean;
  consentRequired: boolean;
  // Otros campos de configuración de LP
}

export interface LandingPageField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  // Otros campos de campo de LP
}

export interface CampaignIntegration {
  channel: 'Meta' | 'Google';
  status: 'Conectado' | 'Integración faltante';
  // Otros campos de integración
}

export interface Template {
  id: string;
  name: string;
  description: string;
  i18n?: { [key: string]: { name: string; description: string } }; // Para internacionalización
  // Otros campos de plantilla
}

export interface ApplyTemplateResponse {
  campaign: Campaign;
  warnings: string[];
  errors: string[];
}