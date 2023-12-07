import React from 'react';
import '../hojas-de-estilo/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a className="Letra-items" href="/home">Inicio</a></li>
        <li><a href="/post">Post Sobre Viajes</a></li>
        <li><a href="/post/new">Crear Posts</a></li>
        <li><a href="/contact">Logout</a></li>
       

      
      </ul>
    </nav>
  );
};

export default Navbar;