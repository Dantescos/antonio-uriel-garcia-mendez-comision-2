import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useComment, createCommentReq } from '../context/CommentProvider';
import { deletePostReq, updatePostReq } from '../api/postAxios';
import NuevoComentario from './NewComments';
import Swal from 'sweetalert2';
import Comments from '../components/comentarios';
import  EditPostModal  from './editar.post'; 

const PostDetail = ({ post }) => {
  const { getAllComments, comment } = useComment();
  const { id } = useParams();
  const postId = id;
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      getAllComments(postId);
    }
  }, [postId, post]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const addComment = async (newComment, postId) => {
    try {
      const res = await createCommentReq(newComment, postId);
      console.log('res: ', postId);
      return res;
    } catch (error) {
      console.error('Error al crear el comentario', error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeletePost = async () => {
    try {
      const res = await deletePostReq(post._id);
      if (res.status === 200) {
        console.log('Post eliminado exitosamente');
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

  const handleEditPost = async (editedPostData) => {
    try {
      const res = await updatePostReq(post._id, editedPostData);
      if (res.status === 200) {
        console.log('Post editado exitosamente');
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error al editar el post:', error);
    }
  };

  if (!post) {
    return <div>No se encontró la publicación.</div>;
  }

  const createdAtDate = new Date(post.createdAt);
  const day = createdAtDate.getDate();
  const month = createdAtDate.getMonth() + 1;
  const year = createdAtDate.getFullYear();
  const formattedDatePost = `${day}/${month}/${year}`;
  const formattedDateUpdate = `${day}/${month}/${year}`;

  return (
    <>
      <div className='container col-6 my-5'>
      <Card style={{ backgroundColor: '#343a40', color: '#fff' }}>
  <Card.Img variant='top' src={post.imageURL} />
  <Card.Body>
    <Card.Title>{post.title}</Card.Title>
    <Card.Text>{post.description}</Card.Text>
    <Card.Text>
      <p>By: @{post.autor}</p>
      <p> Posteado: {formattedDatePost} </p>
      <p> Actualizado: {formattedDateUpdate}</p>
    </Card.Text>
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
    <Button variant='primary' onClick={handleShowModal}>
      Comentar
    </Button>
  </Card.Body>
  <NuevoComentario
    showModal={showModal}
    handleClose={handleCloseModal}
    addComment={addComment}
  />
</Card>

      
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

        <div className='row'>
          {comment.map((comment, i) => (
            <div className='col-md-6' key={i}>
              <Comments comment={comment} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetail;