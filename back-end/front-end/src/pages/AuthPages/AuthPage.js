import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMassage } from "../../hooks/massage.hook";
import { AuthContext } from "../../context/AuthContext";
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
  //Встановлення зависимостей

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  //За допомогою хука збираєм з інпутів всі дані
  const createRegister = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      toast.options.positionClass = "toast-top-right";
      toast.options.progressBar = true;
      toast.success(data.message);
    } catch (e) {}
  };
  //за допомогою запроса регістрації зкидуєм всі дані в модель бази даних
  const createLogin = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
      toast.options.positionClass = "toast-top-right";
      toast.options.progressBar = true;
      toast.options.timeOut = 1000;
      toast.success(data.message);
    } catch (e) {}
  };
  //за допомогою запроса логіну зкидуєм всі дані в модель бази даних
  return (
    <div className="color center">
      <h1>The Blog</h1>
      <div
        className="d-flex flex-wrap align-content-center "
        style={{ height: "600px" }}
      >
        <div className="container">
          <div className="row ">
            <div className="col-sm-7 ">
              <h2>
                Welcome to 'The Blog' page, later the site will be updated with
                new functionality, thank you for now, log in and enjoy your
                conversation!
              </h2>
            </div>
            <div className="col-sm-5 ">
              <div className="card opacity">
                <article className="card-body">
                  <h4 className="card-title text-center mb-5 mt-1">
                    Login/Registration
                  </h4>
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
                        value={form.nickName}
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
                        value={form.email}
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
                        value={form.password}
                        onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className="form-group d-flex justify-content-between">
                    <button
                      className="btn btn-outline-success"
                      onClick={createLogin}
                      disabled={loading}
                    >
                      Login
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={createRegister}
                      disabled={loading}
                    >
                      Register
                    </button>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
