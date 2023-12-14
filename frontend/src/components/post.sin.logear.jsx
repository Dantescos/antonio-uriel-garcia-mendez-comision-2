// Importa el componente Card de react-bootstrap
import { Card } from "react-bootstrap";
//cree componentes diferentes de los posteos segun si uno esta o no logeado
// Definición del componente funcional PostsinLogear
const PostsinLogear = ({ post }) => {
  // Obtiene la fecha de creación del post y formatea la fecha
  const createdAtDate = new Date(post.createdAt);
  const day = createdAtDate.getDate();
  const month = createdAtDate.getMonth() + 1;
  const year = createdAtDate.getFullYear();
  const formattedDatePost = `${day}/${month}/${year}`;
  const formattedDateUpdate = `${day}/${month}/${year}`;

  // Estructura JSX del componente
  return (
    <div className="mb-4">
      <div
        className="card bg-dark text-light"
        style={{ width: "20rem", margin: "0 101px" }}
      >
        <div className="card-body">
          <Card.Title>{post.title}</Card.Title>

          <p className="card-text">{post.description}</p>

          <img className="card-img-top" src={post.imageURL} alt="Imagen" />

          <Card.Text className="text-truncate overflow-hidden">
            By: @{post.author} <br />
            Posteado: {formattedDatePost} <br />
            Actualizado: {formattedDateUpdate}
          </Card.Text>
        </div>
      </div>
    </div>
  );
};

// Exporta el componente PostsinLogear
export default PostsinLogear;
