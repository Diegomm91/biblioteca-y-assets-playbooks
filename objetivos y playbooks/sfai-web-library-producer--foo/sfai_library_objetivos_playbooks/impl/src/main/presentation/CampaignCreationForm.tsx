import React, { useState, useEffect } from 'react';
import { TemplateService } from './TemplateService';
import { Campaign, Template, ApplyTemplateResponse } from './types';
import { LoggerFactory } from './Logger';

const logger = LoggerFactory.getLogger('CampaignCreationForm');

const CampaignCreationForm: React.FC = () => {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(false); // Nuevo estado para permisos
  // TODO: Obtener el ID del usuario logueado de la sesión o contexto de autenticación.
  const currentUserId = '';

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
        } else {
          setErrors(['No tienes permiso para crear campañas. La opción de plantilla está deshabilitada.']);
        }
      } catch (err) {
        logger.error('Error al inicializar el formulario:', err);
        setErrors(['Error al cargar los datos iniciales.']);
      } finally {
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
      const response: ApplyTemplateResponse = await TemplateService.applyTemplate(selectedTemplateId, campaign?.id, currentUserId);
      if (response.errors.length > 0) {
        setErrors(response.errors);
        setCampaign(null); // Limpiar campaña si hay errores de permiso
      } else {
        setCampaign(response.campaign);
        setWarnings(response.warnings);
      }
      logger.info('Campaña prellenada:', response.campaign);
    } catch (err) {
      logger.error('Error al aplicar plantilla:', err);
      setErrors(['Error al aplicar la plantilla.']);
    } finally {
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
    return <div>Cargando...</div>;
  }

  return (
    <div className="campaign-creation-form"> {/* La clase ya está aplicada, no es necesario cambiarla aquí */}
      <h1>Creación de Campaña</h1>

      <div className="template-selection playbooks-line"> {/* Añadir clase para línea */}
        <label htmlFor="template-select">Seleccionar Plantilla:</label>
        <select
          id="template-select"
          value={selectedTemplateId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTemplateId(e.target.value)}
          disabled={loading || !hasPermission}
        >
          <option value="">-- Selecciona una plantilla --</option>
          {templates.map((tpl: Template) => (
            <option key={tpl.id} value={tpl.id}>
              {tpl.name}
            </option>
          ))}
        </select>
        <button className="playbooks-button" onClick={handleApplyTemplate} disabled={loading || !selectedTemplateId || !hasPermission}> {/* Añadir clase para botón */}
          Aplicar Plantilla
        </button>
      </div>

      {warnings.length > 0 && (
        <div className="warnings playbooks-line"> {/* Añadir clase para línea */}
          <h3>Advertencias:</h3>
          <ul>
            {warnings.map((warn, index) => (
              <li key={index}>{warn}</li>
            ))}
          </ul>
        </div>
      )}

      {errors.length > 0 && (
        <div className="errors playbooks-line"> {/* Añadir clase para línea */}
          <h3>Errores:</h3>
          <ul>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {campaign && (
        <div className="campaign-details">
          <h2>Detalles de la Campaña</h2>
          <div className="playbooks-line"> {/* Añadir clase para línea */}
            <label>Título:</label>
            <input
              type="text"
              value={campaign.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCampaign({ ...campaign, title: e.target.value })}
            />
          </div>
          <div className="playbooks-line"> {/* Añadir clase para línea */}
            <label>Descripción:</label>
            <textarea
              value={campaign.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCampaign({ ...campaign, description: e.target.value })}
            />
          </div>
          <div className="playbooks-line"> {/* Añadir clase para línea */}
            <label>Estado:</label>
            <span>{campaign.status}</span>
          </div>

          <h3>Actividades del Playbook:</h3>
          <ul className="playbooks-line"> {/* Añadir clase para línea */}
            {campaign.activities.map((activity) => (
              <li key={activity.id}>{activity.name}</li>
            ))}
          </ul>

          <h3>Assets Referenciados:</h3>
          <ul className="playbooks-line"> {/* Añadir clase para línea */}
            {campaign.assets.length > 0 ? (
              campaign.assets.map((asset) => (
                <li key={asset.id}>
                  {asset.type}: {asset.url || 'Placeholder'} {asset.placeholder && '(Faltante)'}
                </li>
              ))
            ) : (
              <li>No hay assets referenciados.</li>
            )}
          </ul>

          <h3>Presupuesto:</h3>
          <div className="playbooks-line"> {/* Añadir clase para línea */}
            <label>Monto:</label>
            <input
              type="number"
              value={campaign.budget.amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCampaign({ ...campaign, budget: { ...campaign.budget, amount: parseFloat(e.target.value) } })}
            />
          </div>
          <div className="playbooks-line"> {/* Añadir clase para línea */}
            <label>Pacing:</label>
            <select
              value={campaign.budget.pacing}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCampaign({ ...campaign, budget: { ...campaign.budget, pacing: e.target.value as 'daily' | 'monthly' | 'total' } })}
            >
              <option value="daily">Diario</option>
              <option value="monthly">Mensual</option>
              <option value="total">Total</option>
            </select>
          </div>

          <h3>Calendario:</h3>
          <div className="playbooks-line"> {/* Añadir clase para línea */}
            <label>Fecha de Inicio:</label>
            <input
              type="date"
              value={campaign.calendar.startDate.split('T')[0]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCampaign({ ...campaign, calendar: { ...campaign.calendar, startDate: e.target.value } })}
            />
          </div>
          <div className="playbooks-line"> {/* Añadir clase para línea */}
            <label>Fecha de Fin:</label>
            <input
              type="date"
              value={campaign.calendar.endDate.split('T')[0]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCampaign({ ...campaign, calendar: { ...campaign.calendar, endDate: e.target.value } })}
            />
          </div>

          <h3>Metadatos:</h3>
          <div className="playbooks-line"> {/* Añadir clase para línea */}
            <label>UTM:</label>
            <input
              type="text"
              value={campaign.metadata.utm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCampaign({ ...campaign, metadata: { ...campaign.metadata, utm: e.target.value } })}
            />
          </div>
          <div className="playbooks-line"> {/* Añadir clase para línea */}
            <label>Tags:</label>
            <input
              type="text"
              value={campaign.metadata.tags.join(', ')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCampaign({ ...campaign, metadata: { ...campaign.metadata, tags: e.target.value.split(',').map(tag => tag.trim()) } })}
            />
          </div>

          {campaign.landingPage && (
            <div className="playbooks-line"> {/* Añadir clase para línea */}
              <h3>Landing Page:</h3>
              <p>Campos:</p>
              <ul className="playbooks-line"> {/* Añadir clase para línea */}
                {campaign.landingPage.fields.map((field) => (
                  <li key={field.id}>
                    {field.name} ({field.type}) {field.required && '(Obligatorio)'}
                  </li>
                ))}
              </ul>
              <div className="playbooks-line"> {/* Añadir clase para línea */}
                <input type="checkbox" checked={campaign.landingPage.consentCheckbox} readOnly />
                <label>Checkbox de Consentimiento Visible</label>
              </div>
              <div className="playbooks-line"> {/* Añadir clase para línea */}
                <input type="checkbox" checked={campaign.landingPage.consentRequired} readOnly />
                <label>Consentimiento Requerido</label>
              </div>
            </div>
          )}

          {campaign.integrations && campaign.integrations.length > 0 && (
            <div className="playbooks-line"> {/* Añadir clase para línea */}
              <h3>Integraciones:</h3>
              <ul className="playbooks-line"> {/* Añadir clase para línea */}
                {campaign.integrations.map((integration, index) => (
                  <li key={index}>
                    {integration.channel}: {integration.status}
                    {integration.status === 'Integración faltante' && (
                      <button className="playbooks-button" onClick={() => alert(`Conectar credenciales para ${integration.channel}`)}> {/* Añadir clase para botón */}
                        Conectar Credenciales
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="playbooks-button" onClick={handleSaveCampaign}>Guardar Campaña</button> {/* Añadir clase para botón */}
        </div>
      )}
    </div>
  );
};

export default CampaignCreationForm;