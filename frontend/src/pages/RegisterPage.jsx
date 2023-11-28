import { useForm } from "react-hook-form";
import "../hojas-de-estilo/RegisterPage.css";
import { registerRequest } from "../api/auth";
function RegisterPage() {
  const { register, handleSubmit } = useForm();
  return (
    <div className="login-contenedor">
      <form
        onSubmit={handleSubmit(async (values) => {
          console.log(values);
          const res = await registerRequest(values);
          console.log(res);
        })}
      >
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
          className="registro-casilla"
        />
        <br />
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="registro-casilla"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="registro-casilla"
        />
        <button type="submit" className="boton-registro">
          {" "}
          Register{" "}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
