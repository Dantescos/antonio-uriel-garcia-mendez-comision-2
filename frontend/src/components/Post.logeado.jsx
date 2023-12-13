import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PostLoged = ({ post }) => {
  const navigate = useNavigate();

  const createdAtDate = new Date(post.createdAt);
  const day = createdAtDate.getDate();
  const month = createdAtDate.getMonth() + 1;
  const year = createdAtDate.getFullYear();
  const formattedDatePost = `${day}/${month}/${year}`;
  const formattedDateUpdate = `${day}/${month}/${year}`;

  return (
    <div className="mb-4">
      <div className="card bg-dark text-light" style={{ width: '20rem', margin: '0 101px' }}>
        <div className="card-body">
          <Card.Title>{post.title}</Card.Title>
          <p className="card-text">{post.description}</p>
          <img className="card-img-top" src={post.imageURL} alt="Imagen" />
          <Card.Text className="text-truncate overflow-hidden">
           <p> By: @{post.autor}</p> 
           <p> Posteado: {formattedDatePost} </p>
           <p> Actualizado: {formattedDateUpdate}</p>
          </Card.Text>
          <Button variant="primary" onClick={() => navigate(`/profile/post/${post._id}`)}>
            Detalles del post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostLoged;