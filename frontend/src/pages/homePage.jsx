import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

import '../hojas-de-estilo/HomePage.css';

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="Inicio-registro">
        <Link to="/login">
          <button className="botons-registro">Iniciar Sesión</button>
        </Link>
        <Link to="/register">
          <button className="botons-registro" >Registrarse</button>
        </Link>
      </div>
    </>
  );
};