import { useContext, useId, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../hojas-de-estilo/newpost.css';


const NewPost = () => {
  const titleId = useId();
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: isAuthenticated.token,
      },
      body: JSON.stringify({ title: title.trim() }),
    }).then((res) => {
      if (res.status !== 201) return;

      navigate("/post");
    });
  };

  return (
    <div>
      <Navbar />
      <h2>Creando nuevo posteo</h2>
      <form onSubmit={handleSubmit} className="formulario-crear">
        <div className="div-crear">
          <label htmlFor={titleId}>Title:</label>
          <input
            type="text"
            id={titleId}
            placeholder="Nuevo Post"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="botons-registro">Create</button>
      </form>
    </div>
  );
};

export default NewPost;