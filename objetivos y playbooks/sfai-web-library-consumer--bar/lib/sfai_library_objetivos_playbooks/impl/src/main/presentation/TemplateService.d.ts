import { Template, ApplyTemplateResponse } from './types';
export declare const TemplateService: {
    checkPermissions: (userId: string) => Promise<boolean>;
    applyTemplate: (templateId: string, campaignId?: string, userId?: string) => Promise<ApplyTemplateResponse>;
    getTemplates: () => Promise<Template[]>;
};
