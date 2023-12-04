import { useForm } from "react-hook-form";
import "../hojas-de-estilo/RegisterPage.css";
import { useAuth } from "../context/AuthContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { registerRequest } from "../api/auth";
import Navbar from "../components/Navbar";

export const RegisterPage = () => {
 const { register, handleSubmit, formState: { errors } } = useForm();
 const { signup, isAuthenticated, errors: registerErrors } = useAuth();

 const navigate = useNavigate();
 useEffect(() => {
    if (isAuthenticated) navigate("/home");
 }, [isAuthenticated]);

 const onSubmit = handleSubmit(async (values) => {
    signup(values);
 });

 return (
    <div>
      <Navbar />
      <div className="login-contenedor">
      {registerErrors && registerErrors.map((error, i) => (
    <Message message={error} key={i} />
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