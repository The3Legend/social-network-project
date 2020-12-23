import React, { useContext, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
export const CreatePage = () => {
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

  const postHandler = async () => {
    try {
      const data = await request(
        "/api/post",
        "POST",
        { ...postForm },
        {
          Authorization: auth.token,
        }
      );
      console.log(data);
      history.push("/detail");
    } catch (e) {}
  };

  return (
    <div className='formSize'>
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
        <button onClick={postHandler} className="btn btn-primary">
          Add Comment
        </button>
      </div>
    </div>
  );
};
