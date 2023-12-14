import { usePost } from "../context/PostProvider.jsx";
import { useEffect } from "react";
import PosteoModal from "../components/Nuevo.Posteomodal.jsx";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Navbar from '../components/Navbar.logeado.jsx';
import PostLoged from "../components/Post.logeado.jsx"

function Homepagelogeado() {
  // Obtener funciones y estado relacionados con los posteos desde el contexto
  const { getAllPost, post, createPost } = usePost();
  const [showModal, setShowModal] = useState(false);

  // Función para mostrar el modal de creación de posteo
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal de creación de posteo
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Función para agregar un nuevo posteo
  const addPost = async (newPost) => {
    try {
      // Llamar a la función de creación de posteo del contexto
      const result = await createPost(newPost);

      // Redireccionar a la página de detalle del nuevo posteo
      navigate(`/profile/post/${result.id}`);
    } catch (error) {
      console.error("Error al crear el posteo", error);
    }
  };

  // Obtener la lista de posteos al cargar el componente
  useEffect(() => {
    getAllPost();
  }, []);

  // Renderizar según la cantidad de posteos disponibles
  if (post.length === 0) {
    return (
      <>
        <Navbar />
        <Button variant="btn btn-primary" size="lg" onClick={handleShowModal}>
          Crear Nuevo Post
        </Button>
        <PosteoModal
          showModal={showModal}
          handleClose={handleCloseModal}
          addPost={addPost}
        />
        <h1 className="text-center pt-3">Posteos</h1>
        <h1
          className="d-flex col align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          No se hallan posteos
        </h1>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <h1 className="text-center pt-3">Posteos</h1>
      <Button variant="btn btn-primary" onClick={handleShowModal}>
        Crear Nuevo Post
      </Button>
      <PosteoModal
        showModal={showModal}
        handleClose={handleCloseModal}
        addPost={addPost}
      />
      <div className="container">
        <div className="row">
          {post.map((post, i) => (
            <div className="col-md-6" key={i}>
              <PostLoged post={post} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Homepagelogeado;
