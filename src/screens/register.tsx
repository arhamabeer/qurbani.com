import React, { useEffect, useState } from "react";
import AuthBanner from "../components/authBanner";
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { PiLockOpenLight } from "react-icons/pi";
import { RegisterValueState } from "../types";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LOCAL_STORAGE_TOKEN } from "../constants";
import { registerAdmin, selectAdmin } from "../slice/adminSlice";
import ToastComponent from "../components/ToastComponent";

function Register() {
  const [values, setValues] = useState<RegisterValueState>({
    email: "",
    password: "",
    cpassword: "",
    name: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loginMessage = useSelector(selectAdmin);

  console.log("loginMessage= ", loginMessage);
  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN) !== null) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    console.log(loginMessage);
    if (loginMessage.adminLoginMessage !== "" && loginMessage.registerStatus) {
      toast.success(loginMessage.adminLoginMessage);
      navigate("/login");
    } else if (
      loginMessage.adminLoginMessage !== "" &&
      !loginMessage.registerStatus
    ) {
      toast.error(loginMessage.adminLoginMessage);
    }
  }, [loginMessage.adminLoginMessage]);

  const handleChange = (e: any) => {
    setValues((prev) => ({
      ...prev,
      [e.name]: e.value,
    }));
  };

  const handleRegister = () => {
    let { email, name, password, cpassword } = values;
    if (email === "" || name === "" || password === "") {
      toast.error("Email, Name or Password is invalid!");
    } else if (password !== cpassword) {
      toast.error("Passwords did not matched!");
    } else {
      try {
        dispatch(registerAdmin(values));
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <>
      <div className="flex">
        <AuthBanner
          title="Onboard Yourself!"
          text="To keep connected please login with your currect credentials."
          action={1}
        />
        <div className="flex h-[100vh] w-1/2 flex-col justify-center items-center">
          <h1 className="text-5xl text-themeBg my-5">
            Register to the Portal!
          </h1>
          <div className="flex bg-white items-center p-2 w-1/2 my-3 h-11 border-themeBg border rounded-xl">
            <FiUser size={30} className="text-themeBg" />
            <input
              name="name"
              onChange={(e: any) => handleChange(e.target)}
              type="text"
              className="w-full bg-transparent p-1 placeholder-themeBg text-themeBg"
              placeholder="Name"
            />
          </div>
          <div className="flex bg-white items-center p-2 w-1/2 my-3 h-11 border-themeBg border rounded-xl">
            <HiOutlineMail size={30} className="text-themeBg" />
            <input
              name="email"
              onChange={(e: any) => handleChange(e.target)}
              type="text"
              className="w-full bg-transparent p-1 placeholder-themeBg text-themeBg"
              placeholder="Email"
            />
          </div>
          <div className="flex bg-white items-center p-2 w-1/2 my-3 h-11 border-themeBg border rounded-xl">
            <PiLockOpenLight size={30} className="text-themeBg" />
            <input
              name="password"
              onChange={(e: any) => handleChange(e.target)}
              type="password"
              className="w-full bg-transparent p-1 placeholder-themeBg text-themeBg"
              placeholder="Password"
            />
          </div>
          <div className="flex bg-white items-center p-2 w-1/2 my-3 h-11 border-themeBg border rounded-xl">
            <PiLockOpenLight size={30} className="text-themeBg" />
            <input
              name="cpassword"
              onChange={(e: any) => handleChange(e.target)}
              type="password"
              className="w-full bg-transparent p-1 placeholder-themeBg text-themeBg"
              placeholder="Password"
            />
          </div>
          <div
            className={`flex bg-themeBg items-center p-2 w-1/4 my-3 rounded-xl ${
              loginMessage.status === "PENDING" &&
              "border bg-white border-themeBgDark"
            }`}
          >
            <button
              className={`w-full p-1 rounded-xl h-13 ${
                loginMessage.status === "PENDING"
                  ? "text-themeBg"
                  : "text-white"
              }`}
              onClick={() => handleRegister()}
              disabled={loginMessage.status === "PENDING"}
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <ToastComponent />
    </>
  );
}

export default Register;
