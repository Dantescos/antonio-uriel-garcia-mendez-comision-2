import { Card } from 'react-bootstrap';

const PostsinLogear = ({ post }) => {
  const createdAtDate = new Date(post.createdAt);
  const day = createdAtDate.getDate();
  const month = createdAtDate.getMonth() + 1;
  const year = createdAtDate.getFullYear();
  const formattedDatePost = `${day}/${month}/${year}`;
  const formattedDateUpdate = `${day}/${month}/${year}`;

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={post.imageURL} alt="Imagen" />
      <div className="card-body">
        <Card.Title>{post.title}</Card.Title>
        <p className="card-text">{post.description}</p>
        <Card.Text className="text-truncate overflow-hidden">
          @{post.autor} -
           Posteado: {formattedDatePost} 
           - Última actualización: {formattedDateUpdate}
        </Card.Text>
      </div>
    </div>
  );
};

export default PostsinLogear;