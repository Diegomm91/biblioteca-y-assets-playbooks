import React, { useState } from 'react';
import './CampaignCreationForm.css';
const sampleAssets = [
    {
        id: 'asset-1',
        title: 'Imagen de Verano',
        description: 'Imagen promocional para la campaña de verano.',
        imageUrl: 'https://example.com/summer-image.jpg',
        utmPresets: [
            { name: 'Verano_Facebook', utm_source: 'facebook', utm_medium: 'social', utm_campaign: 'verano2024' },
            { name: 'Verano_Google', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'verano2024' },
        ],
    },
    {
        id: 'asset-2',
        title: 'Copy de Descuento',
        description: 'Texto para anunciar un descuento del 20%.',
        imageUrl: '', // No image for copy asset
        utmPresets: [
            { name: 'Descuento_Email', utm_source: 'email', utm_medium: 'newsletter', utm_campaign: 'descuento20' },
        ],
    },
];
const CampaignCreationForm = () => {
    const [formData, setFormData] = useState({
        campaignName: '',
        selectedAssetId: '',
        selectedUtmPresetName: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedAsset = sampleAssets.find((asset) => asset.id === formData.selectedAssetId);
        const selectedUtmPreset = selectedAsset?.utmPresets.find((preset) => preset.name === formData.selectedUtmPresetName);
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
        // Simulación de llamada a API para crear campaña
        try {
            const response = await new Promise((resolve) => setTimeout(() => {
                resolve({ status: 201, data: { id: 'campaign-456', message: 'Campaña creada exitosamente.', campaignData } });
            }, 1000));
            console.log('Respuesta del backend (Campaña):', response);
            alert('Campaña creada exitosamente!');
            // Limpiar formulario
            setFormData({
                campaignName: '',
                selectedAssetId: '',
                selectedUtmPresetName: '',
            });
        }
        catch (error) {
            console.error('Error al crear la campaña:', error);
            alert('Error al crear la campaña.');
        }
    };
    const availableUtmPresets = formData.selectedAssetId
        ? sampleAssets.find((asset) => asset.id === formData.selectedAssetId)?.utmPresets || []
        : [];
    return (React.createElement("div", { className: "campaign-creation-form-container" },
        React.createElement("h2", null, "Crear Nueva Campa\u00F1a"),
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "campaignName" }, "Nombre de la Campa\u00F1a:"),
                React.createElement("input", { type: "text", id: "campaignName", name: "campaignName", value: formData.campaignName, onChange: handleInputChange, required: true })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "selectedAssetId" }, "Seleccionar Asset Existente:"),
                React.createElement("select", { id: "selectedAssetId", name: "selectedAssetId", value: formData.selectedAssetId, onChange: handleInputChange, required: true },
                    React.createElement("option", { value: "" }, "-- Seleccione un Asset --"),
                    sampleAssets.map((asset) => (React.createElement("option", { key: asset.id, value: asset.id }, asset.title))))),
            formData.selectedAssetId && (React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "selectedUtmPresetName" }, "Seleccionar Preset UTM:"),
                React.createElement("select", { id: "selectedUtmPresetName", name: "selectedUtmPresetName", value: formData.selectedUtmPresetName, onChange: handleInputChange, required: true },
                    React.createElement("option", { value: "" }, "-- Seleccione un Preset UTM --"),
                    availableUtmPresets.map((preset) => (React.createElement("option", { key: preset.name, value: preset.name },
                        preset.name,
                        " (",
                        preset.utm_source,
                        " | ",
                        preset.utm_medium,
                        " | ",
                        preset.utm_campaign,
                        ")")))))),
            React.createElement("button", { type: "submit" }, "Crear Campa\u00F1a"))));
};
export default CampaignCreationForm;
//# sourceMappingURL=CampaignCreationForm.js.map