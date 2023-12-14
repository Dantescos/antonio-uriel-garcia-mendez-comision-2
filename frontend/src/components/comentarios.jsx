// Importa componentes y funciones necesarios de React y otras bibliotecas
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { useComment } from "../context/CommentProvider";
import { useState } from 'react';
import { useAuth } from "../context/AuthContex";


// Componente funcional Comments que recibe un comentario como prop
const Comments = ({ comment }) => {
  // Obtiene la función navigate de react-router-dom para la navegación
  const navigate = useNavigate();

  // Obtiene datos de autenticación del contexto
  const { tokenData } = useAuth();

  // Obtiene funciones de manejo de comentarios del contexto
  const { deleteComment, updateComment } = useComment();

  // Obtiene los parámetros de la URL usando react-router-dom
  const params = useParams();
  const idPost = params.id;

  // Obtiene información específica del comentario
  const idComment = comment._id;
  const autorComment = comment.author;
  const author = tokenData.id;

  // Estado local para controlar la visibilidad del modal de edición
  const [showModal, setShowModal] = useState(false);

  // Función para mostrar el modal de edición
  const handleShowModal = () => {
    setShowModal(true);
  }

  // Función para cerrar el modal de edición
  const handleCloseModal = () => {
    setShowModal(false);
  }

  // Función para eliminar un comentario
  const delComment = () => {
    deleteComment(idPost, idComment);
    navigate('/profile'); // Navega a la página de perfil después de eliminar el comentario
  }

  // Función para editar un comentario
  const editComment = async (editedComment) => {
    await updateComment(editedComment, idComment, idPost);
  }

  // Renderiza el componente Card de Bootstrap que muestra el comentario
  return (
    <div className="mt-2">
      <Card>
        <Card.Header>Comentario de @{comment.author}</Card.Header>
        <Card.Body>
          <Card.Text>{comment.description}</Card.Text>
          {/* Renderiza botones de edición y eliminación solo si el autor del comentario es el usuario autenticado */}
          {author === autorComment ? (
            <>
              <Button className='me-2' variant="dark" onClick={handleShowModal}>Editar</Button>
              <Button variant="danger" onClick={delComment}>Eliminar</Button>
            </>
          ) : null}
        </Card.Body>
        {/* Renderiza el componente de edición de comentario con el modal */}
        <EditComment showModal={showModal} handleClose={handleCloseModal} editComment={editComment} comment={comment} idPost={idPost} />
      </Card>
    </div>
  );
}

// Exporta el componente Comments
export default Comments;
