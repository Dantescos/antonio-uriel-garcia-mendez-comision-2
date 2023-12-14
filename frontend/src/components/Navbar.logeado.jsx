import React from 'react';
import '../hojas-de-estilo/navbar.css';
import {useAuth} from "../context/AuthContex";
import { Button } from "react-bootstrap";



function Navbar() {

  const {  logout, user } = useAuth();



  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a className="Letra-items" href="/profile">Inicio</a></li>
        <li><Button  onClick={() => logout()} >Salir</Button></li>
        <div className="d-flex align-items-center justify-content-end">
  <div className="ms-2 fs-6">
    <label  className="me-2">{user.username}</label>
  </div>
  <img
    src={user.avatarURL}
    className="img-fluid rounded-circle"
    style={{ width: "50px", height: "50px", opacity: 0.9 }}
  />
</div>

      
      </ul>
    </nav>
  );
};

export default Navbar;