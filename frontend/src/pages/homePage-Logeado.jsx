import Navbar from '../components/Navbar.logeado.jsx';
import PostLoged from '../components/Post.logeado.jsx'
import { usePost } from '../context/PostProvider.jsx'
import { useEffect } from 'react'


function Homepagelogeado() {

  const { getAllPost, post } = usePost();

  useEffect( () => {
    getAllPost()
  }, [])

  if (post.length === 0)
    return (
      <>
        <Navbar/>
        <h1 className='d-flex col align-items-center justify-content-center'
        style={{height: "100vh"}}>
        No se hallan posteos
        </h1>
      </>
    );

  return (
    <>
    <Navbar/>
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
  )
}

export default Homepagelogeado