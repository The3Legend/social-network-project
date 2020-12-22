import React, { useCallback, useContext, useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { UserPosts } from "../components/UserPosts";

export const DetailPage = () => {
  const auth = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [post, getPost] = useState(null);

  const AllPost = useCallback(async () => {
    try {
      const UserPosts = await request(`/api/post/`, "GET", null, {
        Authorization: auth.token,
      });
      console.log(UserPosts)
      getPost(UserPosts);
    } catch (e) {}
  }, [auth.token, request]);

  useEffect(() => {
    AllPost();
  }, [AllPost]);
  return <>{!loading && post && <UserPosts post={post} />}</>;
};
