import { useId, useRef } from "react";
import { API_URL } from "../utils/consts";

const DeletePostModel = ({ postId, getPost }) => {
  const labelId = useId();
  const ref = useRef(null);

  const handleDelete = () => {
    console.log("delete post", postId);
    fetch(`${API_URL}/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status !== 200) return;

      ref.current.click();
      getPost();
    });
  };

  return (
    <div id={"modal" + postId} aria-labelledby={labelId} aria-hidden="true">
      <div>
        <h1 id={labelId}>Eliminar post</h1>
        <p>¿Quiere eliminar este post?</p>
        <div>
          <button
            type="button"
            onClick={() => ref.current.click()}
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModel;
