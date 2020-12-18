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
      <a className="navbar-brand" href="/">
        The Brand
      </a>

      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to={"/create"} className="nav-link">
            Створити
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/links"} className="nav-link">
            Силки
          </NavLink>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link" onClick={logoutHandler}>
            Вихід
          </a>
        </li>
      </ul>
    </nav>
  );
};
