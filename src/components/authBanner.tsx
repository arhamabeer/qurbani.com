import React from "react";
import { useNavigate } from "react-router-dom";

type AuthBannerProp = {
  title: string;
  text: string;
  action: number;
};

function AuthBanner(props: AuthBannerProp) {
  const navigate = useNavigate();
  return (
    <div className="bg-themeBg flex flex-col justify-center items-center text-white w-1/2 h-[100vh]">
      <h1 className="text-5xl">{props.title}</h1>
      <h3 className="text-xl my-3">{props.text} </h3>
      <button
        className={`text-xl rounded-2xl border p-3 w-2/5 ${
          props.action === 9 && "hidden"
        }`}
        onClick={
          props.action ? () => navigate("/login") : () => navigate("/register")
        }
      >
        {props.action ? "Login" : "SignUp"}
      </button>
    </div>
  );
}

export default AuthBanner;
