import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {Playbooks} from "../../../sfai_library_objetivos_playbooks/public";


const App: React.FC = () => {
    
  console.log("Hello world to Consumer module");

  return (
    <Router>
      <div className="content-wrapper">
          
          
          
        <Playbooks/>
          
      </div>
    </Router>
  );
};

export default App;
