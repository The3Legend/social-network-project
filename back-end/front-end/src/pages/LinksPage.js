import React, { useCallback, useContext, useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { UserProfile } from "../components/UserProfile";


export const LinksPage = () => {
  const auth = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [post, getPost] = useState(null);

  const AllPost = useCallback(async () => {
    try {
      const UserPosts = await request(`/api/post/singlPost`, "GET", null, {
        Authorization: auth.token,
      });
      getPost(UserPosts);
    } catch (e) {}
  }, [auth.token, request]);

  useEffect(() => {
    AllPost();
  }, [AllPost]);
  return <>{!loading && post && <UserProfile post={post} />}</>;
};
