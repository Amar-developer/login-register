import React, { useEffect, useState } from "react";
import { UserDetailApi } from "../Services/Api";
import Navbar from "../Components/Navbar";
import { logout, isAuthenticate } from "../Services/Auth";
import { useNavigate, Navigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", localId: "" });

  useEffect(() => {
    if (isAuthenticate()) {
      UserDetailApi().then((response) => {
        setUser({
          //axios data return types using user[0]
          name: response.data.users[0].displayName,
          email: response.data.users[0].email,
          localId: response.data.users[0].localId,
        });
      });
    }
  }, []);

  const logoutUser = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticate()) {
    //redirect user to dhashboard
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar logoutUser={logoutUser} />
      <main role="main" className="container mt-5">
        <div className="container">
          <div className="text-center mt-5">
            <h3>Dashboard page</h3>

            {user.name && user.email && user.localId ? (
              <div>
                <p className="text-bold ">
                  Hi {user.name}, your Firebase ID is {user.localId}
                </p>
                <p>Your Email is {user.email}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
