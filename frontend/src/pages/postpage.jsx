import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../context/AuthContex";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import '../hojas-de-estilo/postpage.css';

function PostPage() {
  const [posts, setPosts] = useState([]);

  const { isAuthenticated } = useContext(AuthContext);

  const getPost = useCallback(() => {
    if (isAuthenticated && isAuthenticated.token) {
      axios.get(`${API_URL}/post`, {
        headers: {
          Authorization: `Bearer ${isAuthenticated.token}`,
        },
      })
        .then((response) => setPosts(response.data))
        .catch((error) => console.error(error));
    } else {
      console.error("Usuario no autenticado");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getPost();
  }, [isAuthenticated, getPost]);

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
