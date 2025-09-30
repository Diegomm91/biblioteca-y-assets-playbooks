import { LoggerFactory } from './Logger.js';
const logger = LoggerFactory.getLogger('TemplateService');
export const TemplateService = {
    checkPermissions: async (userId) => {
        logger.info(`Verificando permisos para el usuario: ${userId}`);
        // Simulación de verificación de permisos.
        // En un entorno real, esto llamaría a un servicio de RBAC.
        const hasPermission = userId === 'Marketing Manager'; // Solo 'Marketing Manager' tiene permiso
        if (!hasPermission) {
            logger.warn(`Usuario ${userId} no tiene permiso para crear campañas.`);
        }
        return hasPermission;
    },
    applyTemplate: async (templateId, campaignId, userId) => {
        try {
            if (userId && !(await TemplateService.checkPermissions(userId))) {
                return {
                    campaign: null, // Se manejará como error en la UI
                    warnings: [],
                    errors: ['No tienes permiso para aplicar plantillas.'],
                };
            }
            logger.info(`Aplicando plantilla con ID: ${templateId} a campaña con ID: ${campaignId || 'nueva'}`);
            // Simulación de llamada a API
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    const warnings = [];
                    const errors = [];
                    // Aquí iría la lógica real de la API
                    const mockCampaign = {
                        id: campaignId || `new-campaign-${Date.now()}`,
                        title: 'Campaña Prellenada por Plantilla',
                        description: `Descripción de la plantilla ${templateId}`,
                        status: 'Borrador',
                        activities: campaignId ? [{ id: 'act1', name: 'Actividad 1 de plantilla', template_activity_id: 'tpl-act-1' }] : [{ id: `act-${Date.now()}`, name: 'Actividad 1 de plantilla', template_activity_id: 'tpl-act-1' }],
                        assets: [
                            { id: 'img-1', type: 'image', url: 'https://via.placeholder.com/150', placeholder: false },
                            { id: 'img-2', type: 'image', url: undefined, placeholder: true }, // Asset faltante
                            { id: 'copy-1', type: 'copy_preset', url: undefined, placeholder: true }, // Asset faltante
                        ],
                        budget: { amount: 1000, currency: 'USD', pacing: 'daily' }, // Presupuesto inicial
                        calendar: { startDate: new Date('2023-01-01').toISOString(), endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() }, // Fecha de inicio pasada para prueba
                        metadata: { utm: 'template-utm', tags: ['template', 'prefilled'] },
                        landingPage: {
                            fields: [
                                { id: 'lp-field-1', name: 'Nombre', type: 'text', required: true },
                                { id: 'lp-field-2', name: 'Email', type: 'email', required: true },
                            ],
                            consentCheckbox: true,
                            consentRequired: true,
                        },
                        integrations: [
                            { channel: 'Meta', status: 'Conectado' },
                            { channel: 'Google', status: 'Integración faltante' }, // Simulación de integración faltante
                        ],
                    };
                    // Lógica de idempotencia: si campaignId existe, fusionar actividades en lugar de duplicar
                    if (campaignId) {
                        const existingActivities = mockCampaign.activities.filter((act) => act.template_activity_id);
                        const newActivities = [{ id: 'act-new', name: 'Nueva actividad de plantilla', template_activity_id: 'tpl-act-2' }];
                        mockCampaign.activities = [...existingActivities, ...newActivities.filter((newAct) => !existingActivities.some((exAct) => exAct.template_activity_id === newAct.template_activity_id))];
                    }
                    // Validación de presupuesto (Criterio 9)
                    const monthlyAccountLimit = 500; // Simulación de límite de cuenta
                    if (mockCampaign.budget.pacing === 'monthly' && mockCampaign.budget.amount > monthlyAccountLimit) {
                        errors.push(`El presupuesto mensual de la plantilla (${mockCampaign.budget.amount} ${mockCampaign.budget.currency}) excede el límite mensual configurado de la cuenta (${monthlyAccountLimit} ${mockCampaign.budget.currency}).`);
                        // Opcional: ajustar el presupuesto a un valor válido o dejarlo en null para que el usuario lo corrija
                        mockCampaign.budget.amount = monthlyAccountLimit; // Ajustar al límite para permitir continuar, pero con error
                    }
                    // Ajuste automático de fechas (Criterio 12)
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const startDate = new Date(mockCampaign.calendar.startDate);
                    startDate.setHours(0, 0, 0, 0);
                    if (startDate.getTime() < today.getTime()) {
                        const adjustedStartDate = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Hoy + 1 día
                        mockCampaign.calendar.startDate = adjustedStartDate.toISOString();
                        warnings.push(`La fecha de inicio de la campaña se ajustó automáticamente a ${adjustedStartDate.toLocaleDateString()} porque la fecha original era pasada.`);
                    }
                    // Manejo de integraciones faltantes (Escenario 9)
                    if (mockCampaign.integrations?.some(integration => integration.status === 'Integración faltante')) {
                        warnings.push('Algunas integraciones de publicación no tienen credenciales válidas. Por favor, conéctalas antes de publicar.');
                    }
                    if (mockCampaign.assets.some((asset) => asset.placeholder)) {
                        warnings.push('Algunos assets referenciados en la plantilla no existen y se han usado placeholders.');
                    }
                    const mockResponse = {
                        campaign: mockCampaign,
                        warnings: warnings,
                        errors: errors,
                    };
                    resolve(mockResponse);
                }, 1000);
            });
            logger.info(`Plantilla aplicada exitosamente. Campaña ID: ${response.campaign.id}`);
            // Generar registro de auditoría (Criterio 11)
            if (response.campaign.id && userId) {
                logger.info(`Generando registro de auditoría para la aplicación de plantilla. Template ID: ${templateId}, Campaign ID: ${response.campaign.id}, User ID: ${userId}`);
                // En un entorno real, esto llamaría a un servicio de auditoría
                // auditService.logTemplateApplication({ templateId, campaignId: response.campaign.id, userId, timestamp: new Date().toISOString(), appliedFields: Object.keys(response.campaign) });
            }
            return response;
        }
        catch (error) {
            logger.error(`Error al aplicar plantilla ${templateId}:`, error);
            throw error;
        }
    },
    // Otros métodos relacionados con plantillas, como obtener lista de plantillas, etc.
    getTemplates: async () => {
        logger.info('Obteniendo lista de plantillas');
        // Simulación de llamada a API
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                const mockTemplates = [
                    { id: 'tpl-1', name: 'Liquidación de stock - Automotive', description: 'Plantilla para liquidación de stock en el sector automotriz', i18n: { 'en-US': { name: 'Stock Clearance - Automotive', description: 'Template for stock clearance in the automotive sector' } } },
                    { id: 'tpl-2', name: '0 km destacado', description: 'Plantilla para destacar vehículos 0 km', i18n: { 'en-US': { name: 'Featured 0 km', description: 'Template to highlight 0 km vehicles' } } },
                    { id: 'tpl-3', name: 'Campaña de Verano', description: 'Plantilla para campañas de verano', i18n: { 'en-US': { name: 'Summer Campaign', description: 'Template for summer campaigns' } } },
                ];
                resolve(mockTemplates);
            }, 500);
        });
        // Se necesita acceder a mockTemplates fuera del setTimeout para la lógica de i18n en applyTemplate
        // Por ahora, se asume que mockTemplates está disponible o se obtiene de otra manera.
        // Para una implementación real, se podría cargar las plantillas una vez y pasarlas.
        logger.info('Lista de plantillas obtenida exitosamente.');
        return response;
    },
};
//# sourceMappingURL=TemplateService.js.map