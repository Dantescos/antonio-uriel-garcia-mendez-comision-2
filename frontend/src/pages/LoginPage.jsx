import { useForm } from "react-hook-form";
import "../hojas-de-estilo/RegisterPage.css";
import { useAuth } from "../context/AuthContex";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";



export const LoginPage =  () =>  { 
const {register, handleSubmit, formState: { errors } } = useForm();
  
const { signin, errors: signinErrors ,setIsAuthenticated} = useAuth();

  

const onSubmit = (value) => signin(value);

  useEffect(() => {
    if (setIsAuthenticated) {
      navigate("/post");
    }
  }, [setIsAuthenticated]);




  return (

    
    <>
    <Navbar /> {/* Agrega tu Navbar aquí */}
    <div className="login-contenedor">
      <h1 className="Texto-logeo">Login</h1>
      <form onSubmit={onSubmit}>
        {signinErrors.map((error, i) => (
          <div className="Mensaje-error" key={i}>
            {error}
          </div>
        ))}
        <input
          type="text"
          {...register("Email", { required: true })}
          placeholder="email"
          className="registro-casilla"
        />
        {errors.email && (
          <p className="texto-error">el email es requerido</p>
        )}

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="registro-casilla"
        />
        {errors.password && (
          <p className="texto-error">contraseña es requerido</p>
        )}

        <button type="submit" className="boton-registro">
          {" "}
          login{" "}
        </button>
      </form>
      <p>
        ¿no tiene una cuenta?
        <Link to="/register" className="boton-registro">
          {" "}
          Registrarse{" "}
        </Link>{" "}
      </p>
    </div>
  </>
);
};

export default LoginPage;