import { useContext, useId, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.logeado";
import "../hojas-de-estilo/newpost.css";

const NewPost = () => {
  const titleId = useId();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const navigate = useNavigate();
  const { validade } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !imageURL.trim()) return;

    try {
      const response = await axios.post(
        `${API_URL}/post`,
        {
          title: title.trim(),
          description: description.trim(),
          imageURL: imageURL.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: validade.token,
          },
        }
      );

      if (response.status === 201) {
        navigate("/post");
      } else {
        console.error("Error en la respuesta:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="Titulo-post"> nuevo posteo</h2>
      <form onSubmit={handleSubmit} className="formulario-crear">
        <div className="div-crear">
          <label className="Sub-titulos" htmlFor={titleId}>
            Title:
          </label>
          <input
            className="area-imput"
            type="text"
            id={titleId}
            placeholder="Nuevo Post"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="div-crear">
          <label className="Sub-titulos" htmlFor="description">
            Description:
          </label>
          <input
            className="area-imput"
            type="text"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="div-crear">
          <label className="Sub-titulos" htmlFor="imageURL">
            Image URL:
          </label>
          <input
            className="area-imput"
            type="text"
            id="imageURL"
            placeholder="Image URL"
            value={imageURL}
            onChange={(e) => {
              setImageURL(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="botons-registro">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewPost;
