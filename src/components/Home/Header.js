import React, { useState } from "react";
import "../../styles/Header.css";
import logoBix from '../../assets/images/Logo-Bix.png';
import profilePic from '../../assets/images/Logo.png';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/" className="logo-link">
          <img src={logoBix} alt="Logo" className="logo-image" />
        </a>
      </div>
      <nav className="nav-links">
        <a href="/manager" className="nav-link">Gerenciador</a>
        <a href="/docs" className="nav-link">Documentação</a>
        <a href="/price" className="nav-link">Preços</a>
        <a href="/suport" className="nav-link">Suporte</a>
      </nav>
      <div className="profile-container" onClick={toggleDropdown}>
        <img src={profilePic} alt="Perfil" className="profile-pic" />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <a href="/perfil" className="dropdown-item">Perfil</a>
            <a href="/pagamentos" className="dropdown-item">Pagamentos</a>
            <a href="/sair" className="dropdown-item">Sair</a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
