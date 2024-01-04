import React, { useState } from "react";
import "./RegisterPage.css";
import { RegisterApi } from "../Services/Api";
import { storeUserData } from "../Services/Storage";
import { isAuthenticate } from "../Services/Auth";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const RegisterPage = () => {
  const initialStateValue = {
    email: { required: false },
    name: { required: false },
    password: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialStateValue);

  const [loading, setLoading] = useState(false);
  const [inputs, setIputs] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;
    const errors = initialStateValue;

    if (inputs.name === "") {
      errors.name.required = true;
      hasErrors = true;
    }
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
      //sending register api request
      RegisterApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if (err.response.data.error.message === "EMAIL_EXISTS") {
            setErrors({
              ...errors,
              custom_error: "Already this email has been register!",
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
      <section className="register-block">
        <div className="container">
          <div className="row ">
            <div className="col register-sec">
              <h2 className="text-center">Register Now</h2>
              <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Name
                  </label>

                  <input
                    onChange={handleInput}
                    type="text"
                    className="form-control"
                    name="name"
                    id=""
                  />
                  {errors.name.required ? (
                    <span className="text-danger">Name is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Email
                  </label>

                  <input
                    onChange={handleInput}
                    type="text"
                    className="form-control"
                    name="email"
                    id=""
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
                    value="Register"
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Already have account ? Please <Link to="/login">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
