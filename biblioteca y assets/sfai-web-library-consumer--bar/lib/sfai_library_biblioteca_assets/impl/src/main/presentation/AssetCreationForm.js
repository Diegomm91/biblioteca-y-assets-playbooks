import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importar uuid
import './AssetCreationForm.css';
const AssetCreationForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageFile: null,
        utmPresets: [],
    });
    const [newUtmPreset, setNewUtmPreset] = useState({
        name: '',
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prevData) => ({ ...prevData, imageFile: e.target.files[0] }));
        }
    };
    const handleUtmPresetChange = (e) => {
        const { name, value } = e.target;
        setNewUtmPreset((prevPreset) => ({ ...prevPreset, [name]: value }));
    };
    const addUtmPreset = () => {
        if (newUtmPreset.name && newUtmPreset.utm_source && newUtmPreset.utm_medium && newUtmPreset.utm_campaign) {
            setFormData((prevData) => ({
                ...prevData,
                utmPresets: [...prevData.utmPresets, newUtmPreset],
            }));
            setNewUtmPreset({ name: '', utm_source: '', utm_medium: '', utm_campaign: '' });
        }
        else {
            alert('Por favor, complete todos los campos del preset UTM.');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const idempotencyKey = uuidv4(); // Generar una clave de idempotencia
        console.log('Idempotency-Key:', idempotencyKey);
        // Aquí se implementará la lógica para enviar los datos al backend
        console.log('Datos del Asset a enviar:', { ...formData, idempotencyKey });
        // Simulación de llamada a API
        try {
            // Validaciones de frontend (tipo y tamaño de imagen)
            if (formData.imageFile) {
                const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
                const maxSize = 10 * 1024 * 1024; // 10MB
                if (!allowedTypes.includes(formData.imageFile.type)) {
                    alert('Tipo de imagen no permitido. Solo se aceptan JPG, PNG, WEBP.');
                    return;
                }
                if (formData.imageFile.size > maxSize) {
                    alert('Tamaño de imagen excedido. El tamaño máximo es 10MB.');
                    return;
                }
            }
            // Simular una respuesta exitosa del backend
            const response = await new Promise((resolve) => setTimeout(() => {
                resolve({ status: 201, data: { id: 'asset-123', message: 'Asset creado exitosamente.', idempotencyKey } });
            }, 1000));
            console.log('Respuesta del backend:', response);
            alert('Asset creado exitosamente!');
            // Limpiar formulario
            setFormData({
                title: '',
                description: '',
                imageFile: null,
                utmPresets: [],
            });
        }
        catch (error) {
            console.error('Error al crear el asset:', error);
            alert('Error al crear el asset.');
        }
    };
    return (React.createElement("div", { className: "asset-creation-form-container" },
        React.createElement("h2", null, "Crear Nuevo Asset"),
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "title" }, "T\u00EDtulo:"),
                React.createElement("input", { type: "text", id: "title", name: "title", value: formData.title, onChange: handleInputChange, required: true })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "description" }, "Descripci\u00F3n:"),
                React.createElement("textarea", { id: "description", name: "description", value: formData.description, onChange: handleInputChange, required: true })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "imageFile" }, "Imagen:"),
                React.createElement("input", { type: "file", id: "imageFile", name: "imageFile", accept: ".jpg,.png,.webp", onChange: handleFileChange })),
            React.createElement("h3", null, "Presets UTM"),
            formData.utmPresets.map((preset, index) => (React.createElement("div", { key: index, className: "utm-preset-item" },
                React.createElement("p", null,
                    React.createElement("strong", null, "Nombre:"),
                    " ",
                    preset.name),
                React.createElement("p", null,
                    "utm_source: ",
                    preset.utm_source),
                React.createElement("p", null,
                    "utm_medium: ",
                    preset.utm_medium),
                React.createElement("p", null,
                    "utm_campaign: ",
                    preset.utm_campaign)))),
            React.createElement("div", { className: "utm-preset-form" },
                React.createElement("input", { type: "text", name: "name", placeholder: "Nombre del Preset UTM", value: newUtmPreset.name, onChange: handleUtmPresetChange }),
                React.createElement("input", { type: "text", name: "utm_source", placeholder: "utm_source", value: newUtmPreset.utm_source, onChange: handleUtmPresetChange }),
                React.createElement("input", { type: "text", name: "utm_medium", placeholder: "utm_medium", value: newUtmPreset.utm_medium, onChange: handleUtmPresetChange }),
                React.createElement("input", { type: "text", name: "utm_campaign", placeholder: "utm_campaign", value: newUtmPreset.utm_campaign, onChange: handleUtmPresetChange }),
                React.createElement("button", { type: "button", onClick: addUtmPreset }, "Agregar Preset UTM")),
            React.createElement("button", { type: "submit" }, "Guardar Asset"))));
};
export default AssetCreationForm;
//# sourceMappingURL=AssetCreationForm.js.map