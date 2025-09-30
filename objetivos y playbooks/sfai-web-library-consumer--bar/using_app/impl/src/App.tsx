import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Playbooks } from "sfai-library-objetivos-playbooks";

const App: React.FC = () => {
    
  console.log("Hello world to Consumer module");

return (
  <Router>
      <Playbooks>


      </Playbooks>
  </Router>
);
};

export default App;
