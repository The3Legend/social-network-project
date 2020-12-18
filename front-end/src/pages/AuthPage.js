import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMassage } from "../hooks/massage.hook";
import { AuthContext } from "../context/AuthContext";
import toast from "toastr";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMassage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
    nickName: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      toast.options.positionClass = "toast-top-right";
      toast.options.progressBar = true;
      toast.success(data.message);
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
      toast.options.positionClass = "toast-top-right";
      toast.options.progressBar = true;
      toast.success(data.message);
    } catch (e) {}
  };

  return (
    <div className="row mt-4">
      <div className="col-4 mx-auto">
        <div className="card">
          <article className="card-body">
            <h4 className="card-title text-center mb-4 mt-1">Registration</h4>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Name"
                  type="text"
                  id="nickName"
                  name="nickName"
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-envelope"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="form-group d-flex justify-content-between">
              <button
                className="btn btn-outline-success"
                onClick={loginHandler}
                disabled={loading}
              >
                Login
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={registerHandler}
                disabled={loading}
              >
                Register
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
