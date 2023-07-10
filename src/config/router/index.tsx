import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../../screens/home";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Home />} />
        <Route path="/login" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
