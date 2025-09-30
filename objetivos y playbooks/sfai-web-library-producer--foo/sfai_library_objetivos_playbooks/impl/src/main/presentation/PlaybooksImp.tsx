import React from 'react';
import CampaignCreationForm from './CampaignCreationForm';
import './Playbooks.css'; // Importar el archivo CSS

const PlaybooksImpl: React.FC = () => {
  return (
    <div className="feature-foobar-container playbooks-container"> {/* Añadir la clase playbooks-container */}
      <CampaignCreationForm />
    </div>
  );
};

export default PlaybooksImpl;
