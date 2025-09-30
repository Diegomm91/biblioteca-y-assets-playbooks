import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {Biblioteca} from "sfai-library-biblioteca-assets";

const App: React.FC = () => {
    
  console.log("Hello world to Consumer module");

  return (
    <Router>
      <div className="content-wrapper">
         
          
        {<Biblioteca/>}
          
      </div>
    </Router>
  );
};

export default App;
