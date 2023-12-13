import React from 'react';
import '../hojas-de-estilo/navbar.css';
import {useAuth} from "../context/AuthContex";
import { Button } from "react-bootstrap";


function Navbar() {

  const { isAuthenticated, logout, user } = useAuth();
  const avatarURL = isAuthenticated ? user.avatarURL : null;



  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a className="Letra-items" href="/profile">Inicio</a></li>
        <li><Button  onClick={() => logout()} >Salir</Button></li>
        <li>
              {avatarURL && (
                <img
                  src={avatarURL}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
            </li>

      
      </ul>
    </nav>
  );
};

export default Navbar;