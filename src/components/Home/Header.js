import React from "react";
import "../../styles/Header.css";
import logoBix from '../../assets/images/Logo-Bix.png';

function Header() {
  return (
    <header className="header">
      <a href="/" className="logo-link">
        <img src={logoBix} alt="Logo" className="logo-image" />
      </a>
      Header
    </header>
  );
}

export default Header;
