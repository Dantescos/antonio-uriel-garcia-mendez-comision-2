import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

import '../hojas-de-estilo/HomePage.css';

export const HomePageL = () => {
  return (
    <>
      <Navbar />
    <div>
        <Link to="/post">
          <button className="botons-registro" >Crear Nuevo Post</button>
        </Link>
    </div>
    </>
  );
};