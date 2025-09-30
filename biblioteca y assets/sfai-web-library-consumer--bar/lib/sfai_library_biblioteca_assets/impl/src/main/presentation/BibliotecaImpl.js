import React from 'react';
import AssetCreationForm from './AssetCreationForm.js';
import CampaignCreationForm from './CampaignCreationForm.js'; // Importar el nuevo componente
const FeatureFoobarImpl = () => {
    return (React.createElement("div", { className: "feature-foobar-container" },
        React.createElement("h1", null, "Gesti\u00F3n de Biblioteca de Assets"),
        React.createElement(AssetCreationForm, null),
        " ",
        React.createElement("hr", { style: { margin: '40px 0' } }),
        " ",
        React.createElement(CampaignCreationForm, null),
        " "));
};
export default FeatureFoobarImpl;
//# sourceMappingURL=BibliotecaImpl.js.map