import { useForm } from "react-hook-form";
import "../hojas-de-estilo/RegisterPage.css";
import { useAuth } from "../context/AuthContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { registerRequest } from "../api/auth";
import Navbar from "../components/Navbar";

export const RegisterPage = () => {
 const { register, handleSubmit, reset, formState: { errors } } = useForm();
 const { signup, isAuthenticated, errors: registerErrors } = useAuth();

 const navigate = useNavigate();
 useEffect(() => {
    if (isAuthenticated) navigate("/home");
 }, [isAuthenticated]);

 const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    reset(); // Limpiar los errores
    const res = await registerRequest(values);
    console.log(res);
    signup(values);
 });

 const renderErrorMessage = (fieldName) => {
    if (errors[fieldName]) {
      return <p className="texto-error">{errors[fieldName].message}</p>;
    }
    return null;
 };

 return (
    <div>
      <Navbar />
      <div className="login-contenedor">
        {registerErrors.map((error, i) => (
          <div className="Mensaje-error" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: "Nombre de usuario es requerido" })}
            placeholder="Username"
            className="registro-casilla"
          />
          {renderErrorMessage("username")}

          <input
            type="email"
            {...register("email", { required: "Email es requerido" })}
            placeholder="Email"
            className="registro-casilla"
          />
          {renderErrorMessage("email")}

          <input
            type="password"
            {...register("password", { required: "Contraseña es requerido" })}
            placeholder="Password"
            className="registro-casilla"
          />
          {renderErrorMessage("password")}

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