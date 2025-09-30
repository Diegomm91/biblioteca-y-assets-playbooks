import React from 'react';
import AssetCreationForm from './AssetCreationForm';
import CampaignCreationForm from './CampaignCreationForm'; // Importar el nuevo componente

const FeatureFoobarImpl: React.FC = () => {

  return (
    <div className="feature-foobar-container">
      <h1>Gestión de Biblioteca de Assets</h1>
      <AssetCreationForm /> {/* Renderizar el componente de creación de assets */}
      <hr style={{ margin: '40px 0' }} /> {/* Separador */}
      <CampaignCreationForm /> {/* Renderizar el componente de creación de campañas */}
    </div>
  );
};

export default FeatureFoobarImpl;
