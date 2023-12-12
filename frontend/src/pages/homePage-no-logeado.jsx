import React from 'react';
import Navbarnolog from '../components/Navbar.sin.logear';
import { useEffect } from "react"
import {usePost} from "../context/PostProvider"
import PostsinLogear from "../components/post.sin.logear"


function HomeNoLogeado() {

  const { getAllPost, post } = usePost();

  useEffect( () => {
    getAllPost()
  }, [])

  if (post.length === 0)
    return (
      <>
        <Navbarnolog/>
        <h1 className='d-flex col align-items-center justify-content-center'
        style={{height: "100vh"}}>
        No hay posteos. 
        </h1>
      </>
    );

  return (
    <>
    <Navbarnolog/>
    <h1 className="text-center pt-3">Posteos</h1>
    <div className="container">
      <div className="row">
          {post.map((post, i) => (
        <div className='col-md-6' key={i}>  
            <PostsinLogear post={post} />
        </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default HomeNoLogeado