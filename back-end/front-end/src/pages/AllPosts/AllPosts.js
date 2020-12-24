import React, { useCallback, useContext, useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { UserAllPosts } from "../../components/UserAllPost/UserAllPosts";

export const AllPosts = () => {
  const auth = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [post, setAllPost] = useState(null);

  const AllPost = useCallback(async () => {
    try {
      const UserPosts = await request(`/api/post/`, "GET", null, {
        Authorization: auth.token,
      });
      setAllPost(UserPosts);
    } catch (e) {}
  }, [auth.token, request]);
  //шукаємо всі пости,залежності для useCallback,токен і запрос

  useEffect(() => {
    AllPost();
  }, [AllPost]);
  return <>{!loading && post && <UserAllPosts post={post}/>}</>;
  //Передаємо в компоненту UserAllPosts всі пости для подальшої роботи з ними
  //Повертаємо оброблену компоненту з всіма постами
};
