import React from "react";
import AuthBanner from "../components/authBanner";
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { PiLockOpenLight } from "react-icons/pi";

function Register() {
  return (
    <div className="flex">
      <AuthBanner
        title="Onboard Yourself!"
        text="To keep connected please login with your currect credentials."
        action={1}
      />
      <div className="flex h-[100vh] w-1/2 flex-col justify-center items-center">
        <h1 className="text-5xl text-themeBg my-5">Register to the Portal!</h1>
        <div className="flex bg-white items-center p-2 w-1/2 my-3 h-11 border-themeBg border rounded-xl">
          <FiUser size={30} className="text-themeBg" />
          <input
            type="text"
            className="w-full bg-transparent p-1 placeholder-themeBg text-themeBg"
            placeholder="Name"
          />
        </div>
        <div className="flex bg-white items-center p-2 w-1/2 my-3 h-11 border-themeBg border rounded-xl">
          <HiOutlineMail size={30} className="text-themeBg" />
          <input
            type="text"
            className="w-full bg-transparent p-1 placeholder-themeBg text-themeBg"
            placeholder="Email"
          />
        </div>
        <div className="flex bg-white items-center p-2 w-1/2 my-3 h-11 border-themeBg border rounded-xl">
          <PiLockOpenLight size={30} className="text-themeBg" />
          <input
            type="password"
            className="w-full bg-transparent p-1 placeholder-themeBg text-themeBg"
            placeholder="Password"
          />
        </div>
        <div className="flex bg-themeBg items-center p-2 w-1/4 my-3 rounded-xl">
          <button className="w-full text-white p-1 rounded-xl h-13">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
