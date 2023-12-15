import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useComment } from '../context/CommentProvider';
import { deletePostReq, updatePostReq } from '../api/postAxios';
import NuevoComentario from './NewComments';
import Swal from 'sweetalert2';
import Comments from '../components/comentarios';
import EditPostModal from './editar.post';
import { useAuth } from "../context/AuthContex";

const PostDetail = ({ post }) => {
  // Obtener funciones y datos necesarios del contexto y de React Router
  const { getAllComments, comment, createComment } = useComment();
  const { id } = useParams();
  const postId = id.toString(); 
  
  const { tokenData } = useAuth();
  const navigate = useNavigate();
  


  // Estado local para el modal de comentarios
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Cargar comentarios cuando cambia el ID del post
    if (post) {
      getAllComments(postId);
    }
  }, [postId, post]);

  // Funciones para mostrar y ocultar el modal de comentarios
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Verificar si el usuario actual es el creador del post
  let isCurrentUserPostCreator = false;

  // Función para eliminar un post
  const handleDeletePost = async () => {
    try {
      const res = await deletePostReq(post?._id);
      if (res.status === 200) {
        console.log('Post eliminado exitosamente');
        // Mostrar mensaje de éxito y redirigir a la página de perfil
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El post ha sido eliminado exitosamente',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  };

  // Función para agregar un comentario
  const addComment = async (newComment, postId) => {
    try {
      const res = await createComment(newComment, postId);
    } catch (error) {
      console.error('Error al crear el comentario', error);
    }
  };

  // Función para editar un post
  const handleEditPost = async (editedPostData) => {
    try {
      const res = await updatePostReq(post?._id, editedPostData);
      if (res.status === 200) {
        console.log('Post editado exitosamente');
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error al editar el post:', error);
    }
  };

  // Manejo del caso en el que no se encuentre el post
  if (!post) {
    return <div>No se encontró la publicación.</div>;
  }

  // Formatear fechas del post
  const formattedDatePost = new Date(post.createdAt).toLocaleDateString();
  const formattedDateUpdate = new Date(post.updatedAt).toLocaleDateString();

  // Estructura JSX del componente PostDetail
  return (
    <div className='container col-6 my-5'>
      {/* Card de Bootstrap para mostrar el post */}
      <Card style={{ backgroundColor: '#343a40', color: '#fff' }}>
        <Card.Img variant='top' src={post.imageURL} />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.description}</Card.Text>
          <Card.Text>
            By: {post.authorName } <br />
            Posteado: {formattedDatePost} <br />
            Actualizado: {formattedDateUpdate}
          </Card.Text>

          {/* Botones de editar y eliminar solo para el creador del post */}
          {tokenData && tokenData.id === post.author && (
            <>
              <Button
                className='me-2 mb-1'
                style={{ backgroundColor: 'green', borderColor: 'green' }}
                onClick={() => setShowEditModal(true)}>
                Editar
              </Button>
              <Button
                className='me-2 mb-1'
                variant='danger'
                onClick={handleDeletePost}>
                Eliminar Posteo
              </Button>
            </>
          )}

          {/* Botón para mostrar el modal de comentarios */}
          <Button variant='primary' onClick={handleShowModal}>
            Comentar
          </Button>
        </Card.Body>

        {/* Modal para agregar nuevos comentarios */}
        <NuevoComentario
          showModal={showModal}
          handleClose={handleCloseModal}
          addComment={addComment}
          postId={postId}
        />
      </Card>

      {/* Modal para editar el post */}
      <EditPostModal
        showModal={showEditModal}
        handleClose={() => setShowEditModal(false)}
        onSubmit={handleEditPost}
        initialValues={{
          title: post.title,
          description: post.description,
          imageURL: post.imageURL,
        }}
      />

      {/* Sección para mostrar comentarios */}
      <div className='row'>
        {comment.map((comment, i) => (
          <div className='col-md-6' key={i}>
            <Comments comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
