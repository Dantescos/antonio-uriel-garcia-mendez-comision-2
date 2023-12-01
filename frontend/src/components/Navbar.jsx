import React from 'react';
import '../hojas-de-estilo/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a className="Letra-items" href="/">Inicio</a></li>
        <li><a href="/">programar viajes</a></li>
        <li><a href="/">Comprar boletos</a></li>
        <li><a href="/">itinerarios</a></li>
        <li><a href="/about">Acerca de</a></li>
        <li><a href="/contact">Contacto</a></li>
       

      
      </ul>
    </nav>
  );
};

export default Navbar;