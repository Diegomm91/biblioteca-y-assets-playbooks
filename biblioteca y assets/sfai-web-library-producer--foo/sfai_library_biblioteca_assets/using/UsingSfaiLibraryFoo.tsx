import './UsingSfaiLibraryFoo.css';
import React, { useState } from 'react';

interface UsingSfaiReactLibraryProps {
  onNavigate: (path: string) => void;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UsingSfaiLibraryFoo: React.FC<UsingSfaiReactLibraryProps> = ({ onNavigate }) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const handleClick = (component: string) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      <h1 className="title">SFAI React Library - Using</h1>
      <main className="main">
        <div>
          <nav className="nav">
            <ul className="list">
              <li className="listItem">
                <button
                  className="button"
                  onClick={() => handleClick('SfaiComponentCore')}
                >
                  Core
                </button>
              </li>

              <li className="listItem">
                <button
                  className="button"
                  onClick={() => handleClick('SfaiComponent1')}
                >
                  SfaiComponent1
                </button>
              </li>

              <li className="listItem">
                <button
                  className="button"
                  onClick={() => handleClick('SfaiComponent2')}
                >
                  SfaiComponent2
                </button>
              </li>
              
            </ul>
          </nav>

          <div className="componentContainer">
            {selectedComponent === 'SfaiComponentCore' && <div>Core - Comming soon</div>}
            {/*{selectedComponent === 'SfaiComponent1' && (<SfaiComponent1 onNavigate={onNavigate} />)}*/}
            {selectedComponent === 'SfaiComponent1' && <div>SfaiComponent1</div>}
            {selectedComponent === 'SfaiComponent2' && <div>SfaiComponent2</div>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsingSfaiLibraryFoo;
