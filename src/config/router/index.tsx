import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../../screens/home";
import Register from "../../screens/register";
import Login from "../../screens/login";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
