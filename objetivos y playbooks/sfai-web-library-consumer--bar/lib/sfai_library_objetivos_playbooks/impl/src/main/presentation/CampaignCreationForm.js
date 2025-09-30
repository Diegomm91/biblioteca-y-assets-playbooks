import React, { useState, useEffect } from 'react';
import { TemplateService } from './TemplateService.js';
import { LoggerFactory } from './Logger.js';
const logger = LoggerFactory.getLogger('CampaignCreationForm');
const CampaignCreationForm = () => {
    const [campaign, setCampaign] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState('');
    const [loading, setLoading] = useState(false);
    const [warnings, setWarnings] = useState([]);
    const [errors, setErrors] = useState([]);
    const [hasPermission, setHasPermission] = useState(false); // Nuevo estado para permisos
    const currentUserId = 'Marketing Manager'; // Simulación de usuario logueado
    useEffect(() => {
        const initializeForm = async () => {
            setLoading(true);
            try {
                // Verificar permisos
                const userHasPermission = await TemplateService.checkPermissions(currentUserId);
                setHasPermission(userHasPermission);
                // Obtener plantillas solo si tiene permiso
                if (userHasPermission) {
                    const fetchedTemplates = await TemplateService.getTemplates();
                    setTemplates(fetchedTemplates);
                }
                else {
                    setErrors(['No tienes permiso para crear campañas. La opción de plantilla está deshabilitada.']);
                }
            }
            catch (err) {
                logger.error('Error al inicializar el formulario:', err);
                setErrors(['Error al cargar los datos iniciales.']);
            }
            finally {
                setLoading(false);
            }
        };
        initializeForm();
    }, []);
    const handleApplyTemplate = async () => {
        if (!selectedTemplateId) {
            setErrors(['Por favor, selecciona una plantilla.']);
            return;
        }
        setLoading(true);
        setWarnings([]);
        setErrors([]);
        try {
            const response = await TemplateService.applyTemplate(selectedTemplateId, campaign?.id, currentUserId);
            if (response.errors.length > 0) {
                setErrors(response.errors);
                setCampaign(null); // Limpiar campaña si hay errores de permiso
            }
            else {
                setCampaign(response.campaign);
                setWarnings(response.warnings);
            }
            logger.info('Campaña prellenada:', response.campaign);
        }
        catch (err) {
            logger.error('Error al aplicar plantilla:', err);
            setErrors(['Error al aplicar la plantilla.']);
        }
        finally {
            setLoading(false);
        }
    };
    const handleSaveCampaign = () => {
        if (errors.length > 0) {
            alert('No se puede guardar la campaña debido a errores. Por favor, corrige los problemas.');
            return;
        }
        // Lógica para guardar la campaña (Criterio 5, 9, 11)
        logger.info('Guardando campaña:', campaign);
        alert('Campaña guardada (simulado)');
    };
    if (loading) {
        return React.createElement("div", null, "Cargando...");
    }
    return (React.createElement("div", { className: "campaign-creation-form" },
        " ",
        React.createElement("h1", null, "Creaci\u00F3n de Campa\u00F1a"),
        React.createElement("div", { className: "template-selection playbooks-line" },
            " ",
            React.createElement("label", { htmlFor: "template-select" }, "Seleccionar Plantilla:"),
            React.createElement("select", { id: "template-select", value: selectedTemplateId, onChange: (e) => setSelectedTemplateId(e.target.value), disabled: loading || !hasPermission },
                React.createElement("option", { value: "" }, "-- Selecciona una plantilla --"),
                templates.map((tpl) => (React.createElement("option", { key: tpl.id, value: tpl.id }, tpl.name)))),
            React.createElement("button", { className: "playbooks-button", onClick: handleApplyTemplate, disabled: loading || !selectedTemplateId || !hasPermission },
                " ",
                "Aplicar Plantilla")),
        warnings.length > 0 && (React.createElement("div", { className: "warnings playbooks-line" },
            " ",
            React.createElement("h3", null, "Advertencias:"),
            React.createElement("ul", null, warnings.map((warn, index) => (React.createElement("li", { key: index }, warn)))))),
        errors.length > 0 && (React.createElement("div", { className: "errors playbooks-line" },
            " ",
            React.createElement("h3", null, "Errores:"),
            React.createElement("ul", null, errors.map((err, index) => (React.createElement("li", { key: index }, err)))))),
        campaign && (React.createElement("div", { className: "campaign-details" },
            React.createElement("h2", null, "Detalles de la Campa\u00F1a"),
            React.createElement("div", { className: "playbooks-line" },
                " ",
                React.createElement("label", null, "T\u00EDtulo:"),
                React.createElement("input", { type: "text", value: campaign.title, onChange: (e) => setCampaign({ ...campaign, title: e.target.value }) })),
            React.createElement("div", { className: "playbooks-line" },
                " ",
                React.createElement("label", null, "Descripci\u00F3n:"),
                React.createElement("textarea", { value: campaign.description, onChange: (e) => setCampaign({ ...campaign, description: e.target.value }) })),
            React.createElement("div", { className: "playbooks-line" },
                " ",
                React.createElement("label", null, "Estado:"),
                React.createElement("span", null, campaign.status)),
            React.createElement("h3", null, "Actividades del Playbook:"),
            React.createElement("ul", { className: "playbooks-line" },
                " ",
                campaign.activities.map((activity) => (React.createElement("li", { key: activity.id }, activity.name)))),
            React.createElement("h3", null, "Assets Referenciados:"),
            React.createElement("ul", { className: "playbooks-line" },
                " ",
                campaign.assets.length > 0 ? (campaign.assets.map((asset) => (React.createElement("li", { key: asset.id },
                    asset.type,
                    ": ",
                    asset.url || 'Placeholder',
                    " ",
                    asset.placeholder && '(Faltante)')))) : (React.createElement("li", null, "No hay assets referenciados."))),
            React.createElement("h3", null, "Presupuesto:"),
            React.createElement("div", { className: "playbooks-line" },
                " ",
                React.createElement("label", null, "Monto:"),
                React.createElement("input", { type: "number", value: campaign.budget.amount, onChange: (e) => setCampaign({ ...campaign, budget: { ...campaign.budget, amount: parseFloat(e.target.value) } }) })),
            React.createElement("div", { className: "playbooks-line" },
                " ",
                React.createElement("label", null, "Pacing:"),
                React.createElement("select", { value: campaign.budget.pacing, onChange: (e) => setCampaign({ ...campaign, budget: { ...campaign.budget, pacing: e.target.value } }) },
                    React.createElement("option", { value: "daily" }, "Diario"),
                    React.createElement("option", { value: "monthly" }, "Mensual"),
                    React.createElement("option", { value: "total" }, "Total"))),
            React.createElement("h3", null, "Calendario:"),
            React.createElement("div", { className: "playbooks-line" },
                " ",
                React.createElement("label", null, "Fecha de Inicio:"),
                React.createElement("input", { type: "date", value: campaign.calendar.startDate.split('T')[0], onChange: (e) => setCampaign({ ...campaign, calendar: { ...campaign.calendar, startDate: e.target.value } }) })),
            React.createElement("div", { className: "playbooks-line" },
                " ",
                React.createElement("label", null, "Fecha de Fin:"),
                React.createElement("input", { type: "date", value: campaign.calendar.endDate.split('T')[0], onChange: (e) => setCampaign({ ...campaign, calendar: { ...campaign.calendar, endDate: e.target.value } }) })),
            React.createElement("h3", null, "Metadatos:"),
            React.createElement("div", { className: "playbooks-line" },
                " ",
                React.createElement("label", null, "UTM:"),
                React.createElement("input", { type: "text", value: campaign.metadata.utm, onChange: (e) => setCampaign({ ...campaign, metadata: { ...campaign.metadata, utm: e.target.value } }) })),
            React.createElement("div", { className: "playbooks-line" },
                " ",
                React.createElement("label", null, "Tags:"),
                React.createElement("input", { type: "text", value: campaign.metadata.tags.join(', '), onChange: (e) => setCampaign({ ...campaign, metadata: { ...campaign.metadata, tags: e.target.value.split(',').map(tag => tag.trim()) } }) })),
            campaign.landingPage && (React.createElement("div", { className: "playbooks-line" },
                " ",
                React.createElement("h3", null, "Landing Page:"),
                React.createElement("p", null, "Campos:"),
                React.createElement("ul", { className: "playbooks-line" },
                    " ",
                    campaign.landingPage.fields.map((field) => (React.createElement("li", { key: field.id },
                        field.name,
                        " (",
                        field.type,
                        ") ",
                        field.required && '(Obligatorio)')))),
                React.createElement("div", { className: "playbooks-line" },
                    " ",
                    React.createElement("input", { type: "checkbox", checked: campaign.landingPage.consentCheckbox, readOnly: true }),
                    React.createElement("label", null, "Checkbox de Consentimiento Visible")),
                React.createElement("div", { className: "playbooks-line" },
                    " ",
                    React.createElement("input", { type: "checkbox", checked: campaign.landingPage.consentRequired, readOnly: true }),
                    React.createElement("label", null, "Consentimiento Requerido")))),
            campaign.integrations && campaign.integrations.length > 0 && (React.createElement("div", { className: "playbooks-line" },
                " ",
                React.createElement("h3", null, "Integraciones:"),
                React.createElement("ul", { className: "playbooks-line" },
                    " ",
                    campaign.integrations.map((integration, index) => (React.createElement("li", { key: index },
                        integration.channel,
                        ": ",
                        integration.status,
                        integration.status === 'Integración faltante' && (React.createElement("button", { className: "playbooks-button", onClick: () => alert(`Conectar credenciales para ${integration.channel}`) },
                            " ",
                            "Conectar Credenciales")))))))),
            React.createElement("button", { className: "playbooks-button", onClick: handleSaveCampaign }, "Guardar Campa\u00F1a"),
            " "))));
};
export default CampaignCreationForm;
//# sourceMappingURL=CampaignCreationForm.js.map