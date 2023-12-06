import { Link } from "react-router-dom";
import { useId } from "react";


const PostItem = ({ post, getPost, onClick }) => {
  const modalId = useId();

  return (
    <div
      key={post._id}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <picture>
        <img src={post.author.avatar} alt={post.author.username} />
      </picture>
      <section>
        <h2>{post.title}</h2>
        <p>
          <b>{post.author.username}</b>
          <span>{post.comments.length}</span>
        </p>
      </section>
      <div>
        <Link
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
