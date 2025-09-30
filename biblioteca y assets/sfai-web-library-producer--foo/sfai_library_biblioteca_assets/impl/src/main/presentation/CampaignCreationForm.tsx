import React, { useState } from 'react';
import './CampaignCreationForm.css';

interface UtmPreset {
  name: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

interface Asset {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  utmPresets: UtmPreset[];
}

interface CampaignFormData {
  campaignName: string;
  selectedAssetId: string;
  selectedUtmPresetName: string;
}

// TODO: Reemplazar con la llamada a la API para obtener los assets disponibles
const sampleAssets: Asset[] = [];

const CampaignCreationForm: React.FC = () => {
  const [formData, setFormData] = useState<CampaignFormData>({
    campaignName: '',
    selectedAssetId: '',
    selectedUtmPresetName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Obtener el asset seleccionado de la API
    const selectedAsset = sampleAssets.find((asset) => asset.id === formData.selectedAssetId); // Esto debería venir de la API
    const selectedUtmPreset = selectedAsset?.utmPresets.find(
      (preset) => preset.name === formData.selectedUtmPresetName
    );

    if (!selectedAsset || !selectedUtmPreset) {
      alert('Por favor, seleccione un asset y un preset UTM válidos.');
      return;
    }

    const campaignData = {
      campaignName: formData.campaignName,
      assetId: selectedAsset.id,
      utmParameters: selectedUtmPreset,
      concatenatedUtm: `utm_source=${selectedUtmPreset.utm_source}&utm_medium=${selectedUtmPreset.utm_medium}&utm_campaign=${selectedUtmPreset.utm_campaign}`,
    };

    console.log('Datos de la Campaña a enviar:', campaignData);

    // TODO: Implementar la llamada a la API para crear la campaña
    // try {
    //   const response = await fetch('/api/campaigns', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(campaignData),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Error: ${response.status}`);
    //   }

    //   const result = await response.json();
    //   console.log('Respuesta del backend (Campaña):', result);
    //   alert('Campaña creada exitosamente!');
    //   // Limpiar formulario
    //   setFormData({
    //     campaignName: '',
    //     selectedAssetId: '',
    //     selectedUtmPresetName: '',
    //   });
    // } catch (error) {
    //   console.error('Error al crear la campaña:', error);
    //   alert('Error al crear la campaña.');
    // }
  };

  const availableUtmPresets = formData.selectedAssetId
    ? sampleAssets.find((asset) => asset.id === formData.selectedAssetId)?.utmPresets || []
    : [];

  return (
    <div className="campaign-creation-form-container">
      <h2>Crear Nueva Campaña</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="campaignName">Nombre de la Campaña:</label>
          <input
            type="text"
            id="campaignName"
            name="campaignName"
            value={formData.campaignName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="selectedAssetId">Seleccionar Asset Existente:</label>
          <select
            id="selectedAssetId"
            name="selectedAssetId"
            value={formData.selectedAssetId}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Seleccione un Asset --</option>
            {sampleAssets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.title}
              </option>
            ))}
          </select>
        </div>

        {formData.selectedAssetId && (
          <div className="form-group">
            <label htmlFor="selectedUtmPresetName">Seleccionar Preset UTM:</label>
            <select
              id="selectedUtmPresetName"
              name="selectedUtmPresetName"
              value={formData.selectedUtmPresetName}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Seleccione un Preset UTM --</option>
              {availableUtmPresets.map((preset) => (
                <option key={preset.name} value={preset.name}>
                  {preset.name} ({preset.utm_source} | {preset.utm_medium} | {preset.utm_campaign})
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit">Crear Campaña</button>
      </form>
    </div>
  );
};

export default CampaignCreationForm;