import Navbar from '../components/Navbar.logeado.jsx';
import PostLoged from '../components/Post.logeado.jsx'
import { usePost } from '../context/PostProvider.jsx'
import { useEffect } from 'react'
import ModalNewPost from "../components/ModalNewPost.jsx";
import { Button } from "react-bootstrap";
import { useState } from "react";


function Homepagelogeado() {

const { getAllPost, post } = usePost();
const [showModal, setShowModal] = useState(false)

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

    const handleShowModal = () => {
      setShowModal(true)
  }

  const handleCloseModal = () => {
      setShowModal(false)
  }

  const addPost = async (newPost) => {
      try{
      const res = await createPost(newUser)
      console.log('Nuevo posteo: ', res.id);
      navigate(`/profile/post/${result.id}`)

      toast.success('¡Post publicado!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
      })
      } catch (error) {
      toast.error('Error al publicar el post', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,        
      })
      console.error('Error al crear el usuario', error);
      
      }         
  }

  return (
    <>
    <Navbar/>
    <h1 className="text-center pt-3">Posteos</h1>

    <Button variant="warning" onClick={handleShowModal} >Crear Nuevo Post</Button>

    <ModalNewPost showModal={showModal} handleClose={handleCloseModal} addPost={addPost} />
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