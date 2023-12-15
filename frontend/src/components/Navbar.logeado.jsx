import React from 'react';
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContex";
import '../hojas-de-estilo/navbar.css';

function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-links">
          <li><a className="Letra-items" href="/profile">Inicio</a></li>
        </ul>

        <div className="user-info">
          <div className="ms-2 fs-6">
            <label className="me-2">{user.username}</label>
            <img
              src={user.avatarURL}
              className="img-fluid rounded-circle"
              style={{ width: "50px", height: "50px", opacity: 0.9, marginRight: '10px' }}
            />
            <Button onClick={() => logout()}>Salir</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
