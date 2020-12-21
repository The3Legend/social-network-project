import React, { useContext, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
export const CreatePage = () => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [postForm, setPostForm] = useState({
    text: "",
    user: auth.userId,
    nickName:auth.nickName
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
    } catch (e) {}
  };

  return (
    <div>
      <input type="text" name='text' id ='text' placeholder="введіть текст" onChange={changeHandler} />
      <div>
        <button onClick={postHandler}>add post</button>
      </div>
    </div>
  );
};
