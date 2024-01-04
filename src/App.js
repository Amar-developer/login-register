import React from "react";
import RegisterPage from "./Pages/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import DashboardPage from "./Pages/DashboardPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dASHBOARD" element={<DashboardPage />} />
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
