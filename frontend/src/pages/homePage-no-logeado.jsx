import Navbarnolog from '../components/Navbar.sin.logear.jsx';
import PostLoged from '../components/Post.logeado.jsx';
import { usePost } from '../context/PostProvider.jsx';
import { useEffect } from 'react';

function HomeNoLogeado() {
  // Obtener funciones y estado relacionados con los posteos desde el contexto
  const { getAllPost, post } = usePost();

  // Obtener la lista de posteos al cargar el componente
  useEffect(() => {
    getAllPost();
  }, []);

  // Renderizar según la cantidad de posteos disponibles
  if (post.length === 0) {
    return (
      <>
        <Navbarnolog />
        <h1 className="text-center pt-3">Posteos</h1>
        <h1 className='d-flex col align-items-center justify-content-center' style={{ height: "100vh" }}>
          No se hallan posteos
        </h1>
      </>
    );
  }

  return (
    <>
      <Navbarnolog />
      <h1 className="text-center pt-3">Posteos</h1>
      
      <div className="container">
        <div className="row">
          {post.map((post, i) => (
            <div className='col-md-6' key={i}>
              <PostLoged post={post} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeNoLogeado;
