import { useForm } from "react-hook-form";
import "../hojas-de-estilo/RegisterPage.css";
import { useAuth } from "../context/AuthContex";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbarnolog from "../components/Navbar.sin.logear";

export const LoginPage = () => {
  // Obtener funciones y estados del formulario
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // Obtener funciones y estados de autenticación desde el contexto
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();

  // Obtener la función navigate del react-router-dom
  const navigate = useNavigate();

  // Redirigir a la página de perfil si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated]);

  // Función para manejar el envío del formulario
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <>
      <Navbarnolog />
      <div className="login-contenedor">
        <h1 className="Texto-logeo">Login</h1>
        
        {/* Mostrar errores de inicio de sesión si existen */}
        {Array.isArray(loginErrors) && loginErrors.map((error, i) => (
          <div className="error-login" key={i}>
            {error}
          </div>
        ))}
        
        <form onSubmit={onSubmit}>
          {/* Campo de entrada para el correo electrónico */}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Correo electrónico"
            className="registro-casilla"
          />
          {errors.email && (
            <p className="texto-error">El correo electrónico es requerido</p>
          )}

          {/* Campo de entrada para la contraseña */}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Contraseña"
            className="registro-casilla"
          />
          {errors.password && (
            <p className="texto-error">La contraseña es requerida</p>
          )}

          {/* Botón de inicio de sesión */}
          <button type="submit" className="boton-registro">
            Iniciar sesión
          </button>
        </form>

        {/* Enlace para registrarse */}
        <p>
          ¿No tiene una cuenta?
          <Link to="/register" className="boton-registro">
            Registrarse
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
