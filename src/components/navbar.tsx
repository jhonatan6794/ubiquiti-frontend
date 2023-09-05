// Navbar.tsx

import React from 'react';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar" >
        <div className="logo">
         <a href="#">
            <img src={require('../img/union.svg')} alt="Logo" className="svg-logo" />
         </a>
            <span className="devices">Devices</span>
        </div>

      <div>
        Author / Jhonatan
      </div>
    </nav>
  );
};

export default Navbar;
