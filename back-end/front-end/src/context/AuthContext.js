import { createContext } from "react";

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logaut: noop,
  isAuthenticated: false,
  nickName:null,
  email:null
});
