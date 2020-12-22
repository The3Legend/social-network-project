import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
      <a className="navbar-brand" href="/detail">
      <i class="fa fa-home" aria-hidden="true"> The Brand</i>
      </a>

      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to={"/create"} className="nav-link">
            <i className="fa fa-paper-plane" aria-hidden="true"> Create Post</i>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/detail"} className="nav-link">
          <i className="fa fa-comments" aria-hidden="true"> All Posts</i>

          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/links"} className="nav-link">
          <i className="fa fa-user-circle" aria-hidden="true"> My Account</i>
          </NavLink>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link" onClick={logoutHandler}>
            <i className="fa fa-sign-out" aria-hidden="true">
              Log-out
            </i>
          </a>
        </li>
      </ul>
    </nav>
  );
};
