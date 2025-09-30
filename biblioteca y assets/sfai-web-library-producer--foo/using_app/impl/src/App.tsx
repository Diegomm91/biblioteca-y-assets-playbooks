import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {Biblioteca} from "../../../sfai_library_biblioteca_assets/public";


const App: React.FC = () => {
    
  console.log("Hello world to Consumer module");

  return (
    <Router>
      <div className="content-wrapper">
      
          
          
        <Biblioteca/>
          
      </div>
    </Router>
  );
};

export default App;
