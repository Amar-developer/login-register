import React from "react";
import { isAuthenticate } from "../Services/Auth";
import { Link } from "react-router-dom";

const Navbar = ({ logoutUser }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Amar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          {!isAuthenticate() ? (
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          ) : null}
          {!isAuthenticate() ? (
            <li>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          ) : null}
          {isAuthenticate() ? (
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          ) : null}
          {isAuthenticate() ? (
            <li>
              <a
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={logoutUser}
              >
                Logout
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
