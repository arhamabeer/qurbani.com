import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PiLockOpenLight } from "react-icons/pi";
import { HiOutlineMail } from "react-icons/hi";
import { LoginValueState } from "../types";
import { loginAdmin, selectAdmin } from "../slice/adminSlice";
import ToastComponent from "../components/ToastComponent";
import AuthBanner from "../components/authBanner";
import { AppDispatch } from "../store";
import { LOCAL_STORAGE_TOKEN } from "../constants";

function Login() {
  const [values, setValues] = React.useState<LoginValueState>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loginMessage = useSelector(selectAdmin);

  React.useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN) !== null) {
      navigate("/");
    }
  }, []);
  React.useEffect(() => {
    console.log(loginMessage);
    if (loginMessage.adminLoginMessage !== "" && loginMessage.loginStatus) {
      toast.success(loginMessage.adminLoginMessage);
      navigate("/");
    } else if (
      loginMessage.adminLoginMessage !== "" &&
      !loginMessage.loginStatus
    ) {
      toast.error(loginMessage.adminLoginMessage);
    }
  }, [loginMessage.adminLoginMessage]);

  const handleChange = (e: any) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    if (values.email === "" || values.password === "") {
      toast.error("Email or Password is invalid!");
    }
    try {
      dispatch(loginAdmin(values));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <>
      <div className="flex">
        <AuthBanner
          title="Welcome Back!"
          text="Don't have Account? Register yourself."
          action={0}
        />
        <div className="flex h-[100vh] w-1/2 flex-col justify-center items-center">
          <h1 className="text-5xl text-themeBg my-5">Login to the Portal!</h1>
          <div className="flex bg-white items-center p-2 w-1/2 my-3 h-11 border-themeBg border rounded-xl">
            <HiOutlineMail size={30} className="text-themeBg" />
            <input
              onChange={(e: any) => handleChange(e)}
              type="text"
              className="w-full bg-transparent p-1 placeholder-themeBg text-themeBg"
              placeholder="Email"
              name="email"
            />
          </div>
          <div className="flex bg-white items-center p-2 w-1/2 my-3 h-11 border-themeBg border rounded-xl">
            <PiLockOpenLight size={30} className="text-themeBg" />
            <input
              onChange={(e: any) => handleChange(e)}
              type="password"
              className="w-full bg-transparent p-1 placeholder-themeBg text-themeBg"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="flex bg-themeBg items-center p-2 w-1/4 my-3 rounded-xl">
            <button
              className="w-full text-white p-1 rounded-xl h-13"
              onClick={() => handleLogin()}
              disabled={loginMessage.status === "PENDING"}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <ToastComponent />
    </>
  );
}

export default Login;
