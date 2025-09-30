import 'process'; // Importar process primero
import 'buffer';
import 'stream-browserify';
import 'util';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "../../../impl/src/App";

const root = document.getElementById('root');

if (root !== null) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
