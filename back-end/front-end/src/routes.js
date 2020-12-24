import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { SinglPost} from "./pages/SinglPost/SinglPost";
import { CreatePost } from "./pages/CreatePost/CreatePost";
import { AllPosts } from "./pages/AllPosts/AllPosts";
import { AuthPage } from "./pages/AuthPages/AuthPage";


export const RoutesUse = (isAuthenticate) => {
  if (isAuthenticate) {
    return (
      //якщо користувач залогінений і у нього є токен
      <Switch>
        <Route path="/singlPost" exact>
          <SinglPost />
        </Route>
        <Route path="/createPost" exact>
          <CreatePost />
        </Route>
        <Route path="/allPost">
          <AllPosts />
        </Route>
        <Redirect to="/createPost" />

      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exect>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
