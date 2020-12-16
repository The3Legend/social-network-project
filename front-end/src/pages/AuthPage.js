import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook";

export const AuthPage = () => {
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: '',nickName:''
  })
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      console.log(data)
    } catch (e) {}
  }

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
              <button className="btn btn-outline-success" disabled={loading}>
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
