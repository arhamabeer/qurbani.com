import React from "react";
import AuthBanner from "../components/authBanner";

function RegisterAnimal() {
  return (
    <div className="flex  justify-between">
      <div className="flex w-2/4 flex-col justify-center items-center">
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="text"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Animal Name..."
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <select
            name="day"
            className="h-full w-full bg-transparent text-themeBg"
            id=""
          >
            <option defaultChecked disabled value="">
              Qurbani Day
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button className="w-1/4 flex justify-center items-center my-2 h-10  bg-themeBgDark rounded-xl px-2">
          ADD
        </button>
      </div>
      <AuthBanner
        action={9}
        text="Add a new Animal in the Stocks"
        title="Register Animal"
      />
    </div>
  );
}

export default RegisterAnimal;
