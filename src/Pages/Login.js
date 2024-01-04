import React from "react";
import "./LoginPage.css";
import { useState } from "react";
import { LoginApi } from "../Services/Api";
import { storeUserData } from "../Services/Storage";
import { isAuthenticate } from "../Services/Auth";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Login = () => {
  const initialStateValue = {
    email: { required: false },

    password: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialStateValue);

  const [inputs, setIputs] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;
    const errors = initialStateValue;

    if (inputs.email === "") {
      errors.email.required = true;
      hasErrors = true;
    }
    if (inputs.password === "") {
      errors.password.required = true;
      hasErrors = true;
    }

    if (!hasErrors) {
      setLoading(true);
      //sending login api request
      LoginApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if (err.code == "ERR_BAD_REQUEST") {
            setErrors({
              ...errors,
              custom_error: "INVALID LOGIN CREDENTIALS",
            });
          } else if (
            String(err.response.data.error.message).includes("WEAK_PASSWORD")
          ) {
            setErrors({
              ...errors,
              custom_error: "Password should be at least 6 character!",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setErrors({ ...errors });
  };

  const handleInput = (e) => {
    setIputs({ ...inputs, [e.target.name]: e.target.value });
  };

  if (isAuthenticate()) {
    //redirect user to dhashboard
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Navbar />
      <section className="login-block">
        <div className="container">
          <div className="row ">
            <div className="col login-sec">
              <h2 className="text-center">Login Now</h2>
              <form onSubmit={handleSubmit} className="login-form" action="">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Email
                  </label>
                  <input
                    onChange={handleInput}
                    type="email"
                    className="form-control"
                    name="email"
                    id=""
                    placeholder="email"
                  />
                  {errors.email.required ? (
                    <span className="text-danger">Email is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="text-uppercase"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleInput}
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="password"
                    id=""
                  />
                  {errors.password.required ? (
                    <span className="text-danger">Password is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <span className="text-danger">
                    {errors.custom_error ? <p>{errors.custom_error}</p> : null}
                  </span>
                  {loading ? (
                    <div className="text-center">
                      <div
                        className="spinner-border text-primary "
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : null}

                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    disabled={loading}
                    value="Login"
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Create new account ? Please{" "}
                  <Link to="/register">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
