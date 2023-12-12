import React from 'react';
import '../hojas-de-estilo/navbar.css';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContex";
import { Button } from "react-bootstrap";


function Navbar() {

  const {logout} = useAuth()



  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a className="Letra-items" href="/home">Inicio</a></li>
        <li><a href="/">Post Sobre Viajes</a></li>
        <li><a href="/newPost">Crear Posts</a></li>
        <li><Button  onClick={() => logout()} >Salir</Button></li>
       

      
      </ul>
    </nav>
  );
};

export default Navbar;