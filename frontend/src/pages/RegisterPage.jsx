import { useForm } from "react-hook-form";
import "../hojas-de-estilo/RegisterPage.css";
import { useAuth } from "../context/AuthContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbarnolog from "../components/Navbar.sin.logear";

export const RegisterPage = () => {
  // Utilizar react-hook-form para gestionar el formulario
 const { register, handleSubmit, formState: { errors } } = useForm();
 // Obtener funciones y estados relacionados con la autenticación desde el contexto
 const { signup, isAuthenticated, errors: registerErrors } = useAuth();

 // Redireccionar al perfil si el usuario está autenticado
 const navigate = useNavigate();
 useEffect(() => {
    if (isAuthenticated) navigate("/profile");
 }, [isAuthenticated]);
 // Función que se ejecuta al enviar el formulario
 const onSubmit = handleSubmit(async (values) => {
    signup(values);
 });

 return (
    <div>
      <Navbarnolog />
    <div className="login-contenedor">
      <h1 className="Texto-logeo">Login</h1>
      {Array.isArray(registerErrors) && registerErrors.map((error, i) => (
    <div className="error-login" key={i}>
      {error}
          </div>
))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="Username"
            className="registro-casilla"
          />
          {errors.username && (
            <p className="error-usuario">El Username es requerido</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="registro-casilla"
          />
          {errors.email && (
            <p className="error-email">El Email es requerido</p>
          )}


          <input
            type="text"
            {...register("Imagen de avatar", { required: true })}
            placeholder="Imagen de avatar"
            className="registro-casilla"
            />
            {errors.avatarURL && (
              <p className="error-email">El avatar es requerido</p>
            )}
       

          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="registro-casilla"
          />
         {errors.password && (
            <p className="pasword-error">El Password es requerido</p>
          )}

          <button type="submit" className="boton-registro">
            {" "}
            Registrarse{" "}
          </button>
        </form>
        <p className="Texto-login">¿ya tiene una cuenta?<Link to="/login" className="boton-registro"> Ingresar </Link> </p>
      </div>
    </div>
 );
};