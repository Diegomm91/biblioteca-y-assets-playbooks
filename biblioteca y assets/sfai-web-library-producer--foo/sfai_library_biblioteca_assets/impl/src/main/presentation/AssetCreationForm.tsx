import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importar uuid
import './AssetCreationForm.css';

interface UtmPreset {
  name: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

interface AssetFormData {
  title: string;
  description: string;
  imageFile: File | null;
  utmPresets: UtmPreset[];
}

const AssetCreationForm: React.FC = () => {
  const [formData, setFormData] = useState<AssetFormData>({
    title: '',
    description: '',
    imageFile: null,
    utmPresets: [],
  });

  const [newUtmPreset, setNewUtmPreset] = useState<UtmPreset>({
    name: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevData) => ({ ...prevData, imageFile: e.target.files![0] }));
    }
  };

  const handleUtmPresetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    } else {
      alert('Por favor, complete todos los campos del preset UTM.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idempotencyKey = uuidv4(); // Generar una clave de idempotencia
    console.log('Idempotency-Key:', idempotencyKey);

    // Aquí se implementará la lógica para enviar los datos al backend
    console.log('Datos del Asset a enviar:', { ...formData, idempotencyKey });

    // TODO: Implementar la llamada a la API para crear el asset
    // try {
    //   // Validaciones de frontend (tipo y tamaño de imagen)
    //   if (formData.imageFile) {
    //     const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    //     const maxSize = 10 * 1024 * 1024; // 10MB

    //     if (!allowedTypes.includes(formData.imageFile.type)) {
    //       alert('Tipo de imagen no permitido. Solo se aceptan JPG, PNG, WEBP.');
    //       return;
    //     }
    //     if (formData.imageFile.size > maxSize) {
    //       alert('Tamaño de imagen excedido. El tamaño máximo es 10MB.');
    //       return;
    //     }
    //   }

    //   const response = await fetch('/api/assets', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Idempotency-Key': idempotencyKey,
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Error: ${response.status}`);
    //   }

    //   const result = await response.json();
    //   console.log('Respuesta del backend:', result);
    //   alert('Asset creado exitosamente!');
    //   // Limpiar formulario
    //   setFormData({
    //     title: '',
    //     description: '',
    //     imageFile: null,
    //     utmPresets: [],
    //   });
    // } catch (error) {
    //   console.error('Error al crear el asset:', error);
    //   alert('Error al crear el asset.');
    // }
  };

  return (
    <div className="asset-creation-form-container">
      <h2>Crear Nuevo Asset</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="imageFile">Imagen:</label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept=".jpg,.png,.webp"
            onChange={handleFileChange}
          />
        </div>

        <h3>Presets UTM</h3>
        {formData.utmPresets.map((preset, index) => (
          <div key={index} className="utm-preset-item">
            <p><strong>Nombre:</strong> {preset.name}</p>
            <p>utm_source: {preset.utm_source}</p>
            <p>utm_medium: {preset.utm_medium}</p>
            <p>utm_campaign: {preset.utm_campaign}</p>
          </div>
        ))}

        <div className="utm-preset-form">
          <input
            type="text"
            name="name"
            placeholder="Nombre del Preset UTM"
            value={newUtmPreset.name}
            onChange={handleUtmPresetChange}
          />
          <input
            type="text"
            name="utm_source"
            placeholder="utm_source"
            value={newUtmPreset.utm_source}
            onChange={handleUtmPresetChange}
          />
          <input
            type="text"
            name="utm_medium"
            placeholder="utm_medium"
            value={newUtmPreset.utm_medium}
            onChange={handleUtmPresetChange}
          />
          <input
            type="text"
            name="utm_campaign"
            placeholder="utm_campaign"
            value={newUtmPreset.utm_campaign}
            onChange={handleUtmPresetChange}
          />
          <button type="button" onClick={addUtmPreset}>Agregar Preset UTM</button>
        </div>

        <button type="submit">Guardar Asset</button>
      </form>
    </div>
  );
};

export default AssetCreationForm;