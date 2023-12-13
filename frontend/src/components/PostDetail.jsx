import Card from 'react-bootstrap/Card';
import { createCommentReq, useComment } from '../context/CommentProvider';
import { deletePostReq } from '../api/postAxios';
import { Button } from 'react-bootstrap';
import Comments from './Comments';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NuevoComentario from './NewComments';
import Swal from 'sweetalert2';

const PostDetail = ({ post }) => {
  const { getAllComments, comment } = useComment();
  const { id } = useParams();
  const postId = id;
  const navigate = useNavigate(); // Cambiado de useHistory

  useEffect(() => {
    if (post) {
      getAllComments(postId);
    }
  }, [postId, post]);

  const [showModal, setShowModal] = useState(false);

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
          position: 'top-end',
          icon: 'success',
          title: 'El post ha sido eliminado exitosamente',
          showConfirmButton: false,
          timer: 1500,
        });

        
        navigate('/');
      }
    } catch (error) {
      console.error('Error al eliminar el post:', error);
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
      <div className="container col-6 my-5">
        <Card>
          <Card.Img variant="top" src={post.imageURL} />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            <Card.Text>
              @{post.autor} - Posteado: {formattedDatePost} - Última actualización: {formattedDateUpdate}
            </Card.Text>
            <Button className="me-2 mb-1" variant="danger" onClick={handleDeletePost}>
              Eliminar Posteo
            </Button>
            <Button variant="primary" onClick={handleShowModal}>
              Comentar
            </Button>
          </Card.Body>
          <NuevoComentario showModal={showModal} handleClose={handleCloseModal} addComment={addComment} />
        </Card>
        <div className="row">
          {comment.map((comment, i) => (
            <div className="col-md-6" key={i}>
              <Comments comment={comment} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
