import React, { useContext, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
export const CreatePost = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { request } = useHttp();
  const [postForm, setPostForm] = useState({
    text: "",
    user: auth.userId,
    nickName: auth.nickName,
    email: auth.email,
  });
  const changeHandler = (event) => {
    setPostForm({ ...postForm, [event.target.name]: event.target.value });
  };
  //За допомогою хука забираєм всі дані

  const createPost = async () => {
    try {
      await request(
        "/api/post",
        "POST",
        { ...postForm },
        {
          Authorization: auth.token,
        }
      );
      history.push("/allPost");
    } catch (e) {}
  };
  //закидуємо в базу даних інформацію про пост

  return (
    <div className="formSize">
      <div className="container">
        <h2>Please create a posts</h2>
        <p>The form below contains a textarea for posts:</p>
        <div className="form-group">
          <label htmlFor="comment">Posts:</label>
          <textarea
            className="form-control"
            rows="5"
            type="text"
            name="text"
            id="text"
            placeholder="Enter text..."
            onChange={changeHandler}
          ></textarea>
        </div>
        <button onClick={createPost} className="btn btn-primary">
          Add Comment
        </button>
      </div>
    </div>
  );
};
