import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../../screens/home";
import Register from "../../screens/register";
import Login from "../../screens/login";
import MiniDrawer from "../../components/sideNav";
import IssueShare from "../../screens/issueShare";
import AddShare from "../../screens/addShare";
import RegisterAnimal from "../../screens/registerAnimal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { LOCAL_STORAGE_TOKEN } from "../../constants";
import { instanceOAuthToken } from "../../api";
import { API_URL_AUTH } from "../api_endpoint";
import { set } from "../../slice/adminSlice";

function AppRouter() {
  const dispatch = useDispatch<AppDispatch>();
  let token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  // useEffect(() => {
  //   if (token !== null) {
  //     try {
  //       (async () => {
  //         let instanceToken = instanceOAuthToken(token);
  //         let response = await instanceToken.get(`${API_URL_AUTH}/GetUserInfo`);
  //         dispatch(set(response.data.data));
  //         console.log("APP res =>", response);
  //       })();
  //     } catch (ex) {
  //       console.log("APP EX =>", ex);
  //     }
  //   }
  // }, [token]);
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
