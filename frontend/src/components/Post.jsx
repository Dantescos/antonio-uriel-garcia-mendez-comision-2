import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { Link, useNavigate } from "react-router-dom";

const Post = ({ posts, getPost }) => {

  const [filterPosts, setFilterPosts] = useState(posts);

  const navigate = useNavigate();
  
  return (
    <div>
      <Link to="/post/new" className="botons-registro">
        Create
      </Link>
      <>
        {filterPosts.map((Post) => {
          return (
            <PostItem
              getPost={getPost}
              key={Post._id}
              post={Post}
              onClick={() => {
                navigate(`/post/${Post._id}`);
              }}
            />
          );
        })}
      </>
    </div>
  );
};

export default Post;