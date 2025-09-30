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
}
export interface CampaignActivity {
    id: string;
    name: string;
    template_activity_id?: string;
}
export interface CampaignAsset {
    id: string;
    type: 'image' | 'copy_preset' | 'video';
    url?: string;
    placeholder?: boolean;
}
export interface CampaignBudget {
    amount: number;
    currency: string;
    pacing: 'daily' | 'monthly' | 'total';
}
export interface CampaignCalendar {
    startDate: string;
    endDate: string;
}
export interface CampaignMetadata {
    utm: string;
    tags: string[];
}
export interface LandingPageConfig {
    fields: LandingPageField[];
    consentCheckbox: boolean;
    consentRequired: boolean;
}
export interface LandingPageField {
    id: string;
    name: string;
    type: string;
    required: boolean;
}
export interface CampaignIntegration {
    channel: 'Meta' | 'Google';
    status: 'Conectado' | 'Integración faltante';
}
export interface Template {
    id: string;
    name: string;
    description: string;
    i18n?: {
        [key: string]: {
            name: string;
            description: string;
        };
    };
}
export interface ApplyTemplateResponse {
    campaign: Campaign;
    warnings: string[];
    errors: string[];
}
