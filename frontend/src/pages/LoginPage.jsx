import {useForm} from "react-hook-form"
import "../hojas-de-estilo/RegisterPage.css";

function LoginPage() {
  
  const {register , handleSubmit, formState: {errors} } = useForm() 

  const onSubmit = handleSubmit(data => {
    console.log(data);
  })
  
  return ( 
  
  <div className="login-contenedor"> 
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
    Register{" "}
  </button>
</form>
 </div>
  );
}

export default LoginPage;
