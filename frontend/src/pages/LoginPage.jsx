import { useForm } from "react-hook-form";
import "../hojas-de-estilo/RegisterPage.css";
import { useAuth } from "../context/AuthContex";
import { Link } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors } = useAuth();
  
  const onSubmit = (data) => signin(data);

  return (
    <div className="login-contenedor">
      {signinErrors.map((error, i) => (
        <div className="Mensaje-error" key={i}>
          {error}
        </div>
      ))}
      <h1 className="Texto-logeo">Login</h1>
      <form onSubmit={onSubmit}>
  <input
    type="text"
    {...register("username", { required: true })}
    placeholder="Username"
    className="registro-casilla"
  />
  <br />
  {errors.username  && ( <p className="texto-error">Nombre de usuario es requerido</p> )}

  <input
    type="password"
    {...register("password", { required: true })}
    placeholder="Password"
    className="registro-casilla"
  />
  {errors.password  && ( <p className="texto-error">contraseña es requerido</p> )}

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
  );
}

export default LoginPage;
