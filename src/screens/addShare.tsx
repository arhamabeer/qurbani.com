import React from "react";
import AuthBanner from "../components/authBanner";

function AddShare() {
  return (
    <div className="flex  justify-between">
      <div className="flex w-2/4 flex-col justify-center items-center">
        <div className="w-2/4 flex justify-center items-center mb-5 mt-[-10rem] h-20 ">
          <h1 className="text-2xl underline decoration-themeBgDark">
            Total Cost:{" "}
            <span className="text-themeBg font-bold">PKR 20000</span>
          </h1>
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="text"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Person Name..."
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="text"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Address..."
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="number"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Contact Number..."
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <select
            name="animal"
            className="h-full w-full bg-transparent text-themeBg"
            id=""
          >
            <option defaultChecked selected disabled value="">
              Select Animal
            </option>
            <option value="Cow">Cow</option>
            <option value="Camel">Camel</option>
            <option value="Goat">Goat</option>
          </select>
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <select
            name="day"
            className="h-full w-full bg-transparent text-themeBg"
            id=""
          >
            <option defaultChecked selected disabled value="">
              Qurbani Day
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <button className="w-1/4 flex justify-center items-center my-2 h-10  bg-themeBgDark rounded-xl px-2">
          Register
        </button>
      </div>
      <AuthBanner
        action={9}
        text="Add a new Share for the Animal"
        title="Register Share"
      />
    </div>
  );
}

export default AddShare;
