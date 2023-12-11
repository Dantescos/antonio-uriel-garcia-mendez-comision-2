import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../context/AuthContex";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import '../hojas-de-estilo/postpage.css';

function PostPage() {
  const [posts, setPosts] = useState([]);
  const { validade } = useContext(AuthContext);

  const getPost = useCallback(() => {
      axios.get(`${API_URL}/post`, {
         headers: {
           Authorization: validade.token,
         },
       })
       .then((res) => setPosts(res.data))
       .catch((err) => console.log(err));
   }, [validade.token]);

  useEffect(() => {
    getPost();
  }, [validade, getPost]);

  return (
    <div className="container">
      <Navbar />
      <main className="section">
        <Post getPost={getPost} posts={posts} />
      </main>
    </div>
  );
}

export default PostPage;
