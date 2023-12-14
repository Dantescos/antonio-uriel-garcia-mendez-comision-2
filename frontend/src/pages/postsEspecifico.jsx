import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.logeado.jsx';
import PostDetail from '../components/PostDetail.jsx';
import { usePost } from '../context/PostProvider.jsx';
import { useEffect, useState } from 'react';

const Postpreciso = () => {
  // Estado local para almacenar la información del post
  const [data, setData] = useState(null);

  // Obtener el parámetro de la URL usando react-router-dom
  const { id } = useParams();

  // Obtener funciones y estados relacionados con los posts desde el contexto
  const { getPostById } = usePost();

  // Cargar el detalle del post al montar el componente
  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener la información del post por su ID
        const postData = await getPostById(id);
        
        // Establecer la información del post en el estado local
        setData(postData);
      } catch (error) {
        console.error('Error al obtener detalles del post:', error);
      }
    }

    // Llamar a la función fetchData
    fetchData();
  }, [id, getPostById]);

  return (
    <>
      {/* Renderizar la barra de navegación */}
      <Navbar />

      {/* Renderizar el componente de detalle del post y pasarle la información del post */}
      <PostDetail post={data} />
    </>
  );
};

export default Postpreciso;
