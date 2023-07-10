import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../../screens/home";
import Register from "../../screens/register";
import Login from "../../screens/login";
import MiniDrawer from "../../components/sideNav";
import IssueShare from "../../screens/issueShare";
import AddShare from "../../screens/addShare";
import RegisterAnimal from "../../screens/registerAnimal";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MiniDrawer />}>
          <Route path="/" element={<Home />} />
          <Route path="/addShare" element={<AddShare />} />
          <Route path="/issueShare" element={<IssueShare />} />
          <Route path="/registerAnimal" element={<RegisterAnimal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
