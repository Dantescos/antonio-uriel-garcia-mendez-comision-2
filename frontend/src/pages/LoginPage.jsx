import { useForm } from "react-hook-form";
import "../hojas-de-estilo/RegisterPage.css";
import { useAuth } from "../context/AuthContex";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbarnolog from "../components/Navbar.sin.logear";


export const LoginPage =  () =>  { 

const {register, handleSubmit, formState: { errors } } = useForm();
  
const { signin, errors: loginErrors ,isAuthenticated} = useAuth();

  


const navigate = useNavigate();
 useEffect(() => {
    if (isAuthenticated) navigate("/profile");
 }, [isAuthenticated]);

const onSubmit = handleSubmit((data) => {
  signin(data);
});
  return ( 
    <>
    <Navbarnolog /> {}
    <div className="login-contenedor">
      <h1 className="Texto-logeo">Login</h1>
      {Array.isArray(loginErrors) && loginErrors.map((error, i) => (
    <div className="error-login" key={i}>
      {error}
          </div>
        ))}
        
         <form onSubmit={onSubmit}>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="email"
          className="registro-casilla"
        />
        {errors.email && (
          <p className="texto-error">el nombre de usuario es requerido</p>
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
          login
        </button>
      </form>
      <p>
        ¿no tiene una cuenta?
        <Link to="/register" className="boton-registro">

          Registrarse
        </Link>
      </p>
    </div>
  </>
);
};

export default LoginPage;